import {
    filterSeasonGameCards,
    operatorDateAnchor,
    operatorSeasonEnd,
    type CrowdSignal,
    type SeasonFieldProvenance,
    type SeasonGameCard,
    type SeasonGameProvenance,
} from "@/lib/site-data";
import { getRealSchedule, getRealMarkets, isOddsApiConfigured } from "@/lib/odds-api";

export type SeasonFeedSource = {
    mode: "seeded" | "live";
    status: "seeded" | "live" | "stale" | "fallback";
    label: string;
    lastUpdated: string;
    endpoint: string | null;
    reason: string | null;
    gameCount: number;
    networkCoverage: number;
    crowdCoverage: number;
};

export type SeasonFeedSnapshot = {
    games: SeasonGameCard[];
    source: SeasonFeedSource;
};

type VerifiedFieldOptions = {
    allowDerived?: boolean;
};

type SeasonFeedOverlay = {
    id: string;
    watchNetwork?: string;
    watchWindow?: string;
    crowdTemperature?: string;
    rationale?: string;
    tags?: string[];
    crowdSignals?: CrowdSignal[];
};

function getSeasonFeedStaleMinutes() {
    const value = Number(process.env.SEASON_FEED_STALE_MINUTES ?? "180");
    return Number.isFinite(value) && value > 0 ? value : 180;
}

function isStaleTimestamp(lastUpdated: string) {
    const timestamp = Date.parse(lastUpdated);

    if (Number.isNaN(timestamp)) {
        return false;
    }

    return Date.now() - timestamp > getSeasonFeedStaleMinutes() * 60 * 1000;
}

function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

function getStringValue(record: Record<string, unknown>, keys: string[]) {
    for (const key of keys) {
        const value = record[key];

        if (typeof value === "string" && value.trim()) {
            return value.trim();
        }
    }

    return "";
}

function getStringArrayValue(record: Record<string, unknown>, keys: string[]) {
    for (const key of keys) {
        const value = record[key];

        if (Array.isArray(value)) {
            const strings = value.filter((item): item is string => typeof item === "string" && item.trim().length > 0).map((item) => item.trim());

            if (strings.length) {
                return strings;
            }
        }
    }

    return [] as string[];
}

function formatWatchWindow(commenceAt: string) {
    const date = new Date(commenceAt);

    if (Number.isNaN(date.getTime())) {
        return "Schedule pending";
    }

    const monthDay = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        timeZone: "UTC",
    });
    const time = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "America/New_York",
    });

    return `${monthDay} · ${time} ET`;
}

export function isVerifiedSeasonSource(source: SeasonFeedSource) {
    return source.mode === "live" && source.status !== "fallback";
}

export function isVerifiedSeasonField(provenance: SeasonFieldProvenance | undefined, options?: VerifiedFieldOptions) {
    if (provenance === "feed" || provenance === "overlay") {
        return true;
    }

    return Boolean(options?.allowDerived && provenance === "derived");
}

function countCoverage(games: SeasonGameCard[]) {
    return {
        networkCoverage: games.filter((game) => isVerifiedSeasonField(game.provenance?.watchNetwork)).length,
        crowdCoverage: games.filter(
            (game) => isVerifiedSeasonField(game.provenance?.crowdSignals) || isVerifiedSeasonField(game.provenance?.crowdTemperature),
        ).length,
    };
}

function createProvenance(overrides?: Partial<SeasonGameProvenance>): SeasonGameProvenance {
    return {
        watchNetwork: "missing",
        watchWindow: "missing",
        crowdTemperature: "missing",
        rationale: "missing",
        crowdSignals: "missing",
        ...overrides,
    };
}

function normalizeSeasonOverlay(value: unknown): SeasonFeedOverlay | null {
    if (!isObject(value)) {
        return null;
    }

    const record = value as Record<string, unknown>;
    const id = getStringValue(record, ["id", "gameId", "eventId"]);

    if (!id) {
        return null;
    }

    const watchNetwork = getStringValue(record, ["watchNetwork", "network", "broadcastNetwork", "channel"]);
    const watchWindow = getStringValue(record, ["watchWindow", "broadcastWindow", "startLabel"]);
    const crowdTemperature = getStringValue(record, ["crowdTemperature", "crowdSentiment", "sentiment", "crowd"]);
    const rationale = getStringValue(record, ["rationale", "reasoning", "context", "summary"]);
    const tags = getStringArrayValue(record, ["tags", "labels"]);
    const crowdSignals = Array.isArray(record.crowdSignals)
        ? record.crowdSignals.filter((signal): signal is CrowdSignal => isCrowdSignal(signal))
        : Array.isArray(record.signals)
            ? record.signals.filter((signal): signal is CrowdSignal => isCrowdSignal(signal))
            : [];

    return {
        id,
        watchNetwork: watchNetwork || undefined,
        watchWindow: watchWindow || undefined,
        crowdTemperature: crowdTemperature || undefined,
        rationale: rationale || undefined,
        tags: tags.length ? tags : undefined,
        crowdSignals: crowdSignals.length ? crowdSignals : undefined,
    };
}

