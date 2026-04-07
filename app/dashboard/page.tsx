import Link from "next/link";
import { EventCockpit } from "@/components/event-cockpit";
import { GameTable } from "@/components/game-table";
import { MarketBoard } from "@/components/market-board";
import { SeasonCommandBoard } from "@/components/season-command-board";
import { ValueBetBoard } from "@/components/value-bet-board";
import { getBackendTodayEdges, getBackendTodayGames } from "@/lib/backend-api";
import { getSeasonFeedSnapshot } from "@/lib/season-feed";
import { mapEdgeToPreviewRow, mapGameToSlateRow } from "@/lib/slate-utils";
import { getValueEngineAccuracy, getValueEngineIntegration } from "@/lib/value-engine";
import { getRealMarkets, getRealEvents, getRealStats, isOddsApiConfigured } from "@/lib/odds-api";
import { sportsUniverse } from "@/lib/site-data";

export default async function DashboardPage() {
    const [todayGames, todayEdges] = await Promise.all([getBackendTodayGames(), getBackendTodayEdges()]);
    const valueEngine = await getValueEngineIntegration();
    const accuracy = await getValueEngineAccuracy();
    const seasonFeed = await getSeasonFeedSnapshot();

    const hasRealOdds = isOddsApiConfigured();
    const [realMarkets, realEvents, realStats] = hasRealOdds
        ? await Promise.all([getRealMarkets(), getRealEvents(), getRealStats()])
        : [[], [], null];

    const initialMarkets = realMarkets;
    const initialEvents = realEvents;
    const hasLiveOdds = realMarkets.length > 0 || realEvents.length > 0;
    const hasSeasonCoverage = seasonFeed.games.length > 0;
    const hasValueEngine = valueEngine.source === "service";
    const slateRows = todayGames.map(mapGameToSlateRow);
    const featuredEdges = todayEdges.slice(0, 4).map(mapEdgeToPreviewRow);

    const ribbon = realStats && realStats.bookCount > 0
        ? [
            `${realStats.bookCount} books reporting`,
            `${realStats.eventCount} events tracked`,
            `${realStats.edgeCount} edges surfaced`,
            `${realStats.sports.length} sports active`,
        ]
        : [
            "No seeded dashboard fallbacks",
            "Live boards stay empty until feeds connect",
            "Status surfaces show real system state",
            "Command center prioritizes workflow over filler",
        ];

    const dashSummaries = realStats && realStats.bookCount > 0
        ? [
            { label: "Books", value: `${realStats.bookCount}`, detail: "Sportsbooks with active odds feeds" },
            { label: "Events", value: `${realStats.eventCount}`, detail: "Games and matches with live pricing" },
            { label: "Markets", value: `${realStats.marketCount.toLocaleString()}`, detail: "Book-market combinations" },
            { label: "Edges", value: `${realStats.edgeCount}`, detail: "Positive EV opportunities" },
        ]
        : [
            { label: "Books", value: "0", detail: "No live sportsbook feed connected" },
            { label: "Events", value: "0", detail: "No real event inventory loaded" },
            { label: "Markets", value: "0", detail: "No synthetic line screen injected" },
            { label: "Edges", value: "0", detail: "No fake alert queue is shown" },
        ];

    const systemSignals = [
        {
            label: "Odds feed",
            status: hasLiveOdds ? "Live" : "Offline",
            detail: hasLiveOdds ? `${realMarkets.length} markets and ${realEvents.length} events are available across the boards.` : "Connect ODDS_API_KEY to populate the market and matchup boards.",
        },
        {
            label: "Season feed",
            status: hasSeasonCoverage ? "Live" : "Waiting",
            detail: hasSeasonCoverage ? `${seasonFeed.games.length} upcoming games are available in the command calendar.` : "Connect SEASON_FEED_URL for verified upcoming schedule coverage.",
        },
        {
            label: "Value engine",
            status: hasValueEngine ? "Ready" : "Offline",
            detail: hasValueEngine ? `${valueEngine.bets.length} recommendations loaded from the service.` : "Connect VALUE_ENGINE_URL to surface model output and live performance tracking.",
        },
    ];

    const workflowNotes = [
        {
            title: "Start with the market board",
            detail: "Scan books, totals, moneylines, and confidence in one place before drilling into a single matchup.",
        },
        {
            title: "Use the event cockpit for decision context",
            detail: "Once a game is worth opening, compare sides, totals, and books with the matchup-specific review surface.",
        },
        {
            title: "Keep the schedule and model accountable",
            detail: "The season feed and value engine belong beside the board so operations, timing, and performance stay visible together.",
        },
    ];

    return (
        <main className="dashboard-shell">
            <section className="ticker-strip dashboard-ticker" aria-label="dashboard summary tape">
                <div className="ticker-track">
                    {ribbon.map((item) => (
                        <span className="ticker-pill" key={item}>
                            {item}
                        </span>
                    ))}
                </div>
            </section>

            <header className="dashboard-header">
                <div>
                    <p className="eyebrow">Command center</p>
                    <h1>Real-time betting intelligence across every book.</h1>
                </div>
            </header>

            <section className="dashboard-feed-card">
                <div>
                    <p className="card-kicker">System state</p>
                    <h3>Aggregating odds, computing consensus, detecting edges.</h3>
                    <p className="market-detail-copy">
                        Odds, calendar, and predictive model services report real connectivity.
                        The dashboard surfaces market inefficiencies, not opinions.
                    </p>
                </div>
                <div className="dashboard-feed-card-actions">
                    <span className={`season-feed-badge season-feed-badge-${seasonFeed.source.status}`}>{seasonFeed.source.status}</span>
                    <Link className="button button-secondary" href="/status">
                        View status
                    </Link>
                </div>
            </section>

            <section className="summary-grid">
                {dashSummaries.map((item) => (
                    <article className="summary-card" key={item.label}>
                        <p>{item.label}</p>
                        <h2>{item.value}</h2>
                        <span>{item.detail}</span>
                    </article>
                ))}
            </section>

            <section className="dashboard-panels secondary-panels">
                <article className="dashboard-panel light-panel">
                    <div className="card-header light-header">
                        <p>Feed and model status</p>
                        <span>Live only</span>
                    </div>
                    <div className="signal-grid">
                        {systemSignals.map((signal) => (
                            <article className="signal-card" key={signal.label}>
                                <div className="signal-card-top">
                                    <p className="card-kicker">{signal.label}</p>
                                    <span className={`status-pill status-${signal.status.toLowerCase()}`}>{signal.status}</span>
                                </div>
                                <p className="market-detail-copy">{signal.detail}</p>
                            </article>
                        ))}
                    </div>
                </article>

                <article className="dashboard-panel dark-panel">
                    <div className="card-header">
                        <p>Command workflow</p>
                        <span>Operator-first</span>
                    </div>
                    <div className="market-detail-stack">
                        {workflowNotes.map((note) => (
                            <article className="market-detail-card" key={note.title}>
                                <p className="card-kicker">Workflow</p>
                                <h3>{note.title}</h3>
                                <p className="market-detail-copy">{note.detail}</p>
                            </article>
                        ))}
                    </div>
                </article>
            </section>

            <section className="dashboard-panels secondary-panels line-screen-layout">
                <article className="dashboard-panel light-panel interactive-board-panel">
                    <div className="card-header light-header">
                        <p>Line screen</p>
                        <span>Edges, totals, moneylines, confidence</span>
                    </div>
                    <MarketBoard initialMarkets={initialMarkets} sports={sportsUniverse} compact />
                </article>
            </section>

            <section className="dashboard-panels secondary-panels line-screen-layout">
                <article className="dashboard-panel dark-panel interactive-board-panel">
                    <div className="card-header">
                        <p>Upcoming game cockpit</p>
                        <span>Favorite, over-under, moneyline, best book</span>
                    </div>
                    <EventCockpit initialEvents={initialEvents} sports={sportsUniverse} compact />
                </article>
            </section>

            <section className="dashboard-panels secondary-panels">
                <article className="dashboard-panel light-panel interactive-board-panel">
                    <div className="card-header light-header">
                        <p>Season command calendar</p>
                        <span>Reviewed bets, confidence, watch network</span>
                    </div>
                    <SeasonCommandBoard initialGames={seasonFeed.games} initialSource={seasonFeed.source} sports={sportsUniverse} compact />
                </article>
            </section>

            <section className="dashboard-panels secondary-panels">
                <article className="dashboard-panel light-panel interactive-board-panel">
                    <div className="card-header light-header">
                        <p>Quant value board</p>
                        <span>Moneyline engine recommendations</span>
                    </div>
                    <ValueBetBoard
                        bets={valueEngine.bets}
                        performance={valueEngine.performance}
                        source={valueEngine.source}
                        modelVersion={valueEngine.modelVersion}
                        generatedAt={valueEngine.generatedAt}
                    />
                </article>
            </section>

            <section className="dashboard-panels secondary-panels">
                <article className="dashboard-panel light-panel">
                    <div className="card-header light-header">
                        <p>Backend edge queue</p>
                        <span>Records, weather, and YouTube signal context</span>
                    </div>
                    <div className="signal-grid">
                        {featuredEdges.map((edge) => (
                            <article className="signal-card" key={edge.id}>
                                <div className="signal-card-top">
                                    <p className="card-kicker">{edge.sport}</p>
                                    <span className="status-pill status-live">{edge.edgeScore}</span>
                                </div>
                                <h3>{edge.game}</h3>
                                <p className="market-detail-copy">{edge.bestLine}</p>
                                <p className="market-detail-copy">{edge.recordSummary}</p>
                                <p className="market-detail-copy">{edge.weatherSummary}</p>
                                <p className="market-detail-copy">{edge.youtubeSummary}</p>
                            </article>
                        ))}
                    </div>
                </article>
            </section>

            <section className="dashboard-panels secondary-panels">
                <article className="dashboard-panel light-panel interactive-board-panel">
                    <div className="card-header light-header">
                        <p>Today&apos;s slate</p>
                        <span>Direct drill-in with records and venue context</span>
                    </div>
                    <GameTable rows={slateRows} />
                </article>
            </section>

            <section className="dashboard-panels secondary-panels">
                <article className="dashboard-panel dark-panel">
                    <div className="card-header">
                        <p>Accuracy harness</p>
                        <span>{hasValueEngine ? `${accuracy.sampleCount} settled recommendations tracked` : "Unavailable until service is connected"}</span>
                    </div>
                    {hasValueEngine ? (
                        <>
                            <div className="metrics-strip metrics-grid value-bet-metrics">
                                <div>
                                    <strong>{(accuracy.ensemble.pickAccuracy * 100).toFixed(1)}%</strong>
                                    <span>Ensemble pick accuracy</span>
                                    <p>Binary winner accuracy against settled tracked recommendations.</p>
                                </div>
                                <div>
                                    <strong>{accuracy.ensemble.brierScore.toFixed(3)}</strong>
                                    <span>Ensemble Brier</span>
                                    <p>Lower is better. This measures probability quality, not just pick direction.</p>
                                </div>
                                <div>
                                    <strong>{accuracy.sportsbookFairBaseline.brierScore.toFixed(3)}</strong>
                                    <span>Book fair Brier</span>
                                    <p>No-vig book baseline captured at recommendation time, used to benchmark whether the model is adding signal.</p>
                                </div>
                                <div>
                                    <strong>{accuracy.ensemble.logLoss.toFixed(3)}</strong>
                                    <span>Ensemble log loss</span>
                                    <p>Penalizes overconfident misses harder than plain hit rate.</p>
                                </div>
                            </div>
                            <div className="market-detail-stack">
                                {accuracy.models.map((model) => (
                                    <article className="market-detail-card" key={model.modelName}>
                                        <p className="card-kicker">{model.modelName}</p>
                                        <h3>{(model.pickAccuracy * 100).toFixed(1)}% pick accuracy</h3>
                                        <p className="market-detail-copy">Brier {model.brierScore.toFixed(3)} · Log loss {model.logLoss.toFixed(3)} · Confidence gap {model.meanConfidenceGap.toFixed(3)}</p>
                                    </article>
                                ))}
                            </div>
                        </>
                    ) : (
                        <article className="season-empty-state">
                            <p className="card-kicker">No live accuracy feed</p>
                            <h3>The model harness stays empty until the recommendation service is connected.</h3>
                            <p className="market-detail-copy">This panel no longer pretends to have tracked accuracy when the live value engine is offline.</p>
                        </article>
                    )}
                </article>
            </section>
        </main>
    );
}