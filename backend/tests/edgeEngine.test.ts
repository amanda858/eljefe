import test from "node:test";
import assert from "node:assert/strict";
import { computeEdgeScore, validateEvent, type EdgeComponents, type Event } from "../src/lib/edgeEngine.js";

function createEvent(): Event {
    return {
        event_id: "NBA123",
        sport: "NBA",
        league: "NBA",
        teams: ["Lakers", "Suns"],
        start_time: "2026-04-04T19:00:00Z",
        books: [
            {
                book: "DraftKings",
                timestamp: 1_710_000_000_000,
                markets: [
                    {
                        market_type: "spread",
                        outcomes: {
                            home: { price: -110, line: -3.5 },
                            away: { price: -110, line: 3.5 },
                        },
                    },
                ],
            },
            {
                book: "FanDuel",
                timestamp: 1_710_000_000_100,
                markets: [
                    {
                        market_type: "spread",
                        outcomes: {
                            home: { price: -108, line: -4 },
                            away: { price: -112, line: 4 },
                        },
                    },
                ],
            },
        ],
    };
}

const components: EdgeComponents = {
    market: 0.8,
    momentum: 0.7,
    pattern: 0.75,
    risk: 0.4,
};

test("validateEvent rejects malformed events", () => {
    assert.throws(
        () => validateEvent({
            event_id: "",
            sport: "NBA",
            league: "NBA",
            teams: ["Lakers", "Suns"],
            start_time: "2026-04-04T19:00:00Z",
            books: [],
        }),
        /missing id\/sport\/league|no book odds attached/,
    );
});

test("computeEdgeScore is deterministic apart from timestamp", () => {
    const event = createEvent();
    const first = computeEdgeScore(event, "spread", components, "v1.0.0");
    const second = computeEdgeScore(event, "spread", components, "v1.0.0");

    assert.equal(first.event_id, second.event_id);
    assert.equal(first.market_type, second.market_type);
    assert.equal(first.best_book, second.best_book);
    assert.equal(first.best_line, second.best_line);
    assert.equal(first.edge_score, second.edge_score);
    assert.equal(first.explanation, second.explanation);
    assert.deepEqual(first.components, second.components);
    assert.equal(first.consensus_probability, second.consensus_probability);
    assert.equal(first.implied_probability, second.implied_probability);
    assert.equal(first.edge, second.edge);
});

test("computeEdgeScore chooses the stronger spread line across books", () => {
    const event = createEvent();
    const result = computeEdgeScore(event, "spread", components, "v1.0.0");

    assert.equal(result.best_book, "DraftKings");
    assert.match(result.best_line, /Lakers -3.5 \(-110\)/);
    assert.equal(result.selection, "home");
    assert.ok(result.edge_score >= 0 && result.edge_score <= 100);
});

test("computeEdgeScore returns a readable explanation with all components", () => {
    const event = createEvent();
    const result = computeEdgeScore(event, "spread", components, "v1.0.0");

    assert.match(result.explanation, /Market:/);
    assert.match(result.explanation, /Momentum:/);
    assert.match(result.explanation, /Pattern:/);
    assert.match(result.explanation, /Risk:/);
});