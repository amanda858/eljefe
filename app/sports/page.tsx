import Link from "next/link";
import { GameTable } from "@/components/game-table";
import { getBackendTodayEdges, getBackendTodayGames } from "@/lib/backend-api";
import { getSeasonFeedSnapshot } from "@/lib/season-feed";
import { getRealEvents, getRealMarkets, getRealStats, isOddsApiConfigured } from "@/lib/odds-api";
import { mapEdgeToPreviewRow, mapGameToSlateRow } from "@/lib/slate-utils";
import { getSportHub, sportsUniverse } from "@/lib/site-data";

export default async function SportsIndexPage() {
    const seasonFeed = await getSeasonFeedSnapshot();
    const [todayGames, todayEdges] = await Promise.all([getBackendTodayGames(), getBackendTodayEdges()]);
    const hasRealOdds = isOddsApiConfigured();
    const [realMarkets, realEvents, realStats] = hasRealOdds
        ? await Promise.all([getRealMarkets(), getRealEvents(), getRealStats()])
        : [[], [], null];
    const slateRows = todayGames.map(mapGameToSlateRow);
    const featuredEdges = todayEdges.slice(0, 4).map(mapEdgeToPreviewRow);

    const totalActiveSports = new Set([...realMarkets.map((market) => market.sport), ...realEvents.map((event) => event.sport)]).size;

    const sportCards = sportsUniverse.map((sport) => {
        const hub = getSportHub(sport);
        const sportMarkets = realMarkets.filter((market) => market.sport.toLowerCase() === sport.toLowerCase());
        const sportEvents = realEvents.filter((event) => event.sport.toLowerCase() === sport.toLowerCase());
        const sportGames = seasonFeed.games.filter((game) => game.sport.toLowerCase() === sport.toLowerCase());
        const isLive = sportMarkets.length > 0 || sportEvents.length > 0;

        return {
            sport,
            title: hub?.title ?? `${sport} board`,
            lead: hub?.lead ?? `Open the ${sport} board for live markets, matchup review, and schedule coverage when feeds are available.`,
            badges: isLive ? ["Live board", `${sportMarkets.length} markets`, `${sportEvents.length} events`] : ["Awaiting odds feed", `${sportGames.length} scheduled games`, "No fake fallback"],
            metrics: [
                { label: "Markets", value: `${sportMarkets.length}` },
                { label: "Events", value: `${sportEvents.length}` },
                { label: "Calendar", value: `${sportGames.length}` },
            ],
            href: `/sports/${sport.toLowerCase()}`,
            status: isLive ? "live" : "offline",
        };
    });

    return (
        <main className="page-shell sports-shell">
            <section className="content-section">
                <div className="section-heading">
                    <p className="eyebrow">Sport coverage</p>
                    <h1 className="page-title">Every sport, real coverage status &mdash; no filler cards.</h1>
                    <p className="hero-text">Each card shows actual market inventory and schedule coverage from live feeds. If a board is not live yet, the card says that directly.</p>
                </div>
                <div className="summary-grid">
                    <article className="summary-card">
                        <p>Sports with live odds</p>
                        <h2>{totalActiveSports}</h2>
                        <span>{realStats ? `${realStats.marketCount.toLocaleString()} live book-market combinations loaded` : "No live odds feed connected"}</span>
                    </article>
                    <article className="summary-card">
                        <p>Upcoming events</p>
                        <h2>{realEvents.length}</h2>
                        <span>Only real event inventory is surfaced across sport hubs</span>
                    </article>
                    <article className="summary-card">
                        <p>Season games</p>
                        <h2>{seasonFeed.games.length}</h2>
                        <span>{seasonFeed.source.label} · {seasonFeed.source.status}</span>
                    </article>
                    <article className="summary-card">
                        <p>Operating rule</p>
                        <h2>Live only</h2>
                        <span>The index no longer pretends every sport is fully covered</span>
                    </article>
                </div>
                <div className="sports-hub-grid">
                    {sportCards.map((hub) => (
                        <Link className="sports-hub-card" href={hub.href} key={hub.sport}>
                            <div className="signal-card-top">
                                <p className="card-kicker">{hub.sport}</p>
                                <span className={`status-pill status-${hub.status}`}>{hub.status}</span>
                            </div>
                            <h3>{hub.title}</h3>
                            <p>{hub.lead}</p>
                            <div className="sports-hub-badges">
                                {hub.badges.map((badge) => (
                                    <span key={badge}>{badge}</span>
                                ))}
                            </div>
                            <div className="sports-metrics-grid">
                                {hub.metrics.map((metric) => (
                                    <article className="season-signal-card" key={metric.label}>
                                        <span>{metric.label}</span>
                                        <strong>{metric.value}</strong>
                                    </article>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="content-section">
                <div className="section-heading">
                    <p className="eyebrow">Featured live edges</p>
                    <h2>The strongest backend-reviewed positions across the board right now.</h2>
                </div>
                <div className="sports-hub-grid">
                    {featuredEdges.map((edge) => (
                        <article className="system-card" key={edge.id}>
                            <p className="card-kicker">{edge.sport} · {edge.edge}</p>
                            <h3>{edge.game}</h3>
                            <p>{edge.bestLine}</p>
                            <p className="market-detail-copy">{edge.recordSummary}</p>
                            <p className="market-detail-copy">{edge.weatherSummary}</p>
                            <p className="market-detail-copy">{edge.youtubeSummary}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="content-section">
                <div className="section-heading">
                    <p className="eyebrow">Today&apos;s slate</p>
                    <h2>Records, weather, and direct game drill-in across every tracked sport.</h2>
                </div>
                <GameTable rows={slateRows} />
            </section>
        </main>
    );
}