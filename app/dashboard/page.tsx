import Link from "next/link";
import { EventCockpit } from "@/components/event-cockpit";
import { MarketBoard } from "@/components/market-board";
import { SeasonCommandBoard } from "@/components/season-command-board";
import { ValueBetBoard } from "@/components/value-bet-board";
import { getSeasonFeedSnapshot } from "@/lib/season-feed";
import { getValueEngineAccuracy, getValueEngineIntegration } from "@/lib/value-engine";
import {
    dashboardAlerts,
    eventSnapshots,
    heroRibbon,
    marketDirectory,
    sportsUniverse,
    summaries,
} from "@/lib/site-data";

export default async function DashboardPage() {
    const valueEngine = await getValueEngineIntegration();
    const accuracy = await getValueEngineAccuracy();
    const seasonFeed = await getSeasonFeedSnapshot();

    return (
        <main className="dashboard-shell">
            <section className="ticker-strip dashboard-ticker" aria-label="live market tape">
                <div className="ticker-track">
                    {heroRibbon.map((item) => (
                        <span className="ticker-pill" key={item}>
                            {item}
                        </span>
                    ))}
                </div>
            </section>

            <header className="dashboard-header">
                <div>
                    <p className="eyebrow">El Jefe Dashboard</p>
                    <h1>Sharp market command center</h1>
                </div>
                <div className="closing-actions">
                    <Link className="button button-secondary" href="/status">
                        Status
                    </Link>
                    <Link className="button button-secondary" href="/">
                        Back to site
                    </Link>
                </div>
            </header>

            <section className="dashboard-feed-card">
                <div>
                    <p className="card-kicker">Season feed status</p>
                    <h3>{seasonFeed.source.label}</h3>
                    <p className="market-detail-copy">
                        {seasonFeed.source.status} · {seasonFeed.source.gameCount} games · networks {seasonFeed.source.networkCoverage}/{seasonFeed.source.gameCount} · crowd {seasonFeed.source.crowdCoverage}/{seasonFeed.source.gameCount}
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
                {summaries.map((item) => (
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
                        <p>Alert queue</p>
                        <span>High edge first</span>
                    </div>
                    <div className="alert-stack">
                        {dashboardAlerts.map((alert) => (
                            <article className="alert-card" key={alert.title}>
                                <div>
                                    <p className="alert-title">{alert.title}</p>
                                    <span>{alert.meta}</span>
                                </div>
                                <strong>{alert.edge}</strong>
                            </article>
                        ))}
                    </div>
                </article>

                <article className="dashboard-panel dark-panel">
                    <div className="card-header">
                        <p>How to use this board</p>
                        <span>Actionable only</span>
                    </div>
                    <div className="market-detail-stack">
                        <article className="market-detail-card">
                            <p className="card-kicker">Sides and moneylines</p>
                            <p className="market-detail-copy">Start with the reviewed side or moneyline, then compare the best current number before placing anything.</p>
                        </article>
                        <article className="market-detail-card">
                            <p className="card-kicker">Totals</p>
                            <p className="market-detail-copy">Check whether the current total still has edge or whether the move already closed the value.</p>
                        </article>
                        <article className="market-detail-card">
                            <p className="card-kicker">Confidence</p>
                            <p className="market-detail-copy">Use confidence to rank spots, not to force action. Higher confidence still needs the right price.</p>
                        </article>
                        <article className="market-detail-card">
                            <p className="card-kicker">Best number</p>
                            <p className="market-detail-copy">If the best book is gone, pass. A stale edge without the number is not a real edge.</p>
                        </article>
                    </div>
                </article>
            </section>

            <section className="dashboard-panels secondary-panels line-screen-layout">
                <article className="dashboard-panel light-panel interactive-board-panel">
                    <div className="card-header light-header">
                        <p>Line screen</p>
                        <span>Edges, totals, moneylines, confidence</span>
                    </div>
                    <MarketBoard initialMarkets={marketDirectory} sports={sportsUniverse} compact />
                </article>
            </section>

            <section className="dashboard-panels secondary-panels line-screen-layout">
                <article className="dashboard-panel dark-panel interactive-board-panel">
                    <div className="card-header">
                        <p>Upcoming game cockpit</p>
                        <span>Favorite, over-under, moneyline, best book</span>
                    </div>
                    <EventCockpit initialEvents={eventSnapshots} sports={sportsUniverse} compact />
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
                <article className="dashboard-panel dark-panel">
                    <div className="card-header">
                        <p>Accuracy harness</p>
                        <span>{accuracy.sampleCount} settled games in seeded backtest</span>
                    </div>
                    <div className="metrics-strip metrics-grid value-bet-metrics">
                        <div>
                            <strong>{(accuracy.ensemble.pickAccuracy * 100).toFixed(1)}%</strong>
                            <span>Ensemble pick accuracy</span>
                            <p>Binary winner accuracy against settled NBA moneyline outcomes.</p>
                        </div>
                        <div>
                            <strong>{accuracy.ensemble.brierScore.toFixed(3)}</strong>
                            <span>Ensemble Brier</span>
                            <p>Lower is better. This measures probability quality, not just pick direction.</p>
                        </div>
                        <div>
                            <strong>{accuracy.sportsbookFairBaseline.brierScore.toFixed(3)}</strong>
                            <span>Book fair Brier</span>
                            <p>No-vig closing market baseline used to benchmark whether the model is adding signal.</p>
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
                </article>
            </section>
        </main>
    );
}