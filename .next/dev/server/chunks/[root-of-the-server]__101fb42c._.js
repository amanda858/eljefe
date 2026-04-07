module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/site-data.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "benchmarkCategories",
    ()=>benchmarkCategories,
    "calibrationTracker",
    ()=>calibrationTracker,
    "commandMetrics",
    ()=>commandMetrics,
    "competitionLandscape",
    ()=>competitionLandscape,
    "dashboardAlerts",
    ()=>dashboardAlerts,
    "dashboardBooks",
    ()=>dashboardBooks,
    "dashboardFeeds",
    ()=>dashboardFeeds,
    "dashboardLineScreen",
    ()=>dashboardLineScreen,
    "dashboardNews",
    ()=>dashboardNews,
    "enthusiastPillars",
    ()=>enthusiastPillars,
    "eventSnapshots",
    ()=>eventSnapshots,
    "filterSeasonGameCards",
    ()=>filterSeasonGameCards,
    "getEventSnapshot",
    ()=>getEventSnapshot,
    "getEventSnapshots",
    ()=>getEventSnapshots,
    "getFilteredMarkets",
    ()=>getFilteredMarkets,
    "getMarketDetail",
    ()=>getMarketDetail,
    "getSeasonGameCards",
    ()=>getSeasonGameCards,
    "getSeasonGameFilterOptions",
    ()=>getSeasonGameFilterOptions,
    "getSeasonMarketFamily",
    ()=>getSeasonMarketFamily,
    "getSportHub",
    ()=>getSportHub,
    "getSportIntel",
    ()=>getSportIntel,
    "heroRibbon",
    ()=>heroRibbon,
    "intelligenceInputs",
    ()=>intelligenceInputs,
    "isSeasonMarketFamily",
    ()=>isSeasonMarketFamily,
    "isSeasonWindow",
    ()=>isSeasonWindow,
    "learningLoop",
    ()=>learningLoop,
    "marketDetails",
    ()=>marketDetails,
    "marketDirectory",
    ()=>marketDirectory,
    "marketPulse",
    ()=>marketPulse,
    "marketTiles",
    ()=>marketTiles,
    "modelLab",
    ()=>modelLab,
    "modelResultsLedger",
    ()=>modelResultsLedger,
    "modelVersionHistory",
    ()=>modelVersionHistory,
    "newsroomFeed",
    ()=>newsroomFeed,
    "operatingSystem",
    ()=>operatingSystem,
    "operatorDateAnchor",
    ()=>operatorDateAnchor,
    "operatorSeasonEnd",
    ()=>operatorSeasonEnd,
    "plans",
    ()=>plans,
    "platformPillars",
    ()=>platformPillars,
    "seasonGameCalendar",
    ()=>seasonGameCalendar,
    "seasonMarketFamilyLabels",
    ()=>seasonMarketFamilyLabels,
    "selfLearningMetrics",
    ()=>selfLearningMetrics,
    "sportHubContent",
    ()=>sportHubContent,
    "sportIntelFeed",
    ()=>sportIntelFeed,
    "sportsUniverse",
    ()=>sportsUniverse,
    "sportsbookMatrix",
    ()=>sportsbookMatrix,
    "subscriptionBenefits",
    ()=>subscriptionBenefits,
    "summaries",
    ()=>summaries,
    "valueEngineAccuracySummary",
    ()=>valueEngineAccuracySummary,
    "valueEngineFallback",
    ()=>valueEngineFallback,
    "valueEnginePerformanceSummary",
    ()=>valueEnginePerformanceSummary
]);
const heroRibbon = [
    "42 books monitored",
    "186ms median alert latency",
    "318 positive EV alerts last 24h",
    "27 markets repriced before consensus close",
    "12 sports in active rotation"
];
const commandMetrics = [
    {
        label: "Books and exchanges",
        value: "42",
        detail: "Top-tier books, exchanges, and benchmark feeds"
    },
    {
        label: "Median signal speed",
        value: "186ms",
        detail: "Measured from ingest to ranked alert"
    },
    {
        label: "Markets repriced",
        value: "1,904",
        detail: "Watched across live, props, and derivatives"
    },
    {
        label: "Sharp triggers",
        value: "91",
        detail: "Operator-grade signals scored against tracked market movement"
    }
];
const marketPulse = [
    {
        sport: "NBA",
        market: "Celtics -4.5",
        edge: "+6.8% EV",
        book: "Pinnacle",
        move: "Steam hit 18s ago",
        confidence: "92 score"
    },
    {
        sport: "UCL",
        market: "Over 2.5",
        edge: "+5.1% EV",
        book: "Bet365",
        move: "Search spike before drift",
        confidence: "84 score"
    },
    {
        sport: "UFC",
        market: "Method of victory",
        edge: "+7.4% EV",
        book: "DraftKings",
        move: "Model disagreement flagged",
        confidence: "88 score"
    },
    {
        sport: "MLB",
        market: "First 5 ML",
        edge: "+4.6% EV",
        book: "Circa",
        move: "Sharp split confirmed",
        confidence: "79 score"
    }
];
const marketTiles = [
    {
        label: "Market radar",
        title: "Board scans every major price tier",
        body: "Openers, live lines, props, derivative markets, and exchange pressure all land in one screen scored by edge, confidence, and urgency."
    },
    {
        label: "Consensus pressure",
        title: "Crowd momentum gets measured against actual price response",
        body: "Public sentiment, pick-site consensus, and creator narratives are only useful if the market reacts. El Jefe grades that reaction against tracked market movement."
    },
    {
        label: "Execution timing",
        title: "The shortest window matters most",
        body: "Time-to-intercept tells users whether they are early, on time, or already too late. That is the difference between noise and edge."
    }
];
const platformPillars = [
    {
        title: "Market Sweep",
        body: "Aggregate books, exchanges, and live lines into one feed built for fast reads and faster decisions."
    },
    {
        title: "Edge Engine",
        body: "Separate price from probability with fair-odds modeling, vig removal, and signal-weighted confidence."
    },
    {
        title: "Signal Desk",
        body: "Fuse public sentiment, creator narratives, injury data, and expert takes into one ranked action layer."
    },
    {
        title: "Operator View",
        body: "Turn a bettor-facing product into a subscription machine with premium tiers, alerts, and B2B feeds."
    }
];
const sportsbookMatrix = [
    {
        name: "Pinnacle",
        bestFor: "Price discovery",
        sharpness: "Elite",
        latency: "Fast",
        take: "Benchmark line quality for global market truth."
    },
    {
        name: "Circa",
        bestFor: "Market-making confidence",
        sharpness: "Elite",
        latency: "Fast",
        take: "Useful for validating whether a number is truly respected."
    },
    {
        name: "DraftKings",
        bestFor: "Broad U.S. menu",
        sharpness: "Strong",
        latency: "Fast live",
        take: "Large market surface and public volume make it essential for comparison."
    },
    {
        name: "FanDuel",
        bestFor: "Live betting velocity",
        sharpness: "Strong",
        latency: "Very fast",
        take: "Critical for in-play movement and consumer-facing market reaction."
    },
    {
        name: "Bet365",
        bestFor: "Global event coverage",
        sharpness: "Strong",
        latency: "Fast",
        take: "Important for global soccer, tennis, and broad cross-sport pricing depth."
    }
];
const newsroomFeed = [
    {
        tag: "Injury desk",
        title: "Boston bench downgrade hit assists, threes, and live spread prices at the same time.",
        summary: "The useful alert is the cluster: one lineup change is moving several related NBA markets, not just the main prop.",
        time: "Sample note"
    },
    {
        tag: "MLB watch",
        title: "Dodgers first-five price stayed soft after Atlanta posted a weaker lower order.",
        summary: "The full-game side moved first. The first-five number is still the cleaner entry because lineup news has not fully reached that market.",
        time: "Sample note"
    },
    {
        tag: "Exchange tape",
        title: "Real Madrid versus Bayern total started moving on exchanges before U.S. books reacted.",
        summary: "That gap is actionable because it points to the over before the retail price closes.",
        time: "Sample note"
    }
];
const plans = [
    {
        name: "Scout",
        price: "$49",
        detail: "Delayed alerts, trend boards, and a controlled surface for disciplined monitoring.",
        featured: false,
        features: [
            "15-minute delayed feed",
            "Top market movers by sport",
            "Five tracked sports",
            "Email access to product updates"
        ]
    },
    {
        name: "Patron",
        price: "$149",
        detail: "Real-time decision support for users who need speed, cleaner pricing, and custom triggers.",
        featured: true,
        features: [
            "Real-time positive EV alerts",
            "Custom watchlists and thresholds",
            "Bankroll and stake workflow",
            "Full dashboard access"
        ]
    },
    {
        name: "Jefe",
        price: "$399",
        detail: "A premium command layer for syndicates, teams, and data-heavy subscribers.",
        featured: false,
        features: [
            "API and webhook delivery",
            "Exchange depth and synthetic hold",
            "Multi-seat account roadmap",
            "Priority onboarding"
        ]
    }
];
const operatingSystem = [
    {
        label: "Data",
        title: "Cross-book surveillance",
        body: "Pull prices from books and exchanges into one normalized screen with enough speed to matter live."
    },
    {
        label: "Model",
        title: "Fair-price engine",
        body: "Convert raw prices into implied probabilities, remove hold, and score where the market is overpaying."
    },
    {
        label: "Action",
        title: "Alert routing",
        body: "Deliver only the right opportunities with sport filters, edge thresholds, and bettor-specific watchlists."
    }
];
const subscriptionBenefits = [
    {
        label: "Execution",
        title: "Speed over noise",
        body: "Subscribers pay to compress the time between market movement and action, not to read generic content."
    },
    {
        label: "Discipline",
        title: "Structured decision-making",
        body: "Clear EV, confidence, and market context help users stay systematic instead of chasing random edges."
    },
    {
        label: "Expansion",
        title: "Upgradeable workflows",
        body: "The same tiering can extend into seats, API usage, and operator tooling without changing the brand promise."
    }
];
const summaries = [
    {
        label: "Tracked books",
        value: "42",
        detail: "+6 added this quarter"
    },
    {
        label: "Positive EV alerts",
        value: "318",
        detail: "Last 24 hours"
    },
    {
        label: "Avg. model edge",
        value: "5.4%",
        detail: "Filtered by confidence"
    },
    {
        label: "Latency",
        value: "186ms",
        detail: "Median ingest to alert"
    }
];
const dashboardFeeds = [
    {
        event: "Celtics vs Knicks",
        market: "Live spread",
        price: "-4.5",
        signal: "Steam detected"
    },
    {
        event: "Real Madrid vs Bayern",
        market: "Next goal",
        price: "+142",
        signal: "Fair price +126"
    },
    {
        event: "Volkanovski vs Topuria",
        market: "Fight goes distance",
        price: "+118",
        signal: "Model divergence"
    }
];
const dashboardAlerts = [
    {
        title: "Books drifting off exchange consensus",
        meta: "NHL totals | 3 books",
        edge: "+3.9%"
    },
    {
        title: "Price stale after injury report",
        meta: "NBA props | 22 seconds old",
        edge: "+5.8%"
    },
    {
        title: "Synthetic arb window opened",
        meta: "Soccer 1X2 | 2-way cover",
        edge: "+2.1%"
    }
];
const dashboardLineScreen = [
    {
        event: "BOS at NYK",
        market: "Spread",
        bestLine: "-4.5",
        fair: "-6.0",
        edge: "+6.8%",
        trigger: "Steam + injury"
    },
    {
        event: "RMA vs BAY",
        market: "Over 2.5",
        bestLine: "+104",
        fair: "-112",
        edge: "+5.1%",
        trigger: "Search surge"
    },
    {
        event: "VOLK vs TOP",
        market: "Goes distance",
        bestLine: "+118",
        fair: "+101",
        edge: "+4.2%",
        trigger: "Model split"
    },
    {
        event: "LAD at ATL",
        market: "F5 ML",
        bestLine: "+127",
        fair: "+114",
        edge: "+4.6%",
        trigger: "Sharp split"
    }
];
const dashboardNews = [
    {
        tag: "Market note",
        title: "Public consensus is piling onto the favorite, but respected books are holding the dog.",
        time: "Sample note"
    },
    {
        tag: "Creator signal",
        title: "Golf outrights picked up abnormal search velocity after an influencer preview dropped.",
        time: "Sample note"
    },
    {
        tag: "Exchange lead",
        title: "Exchange totals moved before retail books on two Champions League derivatives.",
        time: "Sample note"
    }
];
const dashboardBooks = [
    {
        name: "Pinnacle",
        score: "98",
        note: "Primary benchmark",
        badge: "Sharpest"
    },
    {
        name: "Circa",
        score: "95",
        note: "Validates respected action",
        badge: "Market maker"
    },
    {
        name: "FanDuel",
        score: "89",
        note: "Live reaction monitor",
        badge: "Fast live"
    },
    {
        name: "DraftKings",
        score: "87",
        note: "Breadth and retail gravity",
        badge: "U.S. depth"
    },
    {
        name: "Bet365",
        score: "86",
        note: "Global coverage anchor",
        badge: "Global"
    }
];
const competitionLandscape = [
    {
        name: "Polymarket",
        focus: "Prediction markets",
        strength: "Strong yes/no market coverage with broad event participation and fast price discovery.",
        opening: "El Jefe should avoid copying binary event markets and instead dominate multi-sport pricing, live movement, and bettor workflows."
    },
    {
        name: "Kalshi",
        focus: "Regulated event contracts",
        strength: "Strong trust position around regulated contracts, especially in politics and macro themes.",
        opening: "El Jefe can win on sports-specific depth, bettor tooling, and cross-book signal quality rather than event-contract regulation."
    },
    {
        name: "DraftKings Sportsbook",
        focus: "Sharp sportsbook pricing",
        strength: "Competitive lines and broad market depth across major U.S. sports.",
        opening: "El Jefe should sit above sportsbooks by comparing them, grading them, and exposing value instead of trying to be the book itself."
    },
    {
        name: "FanDuel Sportsbook",
        focus: "Live betting experience",
        strength: "Well-known for live betting flow, cashout UX, and strong pricing in selected sports.",
        opening: "El Jefe can differentiate with cross-market intelligence, faster alerting, and sharper filtering than a single operator app."
    },
    {
        name: "Action Network Pro",
        focus: "Betting analytics",
        strength: "Recognized for model-driven projections, content, and value-hunting tools.",
        opening: "El Jefe should position as the operator-grade, real-time layer with more automation, cleaner signals, and better workflow execution."
    },
    {
        name: "BetQL",
        focus: "Data-driven value ratings",
        strength: "Known for quantitative ratings and simple value scoring that appeals to numbers-first bettors.",
        opening: "El Jefe should offer transparent edge grading tied to live market context instead of a single abstract score."
    },
    {
        name: "VegasInsider",
        focus: "Human expert and trend content",
        strength: "Historical betting trends, expert takes, and sharp/public sentiment framing.",
        opening: "El Jefe can ingest sentiment as one signal, then beat expert-only products with measurable market reaction and performance tracking."
    },
    {
        name: "Zcode",
        focus: "Simulation-heavy predictions",
        strength: "Heavy simulation framing and model-driven outputs for bettors who want machine-generated picks.",
        opening: "El Jefe should keep simulation as one component of a broader execution engine, not the entire product promise."
    },
    {
        name: "Pickswise",
        focus: "Free picks and editorial reach",
        strength: "Large free distribution surface with daily picks and broad user acquisition.",
        opening: "El Jefe should use free surface area only as a funnel, while reserving real-time edge intelligence for paid tiers."
    }
];
const benchmarkCategories = [
    {
        category: "All-around",
        leader: "Action Network",
        keyStrength: "Expert and model hybrid with BetSync-style tracking.",
        response: "El Jefe should add sharper automation, richer market comparisons, and cleaner execution workflows."
    },
    {
        category: "Data-driven",
        leader: "BetQL",
        keyStrength: "Simple value-rating systems that convert complex analysis into a quick decision layer.",
        response: "El Jefe should publish confidence, EV, and latency together so the signal is harder to fake and easier to trust."
    },
    {
        category: "Human experts",
        leader: "VegasInsider",
        keyStrength: "Trend archives and sharp/public sentiment framing.",
        response: "El Jefe should treat expert opinion as an input, then grade it against actual closing-line performance and live market movement."
    },
    {
        category: "AI simulations",
        leader: "Zcode",
        keyStrength: "High-volume simulations that create confidence through scale.",
        response: "El Jefe should combine simulations with real-time market data and bookmaker response, not sell simulations in isolation."
    },
    {
        category: "Free picks",
        leader: "Pickswise",
        keyStrength: "Broad acquisition through free daily bets and content reach.",
        response: "El Jefe should use free content only as an acquisition layer while premium users pay for speed and workflow depth."
    }
];
const intelligenceInputs = [
    {
        label: "Books and exchanges",
        title: "Primary price truth",
        body: "Capture opening, live, and closing prices from major books and exchanges to establish the only signal that truly clears in the market."
    },
    {
        label: "Crowd and consensus",
        title: "Public sentiment layer",
        body: "Track crowd leaning from public pick sites, community chatter, and consensus pages, then measure whether price follows or fades it."
    },
    {
        label: "Video and search",
        title: "YouTube and search interception",
        body: "Monitor creator topics, search interest, and breakout narratives so El Jefe can flag when attention is arriving before price fully adjusts."
    },
    {
        label: "Expert markets",
        title: "Handicapper grading",
        body: "Ingest expert picks and historical trend claims, then rank them by closing-line value and hit quality instead of reputation."
    },
    {
        label: "Model stack",
        title: "Simulation and fair price",
        body: "Blend simulation outputs, fair-odds conversion, and injury or lineup updates into one scored decision layer."
    },
    {
        label: "Timing",
        title: "Time-to-intercept",
        body: "Measure how long it takes from a signal appearing in the wild to a sportsbook or exchange adjusting its price, then prioritize the shortest windows."
    }
];
const sportsUniverse = [
    "NFL",
    "NBA",
    "MLB",
    "NHL",
    "Soccer",
    "Tennis",
    "MMA",
    "Golf",
    "Esports",
    "Cricket",
    "Rugby",
    "Motorsport",
    "College Football",
    "College Basketball",
    "WTA",
    "ATP"
];
const enthusiastPillars = [
    {
        title: "Premium bet analytics",
        body: "El Jefe is for bettors who want probability, timing, and market structure in one screen instead of a casino-style menu."
    },
    {
        title: "Real enthusiast workflow",
        body: "Move from sport to game to reviewed market, compare books, inspect prop angles, and grade public versus sharp disagreement instantly."
    },
    {
        title: "Above the sportsbook",
        body: "The goal is not to look like Caesars or any other book. The goal is to tell users when the book is wrong and where the best number still lives."
    }
];
const selfLearningMetrics = [
    {
        label: "Model families",
        value: "14",
        detail: "Side, total, prop, and derivative stacks scored independently"
    },
    {
        label: "Calibration passes",
        value: "5,284",
        detail: "Probability calibration and confidence reweighting last 30d"
    },
    {
        label: "Signal intercepts",
        value: "91",
        detail: "Sources graded before the broader market completed repricing"
    },
    {
        label: "Closing-line wins",
        value: "63%",
        detail: "Share of tracked recommendations beating close in mock evaluation"
    }
];
const valueEngineFallback = [
    {
        gameId: "nba-20260403-bos-nyk",
        league: "NBA",
        side: "away",
        team: "Boston Celtics",
        opponent: "New York Knicks",
        bookId: "fanduel",
        market: "moneyline",
        bookAmericanOdds: -162,
        bookDecimalOdds: 1.6173,
        ourProbability: 0.657,
        bookFairProbability: 0.6061,
        edge: 0.0509,
        expectedValuePerUnit: 0.0628,
        confidence: 81.6,
        stakeSize: 133.5,
        bankrollFraction: 0.01335,
        riskFlags: [],
        modelVersion: "moneyline-ensemble-v1",
        quoteTimestamp: "2026-04-03T15:00:00Z"
    },
    {
        gameId: "nba-20260403-den-phx",
        league: "NBA",
        side: "home",
        team: "Phoenix Suns",
        opponent: "Denver Nuggets",
        bookId: "draftkings",
        market: "moneyline",
        bookAmericanOdds: 118,
        bookDecimalOdds: 2.18,
        ourProbability: 0.495,
        bookFairProbability: 0.4509,
        edge: 0.0441,
        expectedValuePerUnit: 0.0791,
        confidence: 74.2,
        stakeSize: 167.25,
        bankrollFraction: 0.016725,
        riskFlags: [],
        modelVersion: "moneyline-ensemble-v1",
        quoteTimestamp: "2026-04-03T15:00:00Z"
    },
    {
        gameId: "nba-20260403-mia-mil",
        league: "NBA",
        side: "away",
        team: "Miami Heat",
        opponent: "Milwaukee Bucks",
        bookId: "betmgm",
        market: "moneyline",
        bookAmericanOdds: 168,
        bookDecimalOdds: 2.68,
        ourProbability: 0.411,
        bookFairProbability: 0.3618,
        edge: 0.0492,
        expectedValuePerUnit: 0.1015,
        confidence: 69.4,
        stakeSize: 200,
        bankrollFraction: 0.02,
        riskFlags: [
            "max_bet_pct_clipped"
        ],
        modelVersion: "moneyline-ensemble-v1",
        quoteTimestamp: "2026-04-03T15:00:00Z"
    }
];
const valueEnginePerformanceSummary = {
    roiTotal: 0.071,
    roiByLeague: {
        NBA: 0.071
    },
    hitRateByEdgeBucket: {
        "3-5%": 0.533,
        "5-7%": 0.571,
        "7%+": 0.615
    },
    bankrollCurve: [
        10000,
        10085,
        10210,
        10155,
        10384,
        10512,
        10710
    ],
    calibrationByModel: {
        baseline_logistic: 0.082,
        elo_rating: 0.069,
        matchup_tree_proxy: 0.094,
        rating_plus_form: 0.078
    },
    exposureByBook: {
        pinnacle: 0.22,
        fanduel: 0.18,
        draftkings: 0.21,
        circa: 0.14,
        betmgm: 0.13,
        bet365: 0.12
    }
};
const valueEngineAccuracySummary = {
    sampleCount: 8,
    ensemble: {
        modelName: "ensemble",
        brierScore: 0.1874,
        logLoss: 0.5561,
        pickAccuracy: 0.75,
        meanConfidenceGap: 0.3729
    },
    sportsbookFairBaseline: {
        modelName: "sportsbook_fair_baseline",
        brierScore: 0.2018,
        logLoss: 0.5846,
        pickAccuracy: 0.625,
        meanConfidenceGap: 0.4015
    },
    models: [
        {
            modelName: "baseline_logistic",
            brierScore: 0.1932,
            logLoss: 0.5667,
            pickAccuracy: 0.75,
            meanConfidenceGap: 0.3814
        },
        {
            modelName: "elo_rating",
            brierScore: 0.2054,
            logLoss: 0.5899,
            pickAccuracy: 0.625,
            meanConfidenceGap: 0.3976
        },
        {
            modelName: "matchup_tree_proxy",
            brierScore: 0.1988,
            logLoss: 0.5781,
            pickAccuracy: 0.625,
            meanConfidenceGap: 0.3912
        },
        {
            modelName: "rating_plus_form",
            brierScore: 0.1906,
            logLoss: 0.5602,
            pickAccuracy: 0.75,
            meanConfidenceGap: 0.3778
        }
    ],
    calibrationBuckets: [
        {
            bucket: "40-50%",
            meanPredicted: 0.462,
            actualRate: 0.3333,
            count: 3
        },
        {
            bucket: "50-60%",
            meanPredicted: 0.5512,
            actualRate: 0.5,
            count: 2
        },
        {
            bucket: "60-70%",
            meanPredicted: 0.6437,
            actualRate: 0.6667,
            count: 3
        }
    ],
    notes: [
        "Accuracy testing currently uses seeded settled NBA moneyline snapshots to verify scoring behavior end to end.",
        "The sportsbook baseline uses no-vig closing probabilities so the ensemble is measured against a fairer market benchmark.",
        "This should become a rolling evaluation job once warehouse-backed outcomes and closing lines are live."
    ]
};
const modelLab = [
    {
        name: "Side engine",
        purpose: "Full-game and live favorites or dogs",
        accuracy: "Calibration 0.84",
        edge: "+3.8% avg",
        note: "Learns from injury propagation, market maker confirmation, and stale retail lag."
    },
    {
        name: "Total engine",
        purpose: "Over and under pricing",
        accuracy: "Calibration 0.87",
        edge: "+4.1% avg",
        note: "Weights pace, weather, creator narratives, and exchange drift differently by sport."
    },
    {
        name: "Prop engine",
        purpose: "Player and derivative props",
        accuracy: "Calibration 0.79",
        edge: "+3.2% avg",
        note: "Reweights volume and usage assumptions after lineup or role shocks."
    },
    {
        name: "Interception engine",
        purpose: "Time-to-intercept ranking",
        accuracy: "Window score 0.91",
        edge: "18-120s lead",
        note: "Ranks whether a signal is early enough to matter before the market normalizes."
    }
];
const learningLoop = [
    {
        title: "Ingest every result",
        body: "Capture open, alert time, execution price, and close so the system learns what actually beat the market rather than what sounded smart."
    },
    {
        title: "Reweight source quality",
        body: "Downgrade creators, models, and public signals that stop leading price. Upgrade the sources that still move before consensus reprices."
    },
    {
        title: "Calibrate confidence",
        body: "Confidence should tighten or loosen based on how often similar signals have actually held up at close in each sport and market family."
    },
    {
        title: "Promote only winning behaviors",
        body: "El Jefe should learn the workflows that beat close, not just the picks that won one night. That keeps the product grounded in process, not hype."
    }
];
const modelResultsLedger = [
    {
        event: "Boston Celtics at New York Knicks",
        market: "Celtics -4.5 live",
        model: "Side engine",
        alertPrice: "-4.5 -108",
        closePrice: "-5.5 -110",
        outcome: "Beat close",
        lesson: "Rotation-impact weights were promoted after faster injury propagation."
    },
    {
        event: "Real Madrid vs Bayern Munich",
        market: "Over 2.5",
        model: "Total engine",
        alertPrice: "+104",
        closePrice: "+96",
        outcome: "Beat close",
        lesson: "Exchange lead retained more signal value than public narrative noise."
    },
    {
        event: "Bills at Jets",
        market: "Under 45.5",
        model: "Total engine",
        alertPrice: "45.5 -108",
        closePrice: "44.5 -110",
        outcome: "Beat close",
        lesson: "Weather regime logic remains one of the highest-trust inputs in NFL totals."
    },
    {
        event: "Volkanovski vs Topuria",
        market: "Fight goes distance",
        model: "Prop engine",
        alertPrice: "+118",
        closePrice: "+109",
        outcome: "Beat close",
        lesson: "Distance markets still lag the main side after narrative-heavy media cycles."
    }
];
const calibrationTracker = [
    {
        model: "Side engine",
        current: "0.84",
        previous: "0.79",
        drift: "Improving",
        note: "Live side confidence is tighter after reweighting injury and steam interactions."
    },
    {
        model: "Total engine",
        current: "0.87",
        previous: "0.82",
        drift: "Improving",
        note: "Weather and pace normalization improved total confidence curves across NFL and NBA."
    },
    {
        model: "Prop engine",
        current: "0.79",
        previous: "0.77",
        drift: "Stable",
        note: "Props are improving more slowly because role volatility still introduces noise."
    },
    {
        model: "Interception engine",
        current: "0.91",
        previous: "0.88",
        drift: "Improving",
        note: "Signal-window ranking is more accurate after grading venue response speed by market family."
    }
];
const modelVersionHistory = [
    {
        version: "v0.9.4",
        title: "Cross-book response weighting",
        detail: "Raised Circa and Pinnacle confirmation value for fast-moving sides and totals.",
        impact: "Lower false-positive rate on steam-only signals"
    },
    {
        version: "v0.9.3",
        title: "Weather regime recalibration",
        detail: "Split wind, precipitation, and temperature impacts instead of bundling them into one NFL weather score.",
        impact: "Improved totals calibration in outdoor games"
    },
    {
        version: "v0.9.2",
        title: "Prop role-volatility patch",
        detail: "Added lineup-role uncertainty penalty to player prop confidence outputs.",
        impact: "Reduced noisy prop alerts after late lineup changes"
    },
    {
        version: "v0.9.1",
        title: "Narrative decay filter",
        detail: "Downgraded creator and consensus signals when price failed to respond within the expected intercept window.",
        impact: "Cleaner attention-signal ranking across MLB and soccer"
    }
];
const marketDirectory = [
    {
        id: "nba-celtics-knicks-spread",
        sport: "NBA",
        league: "Eastern Conference",
        event: "Boston Celtics at New York Knicks",
        market: "Spread",
        bestLine: "BOS -4.5",
        fair: "BOS -6.0",
        edge: "+6.8%",
        trigger: "Steam + injury",
        confidence: "92/100",
        books: [
            "Pinnacle",
            "FanDuel",
            "DraftKings"
        ],
        startsIn: "In-progress sample"
    },
    {
        id: "ucl-real-bayern-total",
        sport: "Soccer",
        league: "UEFA Champions League",
        event: "Real Madrid vs Bayern Munich",
        market: "Over 2.5",
        bestLine: "+104",
        fair: "-112",
        edge: "+5.1%",
        trigger: "Search surge",
        confidence: "84/100",
        books: [
            "Bet365",
            "Pinnacle"
        ],
        startsIn: "42 min"
    },
    {
        id: "ufc-volk-topuria-distance",
        sport: "MMA",
        league: "UFC",
        event: "Volkanovski vs Topuria",
        market: "Goes distance",
        bestLine: "+118",
        fair: "+101",
        edge: "+4.2%",
        trigger: "Model split",
        confidence: "88/100",
        books: [
            "DraftKings",
            "BetMGM"
        ],
        startsIn: "3h 10m"
    },
    {
        id: "mlb-dodgers-braves-f5",
        sport: "MLB",
        league: "National League",
        event: "Los Angeles Dodgers at Atlanta Braves",
        market: "F5 Moneyline",
        bestLine: "+127",
        fair: "+114",
        edge: "+4.6%",
        trigger: "Sharp split",
        confidence: "79/100",
        books: [
            "Circa",
            "Pinnacle"
        ],
        startsIn: "1h 08m"
    },
    {
        id: "nfl-bills-jets-total",
        sport: "NFL",
        league: "AFC East",
        event: "Buffalo Bills at New York Jets",
        market: "Under 45.5",
        bestLine: "-108",
        fair: "-121",
        edge: "+3.7%",
        trigger: "Weather adjustment",
        confidence: "83/100",
        books: [
            "Circa",
            "FanDuel"
        ],
        startsIn: "Sun 1:00 PM"
    },
    {
        id: "tennis-sabalenka-swiatek-set1",
        sport: "Tennis",
        league: "WTA",
        event: "Sabalenka vs Swiatek",
        market: "Set 1 over 9.5",
        bestLine: "+102",
        fair: "-106",
        edge: "+3.3%",
        trigger: "Serve profile mismatch",
        confidence: "77/100",
        books: [
            "Bet365",
            "Pinnacle"
        ],
        startsIn: "27 min"
    },
    {
        id: "golf-masters-outright",
        sport: "Golf",
        league: "Masters",
        event: "Scheffler outright",
        market: "Outright winner",
        bestLine: "+640",
        fair: "+590",
        edge: "+2.9%",
        trigger: "Creator signal",
        confidence: "74/100",
        books: [
            "FanDuel",
            "DraftKings"
        ],
        startsIn: "Tomorrow"
    },
    {
        id: "nhl-rangers-devils-puckline",
        sport: "NHL",
        league: "Metropolitan",
        event: "Rangers at Devils",
        market: "Puck line",
        bestLine: "NJD +1.5 -118",
        fair: "-131",
        edge: "+3.5%",
        trigger: "Goalie update",
        confidence: "81/100",
        books: [
            "Pinnacle",
            "FanDuel"
        ],
        startsIn: "54 min"
    }
];
const marketDetails = {
    "nba-celtics-knicks-spread": {
        id: "nba-celtics-knicks-spread",
        thesis: "Boston's defensive matchup improved before the market fully propagated a key rotation change, leaving the spread short of fair.",
        execution: "Prioritize the best available -4.5 and monitor for a snap to -5.5 once the sharper books finish repricing.",
        sourceSignals: [
            "Injury desk",
            "Steam cluster",
            "Sharp confirmation"
        ],
        timingWindow: "18 to 45 seconds",
        risk: "Late buyback if the injury minutes restriction gets softened pre-tip."
    },
    "ucl-real-bayern-total": {
        id: "ucl-real-bayern-total",
        thesis: "Exchange and search momentum are aligned on chance creation, but retail totals are still offering plus money on the over.",
        execution: "Take +104 or better before high-volume books converge toward even money or shorter.",
        sourceSignals: [
            "Exchange lead",
            "Search surge",
            "Retail lag"
        ],
        timingWindow: "1 to 3 minutes",
        risk: "A defensive lineup confirmation would compress the edge immediately."
    },
    "ufc-volk-topuria-distance": {
        id: "ufc-volk-topuria-distance",
        thesis: "The market corrected the side faster than the path-to-victory pricing, leaving distance props behind the core model.",
        execution: "Hold for plus money only and compare against round totals before firing.",
        sourceSignals: [
            "Fight sim",
            "Method mismatch",
            "Book drift"
        ],
        timingWindow: "5 to 12 minutes",
        risk: "Weigh-in chatter can overstate durability concerns in the final hour."
    },
    "mlb-dodgers-braves-f5": {
        id: "mlb-dodgers-braves-f5",
        thesis: "First-five pricing has not fully caught up to a starting pitching delta and early lineup weakness on the home side.",
        execution: "Target plus money and avoid waiting for the full-game market to anchor the correction.",
        sourceSignals: [
            "Pitch model",
            "Lineup weakness",
            "Sharp split"
        ],
        timingWindow: "4 to 9 minutes",
        risk: "Unexpected bullpen news can drag bettors back into the full-game number and alter the F5 derivative."
    },
    "nfl-bills-jets-total": {
        id: "nfl-bills-jets-total",
        thesis: "Wind and pace compression point lower than the posted total, but the market is still slow to fully price the weather narrative.",
        execution: "Capture under 45.5 before key-number compression reduces the number to 44.5.",
        sourceSignals: [
            "Weather desk",
            "Pace model",
            "Derivative sync"
        ],
        timingWindow: "10 to 20 minutes",
        risk: "Quarterback upgrade news would unwind the edge quickly."
    },
    "tennis-sabalenka-swiatek-set1": {
        id: "tennis-sabalenka-swiatek-set1",
        thesis: "Serve-hold expectation in the opening set projects longer than the implied total, while retail books still hang plus money.",
        execution: "Take the over early and watch for live-entry opportunities if the first two games hold cleanly.",
        sourceSignals: [
            "Serve profile",
            "Market asymmetry",
            "Live entry map"
        ],
        timingWindow: "2 to 6 minutes",
        risk: "A slow court-speed update would reduce hold expectation materially."
    },
    "golf-masters-outright": {
        id: "golf-masters-outright",
        thesis: "Creator-driven attention improved demand on the outright, but model probability still supports a shorter number than the available market.",
        execution: "Use outright only if you cannot access placement markets at a superior hold profile.",
        sourceSignals: [
            "Creator signal",
            "Course fit",
            "Hold comparison"
        ],
        timingWindow: "30 to 90 minutes",
        risk: "Weather wave changes can move the fair price before books react uniformly."
    },
    "nhl-rangers-devils-puckline": {
        id: "nhl-rangers-devils-puckline",
        thesis: "Goalie information hit respected venues first, while retail books still leave the puck-line tax too soft.",
        execution: "Accept -118 to -122 range only and cross-check regulation pricing before entry.",
        sourceSignals: [
            "Goalie update",
            "Retail lag",
            "Derivative mismatch"
        ],
        timingWindow: "45 to 120 seconds",
        risk: "Backup confirmation reversal would remove the edge fast."
    }
};
const eventSnapshots = [
    {
        id: "nba-celtics-knicks",
        sport: "NBA",
        league: "Eastern Conference",
        event: "Boston Celtics at New York Knicks",
        startsIn: "In-progress sample",
        status: "Q3 07:18",
        venue: "Madison Square Garden",
        headline: "Rotation news and pace spike still have the favorite and over slightly behind fair.",
        favorite: "Celtics -4.5",
        total: "224.5",
        scoreBug: "BOS 81 · NYK 74",
        tags: [
            "Favorite lean",
            "Over lean",
            "Injury impact"
        ],
        analytics: {
            modelEdge: "+6.8%",
            publicBetSplit: "68% BOS tickets",
            sharpMoney: "59% NYK money fading public",
            volatility: "High",
            bankroll: "1.25u max",
            marketState: "Sample repricing view"
        },
        trend: [
            {
                label: "Open",
                price: "BOS -2.5",
                edge: "+1.4%"
            },
            {
                label: "Pre-tip",
                price: "BOS -3.5",
                edge: "+2.2%"
            },
            {
                label: "Q2",
                price: "BOS -4.0",
                edge: "+4.6%"
            },
            {
                label: "Now",
                price: "BOS -4.5",
                edge: "+6.8%"
            }
        ],
        propAngles: [
            {
                player: "Jalen Brunson",
                market: "Assists",
                line: "Over 6.5",
                edge: "+3.1%",
                note: "Tempo spike is boosting potential assists."
            },
            {
                player: "Jayson Tatum",
                market: "Points",
                line: "Over 29.5",
                edge: "+2.4%",
                note: "Usage remains intact despite live spread inflation."
            }
        ],
        markets: [
            {
                key: "spread",
                label: "Favorite",
                recommendation: "Celtics -4.5",
                fair: "-6.0",
                edge: "+6.8%",
                confidence: "92/100",
                summary: "The favorite is still short versus the updated rotation and transition profile.",
                books: [
                    {
                        book: "Pinnacle",
                        selection: "BOS -4.5",
                        line: "-4.5",
                        price: "-108",
                        movement: "Steam 18s ago"
                    },
                    {
                        book: "FanDuel",
                        selection: "BOS -4.5",
                        line: "-4.5",
                        price: "-110",
                        movement: "Lagging"
                    },
                    {
                        book: "DraftKings",
                        selection: "BOS -5.0",
                        line: "-5.0",
                        price: "-108",
                        movement: "Caught up"
                    }
                ]
            },
            {
                key: "over",
                label: "Over",
                recommendation: "Over 224.5",
                fair: "227.0",
                edge: "+4.1%",
                confidence: "84/100",
                summary: "Current tempo and free-throw rate support an over position while the in-play number still trails pace.",
                books: [
                    {
                        book: "FanDuel",
                        selection: "Over 224.5",
                        line: "224.5",
                        price: "-105",
                        movement: "Still stale"
                    },
                    {
                        book: "DraftKings",
                        selection: "Over 225.5",
                        line: "225.5",
                        price: "-110",
                        movement: "+1 in 40s"
                    },
                    {
                        book: "BetMGM",
                        selection: "Over 224.5",
                        line: "224.5",
                        price: "-108",
                        movement: "Flat"
                    }
                ]
            },
            {
                key: "under",
                label: "Under",
                recommendation: "Pass under",
                fair: "227.0",
                edge: "-3.6%",
                confidence: "41/100",
                summary: "Current under prices are behind the scoring environment and do not justify entry.",
                books: [
                    {
                        book: "Pinnacle",
                        selection: "Under 224.5",
                        line: "224.5",
                        price: "-115",
                        movement: "Tax increased"
                    },
                    {
                        book: "FanDuel",
                        selection: "Under 224.5",
                        line: "224.5",
                        price: "-112",
                        movement: "Holding"
                    },
                    {
                        book: "DraftKings",
                        selection: "Under 225.5",
                        line: "225.5",
                        price: "-110",
                        movement: "Moved with total"
                    }
                ]
            }
        ]
    },
    {
        id: "nfl-bills-jets",
        sport: "NFL",
        league: "AFC East",
        event: "Buffalo Bills at New York Jets",
        startsIn: "Sun 1:00 PM",
        status: "Pregame",
        venue: "MetLife Stadium",
        headline: "Weather still points under, but the favorite has already been more efficiently priced than the total.",
        favorite: "Bills -2.5",
        total: "45.5",
        scoreBug: "Kickoff in 2d 4h",
        tags: [
            "Under lean",
            "Weather",
            "Key-number watch"
        ],
        analytics: {
            modelEdge: "+3.7% total edge",
            publicBetSplit: "61% over tickets",
            sharpMoney: "64% under handle",
            volatility: "Medium",
            bankroll: "1.0u max",
            marketState: "Derivative lag around weather update"
        },
        trend: [
            {
                label: "Open",
                price: "46.5",
                edge: "+0.9%"
            },
            {
                label: "Weather 1",
                price: "46.0",
                edge: "+1.8%"
            },
            {
                label: "Weather 2",
                price: "45.5",
                edge: "+3.7%"
            },
            {
                label: "Now",
                price: "45.5",
                edge: "+3.7%"
            }
        ],
        propAngles: [
            {
                player: "Breece Hall",
                market: "Rush yards",
                line: "Under 64.5",
                edge: "+2.2%",
                note: "Game script and weather both compress explosive runs."
            },
            {
                player: "Josh Allen",
                market: "Pass attempts",
                line: "Under 33.5",
                edge: "+2.8%",
                note: "Wind and pace reduction favor a shorter pass volume profile."
            }
        ],
        markets: [
            {
                key: "favorite",
                label: "Favorite",
                recommendation: "Bills -2.5",
                fair: "-3.0",
                edge: "+1.8%",
                confidence: "67/100",
                summary: "There is still a slight lean to the favorite, but most of the side value has already been captured.",
                books: [
                    {
                        book: "Circa",
                        selection: "BUF -2.5",
                        line: "-2.5",
                        price: "-110",
                        movement: "Stable"
                    },
                    {
                        book: "FanDuel",
                        selection: "BUF -2.5",
                        line: "-2.5",
                        price: "-112",
                        movement: "Retail tax"
                    },
                    {
                        book: "DraftKings",
                        selection: "BUF -3.0",
                        line: "-3.0",
                        price: "-105",
                        movement: "Testing 3"
                    }
                ]
            },
            {
                key: "under",
                label: "Under",
                recommendation: "Under 45.5",
                fair: "44.0",
                edge: "+3.7%",
                confidence: "83/100",
                summary: "Wind and pace compression keep the under as the cleaner reviewed price for this game.",
                books: [
                    {
                        book: "Circa",
                        selection: "Under 45.5",
                        line: "45.5",
                        price: "-108",
                        movement: "Best current"
                    },
                    {
                        book: "FanDuel",
                        selection: "Under 45.5",
                        line: "45.5",
                        price: "-112",
                        movement: "Moving"
                    },
                    {
                        book: "BetMGM",
                        selection: "Under 45.0",
                        line: "45.0",
                        price: "-105",
                        movement: "Already down"
                    }
                ]
            },
            {
                key: "over",
                label: "Over",
                recommendation: "Pass over",
                fair: "44.0",
                edge: "-4.2%",
                confidence: "35/100",
                summary: "Over pricing is not keeping up with the weather and derivative adjustments already seen elsewhere.",
                books: [
                    {
                        book: "FanDuel",
                        selection: "Over 45.5",
                        line: "45.5",
                        price: "-108",
                        movement: "Holding"
                    },
                    {
                        book: "DraftKings",
                        selection: "Over 45.0",
                        line: "45.0",
                        price: "-115",
                        movement: "Juiced"
                    },
                    {
                        book: "Bet365",
                        selection: "Over 45.5",
                        line: "45.5",
                        price: "-110",
                        movement: "Flat"
                    }
                ]
            }
        ]
    },
    {
        id: "soccer-real-bayern",
        sport: "Soccer",
        league: "UEFA Champions League",
        event: "Real Madrid vs Bayern Munich",
        startsIn: "42 min",
        status: "Pregame",
        venue: "Santiago Bernabeu",
        headline: "The over remains the best reviewed number while the favorite side is closer to fair after exchange pressure.",
        favorite: "Real Madrid +132",
        total: "2.5",
        scoreBug: "Kickoff in 42m",
        tags: [
            "Over lean",
            "Exchange lead",
            "Narrative drift"
        ],
        analytics: {
            modelEdge: "+5.1% over edge",
            publicBetSplit: "57% Madrid tickets",
            sharpMoney: "63% over handle",
            volatility: "Medium-high",
            bankroll: "0.9u max",
            marketState: "Exchange still leading retail"
        },
        trend: [
            {
                label: "Open",
                price: "O2.5 +116",
                edge: "+1.3%"
            },
            {
                label: "Europe",
                price: "O2.5 +110",
                edge: "+2.7%"
            },
            {
                label: "U.S. open",
                price: "O2.5 +106",
                edge: "+4.2%"
            },
            {
                label: "Now",
                price: "O2.5 +104",
                edge: "+5.1%"
            }
        ],
        propAngles: [
            {
                player: "Vinicius Jr.",
                market: "Shots on target",
                line: "Over 1.5",
                edge: "+2.9%",
                note: "Transition volume still screens above market expectation."
            },
            {
                player: "Harry Kane",
                market: "Anytime scorer",
                line: "+156",
                edge: "+1.8%",
                note: "Penalty and set-piece share keep him live even in tighter match states."
            }
        ],
        markets: [
            {
                key: "favorite",
                label: "Favorite",
                recommendation: "Real Madrid draw no bet",
                fair: "+118",
                edge: "+2.2%",
                confidence: "71/100",
                summary: "The side is playable, but total pricing still offers the cleaner edge for this match.",
                books: [
                    {
                        book: "Bet365",
                        selection: "Real Madrid DNB",
                        line: "DNB",
                        price: "-102",
                        movement: "Shortening"
                    },
                    {
                        book: "Pinnacle",
                        selection: "Real Madrid DNB",
                        line: "DNB",
                        price: "-105",
                        movement: "Market lead"
                    },
                    {
                        book: "FanDuel",
                        selection: "Real Madrid ML",
                        line: "ML",
                        price: "+132",
                        movement: "Retail hold"
                    }
                ]
            },
            {
                key: "over",
                label: "Over",
                recommendation: "Over 2.5",
                fair: "-112",
                edge: "+5.1%",
                confidence: "84/100",
                summary: "Chance creation and exchange tape still point to the over as the best real-time reviewed number.",
                books: [
                    {
                        book: "Bet365",
                        selection: "Over 2.5",
                        line: "2.5",
                        price: "+104",
                        movement: "Best current"
                    },
                    {
                        book: "Pinnacle",
                        selection: "Over 2.5",
                        line: "2.5",
                        price: "+101",
                        movement: "Drifting down"
                    },
                    {
                        book: "DraftKings",
                        selection: "Over 2.5",
                        line: "2.5",
                        price: "+100",
                        movement: "Catching up"
                    }
                ]
            },
            {
                key: "under",
                label: "Under",
                recommendation: "Pass under",
                fair: "-112",
                edge: "-5.0%",
                confidence: "33/100",
                summary: "The under is priced too tightly versus the actual attack profile and public sentiment flow.",
                books: [
                    {
                        book: "Bet365",
                        selection: "Under 2.5",
                        line: "2.5",
                        price: "-130",
                        movement: "Too short"
                    },
                    {
                        book: "Pinnacle",
                        selection: "Under 2.5",
                        line: "2.5",
                        price: "-127",
                        movement: "Leading"
                    },
                    {
                        book: "DraftKings",
                        selection: "Under 2.5",
                        line: "2.5",
                        price: "-125",
                        movement: "Retail follow"
                    }
                ]
            }
        ]
    },
    {
        id: "mlb-dodgers-braves",
        sport: "MLB",
        league: "National League",
        event: "Los Angeles Dodgers at Atlanta Braves",
        startsIn: "1h 08m",
        status: "Pregame",
        venue: "Truist Park",
        headline: "The dog is strongest in first five pricing, while the full-game total is still slightly shaded to the over.",
        favorite: "Braves -138",
        total: "8.5",
        scoreBug: "First pitch in 1h 08m",
        tags: [
            "F5 dog",
            "Over lean",
            "Lineup lag"
        ],
        analytics: {
            modelEdge: "+4.6% F5 edge",
            publicBetSplit: "64% Braves tickets",
            sharpMoney: "58% Dodgers F5 handle",
            volatility: "Medium",
            bankroll: "1.1u max",
            marketState: "Lineup adjustment not fully priced"
        },
        trend: [
            {
                label: "Open",
                price: "LAD F5 +120",
                edge: "+1.6%"
            },
            {
                label: "Lineups",
                price: "LAD F5 +123",
                edge: "+2.8%"
            },
            {
                label: "Sharp hit",
                price: "LAD F5 +125",
                edge: "+3.9%"
            },
            {
                label: "Now",
                price: "LAD F5 +127",
                edge: "+4.6%"
            }
        ],
        propAngles: [
            {
                player: "Mookie Betts",
                market: "Hits",
                line: "Over 1.5",
                edge: "+2.1%",
                note: "Pitch-shape matchup keeps his contact quality elevated."
            },
            {
                player: "Spencer Strider",
                market: "Ks",
                line: "Over 8.5",
                edge: "+1.9%",
                note: "Still viable, but less attractive than the F5 dog derivative."
            }
        ],
        markets: [
            {
                key: "favorite",
                label: "Favorite",
                recommendation: "Pass Braves full game",
                fair: "-132",
                edge: "-1.7%",
                confidence: "49/100",
                summary: "The favorite is close to fair on the full game, so this is not the best reviewed position on the board.",
                books: [
                    {
                        book: "Circa",
                        selection: "ATL ML",
                        line: "ML",
                        price: "-138",
                        movement: "Stable"
                    },
                    {
                        book: "FanDuel",
                        selection: "ATL ML",
                        line: "ML",
                        price: "-142",
                        movement: "Retail tax"
                    },
                    {
                        book: "DraftKings",
                        selection: "ATL ML",
                        line: "ML",
                        price: "-140",
                        movement: "Flat"
                    }
                ]
            },
            {
                key: "over",
                label: "Over",
                recommendation: "Over 8.5",
                fair: "9.1",
                edge: "+2.6%",
                confidence: "69/100",
                summary: "The over is modestly favorable based on lineup strength and park profile, though less attractive than the derivative dog position.",
                books: [
                    {
                        book: "FanDuel",
                        selection: "Over 8.5",
                        line: "8.5",
                        price: "-105",
                        movement: "Best current"
                    },
                    {
                        book: "BetMGM",
                        selection: "Over 8.5",
                        line: "8.5",
                        price: "-108",
                        movement: "Holding"
                    },
                    {
                        book: "DraftKings",
                        selection: "Over 9.0",
                        line: "9.0",
                        price: "+100",
                        movement: "Testing 9"
                    }
                ]
            },
            {
                key: "underdog",
                label: "Underdog",
                recommendation: "Dodgers F5 +127",
                fair: "+114",
                edge: "+4.6%",
                confidence: "79/100",
                summary: "The first-five dog remains the cleanest reviewed value on this upcoming game.",
                books: [
                    {
                        book: "Circa",
                        selection: "LAD F5 ML",
                        line: "F5",
                        price: "+127",
                        movement: "Best current"
                    },
                    {
                        book: "Pinnacle",
                        selection: "LAD F5 ML",
                        line: "F5",
                        price: "+124",
                        movement: "Sharp follow"
                    },
                    {
                        book: "Bet365",
                        selection: "LAD F5 +0.5",
                        line: "+0.5",
                        price: "-102",
                        movement: "Derivative hedge"
                    }
                ]
            }
        ]
    },
    {
        id: "mma-volk-topuria",
        sport: "MMA",
        league: "UFC",
        event: "Volkanovski vs Topuria",
        startsIn: "3h 10m",
        status: "Main card",
        venue: "T-Mobile Arena",
        headline: "The distance prop is still a better reviewed price than the side once the market absorbs the fight-week narrative.",
        favorite: "Topuria -122",
        total: "Over 3.5 rounds",
        scoreBug: "Walkouts in 3h 10m",
        tags: [
            "Distance angle",
            "Method markets",
            "Narrative fade"
        ],
        analytics: {
            modelEdge: "+4.2% distance edge",
            publicBetSplit: "71% finish tickets",
            sharpMoney: "54% distance handle",
            volatility: "High",
            bankroll: "0.75u max",
            marketState: "Narrative pressure distorting finish prices"
        },
        trend: [
            {
                label: "Open",
                price: "+104",
                edge: "+0.7%"
            },
            {
                label: "Media day",
                price: "+110",
                edge: "+2.1%"
            },
            {
                label: "Weigh-ins",
                price: "+114",
                edge: "+3.3%"
            },
            {
                label: "Now",
                price: "+118",
                edge: "+4.2%"
            }
        ],
        propAngles: [
            {
                player: "Volkanovski",
                market: "Decision win",
                line: "+320",
                edge: "+2.0%",
                note: "More attractive than the straight side if you want dog exposure."
            },
            {
                player: "Topuria",
                market: "Rounds 4-5 finish",
                line: "+540",
                edge: "+1.7%",
                note: "Late pressure path still underpriced relative to early KO narrative."
            }
        ],
        markets: [
            {
                key: "favorite",
                label: "Favorite",
                recommendation: "Topuria -122",
                fair: "-128",
                edge: "+1.9%",
                confidence: "63/100",
                summary: "The favorite is only slightly favorable now that main-market pricing has largely corrected.",
                books: [
                    {
                        book: "DraftKings",
                        selection: "Topuria ML",
                        line: "ML",
                        price: "-122",
                        movement: "Stable"
                    },
                    {
                        book: "FanDuel",
                        selection: "Topuria ML",
                        line: "ML",
                        price: "-124",
                        movement: "Holding"
                    },
                    {
                        book: "BetMGM",
                        selection: "Topuria ML",
                        line: "ML",
                        price: "-125",
                        movement: "Slight drift"
                    }
                ]
            },
            {
                key: "over",
                label: "Over",
                recommendation: "Fight goes distance +118",
                fair: "+101",
                edge: "+4.2%",
                confidence: "88/100",
                summary: "This is the cleanest reviewed over-style market because books corrected the side first and the distance price later.",
                books: [
                    {
                        book: "DraftKings",
                        selection: "Goes distance",
                        line: "Distance",
                        price: "+118",
                        movement: "Best current"
                    },
                    {
                        book: "FanDuel",
                        selection: "Over 4.5 rounds",
                        line: "4.5",
                        price: "+110",
                        movement: "Alternative"
                    },
                    {
                        book: "BetMGM",
                        selection: "Goes distance",
                        line: "Distance",
                        price: "+114",
                        movement: "Following"
                    }
                ]
            },
            {
                key: "under",
                label: "Under",
                recommendation: "Pass under finish markets",
                fair: "+101",
                edge: "-3.9%",
                confidence: "39/100",
                summary: "Finish prices reflect the narrative push too closely and do not screen as strong current value.",
                books: [
                    {
                        book: "DraftKings",
                        selection: "Inside distance",
                        line: "Distance",
                        price: "-145",
                        movement: "Too short"
                    },
                    {
                        book: "FanDuel",
                        selection: "Under 4.5 rounds",
                        line: "4.5",
                        price: "-134",
                        movement: "Retail hold"
                    },
                    {
                        book: "BetMGM",
                        selection: "Does not go distance",
                        line: "Distance",
                        price: "-142",
                        movement: "Flat"
                    }
                ]
            }
        ]
    }
];
const sportHubContent = [
    {
        sport: "NBA",
        title: "NBA market command",
        lead: "Track injury-driven prop clusters, steam on sides and totals, and late-book repricing across the deepest nightly board.",
        badges: [
            "Prop volatility",
            "Back-to-back adjustment",
            "Closing-line focus"
        ],
        metrics: [
            {
                label: "Tracked markets",
                value: "248"
            },
            {
                label: "Avg. alert speed",
                value: "173ms"
            },
            {
                label: "High-confidence edges",
                value: "34"
            }
        ],
        headlines: [
            {
                title: "Late lineup changes still create the cleanest NBA mispricing",
                detail: "The best spots usually show up in related props and live derivatives before every book catches up."
            },
            {
                title: "Respect the books that move first",
                detail: "When Circa or Pinnacle move early and the retail apps stay put, that is usually the better read on true price."
            }
        ]
    },
    {
        sport: "NFL",
        title: "NFL number discipline",
        lead: "Prioritize key numbers, weather-driven totals, and closing-line value around the most liquid weekly markets in betting.",
        badges: [
            "Key numbers",
            "Weather impact",
            "Derivative screens"
        ],
        metrics: [
            {
                label: "Tracked markets",
                value: "182"
            },
            {
                label: "Avg. alert speed",
                value: "194ms"
            },
            {
                label: "High-confidence edges",
                value: "26"
            }
        ],
        headlines: [
            {
                title: "Weather still moves NFL totals before the public fully adjusts",
                detail: "The edge is in catching that move early, before the main over-under and team totals settle."
            },
            {
                title: "Derivative markets lag the headline spread",
                detail: "First-half lines, team totals, and alternates often stay stale after the main number crosses a key point."
            }
        ]
    },
    {
        sport: "Soccer",
        title: "Global soccer tape",
        lead: "Compare exchange pressure, retail lag, and narrative-driven totals across global competitions that move around the clock.",
        badges: [
            "Exchange first",
            "Totals drift",
            "Global coverage"
        ],
        metrics: [
            {
                label: "Tracked markets",
                value: "311"
            },
            {
                label: "Avg. alert speed",
                value: "161ms"
            },
            {
                label: "High-confidence edges",
                value: "41"
            }
        ],
        headlines: [
            {
                title: "Exchange moves still beat retail soccer books",
                detail: "Totals and first-half markets often start shifting there before U.S. books make the same adjustment."
            },
            {
                title: "Public match narratives can hide the better bet",
                detail: "When everyone argues the side, the cleaner value often sits in totals or both-teams-to-score."
            }
        ]
    },
    {
        sport: "MMA",
        title: "Fight market structure",
        lead: "Blend style simulation, round props, and sharp disagreement across low-frequency but high-variance fight markets.",
        badges: [
            "Method props",
            "Style model",
            "Late weigh-in shifts"
        ],
        metrics: [
            {
                label: "Tracked markets",
                value: "94"
            },
            {
                label: "Avg. alert speed",
                value: "204ms"
            },
            {
                label: "High-confidence edges",
                value: "18"
            }
        ],
        headlines: [
            {
                title: "Method markets usually stay wrong longer than the main side",
                detail: "Books correct the winner price first and take longer to fix round and finish props."
            },
            {
                title: "Fight-week hype can distort finishing props",
                detail: "Public knockout chatter often pushes one angle too far and leaves the opposite path mispriced."
            }
        ]
    },
    {
        sport: "MLB",
        title: "Baseball daily grind",
        lead: "Target overnight openers, first-five markets, and lineup-driven repricing across the sport with the most repeated daily market opportunities.",
        badges: [
            "F5 focus",
            "Lineup volatility",
            "Pitcher effects"
        ],
        metrics: [
            {
                label: "Tracked markets",
                value: "266"
            },
            {
                label: "Avg. alert speed",
                value: "188ms"
            },
            {
                label: "High-confidence edges",
                value: "29"
            }
        ],
        headlines: [
            {
                title: "First-five prices still lag lineup and pitching news",
                detail: "Those derivatives often stay available after the full-game line has already corrected."
            },
            {
                title: "Public dog narratives can bend the wrong market",
                detail: "Sometimes the better play is not fading the side outright but attacking a cleaner team-total or first-five number."
            }
        ]
    }
];
const sportIntelFeed = {
    NBA: [
        {
            id: "nba-intel-1",
            title: "Boston rotation news moved assists, threes, and live spread prices together.",
            tag: "Injury desk",
            time: "Sample note",
            detail: "The strongest reaction is in linked props, not just the main spread, because books are updating the board unevenly."
        },
        {
            id: "nba-intel-2",
            title: "Two sharper books moved the total while the retail apps held their number.",
            tag: "Book split",
            time: "Sample note",
            detail: "That usually ends with a fast total move and then a slower cleanup across player and same-game derivatives."
        }
    ],
    NFL: [
        {
            id: "nfl-intel-1",
            title: "The wind update is moving the total faster than the public is reacting.",
            tag: "Weather desk",
            time: "Sample note",
            detail: "The best leftover value is usually in team totals and alternates after the headline total starts to move."
        },
        {
            id: "nfl-intel-2",
            title: "Derivative boards are still slow after the main spread crosses a key number.",
            tag: "Derivative lag",
            time: "Sample note",
            detail: "First-half lines and team totals are often the last markets to catch up after a move through three or seven."
        }
    ],
    Soccer: [
        {
            id: "soccer-intel-1",
            title: "Exchange pressure showed up almost a minute before the retail total moved.",
            tag: "Exchange tape",
            time: "Sample note",
            detail: "That is the usable window for pre-match totals and first-half derivatives before the price closes."
        },
        {
            id: "soccer-intel-2",
            title: "Match chatter is lifting the favorite faster than the underlying price deserves.",
            tag: "Narrative flow",
            time: "Sample note",
            detail: "That usually makes totals or the opposite handicap cleaner than forcing a side bet into a crowded market."
        }
    ],
    MMA: [
        {
            id: "mma-intel-1",
            title: "Method-of-victory prices are still looser than the main side after media day.",
            tag: "Method markets",
            time: "Sample note",
            detail: "Books usually fix the moneyline first and leave finish or decision props exposed longer."
        },
        {
            id: "mma-intel-2",
            title: "Round totals are correcting more slowly than the pace model suggests.",
            tag: "Sim desk",
            time: "Sample note",
            detail: "That can be a cleaner angle than chasing a side after the headline line is already gone."
        }
    ],
    MLB: [
        {
            id: "mlb-intel-1",
            title: "Lineup confirmation is still leaving first-five prices behind the full-game move.",
            tag: "Lineup desk",
            time: "Sample note",
            detail: "The full-game line usually reacts first, which leaves first-five value available longer."
        },
        {
            id: "mlb-intel-2",
            title: "Public dog chatter is bending a few same-day prices away from fair.",
            tag: "Consensus fade",
            time: "Sample note",
            detail: "Those spots make more sense once pitcher form, lineup quality, and umpire context are added back in."
        }
    ]
};
function getFilteredMarkets(filters) {
    const sport = filters?.sport?.trim();
    const query = filters?.query?.trim().toLowerCase();
    return marketDirectory.filter((market)=>{
        const sportMatch = !sport || sport === "All" || market.sport.toLowerCase() === sport.toLowerCase();
        const queryMatch = !query || [
            market.event,
            market.market,
            market.league,
            market.trigger,
            market.sport,
            market.books.join(" ")
        ].join(" ").toLowerCase().includes(query);
        return sportMatch && queryMatch;
    });
}
function getSportHub(sport) {
    return sportHubContent.find((entry)=>entry.sport.toLowerCase() === sport.toLowerCase()) ?? null;
}
function getMarketDetail(id) {
    return marketDetails[id] ?? null;
}
function getSportIntel(sport) {
    const hub = getSportHub(sport);
    if (!hub) {
        return [];
    }
    return sportIntelFeed[hub.sport] ?? [];
}
function getEventSnapshots(filters) {
    const sport = filters?.sport?.trim();
    return eventSnapshots.filter((event)=>!sport || sport === "All" || event.sport.toLowerCase() === sport.toLowerCase());
}
function getEventSnapshot(id) {
    return eventSnapshots.find((event)=>event.id === id) ?? null;
}
const operatorDateAnchor = "2026-04-02T00:00:00Z";
const operatorSeasonEnd = "2026-12-31T23:59:59Z";
const seasonMarketFamilyLabels = {
    moneyline: "Moneyline",
    spread: "Spread",
    total: "Total",
    prop: "Prop",
    derivative: "Derivative",
    outright: "Outright"
};
const rawSeasonGameCalendar = [
    {
        id: "season-mlb-20260402-lad-atl",
        sport: "MLB",
        league: "National League",
        event: "Los Angeles Dodgers at Atlanta Braves",
        commenceAt: "2026-04-02T23:20:00Z",
        venue: "Truist Park",
        watchNetwork: "ESPN",
        watchWindow: "Apr 2 · 7:20 PM ET",
        market: "First 5 moneyline",
        recommendation: "Dodgers F5 +127",
        bestPrice: "+127",
        bestBook: "Circa",
        edge: "+4.6%",
        confidence: "79/100",
        crowdTemperature: "Public Braves lean, sharp split on LAD F5",
        rationale: "Crowd chatter is overweighting Atlanta's full-game brand strength while lineup and starting-pitch shape are creating a cleaner first-five dog entry. The recommended bet leans into where the market is slowest to digest same-day lineup sentiment.",
        tags: [
            "Today",
            "Network ready",
            "Crowd fade"
        ],
        crowdSignals: [
            {
                source: "Beat reporters",
                signal: "Atlanta lineup downgrade in two lower-order spots",
                impact: "Supports F5 dog before retail reprices."
            },
            {
                source: "Ticket split",
                signal: "67% of public tickets are on ATL full game",
                impact: "Inflates the favorite while the derivative lags."
            },
            {
                source: "Search trend",
                signal: "Dodgers injury concern cooled over the last hour",
                impact: "Improves the dog case versus stale opener assumptions."
            }
        ]
    },
    {
        id: "season-nba-20260402-bos-nyk",
        sport: "NBA",
        league: "Eastern Conference",
        event: "Boston Celtics at New York Knicks",
        commenceAt: "2026-04-03T00:30:00Z",
        venue: "Madison Square Garden",
        watchNetwork: "TNT",
        watchWindow: "Apr 2 · 8:30 PM ET",
        market: "Spread",
        recommendation: "Celtics -4.5",
        bestPrice: "-4.5 -108",
        bestBook: "Pinnacle",
        edge: "+6.8%",
        confidence: "92/100",
        crowdTemperature: "Heavy favorite tickets, quieter sharp buy confirmation",
        rationale: "The crowd is loud on Boston, but the recommendation is not following noise alone. Rotation signals, beat-reporter injury context, and respected-book repricing all say the fair number is still longer than the posted spread, so the bet stays with the favorite rather than fading public action blindly.",
        tags: [
            "Today",
            "Prime time",
            "Sharp confirmation"
        ],
        crowdSignals: [
            {
                source: "Ticket split",
                signal: "68% of tickets on Boston",
                impact: "Confirms public direction but not enough on its own."
            },
            {
                source: "Handle split",
                signal: "59% of larger money still landed on the Knicks",
                impact: "Prevents overconfidence and keeps stake sizing disciplined."
            },
            {
                source: "Beat reporters",
                signal: "Knicks bench minutes restriction firmed up pregame",
                impact: "Raises Boston's fair spread more than the public narrative implies."
            }
        ]
    },
    {
        id: "season-soccer-20260409-rma-bay",
        sport: "Soccer",
        league: "UEFA Champions League",
        event: "Real Madrid vs Bayern Munich",
        commenceAt: "2026-04-09T19:00:00Z",
        venue: "Santiago Bernabeu",
        watchNetwork: "CBS / Paramount+",
        watchWindow: "Apr 9 · 3:00 PM ET",
        market: "Total goals",
        recommendation: "Over 2.5",
        bestPrice: "+104",
        bestBook: "Bet365",
        edge: "+5.1%",
        confidence: "84/100",
        crowdTemperature: "Creator buzz on Madrid side, sharper interest on total",
        rationale: "Crowd-sourced event traffic is clustering around the side because Madrid content is driving fan attention, but exchange tape and search acceleration are landing on chance creation instead. That pushes the recommendation to the over, where the crowd is providing useful context without forcing the wrong market.",
        tags: [
            "Exchange lead",
            "Broadcast anchor",
            "Narrative intercept"
        ],
        crowdSignals: [
            {
                source: "Exchange tape",
                signal: "Totals moved 70 to 90 seconds before retail books",
                impact: "Supports the over before consensus price catches up."
            },
            {
                source: "Search trend",
                signal: "Attacking matchup queries spiked after lineup rumors",
                impact: "Adds evidence that the total matters more than the side."
            },
            {
                source: "Creator monitor",
                signal: "Fan channels are over-indexing Madrid ML narratives",
                impact: "Creates distraction that keeps the total softer for longer."
            }
        ]
    },
    {
        id: "season-mma-20260418-topuria-volk",
        sport: "MMA",
        league: "UFC",
        event: "Topuria vs Volkanovski",
        commenceAt: "2026-04-19T03:00:00Z",
        venue: "T-Mobile Arena",
        watchNetwork: "ESPN+ PPV",
        watchWindow: "Apr 18 · 11:00 PM ET",
        market: "Fight goes distance",
        recommendation: "Yes +118",
        bestPrice: "+118",
        bestBook: "DraftKings",
        edge: "+4.2%",
        confidence: "88/100",
        crowdTemperature: "Finish hype is outpacing price discipline",
        rationale: "Crowd sources are flooding toward finish props after fight-week clips and weigh-in narratives, but the distance market is still lagging the smarter read on pace and durability. The recommendation exploits where crowd emotion is strongest and market efficiency is weakest.",
        tags: [
            "PPV",
            "Crowd overreaction",
            "Method-market edge"
        ],
        crowdSignals: [
            {
                source: "YouTube monitor",
                signal: "Most high-reach previews are framing an early knockout",
                impact: "Pushes retail finish money too aggressively."
            },
            {
                source: "Subreddit scan",
                signal: "Distance bettors remain a minority despite technical matchup support",
                impact: "Leaves plus money available longer than expected."
            },
            {
                source: "Handle split",
                signal: "Larger bets are less aggressive on finish than public slips",
                impact: "Supports the contrarian distance angle."
            }
        ]
    },
    {
        id: "season-golf-20260412-masters-final",
        sport: "Golf",
        league: "Masters",
        event: "Masters Final Round Leaderboard",
        commenceAt: "2026-04-12T18:30:00Z",
        venue: "Augusta National",
        watchNetwork: "CBS",
        watchWindow: "Apr 12 · 2:30 PM ET",
        market: "Outright winner",
        recommendation: "Scheffler +640",
        bestPrice: "+640",
        bestBook: "FanDuel",
        edge: "+2.9%",
        confidence: "74/100",
        crowdTemperature: "Star-name support is high, but still below modeled course-fit fair",
        rationale: "Golf crowd sourcing is useful here because weather-wave chatter and creator picks are lifting the outright board before the broadcast window. The recommendation remains selective: course-fit and live leaderboard pressure still justify Scheffler at this price despite the obvious public attention.",
        tags: [
            "Sunday final",
            "Broadcast marquee",
            "Leaderboard pressure"
        ],
        crowdSignals: [
            {
                source: "Creator monitor",
                signal: "Top golf channels are backing Scheffler but not at current offshore prices",
                impact: "Confirms interest while highlighting price sensitivity."
            },
            {
                source: "Search trend",
                signal: "Weather-wave searches rose after tee-time release",
                impact: "Improves confidence in morning-to-afternoon scoring split."
            },
            {
                source: "Forum consensus",
                signal: "Public sentiment is fragmented outside the top two names",
                impact: "Keeps the outright board less efficient deeper into the final round."
            }
        ]
    },
    {
        id: "season-tennis-20260517-sabalenka-swiatek",
        sport: "Tennis",
        league: "WTA Rome Final",
        event: "Sabalenka vs Swiatek",
        commenceAt: "2026-05-17T15:00:00Z",
        venue: "Foro Italico",
        watchNetwork: "Tennis Channel",
        watchWindow: "May 17 · 11:00 AM ET",
        market: "Set 1 total",
        recommendation: "Over 9.5 games",
        bestPrice: "+102",
        bestBook: "Bet365",
        edge: "+3.3%",
        confidence: "77/100",
        crowdTemperature: "Favorite talk is heavy, early-set market less crowded",
        rationale: "Crowd coverage is concentrated on the match winner, but the sharper opportunity sits in the first-set total where serve-hold expectations remain underpriced. Social chatter helps identify favorite inflation, then the recommendation pivots into the less crowded derivative.",
        tags: [
            "Clay season",
            "Derivative angle",
            "Matchup edge"
        ],
        crowdSignals: [
            {
                source: "Betting forums",
                signal: "Public discussion is tilted toward Swiatek straight sets",
                impact: "Keeps first-set over pricing softer than the matchup suggests."
            },
            {
                source: "Match analytics channels",
                signal: "Serve-hold clips emphasize longer opening exchanges",
                impact: "Supports the early-set over thesis."
            },
            {
                source: "Search trend",
                signal: "Heavy interest in player form, limited focus on derivative markets",
                impact: "Reduces crowd efficiency in the set-total market."
            }
        ]
    },
    {
        id: "season-nba-20260614-finals-g4",
        sport: "NBA",
        league: "NBA Finals",
        event: "Denver Nuggets at Boston Celtics",
        commenceAt: "2026-06-15T00:30:00Z",
        venue: "TD Garden",
        watchNetwork: "ABC",
        watchWindow: "Jun 14 · 8:30 PM ET",
        market: "Game total",
        recommendation: "Under 214.5",
        bestPrice: "214.5 -108",
        bestBook: "Circa",
        edge: "+3.4%",
        confidence: "82/100",
        crowdTemperature: "Finals overs are drawing casual attention, pace signals disagree",
        rationale: "Championship broadcasts pull in casual over money, and that crowd bias is a usable input when possession counts and half-court efficiency point the other way. The recommendation fades the TV-driven scoring narrative rather than the teams themselves.",
        tags: [
            "Finals",
            "TV inflation",
            "Pace suppression"
        ],
        crowdSignals: [
            {
                source: "Ticket split",
                signal: "Overs drawing more than 70% of small slips",
                impact: "Suggests a broadcast-driven pricing tax."
            },
            {
                source: "Handle split",
                signal: "Larger wagers remain more balanced than public slips",
                impact: "Keeps the under viable rather than overcrowded."
            },
            {
                source: "Studio narrative monitor",
                signal: "Pregame coverage is leaning into star scoring props",
                impact: "Adds to the overpricing on the total."
            }
        ]
    },
    {
        id: "season-mlb-20260711-nyy-lad",
        sport: "MLB",
        league: "Interleague",
        event: "New York Yankees at Los Angeles Dodgers",
        commenceAt: "2026-07-12T00:15:00Z",
        venue: "Dodger Stadium",
        watchNetwork: "FOX",
        watchWindow: "Jul 11 · 8:15 PM ET",
        market: "Team total",
        recommendation: "Dodgers over 4.5 runs",
        bestPrice: "4.5 -105",
        bestBook: "FanDuel",
        edge: "+3.1%",
        confidence: "76/100",
        crowdTemperature: "Star-power game, side market crowded, team total still clean",
        rationale: "The national-broadcast crowd will crowd the side and the headline stars, but the team-total market is better aligned with bullpen strain and park conditions. The recommendation uses crowd attention as cover to attack a derivative with less efficient pricing.",
        tags: [
            "National TV",
            "Derivative pivot",
            "Bullpen edge"
        ],
        crowdSignals: [
            {
                source: "Search trend",
                signal: "Most traffic is around MVP names and home-run props",
                impact: "Leaves team totals less crowded."
            },
            {
                source: "Beat reporters",
                signal: "Dodgers lineup confirmation strengthened top-six run creation",
                impact: "Supports the over before the derivative fully moves."
            },
            {
                source: "Consensus feed",
                signal: "Public picks remain split on the side",
                impact: "Keeps derivative pricing from over-correcting."
            }
        ]
    },
    {
        id: "season-cfb-20260829-bama-fsu",
        sport: "College Football",
        league: "SEC vs ACC Kickoff",
        event: "Alabama vs Florida State",
        commenceAt: "2026-08-30T00:00:00Z",
        venue: "Mercedes-Benz Stadium",
        watchNetwork: "ABC",
        watchWindow: "Aug 29 · 8:00 PM ET",
        market: "1st half spread",
        recommendation: "Alabama -3.5 1H",
        bestPrice: "-3.5 -110",
        bestBook: "Circa",
        edge: "+3.8%",
        confidence: "81/100",
        crowdTemperature: "Brand-name crowd on full game, sharper edge in early script",
        rationale: "Season-opening crowd sentiment will be driven by helmet brands and offseason hype, but early-script advantages are showing up more clearly than full-game power ratings. The recommendation uses the first-half market where crowd sentiment is less precise and the coaching edge is more actionable.",
        tags: [
            "Season opener",
            "Script edge",
            "Broadcast window"
        ],
        crowdSignals: [
            {
                source: "Camp reports",
                signal: "Alabama tempo and install feedback stayed positive through the final scrimmage cycle",
                impact: "Supports an early-game edge before depth takes over."
            },
            {
                source: "Social monitor",
                signal: "Public narrative is over-weighting FSU transfer upside",
                impact: "Helps keep the 1H number manageable."
            },
            {
                source: "Ticket split",
                signal: "Full-game tickets are more balanced than first-half slips",
                impact: "Leaves the derivative softer than the main line."
            }
        ]
    },
    {
        id: "season-nfl-20260913-buf-nyj",
        sport: "NFL",
        league: "AFC East",
        event: "Buffalo Bills at New York Jets",
        commenceAt: "2026-09-13T17:00:00Z",
        venue: "MetLife Stadium",
        watchNetwork: "CBS",
        watchWindow: "Sep 13 · 1:00 PM ET",
        market: "Game total",
        recommendation: "Under 45.5",
        bestPrice: "45.5 -108",
        bestBook: "Circa",
        edge: "+3.7%",
        confidence: "83/100",
        crowdTemperature: "Fantasy-driven over sentiment, weather tape points lower",
        rationale: "NFL crowd sources are loudest when fantasy expectations and highlight narratives point to scoring, but the weather desk and pace model still favor the under. The recommendation explicitly uses current fan excitement as a contrary signal when it disconnects from the environmental setup.",
        tags: [
            "Opening month",
            "Weather desk",
            "Crowd fade"
        ],
        crowdSignals: [
            {
                source: "Fantasy trend monitor",
                signal: "High-volume player-prop interest is clustering on passing overs",
                impact: "Adds tax to game-over sentiment."
            },
            {
                source: "Weather desk",
                signal: "Wind projection is rising into Sunday morning",
                impact: "Supports the under before mainstream coverage adjusts."
            },
            {
                source: "Handle split",
                signal: "Larger wagers are already leaning under",
                impact: "Improves confidence that the crowd is overvaluing scoring."
            }
        ]
    },
    {
        id: "season-motorsport-20261018-usgp",
        sport: "Motorsport",
        league: "Formula 1",
        event: "United States Grand Prix",
        commenceAt: "2026-10-18T19:00:00Z",
        venue: "Circuit of the Americas",
        watchNetwork: "ABC / ESPN+",
        watchWindow: "Oct 18 · 3:00 PM ET",
        market: "Podium finish",
        recommendation: "Norris podium -105",
        bestPrice: "-105",
        bestBook: "Bet365",
        edge: "+2.7%",
        confidence: "73/100",
        crowdTemperature: "Winner market crowded, podium layer still efficient enough to attack",
        rationale: "Broadcast chatter in F1 tends to over-focus on the winner narrative, which creates better value in podium and matchup markets. The recommendation uses crowd attention from qualifying and social clips, then steps into the less congested podium layer.",
        tags: [
            "Qualifying carryover",
            "Broadcast lift",
            "Derivative edge"
        ],
        crowdSignals: [
            {
                source: "Qualifying buzz",
                signal: "Clip circulation is centered on pole drama rather than race pace",
                impact: "Leaves podium pricing slightly behind true race distribution."
            },
            {
                source: "Fan sentiment",
                signal: "Public outrights are crowding the top favorite aggressively",
                impact: "Improves relative value deeper in the board."
            },
            {
                source: "Race-pace analysts",
                signal: "Long-run degradation models rate Norris better than the crowd expects",
                impact: "Supports the podium instead of the outrights."
            }
        ]
    },
    {
        id: "season-cfb-20261114-osu-psu",
        sport: "College Football",
        league: "Big Ten",
        event: "Ohio State at Penn State",
        commenceAt: "2026-11-14T17:00:00Z",
        venue: "Beaver Stadium",
        watchNetwork: "FOX",
        watchWindow: "Nov 14 · 12:00 PM ET",
        market: "Game total",
        recommendation: "Over 51.5",
        bestPrice: "51.5 -102",
        bestBook: "FanDuel",
        edge: "+3.0%",
        confidence: "75/100",
        crowdTemperature: "Defensive-brand perception is keeping the total short",
        rationale: "The crowd still prices these brands like slow, defensive slugfests, but offensive efficiency and explosive-play rates support a higher total. The recommendation leans into where fan memory is outdated relative to the current season profile.",
        tags: [
            "Big Noon",
            "Narrative lag",
            "Explosive-play edge"
        ],
        crowdSignals: [
            {
                source: "Consensus content",
                signal: "Most previews are framing this as a field-position game",
                impact: "Keeps the total lower than current efficiency merits."
            },
            {
                source: "Tempo model",
                signal: "Recent game scripts show faster neutral pace than public perception",
                impact: "Supports the over thesis."
            },
            {
                source: "Search trend",
                signal: "Quarterback form queries spiked after the prior week",
                impact: "Signals rising offensive confidence not yet priced fully."
            }
        ]
    },
    {
        id: "season-nfl-20261122-phi-dal",
        sport: "NFL",
        league: "NFC East",
        event: "Philadelphia Eagles at Dallas Cowboys",
        commenceAt: "2026-11-23T01:20:00Z",
        venue: "AT&T Stadium",
        watchNetwork: "NBC",
        watchWindow: "Nov 22 · 8:20 PM ET",
        market: "Player prop",
        recommendation: "Lamb over 7.5 receptions",
        bestPrice: "Over 7.5 +100",
        bestBook: "DraftKings",
        edge: "+2.8%",
        confidence: "72/100",
        crowdTemperature: "Side and total saturated, target-share prop still live",
        rationale: "Primetime crowd action overwhelms the side and total, so the sharper angle is moving into a reception prop that still benefits from projected game script. Current social buzz around the rivalry helps identify volume expectations without making the prop itself too efficient.",
        tags: [
            "SNF",
            "Prop angle",
            "Script-driven"
        ],
        crowdSignals: [
            {
                source: "Fantasy trend monitor",
                signal: "Target-share talk is elevated but mostly tied to touchdown props",
                impact: "Leaves reception volume more attackable."
            },
            {
                source: "Beat reporters",
                signal: "Dallas mismatch plans are emphasizing quick-game usage",
                impact: "Supports reception volume versus deeper-yardage markets."
            },
            {
                source: "Handle split",
                signal: "Large wagers are avoiding the side while leaning into correlated props",
                impact: "Validates the derivative direction."
            }
        ]
    },
    {
        id: "season-cbb-20261212-duke-kansas",
        sport: "College Basketball",
        league: "Champions Classic",
        event: "Duke vs Kansas",
        commenceAt: "2026-12-12T23:00:00Z",
        venue: "United Center",
        watchNetwork: "ESPN",
        watchWindow: "Dec 12 · 7:00 PM ET",
        market: "Spread",
        recommendation: "Kansas +4.5",
        bestPrice: "+4.5 -105",
        bestBook: "Pinnacle",
        edge: "+3.6%",
        confidence: "78/100",
        crowdTemperature: "Brand-name tax favoring Duke in standalone TV spot",
        rationale: "Early-season college basketball crowd sentiment is very brand-sensitive, especially in standalone ESPN windows. The recommendation takes Kansas plus the points because crowd attention is inflating Duke more than the matchup deserves.",
        tags: [
            "Standalone",
            "Brand tax",
            "Underdog value"
        ],
        crowdSignals: [
            {
                source: "Consensus feed",
                signal: "Public picks are clustering around Duke's recruiting narrative",
                impact: "Adds a modest tax to the favorite."
            },
            {
                source: "Film rooms",
                signal: "Kansas half-court defense is grading better than the public expects",
                impact: "Supports taking the points rather than chasing the favorite."
            },
            {
                source: "Search trend",
                signal: "Most attention is on freshman star props, not matchup fit",
                impact: "Keeps the spread from correcting fully."
            }
        ]
    },
    {
        id: "season-nfl-20261220-bal-cin",
        sport: "NFL",
        league: "AFC North",
        event: "Baltimore Ravens at Cincinnati Bengals",
        commenceAt: "2026-12-20T18:00:00Z",
        venue: "Paycor Stadium",
        watchNetwork: "CBS",
        watchWindow: "Dec 20 · 1:00 PM ET",
        market: "Moneyline",
        recommendation: "Ravens -118",
        bestPrice: "-118",
        bestBook: "BetMGM",
        edge: "+2.5%",
        confidence: "71/100",
        crowdTemperature: "Highlight bias is lifting the home dog beyond fair",
        rationale: "Late-season rivalry games create highlight-driven crowd narratives, especially around home underdogs. The recommendation still prefers Baltimore because current injury depth, trench matchup data, and sharper money all point to a slightly stronger favorite than the market is posting.",
        tags: [
            "Late season",
            "Rivalry",
            "Moneyline edge"
        ],
        crowdSignals: [
            {
                source: "Highlight monitor",
                signal: "Recent Bengals scoring clips are driving underdog enthusiasm",
                impact: "Makes the home dog slightly richer than fair."
            },
            {
                source: "Injury desk",
                signal: "Ravens depth chart stabilized earlier than expected",
                impact: "Improves the favorite case beneath the crowd narrative."
            },
            {
                source: "Handle split",
                signal: "Higher-limit money remains modestly on Baltimore",
                impact: "Keeps confidence above the headline ticket split."
            }
        ]
    },
    {
        id: "season-soccer-20261227-ars-liv",
        sport: "Soccer",
        league: "Premier League",
        event: "Arsenal vs Liverpool",
        commenceAt: "2026-12-27T16:30:00Z",
        venue: "Emirates Stadium",
        watchNetwork: "USA Network / Peacock",
        watchWindow: "Dec 27 · 11:30 AM ET",
        market: "Both teams to score",
        recommendation: "Yes -118",
        bestPrice: "-118",
        bestBook: "Pinnacle",
        edge: "+2.9%",
        confidence: "74/100",
        crowdTemperature: "Title-race side narratives are overshadowing the cleaner BTTS angle",
        rationale: "Holiday soccer coverage pushes most crowd discussion into side and title-race narratives, but the better value is in both teams to score. Current chance-creation form and public fixation on the match winner create the kind of distortion El Jefe wants to exploit.",
        tags: [
            "Holiday fixture",
            "BTTS",
            "Narrative pivot"
        ],
        crowdSignals: [
            {
                source: "Search trend",
                signal: "Title-race searches surged after the prior fixture list",
                impact: "Concentrates public focus on the side."
            },
            {
                source: "Creator monitor",
                signal: "Most preview content is debating the winner, not the scoring profile",
                impact: "Leaves BTTS pricing relatively cleaner."
            },
            {
                source: "xG trend desks",
                signal: "Both clubs are carrying strong recent chance-creation form",
                impact: "Supports BTTS as the stronger market."
            }
        ]
    }
];
const seasonGameCalendar = rawSeasonGameCalendar.filter((game)=>game.commenceAt >= operatorDateAnchor && game.commenceAt <= operatorSeasonEnd).sort((left, right)=>left.commenceAt.localeCompare(right.commenceAt));
function isSeasonWindow(value) {
    return [
        "today",
        "next-30",
        "summer",
        "football",
        "full-year"
    ].includes(value);
}
function isSeasonMarketFamily(value) {
    return [
        "moneyline",
        "spread",
        "total",
        "prop",
        "derivative",
        "outright"
    ].includes(value);
}
function getSeasonMarketFamily(game) {
    const market = game.market.toLowerCase();
    if (market.includes("outright")) {
        return "outright";
    }
    if (market.includes("moneyline")) {
        return "moneyline";
    }
    if (market.includes("spread")) {
        return "spread";
    }
    if (market.includes("total")) {
        return "total";
    }
    if (market.includes("prop")) {
        return "prop";
    }
    return "derivative";
}
function matchesSeasonWindow(game, window) {
    const commenceAt = new Date(game.commenceAt);
    const anchor = new Date(operatorDateAnchor);
    switch(window){
        case "today":
            {
                return game.watchWindow.startsWith("Apr 2");
            }
        case "next-30":
            {
                const end = new Date(anchor);
                end.setUTCDate(end.getUTCDate() + 30);
                return commenceAt >= anchor && commenceAt <= end;
            }
        case "summer":
            {
                return commenceAt >= new Date("2026-06-01T00:00:00Z") && commenceAt <= new Date("2026-08-31T23:59:59Z");
            }
        case "football":
            {
                return [
                    "NFL",
                    "College Football"
                ].includes(game.sport);
            }
        case "full-year":
        default:
            return true;
    }
}
function filterSeasonGameCards(games, filters) {
    const sport = filters?.sport?.trim();
    const query = filters?.query?.trim().toLowerCase();
    const window = filters?.window ?? "full-year";
    const network = filters?.network?.trim();
    const marketFamily = filters?.marketFamily;
    return games.filter((game)=>{
        const sportMatch = !sport || sport === "All" || game.sport.toLowerCase() === sport.toLowerCase();
        const windowMatch = matchesSeasonWindow(game, window);
        const networkMatch = !network || network === "All" || game.watchNetwork === network;
        const marketFamilyMatch = !marketFamily || getSeasonMarketFamily(game) === marketFamily;
        const queryMatch = !query || [
            game.event,
            game.league,
            game.market,
            seasonMarketFamilyLabels[getSeasonMarketFamily(game)],
            game.recommendation,
            game.watchNetwork,
            game.bestBook,
            game.rationale,
            game.tags.join(" "),
            game.crowdSignals.map((signal)=>`${signal.source} ${signal.signal} ${signal.impact}`).join(" ")
        ].join(" ").toLowerCase().includes(query);
        return sportMatch && windowMatch && networkMatch && marketFamilyMatch && queryMatch;
    });
}
function getSeasonGameCards(filters) {
    return filterSeasonGameCards(seasonGameCalendar, filters);
}
function getSeasonGameFilterOptions(games) {
    const networkCounts = new Map();
    const marketFamilyCounts = new Map();
    for (const game of games){
        networkCounts.set(game.watchNetwork, (networkCounts.get(game.watchNetwork) ?? 0) + 1);
        const marketFamily = getSeasonMarketFamily(game);
        marketFamilyCounts.set(marketFamily, (marketFamilyCounts.get(marketFamily) ?? 0) + 1);
    }
    return {
        networks: [
            ...networkCounts.entries()
        ].sort((left, right)=>left[0].localeCompare(right[0])).map(([value, count])=>({
                value,
                count
            })),
        marketFamilies: [
            ...marketFamilyCounts.entries()
        ].sort((left, right)=>seasonMarketFamilyLabels[left[0]].localeCompare(seasonMarketFamilyLabels[right[0]])).map(([value, count])=>({
                value,
                count
            }))
    };
}
}),
"[project]/lib/odds-api.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * The Odds API client — fetches real odds from real sportsbooks.
 * https://the-odds-api.com/liveAPI/guides/v4/
 *
 * Set ODDS_API_KEY in env to activate. Without it, the app falls back to site-data.
 */ __turbopack_context__.s([
    "getRealEvent",
    ()=>getRealEvent,
    "getRealEvents",
    ()=>getRealEvents,
    "getRealMarketDetail",
    ()=>getRealMarketDetail,
    "getRealMarkets",
    ()=>getRealMarkets,
    "getRealSchedule",
    ()=>getRealSchedule,
    "getRealStats",
    ()=>getRealStats,
    "isOddsApiConfigured",
    ()=>isOddsApiConfigured
]);
// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const BASE = "https://api.the-odds-api.com/v4";
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes — keeps free-tier usage reasonable
function getApiKey() {
    return process.env.ODDS_API_KEY;
}
function isOddsApiConfigured() {
    return Boolean(getApiKey());
}
// ---------------------------------------------------------------------------
// Sport mapping
// ---------------------------------------------------------------------------
const SPORT_KEYS = {
    NBA: [
        "basketball_nba"
    ],
    NFL: [
        "americanfootball_nfl"
    ],
    MLB: [
        "baseball_mlb"
    ],
    NHL: [
        "icehockey_nhl"
    ],
    Soccer: [
        "soccer_epl",
        "soccer_usa_mls",
        "soccer_uefa_champs_league",
        "soccer_spain_la_liga",
        "soccer_germany_bundesliga"
    ],
    MMA: [
        "mma_mixed_martial_arts"
    ],
    Tennis: [
        "tennis_atp_aus_open",
        "tennis_wta_aus_open",
        "tennis_atp_french_open",
        "tennis_wta_french_open",
        "tennis_atp_us_open",
        "tennis_wta_us_open",
        "tennis_atp_wimbledon",
        "tennis_wta_wimbledon"
    ],
    Golf: [
        "golf_masters_tournament_winner",
        "golf_pga_championship_winner",
        "golf_us_open_winner"
    ]
};
const SPORT_KEY_TO_DISPLAY = {};
for (const [display, keys] of Object.entries(SPORT_KEYS)){
    for (const k of keys){
        SPORT_KEY_TO_DISPLAY[k] = display;
    }
}
// Which sport keys to actually request. We'll discover active ones dynamically.
const PRIORITY_SPORTS = [
    "basketball_nba",
    "americanfootball_nfl",
    "baseball_mlb",
    "icehockey_nhl",
    "soccer_epl",
    "soccer_usa_mls",
    "soccer_uefa_champs_league",
    "mma_mixed_martial_arts"
];
const oddsCache = new Map();
const scoresCache = new Map();
let activeSportsCache = null;
function isFresh(entry) {
    return entry != null && Date.now() - entry.fetchedAt < CACHE_TTL_MS;
}
// ---------------------------------------------------------------------------
// Fetchers
// ---------------------------------------------------------------------------
async function apiFetch(path) {
    const key = getApiKey();
    if (!key) throw new Error("ODDS_API_KEY not set");
    const sep = path.includes("?") ? "&" : "?";
    const url = `${BASE}${path}${sep}apiKey=${key}`;
    const res = await fetch(url, {
        next: {
            revalidate: 300
        }
    });
    if (!res.ok) {
        throw new Error(`Odds API ${res.status}: ${res.statusText} — ${path}`);
    }
    // Log remaining quota in dev
    const remaining = res.headers.get("x-requests-remaining");
    const used = res.headers.get("x-requests-used");
    if (("TURBOPACK compile-time value", "development") === "development" && remaining) {
        console.log(`[odds-api] quota: ${used} used, ${remaining} remaining`);
    }
    return res.json();
}
/** Discover which sports are currently active on The Odds API. */ async function getActiveSportKeys() {
    if (isFresh(activeSportsCache)) return activeSportsCache.data;
    try {
        const all = await apiFetch("/sports");
        const active = all.filter((s)=>s.active && !s.has_outrights).map((s)=>s.key).filter((k)=>k in SPORT_KEY_TO_DISPLAY);
        // Also include priority sports not yet returned (outrights, etc.)
        const outright = all.filter((s)=>s.active && s.has_outrights).map((s)=>s.key).filter((k)=>k in SPORT_KEY_TO_DISPLAY);
        const combined = [
            ...new Set([
                ...active,
                ...outright
            ])
        ];
        activeSportsCache = {
            data: combined,
            fetchedAt: Date.now()
        };
        return combined;
    } catch (err) {
        console.error("[odds-api] failed to fetch sports:", err);
        return PRIORITY_SPORTS;
    }
}
/** Fetch odds for a single sport key. */ async function fetchOddsForSport(sportKey) {
    const cached = oddsCache.get(sportKey);
    if (isFresh(cached)) return cached.data;
    try {
        const events = await apiFetch(`/sports/${sportKey}/odds?regions=us,eu&markets=h2h,spreads,totals&oddsFormat=american`);
        oddsCache.set(sportKey, {
            data: events,
            fetchedAt: Date.now()
        });
        return events;
    } catch (err) {
        console.error(`[odds-api] failed to fetch odds for ${sportKey}:`, err);
        return oddsCache.get(sportKey)?.data ?? [];
    }
}
/** Fetch scores for a single sport key. */ async function fetchScoresForSport(sportKey) {
    const cached = scoresCache.get(sportKey);
    if (isFresh(cached)) return cached.data;
    try {
        const scores = await apiFetch(`/sports/${sportKey}/scores?daysFrom=1`);
        scoresCache.set(sportKey, {
            data: scores,
            fetchedAt: Date.now()
        });
        return scores;
    } catch (err) {
        console.error(`[odds-api] failed to fetch scores for ${sportKey}:`, err);
        return scoresCache.get(sportKey)?.data ?? [];
    }
}
// ---------------------------------------------------------------------------
// Odds math helpers
// ---------------------------------------------------------------------------
/** American odds → implied probability (no vig removal). */ function americanToImplied(odds) {
    if (odds > 0) return 100 / (odds + 100);
    return Math.abs(odds) / (Math.abs(odds) + 100);
}
/** American odds → decimal odds for display. */ function americanToDecimal(odds) {
    if (odds > 0) return odds / 100 + 1;
    return 100 / Math.abs(odds) + 1;
}
/** Remove vig from a two-outcome market to get fair probabilities. */ function removeVig(probA, probB) {
    const total = probA + probB;
    return [
        probA / total,
        probB / total
    ];
}
/** Fair probability → American odds. */ function fairProbToAmerican(p) {
    if (p >= 0.5) return Math.round(-100 * p / (1 - p));
    return Math.round(100 * (1 - p) / p);
}
function formatAmerican(odds) {
    return odds > 0 ? `+${odds}` : `${odds}`;
}
/** Time until commence relative to now. */ function timeUntil(commenceTime) {
    const diff = new Date(commenceTime).getTime() - Date.now();
    if (diff < 0) return "Live";
    if (diff < 60_000) return "< 1 min";
    if (diff < 3600_000) return `${Math.round(diff / 60_000)}m`;
    if (diff < 86400_000) {
        const h = Math.floor(diff / 3600_000);
        const m = Math.round(diff % 3600_000 / 60_000);
        return m > 0 ? `${h}h ${m}m` : `${h}h`;
    }
    const d = Math.floor(diff / 86400_000);
    return `${d}d`;
}
/** League display from sport_key. */ function leagueFrom(sportKey, sportTitle) {
    const map = {
        basketball_nba: "NBA",
        americanfootball_nfl: "NFL",
        baseball_mlb: "MLB",
        icehockey_nhl: "NHL",
        soccer_epl: "English Premier League",
        soccer_usa_mls: "MLS",
        soccer_uefa_champs_league: "UEFA Champions League",
        soccer_spain_la_liga: "La Liga",
        soccer_germany_bundesliga: "Bundesliga",
        mma_mixed_martial_arts: "UFC / MMA"
    };
    return map[sportKey] ?? sportTitle;
}
// ---------------------------------------------------------------------------
// Sharp book identification — Pinnacle is the benchmark
// ---------------------------------------------------------------------------
function findSharpBook(bookmakers) {
    return bookmakers.find((b)=>b.key === "pinnacle") ?? bookmakers.find((b)=>b.key === "betfair_ex_eu");
}
// ---------------------------------------------------------------------------
// Transform: OddsEvent[] → MarketBoardEntry[]
// ---------------------------------------------------------------------------
function eventToMarketEntries(event) {
    const entries = [];
    const sport = SPORT_KEY_TO_DISPLAY[event.sport_key] ?? event.sport_title;
    const league = leagueFrom(event.sport_key, event.sport_title);
    const eventLabel = `${event.away_team} at ${event.home_team}`;
    const startsIn = timeUntil(event.commence_time);
    const sharpBook = findSharpBook(event.bookmakers);
    // For each market type, find the best line across all books
    const marketTypes = [
        "h2h",
        "spreads",
        "totals"
    ];
    const marketLabels = {
        h2h: "Moneyline",
        spreads: "Spread",
        totals: "Total"
    };
    for (const mktKey of marketTypes){
        // Collect all book offerings for this market
        const offerings = [];
        for (const bm of event.bookmakers){
            const mkt = bm.markets.find((m)=>m.key === mktKey);
            if (!mkt) continue;
            for (const outcome of mkt.outcomes){
                offerings.push({
                    book: bm.title,
                    outcome,
                    bookKey: bm.key
                });
            }
        }
        if (offerings.length === 0) continue;
        // Find sharp (Pinnacle) line for fair value
        const sharpMkt = sharpBook?.markets.find((m)=>m.key === mktKey);
        // Group offerings by selection (team name or Over/Under)
        const bySelection = new Map();
        for (const o of offerings){
            const key = mktKey === "totals" ? o.outcome.name === "Over" ? "Over" : "Under" : o.outcome.name;
            const list = bySelection.get(key) ?? [];
            list.push(o);
            bySelection.set(key, list);
        }
        // For each selection, find the best line (highest American odds = best for bettor)
        for (const [selection, selOfferings] of bySelection){
            // Skip "Under" for totals — we'll surface Over as the primary
            // Skip the home team for h2h — surface the favorite (lower odds = higher implied prob)
            if (mktKey === "h2h" && selection === event.home_team) {
            // Include both sides for moneylines
            }
            // Sort: best price for the bettor = highest American odds
            // For negative odds: -105 is better than -115
            // For positive odds: +150 is better than +130
            selOfferings.sort((a, b)=>b.outcome.price - a.outcome.price);
            const best = selOfferings[0];
            const bestPrice = best.outcome.price;
            // Compute fair value from sharp book
            let fairPrice = bestPrice;
            let edgePct = 0;
            if (sharpMkt) {
                const sharpOutcome = sharpMkt.outcomes.find((o)=>o.name === best.outcome.name);
                if (sharpOutcome) {
                    const bestImplied = americanToImplied(bestPrice);
                    const sharpImplied = americanToImplied(sharpOutcome.price);
                    // Remove vig from sharp book
                    const otherOutcome = sharpMkt.outcomes.find((o)=>o.name !== best.outcome.name);
                    if (otherOutcome) {
                        const [fairProb] = removeVig(sharpImplied, americanToImplied(otherOutcome.price));
                        fairPrice = fairProbToAmerican(fairProb);
                        edgePct = (1 / bestImplied - 1 / (fairProb || 0.5)) * 100;
                        if (!isFinite(edgePct)) edgePct = 0;
                    }
                }
            }
            // Only surface lines with positive edge
            if (edgePct < 0.5) continue;
            // Build line display
            let bestLineDisplay;
            if (mktKey === "spreads" && best.outcome.point != null) {
                const pt = best.outcome.point > 0 ? `+${best.outcome.point}` : `${best.outcome.point}`;
                bestLineDisplay = `${selection} ${pt} (${formatAmerican(bestPrice)})`;
            } else if (mktKey === "totals" && best.outcome.point != null) {
                bestLineDisplay = `${selection} ${best.outcome.point} (${formatAmerican(bestPrice)})`;
            } else {
                bestLineDisplay = `${selection} ${formatAmerican(bestPrice)}`;
            }
            // Confidence from edge magnitude and book agreement
            const booksWithLine = new Set(selOfferings.map((o)=>o.book));
            const bookAgreement = Math.min(booksWithLine.size / event.bookmakers.length, 1);
            const confidence = Math.min(Math.round(50 + edgePct * 8 + bookAgreement * 30), 99);
            // Trigger — what's driving this edge
            let trigger = "Price discrepancy";
            if (edgePct > 5) trigger = "Sharp-retail gap";
            else if (selOfferings.length > 4) trigger = "Multi-book edge";
            else if (startsIn === "Live") trigger = "Live market lag";
            entries.push({
                id: `${event.id}-${mktKey}-${selection.toLowerCase().replace(/\s+/g, "-")}`,
                sport,
                league,
                event: eventLabel,
                market: marketLabels[mktKey] ?? mktKey,
                bestLine: bestLineDisplay,
                fair: formatAmerican(fairPrice),
                edge: `+${edgePct.toFixed(1)}%`,
                trigger,
                confidence: `${confidence}/100`,
                books: [
                    ...booksWithLine
                ].slice(0, 4),
                startsIn
            });
        }
    }
    // Sort by edge descending
    entries.sort((a, b)=>parseFloat(b.edge) - parseFloat(a.edge));
    return entries;
}
// ---------------------------------------------------------------------------
// Transform: OddsEvent → EventSnapshot
// ---------------------------------------------------------------------------
function eventToSnapshot(event, scores) {
    const sport = SPORT_KEY_TO_DISPLAY[event.sport_key] ?? event.sport_title;
    const league = leagueFrom(event.sport_key, event.sport_title);
    const eventLabel = `${event.away_team} at ${event.home_team}`;
    const startsIn = timeUntil(event.commence_time);
    const sharpBook = findSharpBook(event.bookmakers);
    // Score bug
    let scoreBug = startsIn === "Live" ? "In progress" : `Starts in ${startsIn}`;
    let status = startsIn === "Live" ? "Live" : "Pregame";
    if (scores?.scores) {
        const home = scores.scores.find((s)=>s.name === event.home_team);
        const away = scores.scores.find((s)=>s.name === event.away_team);
        if (home && away) {
            scoreBug = `${away.name.split(" ").pop()} ${away.score} · ${home.name.split(" ").pop()} ${home.score}`;
        }
        if (scores.completed) {
            status = "Final";
            scoreBug += " (Final)";
        }
    }
    // Find favorite from h2h
    let favorite = "Pick";
    let favoriteEdge = 0;
    const h2hBooks = event.bookmakers.filter((b)=>b.markets.some((m)=>m.key === "h2h"));
    if (h2hBooks.length > 0) {
        // Use sharp book if available
        const refBook = sharpBook ?? h2hBooks[0];
        const h2h = refBook.markets.find((m)=>m.key === "h2h");
        if (h2h) {
            const favOutcome = h2h.outcomes.reduce((a, b)=>a.price < b.price ? a : b);
            favorite = `${favOutcome.name} ${formatAmerican(favOutcome.price)}`;
        }
    }
    // Find total from sharp book
    let total = "N/A";
    const refTotals = (sharpBook ?? event.bookmakers[0])?.markets.find((m)=>m.key === "totals");
    if (refTotals) {
        const overOutcome = refTotals.outcomes.find((o)=>o.name === "Over");
        if (overOutcome?.point) total = `${overOutcome.point}`;
    }
    // Find spread from sharp book
    let spreadDisplay = "";
    const refSpreads = (sharpBook ?? event.bookmakers[0])?.markets.find((m)=>m.key === "spreads");
    if (refSpreads) {
        const favSpread = refSpreads.outcomes.reduce((a, b)=>(a.point ?? 0) < (b.point ?? 0) ? a : b);
        if (favSpread.point != null) {
            spreadDisplay = `${favSpread.name} ${favSpread.point > 0 ? "+" : ""}${favSpread.point}`;
        }
    }
    // Tags
    const tags = [];
    if (startsIn === "Live") tags.push("Live");
    if (spreadDisplay) tags.push("Spread available");
    if (parseFloat(total) > 0) tags.push("Total available");
    // Build market snapshots from each market type
    const markets = [];
    for (const mktKey of [
        "spreads",
        "h2h",
        "totals"
    ]){
        const mktLabel = {
            spreads: "Spread",
            h2h: "Moneyline",
            totals: "Total"
        };
        // Collect book-by-book lines
        const bookLines = [];
        let bestEdge = 0;
        let bestSelection = "";
        let fairDisplay = "N/A";
        // Get sharp reference
        const sharpMkt = sharpBook?.markets.find((m)=>m.key === mktKey);
        for (const bm of event.bookmakers.slice(0, 6)){
            const mkt = bm.markets.find((m)=>m.key === mktKey);
            if (!mkt) continue;
            for (const outcome of mkt.outcomes){
                let lineDisplay;
                if (mktKey === "spreads" && outcome.point != null) {
                    lineDisplay = `${outcome.point > 0 ? "+" : ""}${outcome.point}`;
                } else if (mktKey === "totals") {
                    lineDisplay = `${outcome.name} ${outcome.point ?? ""}`.trim();
                } else {
                    lineDisplay = outcome.name;
                }
                bookLines.push({
                    book: bm.title,
                    selection: outcome.name,
                    line: lineDisplay,
                    price: formatAmerican(outcome.price),
                    movement: "Current"
                });
                // Compute edge vs sharp for this outcome
                if (sharpMkt) {
                    const sharpOutcome = sharpMkt.outcomes.find((o)=>o.name === outcome.name);
                    if (sharpOutcome) {
                        const bestImplied = americanToImplied(outcome.price);
                        const sharpImplied = americanToImplied(sharpOutcome.price);
                        const otherSharp = sharpMkt.outcomes.find((o)=>o.name !== outcome.name);
                        if (otherSharp) {
                            const [fairProb] = removeVig(sharpImplied, americanToImplied(otherSharp.price));
                            const edge = (1 / bestImplied - 1 / (fairProb || 0.5)) * 100;
                            if (isFinite(edge) && edge > bestEdge) {
                                bestEdge = edge;
                                bestSelection = outcome.name;
                                fairDisplay = formatAmerican(fairProbToAmerican(fairProb));
                            }
                        }
                    }
                }
            }
        }
        if (bookLines.length === 0) continue;
        const confidence = Math.min(Math.round(50 + bestEdge * 8 + bookLines.length / 12 * 30), 99);
        markets.push({
            key: mktKey,
            label: mktLabel[mktKey] ?? mktKey,
            recommendation: bestEdge > 1 ? bestSelection : `Review ${mktLabel[mktKey]}`,
            fair: fairDisplay,
            edge: bestEdge > 0.5 ? `+${bestEdge.toFixed(1)}%` : "Minimal",
            confidence: `${confidence}/100`,
            summary: bestEdge > 3 ? `Edge detected: ${bestSelection} offers value versus the sharp market.` : bestEdge > 1 ? `Slight lean toward ${bestSelection} but monitor for movement.` : `Market is efficiently priced across books.`,
            books: bookLines.slice(0, 6)
        });
    }
    // Model edge — best edge found across all markets
    const topEdge = markets.reduce((max, m)=>{
        const e = parseFloat(m.edge);
        return isFinite(e) && e > max ? e : max;
    }, 0);
    // Gather analytics from book data
    const bookCount = event.bookmakers.length;
    return {
        id: event.id,
        sport,
        league,
        event: eventLabel,
        startsIn,
        status,
        venue: "—",
        headline: topEdge > 3 ? `Positive edge detected across ${markets.length} market types from ${bookCount} books.` : `Market efficiently priced. ${bookCount} books reporting.`,
        favorite: spreadDisplay || favorite,
        total,
        scoreBug,
        tags,
        analytics: {
            modelEdge: topEdge > 0 ? `+${topEdge.toFixed(1)}%` : "Minimal",
            publicBetSplit: "—",
            sharpMoney: sharpBook ? `Pinnacle pricing available` : "No sharp reference",
            volatility: topEdge > 5 ? "High" : topEdge > 2 ? "Medium" : "Low",
            bankroll: topEdge > 4 ? "1.25u max" : topEdge > 2 ? "1.0u max" : "0.5u max",
            marketState: startsIn === "Live" ? "In-play" : "Pre-event"
        },
        trend: [],
        propAngles: [],
        markets
    };
}
async function getRealMarkets(filters) {
    if (!isOddsApiConfigured()) return [];
    const sportKeys = await getActiveSportKeys();
    // Filter to requested sport if provided
    const targetKeys = filters?.sport ? sportKeys.filter((k)=>SPORT_KEY_TO_DISPLAY[k]?.toLowerCase() === filters.sport.toLowerCase()) : sportKeys;
    // Fetch odds for each sport (sequential to be kind to rate limits)
    const allEntries = [];
    for (const key of targetKeys){
        const events = await fetchOddsForSport(key);
        for (const event of events){
            allEntries.push(...eventToMarketEntries(event));
        }
    }
    // Apply text query filter
    if (filters?.query) {
        const q = filters.query.toLowerCase();
        return allEntries.filter((e)=>e.event.toLowerCase().includes(q) || e.market.toLowerCase().includes(q) || e.sport.toLowerCase().includes(q) || e.books.some((b)=>b.toLowerCase().includes(q)));
    }
    // Sort by edge descending
    allEntries.sort((a, b)=>parseFloat(b.edge) - parseFloat(a.edge));
    return allEntries;
}
async function getRealMarketDetail(id) {
    // The ID format is "{eventId}-{marketKey}-{selection}"
    const parts = id.split("-");
    if (parts.length < 3) return null;
    // Find the event across cached data
    for (const [, cached] of oddsCache){
        const event = cached.data.find((e)=>id.startsWith(e.id));
        if (event) {
            const entries = eventToMarketEntries(event);
            const entry = entries.find((e)=>e.id === id);
            if (!entry) return null;
            // Build a detail from the event data
            const sharpBook = findSharpBook(event.bookmakers);
            return {
                id,
                thesis: `Edge exists between the best available price and the sharp market (${sharpBook?.title ?? "benchmark"}). The ${entry.market.toLowerCase()} is trading at ${entry.bestLine} while fair value sits at ${entry.fair}.`,
                execution: `Target the best available line from ${entry.books[0] ?? "available books"} before the market corrects.`,
                sourceSignals: [
                    sharpBook ? `${sharpBook.title} benchmark` : "Multi-book comparison",
                    `${entry.books.length} books offering`,
                    entry.trigger
                ],
                timingWindow: entry.startsIn === "Live" ? "Immediate" : `Before ${entry.startsIn}`,
                risk: "Line movement or late information could close the gap before execution."
            };
        }
    }
    return null;
}
async function getRealEvents(filters) {
    if (!isOddsApiConfigured()) return [];
    const sportKeys = await getActiveSportKeys();
    const targetKeys = filters?.sport ? sportKeys.filter((k)=>SPORT_KEY_TO_DISPLAY[k]?.toLowerCase() === filters.sport.toLowerCase()) : sportKeys;
    const allEvents = [];
    for (const key of targetKeys){
        const [odds, scores] = await Promise.all([
            fetchOddsForSport(key),
            fetchScoresForSport(key)
        ]);
        for (const event of odds){
            const scoreData = scores.find((s)=>s.id === event.id);
            allEvents.push(eventToSnapshot(event, scoreData));
        }
    }
    // Sort: live first, then by commence time
    allEvents.sort((a, b)=>{
        if (a.status === "Live" && b.status !== "Live") return -1;
        if (b.status === "Live" && a.status !== "Live") return 1;
        return 0;
    });
    return allEvents;
}
async function getRealEvent(id) {
    for (const [sportKey, cached] of oddsCache){
        const event = cached.data.find((e)=>e.id === id);
        if (event) {
            const scores = scoresCache.get(sportKey)?.data ?? [];
            const scoreData = scores.find((s)=>s.id === id);
            return eventToSnapshot(event, scoreData);
        }
    }
    // Not in cache — try fetching all active sports
    if (isOddsApiConfigured()) {
        const allEvents = await getRealEvents();
        return allEvents.find((e)=>e.id === id) ?? null;
    }
    return null;
}
async function getRealSchedule() {
    if (!isOddsApiConfigured()) return [];
    const sportKeys = await getActiveSportKeys();
    const schedule = [];
    for (const key of sportKeys){
        const events = await fetchOddsForSport(key);
        for (const event of events){
            schedule.push({
                id: event.id,
                sport: SPORT_KEY_TO_DISPLAY[event.sport_key] ?? event.sport_title,
                league: leagueFrom(event.sport_key, event.sport_title),
                event: `${event.away_team} at ${event.home_team}`,
                commenceAt: event.commence_time,
                homeTeam: event.home_team,
                awayTeam: event.away_team,
                bookmakerCount: event.bookmakers.length
            });
        }
    }
    schedule.sort((a, b)=>new Date(a.commenceAt).getTime() - new Date(b.commenceAt).getTime());
    return schedule;
}
async function getRealStats() {
    if (!isOddsApiConfigured()) {
        return {
            bookCount: 0,
            eventCount: 0,
            marketCount: 0,
            edgeCount: 0,
            sports: []
        };
    }
    const sportKeys = await getActiveSportKeys();
    const books = new Set();
    let eventCount = 0;
    let marketCount = 0;
    let edgeCount = 0;
    const sports = new Set();
    for (const key of sportKeys){
        const events = await fetchOddsForSport(key);
        eventCount += events.length;
        for (const event of events){
            sports.add(SPORT_KEY_TO_DISPLAY[event.sport_key] ?? event.sport_title);
            for (const bm of event.bookmakers){
                books.add(bm.key);
                marketCount += bm.markets.length;
            }
            // Count edges
            const entries = eventToMarketEntries(event);
            edgeCount += entries.length;
        }
    }
    return {
        bookCount: books.size,
        eventCount,
        marketCount,
        edgeCount,
        sports: [
            ...sports
        ]
    };
}
}),
"[project]/lib/season-feed.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSeasonFeedForSport",
    ()=>getSeasonFeedForSport,
    "getSeasonFeedSnapshot",
    ()=>getSeasonFeedSnapshot,
    "isVerifiedSeasonField",
    ()=>isVerifiedSeasonField,
    "isVerifiedSeasonSource",
    ()=>isVerifiedSeasonSource
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/site-data.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$odds$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/odds-api.ts [app-route] (ecmascript)");
;
;
function getSeasonFeedStaleMinutes() {
    const value = Number(process.env.SEASON_FEED_STALE_MINUTES ?? "180");
    return Number.isFinite(value) && value > 0 ? value : 180;
}
function isStaleTimestamp(lastUpdated) {
    const timestamp = Date.parse(lastUpdated);
    if (Number.isNaN(timestamp)) {
        return false;
    }
    return Date.now() - timestamp > getSeasonFeedStaleMinutes() * 60 * 1000;
}
function isObject(value) {
    return typeof value === "object" && value !== null;
}
function getStringValue(record, keys) {
    for (const key of keys){
        const value = record[key];
        if (typeof value === "string" && value.trim()) {
            return value.trim();
        }
    }
    return "";
}
function getStringArrayValue(record, keys) {
    for (const key of keys){
        const value = record[key];
        if (Array.isArray(value)) {
            const strings = value.filter((item)=>typeof item === "string" && item.trim().length > 0).map((item)=>item.trim());
            if (strings.length) {
                return strings;
            }
        }
    }
    return [];
}
function formatWatchWindow(commenceAt) {
    const date = new Date(commenceAt);
    if (Number.isNaN(date.getTime())) {
        return "Schedule pending";
    }
    const monthDay = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        timeZone: "UTC"
    });
    const time = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "America/New_York"
    });
    return `${monthDay} · ${time} ET`;
}
function isVerifiedSeasonSource(source) {
    return source.mode === "live" && source.status !== "fallback";
}
function isVerifiedSeasonField(provenance, options) {
    if (provenance === "feed" || provenance === "overlay") {
        return true;
    }
    return Boolean(options?.allowDerived && provenance === "derived");
}
function countCoverage(games) {
    return {
        networkCoverage: games.filter((game)=>isVerifiedSeasonField(game.provenance?.watchNetwork)).length,
        crowdCoverage: games.filter((game)=>isVerifiedSeasonField(game.provenance?.crowdSignals) || isVerifiedSeasonField(game.provenance?.crowdTemperature)).length
    };
}
function createProvenance(overrides) {
    return {
        watchNetwork: "missing",
        watchWindow: "missing",
        crowdTemperature: "missing",
        rationale: "missing",
        crowdSignals: "missing",
        ...overrides
    };
}
function normalizeSeasonOverlay(value) {
    if (!isObject(value)) {
        return null;
    }
    const record = value;
    const id = getStringValue(record, [
        "id",
        "gameId",
        "eventId"
    ]);
    if (!id) {
        return null;
    }
    const watchNetwork = getStringValue(record, [
        "watchNetwork",
        "network",
        "broadcastNetwork",
        "channel"
    ]);
    const watchWindow = getStringValue(record, [
        "watchWindow",
        "broadcastWindow",
        "startLabel"
    ]);
    const crowdTemperature = getStringValue(record, [
        "crowdTemperature",
        "crowdSentiment",
        "sentiment",
        "crowd"
    ]);
    const rationale = getStringValue(record, [
        "rationale",
        "reasoning",
        "context",
        "summary"
    ]);
    const tags = getStringArrayValue(record, [
        "tags",
        "labels"
    ]);
    const crowdSignals = Array.isArray(record.crowdSignals) ? record.crowdSignals.filter((signal)=>isCrowdSignal(signal)) : Array.isArray(record.signals) ? record.signals.filter((signal)=>isCrowdSignal(signal)) : [];
    return {
        id,
        watchNetwork: watchNetwork || undefined,
        watchWindow: watchWindow || undefined,
        crowdTemperature: crowdTemperature || undefined,
        rationale: rationale || undefined,
        tags: tags.length ? tags : undefined,
        crowdSignals: crowdSignals.length ? crowdSignals : undefined
    };
}
function normalizeSeasonOverlayPayload(payload) {
    const records = Array.isArray(payload) ? payload : isObject(payload) && Array.isArray(payload.overlays) ? payload.overlays : [];
    return records.map((record)=>normalizeSeasonOverlay(record)).filter((record)=>Boolean(record));
}
async function getSeasonOverlayMap() {
    const endpoint = process.env.SEASON_CONTEXT_FEED_URL?.trim() ?? "";
    if (!endpoint) {
        return new Map();
    }
    try {
        const response = await fetch(endpoint, {
            headers: process.env.SEASON_FEED_TOKEN ? {
                Authorization: `Bearer ${process.env.SEASON_FEED_TOKEN}`
            } : undefined,
            next: {
                revalidate: 300
            }
        });
        if (!response.ok) {
            return new Map();
        }
        const payload = await response.json();
        return new Map(normalizeSeasonOverlayPayload(payload).map((overlay)=>[
                overlay.id,
                overlay
            ]));
    } catch  {
        return new Map();
    }
}
function applySeasonOverlays(games, overlays) {
    if (!overlays.size) {
        return games;
    }
    return games.map((game)=>{
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
                crowdSignals: overlay.crowdSignals ? "overlay" : game.provenance?.crowdSignals ?? "missing"
            })
        };
    });
}
function getFieldProvenance(value, fallback, sourceWhenPresent) {
    return value ? sourceWhenPresent : fallback ? "derived" : "missing";
}
function isCrowdSignal(value) {
    return isObject(value) && typeof value.source === "string" && typeof value.signal === "string" && typeof value.impact === "string";
}
function normalizeSeasonGameCard(value) {
    if (!isObject(value)) {
        return null;
    }
    const record = value;
    const tags = getStringArrayValue(record, [
        "tags",
        "labels"
    ]);
    const crowdSignals = Array.isArray(record.crowdSignals) ? record.crowdSignals.filter((signal)=>isCrowdSignal(signal)) : Array.isArray(record.signals) ? record.signals.filter((signal)=>isCrowdSignal(signal)) : null;
    const id = getStringValue(record, [
        "id",
        "gameId",
        "eventId"
    ]);
    const sport = getStringValue(record, [
        "sport",
        "sportKey",
        "sportTitle"
    ]);
    const league = getStringValue(record, [
        "league",
        "competition",
        "tournament",
        "leagueName"
    ]);
    const event = getStringValue(record, [
        "event",
        "title",
        "name",
        "matchup"
    ]);
    const commenceAt = getStringValue(record, [
        "commenceAt",
        "commence_at",
        "startTime",
        "start_time",
        "scheduledAt"
    ]);
    const venue = getStringValue(record, [
        "venue",
        "location",
        "stadium",
        "arena"
    ]);
    const watchNetwork = getStringValue(record, [
        "watchNetwork",
        "network",
        "broadcastNetwork",
        "channel"
    ]);
    const watchWindow = getStringValue(record, [
        "watchWindow",
        "broadcastWindow",
        "startLabel"
    ]);
    const market = getStringValue(record, [
        "market",
        "marketName",
        "marketType"
    ]);
    const recommendation = getStringValue(record, [
        "recommendation",
        "pick",
        "recommendedBet",
        "selection"
    ]);
    const bestPrice = getStringValue(record, [
        "bestPrice",
        "price",
        "odds"
    ]);
    const bestBook = getStringValue(record, [
        "bestBook",
        "book",
        "sportsbook",
        "operator"
    ]);
    const edge = getStringValue(record, [
        "edge",
        "edgePct",
        "expectedValue"
    ]);
    const confidence = getStringValue(record, [
        "confidence",
        "confidenceScore",
        "modelConfidence"
    ]);
    const crowdTemperature = getStringValue(record, [
        "crowdTemperature",
        "crowdSentiment",
        "sentiment",
        "crowd"
    ]);
    const rationale = getStringValue(record, [
        "rationale",
        "reasoning",
        "context",
        "summary"
    ]);
    if (!id || !sport || !league || !event || !commenceAt || !venue || !market || !recommendation || !bestPrice || !bestBook || !edge || !confidence || !crowdSignals) {
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
            crowdSignals: crowdSignals.length ? "feed" : "missing"
        })
    };
}
function normalizeSeasonFeedPayload(payload) {
    const records = Array.isArray(payload) ? payload : isObject(payload) && Array.isArray(payload.games) ? payload.games : [];
    return records.map((record)=>normalizeSeasonGameCard(record)).filter((record)=>Boolean(record)).filter((game)=>game.commenceAt >= __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["operatorDateAnchor"] && game.commenceAt <= __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["operatorSeasonEnd"]).sort((left, right)=>left.commenceAt.localeCompare(right.commenceAt));
}
function getUnavailableSnapshot(endpoint, reason) {
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
            crowdCoverage: 0
        }
    };
}
async function getScheduleFromOddsApi() {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$odds$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isOddsApiConfigured"])()) return null;
    try {
        const [schedule, markets] = await Promise.all([
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$odds$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRealSchedule"])(),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$odds$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRealMarkets"])()
        ]);
        if (schedule.length === 0) return null;
        // Build a lookup of market data by event ID prefix
        const marketByEvent = new Map();
        for (const m of markets){
            // Market IDs start with the event ID
            const eventId = m.id.split("-").slice(0, -2).join("-");
            const existing = marketByEvent.get(eventId);
            if (!existing || parseFloat(m.edge) > parseFloat(existing.edge)) {
                marketByEvent.set(eventId, m);
            }
        }
        const games = schedule.map((item)=>{
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
                rationale: topMarket ? `Best edge found: ${topMarket.edge} on ${topMarket.market} via ${topMarket.books[0] ?? "available books"}.` : "No edge data from odds feed.",
                tags: topMarket ? [
                    topMarket.trigger
                ] : [],
                crowdSignals: [],
                provenance: createProvenance({
                    watchNetwork: "missing",
                    watchWindow: "derived",
                    crowdTemperature: "missing",
                    rationale: topMarket ? "feed" : "missing",
                    crowdSignals: "missing"
                })
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
                crowdCoverage: coverage.crowdCoverage
            }
        };
    } catch (err) {
        console.error("[season-feed] failed to build schedule from odds API:", err);
        return null;
    }
}
async function getSeasonFeedSnapshot() {
    const endpoint = process.env.SEASON_FEED_URL?.trim() ?? "";
    if (!endpoint) {
        // Try building schedule from The Odds API if configured
        const oddsSchedule = await getScheduleFromOddsApi();
        if (oddsSchedule) return oddsSchedule;
        return getUnavailableSnapshot(null, "Configure ODDS_API_KEY or SEASON_FEED_URL to load schedule data.");
    }
    try {
        const response = await fetch(endpoint, {
            headers: process.env.SEASON_FEED_TOKEN ? {
                Authorization: `Bearer ${process.env.SEASON_FEED_TOKEN}`
            } : undefined,
            next: {
                revalidate: 300
            }
        });
        if (!response.ok) {
            return getUnavailableSnapshot(endpoint, `Remote feed responded with HTTP ${response.status}.`);
        }
        const payload = await response.json();
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
                crowdCoverage: coverage.crowdCoverage
            }
        };
    } catch  {
        return getUnavailableSnapshot(endpoint, "Remote feed request failed, so no verified schedule is available.");
    }
}
async function getSeasonFeedForSport(sport) {
    const snapshot = await getSeasonFeedSnapshot();
    return {
        games: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["filterSeasonGameCards"])(snapshot.games, {
            sport
        }),
        source: snapshot.source
    };
}
}),
"[project]/app/api/season-games/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/site-data.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$season$2d$feed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/season-feed.ts [app-route] (ecmascript)");
;
;
;
async function GET(request) {
    const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$season$2d$feed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSeasonFeedSnapshot"])();
    const sport = request.nextUrl.searchParams.get("sport") ?? undefined;
    const query = request.nextUrl.searchParams.get("query") ?? undefined;
    const network = request.nextUrl.searchParams.get("network") ?? undefined;
    const windowParam = request.nextUrl.searchParams.get("window");
    const marketFamilyParam = request.nextUrl.searchParams.get("marketFamily");
    const window = windowParam && (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSeasonWindow"])(windowParam) ? windowParam : undefined;
    const marketFamily = marketFamilyParam && (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSeasonMarketFamily"])(marketFamilyParam) ? marketFamilyParam : undefined;
    const optionSourceGames = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["filterSeasonGameCards"])(snapshot.games, {
        sport,
        query,
        window
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        games: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["filterSeasonGameCards"])(snapshot.games, {
            sport,
            query,
            window,
            network,
            marketFamily
        }),
        filters: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSeasonGameFilterOptions"])(optionSourceGames),
        source: snapshot.source
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__101fb42c._.js.map