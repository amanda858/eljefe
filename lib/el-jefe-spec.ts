export const ElJefeSpec = {
    ingestion: {
        sportsbooks: ["DraftKings", "FanDuel", "BetMGM", "Caesars"],
        transport: "websocket",
        maxOddsDelayMs: 500,
        normalization: {
            schemaVersion: "v1",
            requiredFields: [
                "event_id",
                "sport",
                "league",
                "teams",
                "start_time",
                "book",
                "market_type",
                "outcomes",
                "timestamp",
            ],
        },
        failover: {
            requireMinBooksPerMarket: 3,
            markBookDegradedAfterMs: 3000,
        },
    },

    edgeEngine: {
        deterministic: true,
        versioning: true,
        maxComputeTimeMs: 50,
        components: ["market", "momentum", "pattern", "risk"],
        output: {
            edgeScoreRange: [0, 100],
            includeExplanation: true,
            includeInputsSnapshot: true,
        },
    },

    latency: {
        maxIngestionToEdgeMs: 300,
        monitorPercentile: 95,
    },

    movementTracking: {
        trackLineHistory: true,
        requiredSignals: [
            "steam",
            "reverse_line_movement",
            "stale_number",
            "book_disagreement",
        ],
        minHistoryDepthHours: 24,
    },

    history: {
        storeOddsHistory: true,
        storeEdgeHistory: true,
        storeEngineVersion: true,
        retentionDays: 365,
    },

    monitoring: {
        alerts: {
            feedDown: true,
            staleOdds: true,
            engineErrors: true,
            latencySpikes: true,
        },
        dashboards: [
            "feed_health",
            "odds_freshness",
            "edge_engine_errors",
            "latency_distribution",
        ],
    },

    testing: {
        unitTestsRequired: true,
        integrationTestsRequired: true,
        loadTestsRequired: true,
        regressionTestsOnEngineChange: true,
        minCoveragePercent: 80,
    },
} as const;

export type ElJefeSpec = typeof ElJefeSpec;