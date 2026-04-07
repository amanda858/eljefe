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
"[project]/app/api/events/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$odds$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/odds-api.ts [app-route] (ecmascript)");
;
;
async function GET(request) {
    const sport = request.nextUrl.searchParams.get("sport") ?? undefined;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$odds$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isOddsApiConfigured"])()) {
        const events = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$odds$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRealEvents"])({
            sport
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            events
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        events: []
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2846cabe._.js.map