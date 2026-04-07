import Link from "next/link";
import { notFound } from "next/navigation";
import { EventCockpit } from "@/components/event-cockpit";
import { MarketBoard } from "@/components/market-board";
import { SeasonCommandBoard } from "@/components/season-command-board";
import { SportIntelFeed } from "@/components/sport-intel-feed";
import { getSeasonFeedForSport } from "@/lib/season-feed";
import { getSportHub, sportsUniverse } from "@/lib/site-data";
import { getRealMarkets, getRealEvents, isOddsApiConfigured } from "@/lib/odds-api";

type SportHubPageProps = {
    params: Promise<{
        sport: string;
    }>;
};

export default async function SportHubPage({ params }: SportHubPageProps) {
    const resolvedParams = await params;
    const sportName = decodeURIComponent(resolvedParams.sport);
    const hub = getSportHub(sportName);

    if (!hub) {
        notFound();
    }

    const hasRealOdds = isOddsApiConfigured();
    const [realMarkets, realEvents] = hasRealOdds
        ? await Promise.all([getRealMarkets({ sport: hub.sport }), getRealEvents({ sport: hub.sport })])
        : [[], []];

    const initialMarkets = realMarkets;
    const initialIntel = [];
    const sportEvents = realEvents;
    const seasonFeed = await getSeasonFeedForSport(hub.sport);

    return (
        <main className="page-shell sports-shell">
            <section className="content-section sports-hero">
                <div className="section-heading">
                    <p className="eyebrow">{hub.sport} hub</p>
                    <h1 className="page-title">{hub.title}</h1>
                    <p className="hero-text">{hub.lead}</p>
                </div>
                <div className="sports-hub-badges">
                    {hub.badges.map((badge) => (
                        <span key={badge}>{badge}</span>
                    ))}
                </div>
            </section>

            <section className="summary-grid sports-metrics-grid">
                {hub.metrics.map((metric) => (
                    <article className="summary-card" key={metric.label}>
                        <p>{metric.label}</p>
                        <h2>{metric.value}</h2>
                    </article>
                ))}
            </section>

            <section className="content-section sports-headlines">
                <div className="section-heading">
                    <p className="eyebrow">Market notes</p>
                    <h2>What matters most in this sport right now.</h2>
                </div>
                <div className="sports-hub-grid">
                    {hub.headlines.map((headline) => (
                        <article className="system-card" key={headline.title}>
                            <h3>{headline.title}</h3>
                            <p>{headline.detail}</p>
                        </article>
                    ))}
                </div>
            </section>

            <SportIntelFeed initialItems={initialIntel} sport={hub.sport} />

            <section className="content-section">
                <div className="section-heading">
                    <p className="eyebrow">Upcoming game selector</p>
                    <h2>Choose a live game and review the favorite, over, under, and book prices.</h2>
                </div>
                <EventCockpit initialEvents={sportEvents} initialSport={hub.sport} sports={sportsUniverse} />
            </section>

            <section className="content-section">
                <div className="section-heading">
                    <p className="eyebrow">Season command calendar</p>
                    <h2>Track {hub.sport} games with watch network and crowd-aware rationale when a real schedule feed is available.</h2>
                </div>
                <SeasonCommandBoard initialGames={seasonFeed.games} initialSource={seasonFeed.source} initialSport={hub.sport} sports={sportsUniverse} />
            </section>

            <section className="content-section">
                <div className="section-heading">
                    <p className="eyebrow">Market board</p>
                    <h2>Search and filter the live board for {hub.sport}.</h2>
                </div>
                <MarketBoard initialMarkets={initialMarkets} sports={sportsUniverse} />
            </section>

            <section className="content-section closing-section">
                <div>
                    <p className="eyebrow">Navigation</p>
                    <h2>Move across sports or return to the main command center.</h2>
                </div>
                <div className="closing-actions">
                    <Link className="button button-primary" href="/dashboard">
                        Open dashboard
                    </Link>
                    <Link className="button button-secondary" href="/sports">
                        View all sports
                    </Link>
                </div>
            </section>
        </main>
    );
}