function normalizeSeasonOverlayPayload(payload: unknown): SeasonFeedOverlay[] {
    const records = Array.isArray(payload)
        ? payload
        : isObject(payload) && Array.isArray(payload.overlays)
            ? payload.overlays
            : [];

    return records.map((record) => normalizeSeasonOverlay(record)).filter((record): record is SeasonFeedOverlay => Boolean(record));
}

async function getSeasonOverlayMap() {
    const endpoint = process.env.SEASON_CONTEXT_FEED_URL?.trim() ?? "";

    if (!endpoint) {
        return new Map<string, SeasonFeedOverlay>();
    }

    try {
        const response = await fetch(endpoint, {
            headers: process.env.SEASON_FEED_TOKEN ? { Authorization: `Bearer ${process.env.SEASON_FEED_TOKEN}` } : undefined,
            next: { revalidate: 300 },
        });

        if (!response.ok) {
            return new Map<string, SeasonFeedOverlay>();
        }

        const payload = (await response.json()) as unknown;
        return new Map(normalizeSeasonOverlayPayload(payload).map((overlay) => [overlay.id, overlay]));
    } catch {
        return new Map<string, SeasonFeedOverlay>();
    }
}

function applySeasonOverlays(games: SeasonGameCard[], overlays: Map<string, SeasonFeedOverlay>) {
    if (!overlays.size) {
        return games;
    }

    return games.map((game) => {
        const overlay = overlays.get(game.id);

        if (!overlay) {
            return game;
        }

        return {
            ...game,
            watchNetwork: overlay.watchNetwork ?? game.watchNetwork,
            watchWindow: overlay.watchWindow ?? game.watchWindow,
            crowdTemperature: overlay.crowdTemperature ?? game.crowdTemperature,
            rationale: overlay.rationale ?? game.rationale,
            tags: overlay.tags ?? game.tags,
            crowdSignals: overlay.crowdSignals ?? game.crowdSignals,
            provenance: createProvenance({
                watchNetwork: overlay.watchNetwork ? "overlay" : game.provenance?.watchNetwork ?? "missing",
                watchWindow: overlay.watchWindow ? "overlay" : game.provenance?.watchWindow ?? "missing",
                crowdTemperature: overlay.crowdTemperature ? "overlay" : game.provenance?.crowdTemperature ?? "missing",
                rationale: overlay.rationale ? "overlay" : game.provenance?.rationale ?? "missing",
                crowdSignals: overlay.crowdSignals ? "overlay" : game.provenance?.crowdSignals ?? "missing",
            }),
        };
    });
}

function getFieldProvenance(value: string, fallback: string, sourceWhenPresent: Exclude<SeasonFieldProvenance, "missing">) {
    return value ? sourceWhenPresent : fallback ? "derived" : "missing";
}

function isCrowdSignal(value: unknown): value is CrowdSignal {
    return (
        isObject(value) &&
        typeof value.source === "string" &&
        typeof value.signal === "string" &&
        typeof value.impact === "string"
    );
}

