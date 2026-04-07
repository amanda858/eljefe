import Link from "next/link";
import { getSeasonFeedSnapshot, isVerifiedSeasonSource } from "@/lib/season-feed";

function formatTimestamp(value: string) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "Unknown";
    }

    const monthDay = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        timeZone: "UTC",
    }).format(date);

    const time = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "UTC",
    }).format(date);

    return `${monthDay} ${time} UTC`;
}

export default async function StatusPage() {
    const seasonFeed = await getSeasonFeedSnapshot();
    const hasVerifiedSchedule = isVerifiedSeasonSource(seasonFeed.source);
    const isScheduleFeedConfigured = Boolean(process.env.SEASON_FEED_URL?.trim());
    const isContextFeedConfigured = Boolean(process.env.SEASON_CONTEXT_FEED_URL?.trim());
    const previewGames = seasonFeed.games.slice(0, 5);

    return (
        <main className="page-shell sports-shell">
            <section className="content-section subscribe-hero">
                <div className="section-heading">
                    <p className="eyebrow">System status</p>
                    <h1 className="page-title">Season feed health and coverage</h1>
                    <p className="hero-text">
                        This page shows whether a verified season schedule is configured, whether it is stale or unavailable,
                        and how much verified network and crowd context is currently attached.
                    </p>
                </div>
                <div className="closing-actions">
                    <Link className="button button-primary" href="/dashboard">
                        Open dashboard
                    </Link>
                    <Link className="button button-secondary" href="/api/status/season-feed">
                        Open JSON status
                    </Link>
                    <Link className="button button-secondary" href="/">
                        Back to site
                    </Link>
                </div>
            </section>

            <section className="summary-grid">
                <article className="summary-card">
                    <p>Feed status</p>
                    <h2>{hasVerifiedSchedule ? seasonFeed.source.status : "unverified"}</h2>
                    <span>{seasonFeed.source.label}</span>
                </article>
                <article className="summary-card">
                    <p>Games mapped</p>
                    <h2>{seasonFeed.source.gameCount}</h2>
                    <span>Season window inventory</span>
                </article>
                <article className="summary-card">
                    <p>Network coverage</p>
                    <h2>{seasonFeed.source.networkCoverage}</h2>
                    <span>Games with verified watch network</span>
                </article>
                <article className="summary-card">
                    <p>Crowd coverage</p>
                    <h2>{seasonFeed.source.crowdCoverage}</h2>
                    <span>Games with verified crowd context</span>
                </article>
            </section>

            <section className="dashboard-panels secondary-panels">
                <article className="dashboard-panel light-panel">
                    <div className="card-header light-header">
                        <p>Source detail</p>
                        <span>Provider state</span>
                    </div>
                    <div className="market-detail-stack">
                        <article className="market-detail-card">
                            <p className="card-kicker">Schedule feed configured</p>
                            <p className="market-detail-copy">{isScheduleFeedConfigured ? "Yes" : "No"}</p>
                        </article>
                        <article className="market-detail-card">
                            <p className="card-kicker">Context overlay configured</p>
                            <p className="market-detail-copy">{isContextFeedConfigured ? "Yes" : "No"}</p>
                        </article>
                        <article className="market-detail-card">
                            <p className="card-kicker">Last updated</p>
                            <p className="market-detail-copy">{formatTimestamp(seasonFeed.source.lastUpdated)}</p>
                        </article>
                        <article className="market-detail-card">
                            <p className="card-kicker">Endpoint</p>
                            <p className="market-detail-copy">{seasonFeed.source.endpoint ?? "Not configured"}</p>
                        </article>
                        <article className="market-detail-card market-signal-card">
                            <p className="card-kicker">Reason</p>
                            <p className="market-detail-copy">{seasonFeed.source.reason ?? "No active warning is attached."}</p>
                        </article>
                    </div>
                </article>

                <article className="dashboard-panel dark-panel">
                    <div className="card-header">
                        <p>Verified preview</p>
                        <span>{previewGames.length ? "First five verified games" : "No verified games available"}</span>
                    </div>
                    {previewGames.length ? (
                        <div className="watchlist-table">
                            {previewGames.map((game) => (
                                <div className="watchlist-row" key={game.id}>
                                    <div>
                                        <strong>{game.event}</strong>
                                        <span>{game.sport} · {game.market} · network {game.provenance?.watchNetwork ?? "unknown"}</span>
                                    </div>
                                    <div>
                                        <strong>{game.watchNetwork}</strong>
                                        <span>{game.crowdSignals.length ? `${game.crowdSignals.length} crowd signals · ${game.provenance?.crowdSignals ?? "unknown"}` : "No crowd overlay"}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <article className="season-empty-state">
                            <p className="card-kicker">No verified preview</p>
                            <h3>Season preview rows appear only after a working schedule feed returns real games.</h3>
                            <p className="market-detail-copy">Status still reports feed configuration and failure reasons so you can diagnose the missing source.</p>
                        </article>
                    )}
                </article>
            </section>
        </main>
    );
}