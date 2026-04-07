import { prisma } from "../lib/db.js";
import { computeEdgeScore, } from "../lib/edgeEngine.js";
import { getGameWeather, getTeamProfile } from "../lib/gameMetadata.js";
import { americanToImpliedProbability } from "../lib/oddsMath.js";
import { collectYouTubeSignal } from "../lib/youtube-scrubber.js";
function normalizeMarketType(value) {
    if (value === "MONEYLINE") {
        return "moneyline";
    }
    if (value === "SPREAD") {
        return "spread";
    }
    if (value === "TOTAL") {
        return "total";
    }
    return null;
}
function normalizeSelection(value) {
    if (value === "HOME") {
        return "home";
    }
    if (value === "AWAY") {
        return "away";
    }
    if (value === "OVER") {
        return "over";
    }
    if (value === "UNDER") {
        return "under";
    }
    return null;
}
function clamp01(value) {
    return Math.max(0, Math.min(1, value));
}
function average(values) {
    if (!values.length) {
        return 0;
    }
    return values.reduce((sum, value) => sum + value, 0) / values.length;
}
function formatPrice(price) {
    return price > 0 ? `+${price}` : `${price}`;
}
function formatBookLine(selection, line, price) {
    if (line === null) {
        return `${selection} ${formatPrice(price)}`;
    }
    return `${selection} ${line} (${formatPrice(price)})`;
}
function deriveComponents(event, marketType) {
    const offers = event.books.flatMap((book) => {
        const market = book.markets.find((entry) => entry.market_type === marketType);
        if (!market) {
            return [];
        }
        return Object.values(market.outcomes)
            .filter((outcome) => Boolean(outcome))
            .map((outcome) => ({
            price: outcome.price,
            line: outcome.line,
            timestamp: book.timestamp,
        }));
    });
    if (!offers.length) {
        return {
            market: 0.35,
            momentum: 0.35,
            pattern: 0.35,
            risk: 0.35,
        };
    }
    const probabilities = offers.map((offer) => americanToImpliedProbability(offer.price));
    const probabilitySpread = Math.max(...probabilities) - Math.min(...probabilities);
    const lineValues = offers.map((offer) => offer.line).filter((line) => line !== undefined);
    const lineSpread = lineValues.length > 1 ? Math.max(...lineValues) - Math.min(...lineValues) : 0;
    const coverage = clamp01(event.books.length / 5);
    const freshnessMinutes = average(offers.map((offer) => Math.max(0, (Date.now() - offer.timestamp) / 60000)));
    const freshness = clamp01(1 - freshnessMinutes / 180);
    const disagreement = clamp01(probabilitySpread * 6 + lineSpread * 0.08);
    return {
        market: clamp01(0.32 + disagreement * 0.42 + coverage * 0.26),
        momentum: clamp01(0.28 + freshness * 0.42 + disagreement * 0.2),
        pattern: clamp01(0.3 + coverage * 0.4 + Math.min(lineSpread / 3, 1) * 0.2),
        risk: clamp01(0.82 - disagreement * 0.36 - Math.min(lineSpread / 6, 1) * 0.16 + coverage * 0.1),
    };
}
function getSignalTeams(event, selection) {
    if (selection === "home") {
        return [event.teams[0]];
    }
    if (selection === "away") {
        return [event.teams[1]];
    }
    return [...event.teams];
}
function buildEvent(rows) {
    const sample = rows[0];
    if (!sample) {
        return null;
    }
    const marketsByBook = new Map();
    for (const row of rows) {
        const marketType = normalizeMarketType(row.marketType);
        const selection = normalizeSelection(row.selection);
        if (!marketType || !selection) {
            continue;
        }
        const bookMarkets = marketsByBook.get(row.book.name) ?? new Map();
        const market = bookMarkets.get(marketType) ?? { market_type: marketType, outcomes: {} };
        market.outcomes[selection] = {
            price: row.price,
            line: row.line ?? undefined,
        };
        bookMarkets.set(marketType, market);
        marketsByBook.set(row.book.name, bookMarkets);
    }
    return {
        event_id: sample.gameId,
        sport: sample.game.league.code,
        league: sample.game.league.code,
        teams: [sample.game.homeTeam.name, sample.game.awayTeam.name],
        start_time: sample.game.startTime.toISOString(),
        books: [...marketsByBook.entries()].map(([book, markets]) => ({
            book,
            timestamp: Math.max(...rows.filter((row) => row.book.name === book).map((row) => row.createdAt.getTime())),
            markets: [...markets.values()],
        })),
    };
}
export async function getTodayEdges() {
    const rows = await prisma.oddsSnapshot.findMany({
        include: {
            book: true,
            game: {
                include: {
                    league: true,
                    homeTeam: true,
                    awayTeam: true,
                },
            },
        },
        orderBy: [{ createdAt: "desc" }, { bookId: "asc" }],
    });
    const latestRows = new Map();
    for (const row of rows) {
        const key = `${row.gameId}:${row.bookId}:${row.marketType}:${row.selection}`;
        if (!latestRows.has(key)) {
            latestRows.set(key, row);
        }
    }
    const rowsByGame = new Map();
    for (const row of latestRows.values()) {
        const gameRows = rowsByGame.get(row.gameId) ?? [];
        gameRows.push(row);
        rowsByGame.set(row.gameId, gameRows);
    }
    const edges = [];
    for (const [gameId, gameRows] of rowsByGame.entries()) {
        const sample = gameRows[0];
        const event = buildEvent(gameRows);
        if (!event || !sample) {
            continue;
        }
        const availableMarketTypes = new Set(gameRows
            .map((row) => normalizeMarketType(row.marketType))
            .filter((marketType) => Boolean(marketType)));
        for (const marketType of availableMarketTypes) {
            const baseComponents = deriveComponents(event, marketType);
            const provisionalResult = computeEdgeScore(event, marketType, baseComponents);
            const youtubeSignal = await collectYouTubeSignal(getSignalTeams(event, provisionalResult.selection), process.env.YOUTUBE_API_KEY ?? process.env.GOOGLE_API_KEY ?? "").catch(() => ({ clips: [], boost: 0, hasFreshNews: false }));
            const components = {
                ...baseComponents,
                momentum: clamp01(baseComponents.momentum + youtubeSignal.boost),
            };
            const result = computeEdgeScore(event, marketType, components, youtubeSignal.hasFreshNews ? "v1.1.0-youtube" : "v1.1.0");
            if (result.edge <= 0) {
                continue;
            }
            const bestSnapshot = gameRows.find((row) => row.book.name === result.best_book
                && normalizeMarketType(row.marketType) === marketType
                && normalizeSelection(row.selection) === result.selection);
            const bookLines = gameRows
                .filter((row) => normalizeMarketType(row.marketType) === marketType && normalizeSelection(row.selection) === result.selection)
                .sort((left, right) => right.price - left.price)
                .map((row) => ({
                book: row.book.name,
                line: formatBookLine(result.selection.toUpperCase(), row.line, row.price),
                price: row.price,
                updatedAt: row.createdAt.toISOString(),
            }));
            edges.push({
                gameId,
                sport: result.sport,
                game: `${event.teams[1]} at ${event.teams[0]}`,
                league: result.league,
                teams: [event.teams[0], event.teams[1]],
                homeTeamProfile: getTeamProfile(sample.game.homeTeam.name, sample.game.homeTeam.abbr),
                awayTeamProfile: getTeamProfile(sample.game.awayTeam.name, sample.game.awayTeam.abbr),
                startTime: result.start_time,
                venue: sample.game.venue,
                weather: getGameWeather(sample.game.league.code, sample.game.venue),
                marketType: result.market_type.toUpperCase(),
                selection: result.selection.toUpperCase(),
                bestLine: result.best_line,
                bestBook: result.best_book,
                bestPrice: bestSnapshot?.price ?? 0,
                consensusProbability: result.consensus_probability,
                impliedProbability: result.implied_probability,
                edge: result.edge,
                edgeScore: result.edge_score,
                components: result.components,
                engineVersion: result.engine_version,
                explanation: youtubeSignal.hasFreshNews
                    ? `${result.explanation} · YouTube: +${Math.round(youtubeSignal.boost * 100)} momentum from ${youtubeSignal.clips.length} vetted lineup or injury clip${youtubeSignal.clips.length === 1 ? "" : "s"}.`
                    : result.explanation,
                timestamp: result.timestamp,
                youtubeSignal: {
                    teams: getSignalTeams(event, result.selection),
                    boostApplied: youtubeSignal.hasFreshNews,
                    momentumDelta: youtubeSignal.boost,
                    clips: youtubeSignal.clips,
                },
                books: bookLines,
            });
        }
    }
    return edges.sort((left, right) => right.edgeScore - left.edgeScore || right.edge - left.edge);
}