function normalizeSeasonGameCard(value: unknown): SeasonGameCard | null {
    if (!isObject(value)) {
        return null;
    }

    const record = value as Record<string, unknown>;
    const tags = getStringArrayValue(record, ["tags", "labels"]);
    const crowdSignals = Array.isArray(record.crowdSignals)
        ? record.crowdSignals.filter((signal): signal is CrowdSignal => isCrowdSignal(signal))
        : Array.isArray(record.signals)
            ? record.signals.filter((signal): signal is CrowdSignal => isCrowdSignal(signal))
            : null;

    const id = getStringValue(record, ["id", "gameId", "eventId"]);
    const sport = getStringValue(record, ["sport", "sportKey", "sportTitle"]);
    const league = getStringValue(record, ["league", "competition", "tournament", "leagueName"]);
    const event = getStringValue(record, ["event", "title", "name", "matchup"]);
    const commenceAt = getStringValue(record, ["commenceAt", "commence_at", "startTime", "start_time", "scheduledAt"]);
    const venue = getStringValue(record, ["venue", "location", "stadium", "arena"]);
    const watchNetwork = getStringValue(record, ["watchNetwork", "network", "broadcastNetwork", "channel"]);
    const watchWindow = getStringValue(record, ["watchWindow", "broadcastWindow", "startLabel"]);
    const market = getStringValue(record, ["market", "marketName", "marketType"]);
    const recommendation = getStringValue(record, ["recommendation", "pick", "recommendedBet", "selection"]);
    const bestPrice = getStringValue(record, ["bestPrice", "price", "odds"]);
    const bestBook = getStringValue(record, ["bestBook", "book", "sportsbook", "operator"]);
    const edge = getStringValue(record, ["edge", "edgePct", "expectedValue"]);
    const confidence = getStringValue(record, ["confidence", "confidenceScore", "modelConfidence"]);
    const crowdTemperature = getStringValue(record, ["crowdTemperature", "crowdSentiment", "sentiment", "crowd"]);
    const rationale = getStringValue(record, ["rationale", "reasoning", "context", "summary"]);

    if (
        !id ||
        !sport ||
        !league ||
        !event ||
        !commenceAt ||
        !venue ||
        !market ||
        !recommendation ||
        !bestPrice ||
        !bestBook ||
        !edge ||
        !confidence ||
        !crowdSignals
    ) {
        return null;
    }

    return {
        id,
        sport,
        league,
        event,
        commenceAt,
        venue,
        watchNetwork: watchNetwork || "Unavailable",
        watchWindow: watchWindow || formatWatchWindow(commenceAt),
        market,
        recommendation,
        bestPrice,
        bestBook,
        edge,
        confidence,
        crowdTemperature: crowdTemperature || "Unavailable",
        rationale: rationale || "No verified rationale provided by the upstream feed.",
        tags,
        crowdSignals: crowdSignals ?? [],
        provenance: createProvenance({
            watchNetwork: watchNetwork ? "feed" : "missing",
            watchWindow: getFieldProvenance(watchWindow, formatWatchWindow(commenceAt), "feed"),
            crowdTemperature: crowdTemperature ? "feed" : "missing",
            rationale: rationale ? "feed" : "missing",
            crowdSignals: crowdSignals.length ? "feed" : "missing",
        }),
    };
}

function normalizeSeasonFeedPayload(payload: unknown): SeasonGameCard[] {
    const records = Array.isArray(payload)
        ? payload
        : isObject(payload) && Array.isArray(payload.games)
            ? payload.games
            : [];

    return records
        .map((record) => normalizeSeasonGameCard(record))
        .filter((record): record is SeasonGameCard => Boolean(record))
        .filter((game) => game.commenceAt >= operatorDateAnchor && game.commenceAt <= operatorSeasonEnd)
        .sort((left, right) => left.commenceAt.localeCompare(right.commenceAt));
}

function getUnavailableSnapshot(endpoint: string | null, reason: string): SeasonFeedSnapshot {
    return {
        games: [],
        source: {
            mode: "seeded",
            status: endpoint ? "fallback" : "seeded",
            label: endpoint ? "Verified schedule unavailable" : "Schedule feed not configured",
            lastUpdated: new Date().toISOString(),
            endpoint,
            reason,
            gameCount: 0,
            networkCoverage: 0,
            crowdCoverage: 0,
        },
    };
}

