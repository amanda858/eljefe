function clamp01(value) {
    return Math.max(0, Math.min(1, value));
}
function americanToImpliedProbability(odds) {
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
};
function weightedBlend(components) {
    const market = clamp01(components.market);
    const momentum = clamp01(components.momentum);
    const pattern = clamp01(components.pattern);
    const risk = clamp01(components.risk);
    return (EDGE_WEIGHTS.market * market +
        EDGE_WEIGHTS.momentum * momentum +
        EDGE_WEIGHTS.pattern * pattern +
        EDGE_WEIGHTS.risk * risk);
}
function formatAmerican(price) {
    return price > 0 ? `+${price}` : `${price}`;
}
function selectionLabel(event, selection) {
    if (selection === "home") {
        return event.teams[0];
    }
    if (selection === "away") {
        return event.teams[1];
    }
    return selection === "over" ? "Over" : "Under";
}
function lineValueScore(selection, line) {
    if (line === undefined) {
        return 0;
    }
    if (selection === "over") {
        return -line;
    }
    return line;
}
export function validateEvent(event) {
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
export function computeEdgeScore(event, marketType, components, engineVersion = "v1.0.0") {
    validateEvent(event);
    const allMarkets = [];
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
    const selectionKeys = marketType === "total"
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
            .filter((offer) => Boolean(offer));
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
