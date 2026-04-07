export type MarketType = "moneyline" | "spread" | "total";

export interface OutcomePrice {
    price: number;
    line?: number;
}

export interface Market {
    market_type: MarketType;
    outcomes: {
        home?: OutcomePrice;
        away?: OutcomePrice;
        over?: OutcomePrice;
        under?: OutcomePrice;
    };
}

export interface BookOdds {
    book: string;
    markets: Market[];
    timestamp: number;
}

export interface Event {
    event_id: string;
    sport: string;
    league: string;
    teams: [string, string];
    start_time: string;
    books: BookOdds[];
}

export interface EdgeComponents {
    market: number;
    momentum: number;
    pattern: number;
    risk: number;
}

export interface EdgeResult {
    event_id: string;
    sport: string;
    league: string;
    teams: [string, string];
    start_time: string;
    market_type: MarketType;
    selection: "home" | "away" | "over" | "under";
    best_line: string;
    best_book: string;
    edge_score: number;
    components: EdgeComponents;
    engine_version: string;
    explanation: string;
    timestamp: number;
    consensus_probability: number;
    implied_probability: number;
    edge: number;
}

function clamp01(value: number) {
    return Math.max(0, Math.min(1, value));
}

function americanToImpliedProbability(odds: number) {
    if (odds > 0) {
        return 100 / (odds + 100);
    }

    return Math.abs(odds) / (Math.abs(odds) + 100);
}

const EDGE_WEIGHTS = {
    market: 0.35,
    momentum: 0.25,
    pattern: 0.25,
    risk: 0.15,
} as const;

function weightedBlend(components: EdgeComponents) {
    const market = clamp01(components.market);
    const momentum = clamp01(components.momentum);
    const pattern = clamp01(components.pattern);
    const risk = clamp01(components.risk);

    return (
        EDGE_WEIGHTS.market * market +
        EDGE_WEIGHTS.momentum * momentum +
        EDGE_WEIGHTS.pattern * pattern +
        EDGE_WEIGHTS.risk * risk
    );
}

function formatAmerican(price: number) {
    return price > 0 ? `+${price}` : `${price}`;
}

function selectionLabel(event: Event, selection: "home" | "away" | "over" | "under") {
    if (selection === "home") {
        return event.teams[0];
    }

    if (selection === "away") {
        return event.teams[1];
    }

    return selection === "over" ? "Over" : "Under";
}

function lineValueScore(selection: "home" | "away" | "over" | "under", line: number | undefined) {
    if (line === undefined) {
        return 0;
    }

    if (selection === "over") {
        return -line;
    }

    return line;
}

export function validateEvent(event: Event): void {
    if (!event.event_id || !event.sport || !event.league) {
        throw new Error("Invalid event: missing id/sport/league");
    }

    if (!event.teams || event.teams.length !== 2) {
        throw new Error("Invalid event: teams must be [home, away]");
    }

    if (!event.books || event.books.length === 0) {
        throw new Error("Invalid event: no book odds attached");
    }

    for (const book of event.books) {
        if (!book.book || !book.markets || book.markets.length === 0) {
            throw new Error(`Invalid book entry for event ${event.event_id}`);
        }
    }
}

export function computeEdgeScore(
    event: Event,
    marketType: MarketType,
    components: EdgeComponents,
    engineVersion = "v1.0.0",
): EdgeResult {
    validateEvent(event);

    const allMarkets: { book: string; timestamp: number; market: Market }[] = [];

    for (const book of event.books) {
        for (const market of book.markets) {
            if (market.market_type === marketType) {
                allMarkets.push({ book: book.book, timestamp: book.timestamp, market });
            }
        }
    }

    if (allMarkets.length === 0) {
        throw new Error(`No markets of type ${marketType} for event ${event.event_id}`);
    }

    const selectionKeys: Array<"home" | "away" | "over" | "under"> = marketType === "total"
        ? ["over", "under"]
        : ["home", "away"];

    const candidates = selectionKeys.flatMap((selection) => {
        const offers = allMarkets
            .map(({ book, market }) => {
                const outcome = market.outcomes[selection];

                if (!outcome) {
                    return null;
                }

                return {
                    book,
                    price: outcome.price,
                    line: outcome.line,
                    impliedProbability: americanToImpliedProbability(outcome.price),
                };
            })
            .filter((offer): offer is NonNullable<typeof offer> => Boolean(offer));

        if (!offers.length) {
            return [];
        }

        const consensusProbability = offers.reduce((sum, offer) => sum + offer.impliedProbability, 0) / offers.length;
        const bestOffer = [...offers].sort((left, right) => {
            const lineDelta = lineValueScore(selection, right.line) - lineValueScore(selection, left.line);
            if (lineDelta !== 0) {
                return lineDelta;
            }

            return right.price - left.price;
        })[0];
        const edge = Math.max(consensusProbability - bestOffer.impliedProbability, 0);

        return [{
            selection,
            bestOffer,
            consensusProbability,
            edge,
        }];
    });

    const chosen = [...candidates].sort((left, right) => right.edge - left.edge)[0];

    if (!chosen) {
        throw new Error(`No usable outcome for event ${event.event_id}`);
    }

    const label = selectionLabel(event, chosen.selection);
    const lineStr = chosen.bestOffer.line !== undefined
        ? `${label} ${chosen.bestOffer.line} (${formatAmerican(chosen.bestOffer.price)})`
        : `${label} ${formatAmerican(chosen.bestOffer.price)}`;
    const blend = weightedBlend(components);
    const edgeScore = Math.round(blend * 100);
    const explanation = [
        `Market: ${Math.round(clamp01(components.market) * 100)}%`,
        `Momentum: ${Math.round(clamp01(components.momentum) * 100)}%`,
        `Pattern: ${Math.round(clamp01(components.pattern) * 100)}%`,
        `Risk: ${Math.round(clamp01(components.risk) * 100)}%`,
    ].join(" · ");

    return {
        event_id: event.event_id,
        sport: event.sport,
        league: event.league,
        teams: event.teams,
        start_time: event.start_time,
        market_type: marketType,
        selection: chosen.selection,
        best_line: lineStr,
        best_book: chosen.bestOffer.book,
        edge_score: edgeScore,
        components,
        engine_version: engineVersion,
        explanation,
        timestamp: Date.now(),
        consensus_probability: chosen.consensusProbability,
        implied_probability: chosen.bestOffer.impliedProbability,
        edge: chosen.edge,
    };
}