async function getScheduleFromOddsApi(): Promise<SeasonFeedSnapshot | null> {
    if (!isOddsApiConfigured()) return null;

    try {
        const [schedule, markets] = await Promise.all([getRealSchedule(), getRealMarkets()]);
        if (schedule.length === 0) return null;

        // Build a lookup of market data by event ID prefix
        const marketByEvent = new Map<string, typeof markets[number]>();
        for (const m of markets) {
            // Market IDs start with the event ID
            const eventId = m.id.split("-").slice(0, -2).join("-");
            const existing = marketByEvent.get(eventId);
            if (!existing || parseFloat(m.edge) > parseFloat(existing.edge)) {
                marketByEvent.set(eventId, m);
            }
        }

        const games: SeasonGameCard[] = schedule.map((item) => {
            const topMarket = marketByEvent.get(item.id);
            return {
                id: item.id,
                sport: item.sport,
                league: item.league,
                event: item.event,
                commenceAt: item.commenceAt,
                venue: "—",
                watchNetwork: "—",
                watchWindow: formatWatchWindow(item.commenceAt),
                market: topMarket?.market ?? "Moneyline",
                recommendation: topMarket?.bestLine ?? "Review",
                bestPrice: topMarket ? topMarket.bestLine.split("(").pop()?.replace(")", "") ?? "—" : "—",
                bestBook: topMarket?.books[0] ?? "—",
                edge: topMarket?.edge ?? "—",
                confidence: topMarket?.confidence ?? "—",
                crowdTemperature: "—",
                rationale: topMarket
                    ? `Best edge found: ${topMarket.edge} on ${topMarket.market} via ${topMarket.books[0] ?? "available books"}.`
                    : "No edge data from odds feed.",
                tags: topMarket ? [topMarket.trigger] : [],
                crowdSignals: [],
                provenance: createProvenance({
                    watchNetwork: "missing",
                    watchWindow: "derived",
                    crowdTemperature: "missing",
                    rationale: topMarket ? "feed" : "missing",
                    crowdSignals: "missing",
                }),
            };
        });

        const coverage = countCoverage(games);

        return {
            games,
            source: {
                mode: "live",
                status: "live",
                label: "Schedule from The Odds API",
                lastUpdated: new Date().toISOString(),
                endpoint: "the-odds-api.com",
                reason: null,
                gameCount: games.length,
                networkCoverage: coverage.networkCoverage,
                crowdCoverage: coverage.crowdCoverage,
            },
        };
    } catch (err) {
        console.error("[season-feed] failed to build schedule from odds API:", err);
        return null;
    }
}

export async function getSeasonFeedSnapshot(): Promise<SeasonFeedSnapshot> {
    const endpoint = process.env.SEASON_FEED_URL?.trim() ?? "";

    if (!endpoint) {
        // Try building schedule from The Odds API if configured
        const oddsSchedule = await getScheduleFromOddsApi();
        if (oddsSchedule) return oddsSchedule;

        return getUnavailableSnapshot(null, "Configure ODDS_API_KEY or SEASON_FEED_URL to load schedule data.");
    }

    try {
        const response = await fetch(endpoint, {
            headers: process.env.SEASON_FEED_TOKEN ? { Authorization: `Bearer ${process.env.SEASON_FEED_TOKEN}` } : undefined,
            next: { revalidate: 300 },
        });

        if (!response.ok) {
            return getUnavailableSnapshot(endpoint, `Remote feed responded with HTTP ${response.status}.`);
        }

        const payload = (await response.json()) as unknown;
        const overlays = await getSeasonOverlayMap();
        const games = applySeasonOverlays(normalizeSeasonFeedPayload(payload), overlays);

        if (!games.length) {
            return getUnavailableSnapshot(endpoint, "Remote feed returned no valid season games in the active window.");
        }

        const payloadSource = isObject(payload) && isObject(payload.source) ? payload.source : null;
        const lastUpdated = payloadSource && typeof payloadSource.lastUpdated === "string" ? payloadSource.lastUpdated : new Date().toISOString();
        const label = payloadSource && typeof payloadSource.label === "string" ? payloadSource.label : "Live schedule feed";
        const status = isStaleTimestamp(lastUpdated) ? "stale" : "live";
        const reason = status === "stale" ? `Remote feed is older than ${getSeasonFeedStaleMinutes()} minutes.` : null;

        const coverage = countCoverage(games);

        return {
            games,
            source: {
                mode: "live",
                status,
                label,
                lastUpdated,
                endpoint,
                reason,
                gameCount: games.length,
                networkCoverage: coverage.networkCoverage,
                crowdCoverage: coverage.crowdCoverage,
            },
        };
    } catch {
        return getUnavailableSnapshot(endpoint, "Remote feed request failed, so no verified schedule is available.");
    }
}

export async function getSeasonFeedForSport(sport?: string): Promise<SeasonFeedSnapshot> {
    const snapshot = await getSeasonFeedSnapshot();

    return {
        games: filterSeasonGameCards(snapshot.games, { sport }),
        source: snapshot.source,
    };
}