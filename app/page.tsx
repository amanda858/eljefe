import Link from "next/link";
import { HomeIntro } from "@/components/home-intro";
import { GameTable, type GameTableRow } from "@/components/game-table";
import { RunningBullMark } from "@/components/running-bull-mark";
import { getBackendTodayGames } from "@/lib/backend-api";
import { getRealMarkets, isOddsApiConfigured } from "@/lib/odds-api";

type PreviewCard = {
    title: string;
    score: number;
    detail: string;
    href: string;
};

function clampScore(value: number) {
    return Math.max(60, Math.min(98, value));
}

function scoreFromPercent(value: string, base: number) {
    const numeric = parseFloat(value.replace("%", ""));

    if (Number.isNaN(numeric)) {
        return clampScore(base);
    }

    return clampScore(Math.round(numeric * 10 + base));
}

function buildFallbackCards(): PreviewCard[] {
    return [
        {
            title: "Lakers vs Suns",
            score: 72,
            detail: "Signal preview · awaiting live market feed",
            href: "/edges",
        },
        {
            title: "Yankees vs Red Sox",
            score: 64,
            detail: "Signal preview · awaiting live market feed",
            href: "/edges",
        },
        {
            title: "Chiefs vs Bills",
            score: 81,
            detail: "Signal preview · awaiting live market feed",
            href: "/edges",
        },
    ];
}

export default async function Home() {
    const todayGames = await getBackendTodayGames();
    const realMarkets = isOddsApiConfigured() ? await getRealMarkets() : [];
    const slateRows: GameTableRow[] = todayGames.map((game) => ({
        id: game.id,
        league: game.leagueCode,
        startsAt: new Date(game.startTime).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            timeZone: "America/New_York",
        }),
        matchup: `${game.awayTeam} at ${game.homeTeam}`,
        awayRecord: `${game.awayTeamProfile.abbr} ${game.awayTeamProfile.record}`,
        homeRecord: `${game.homeTeamProfile.abbr} ${game.homeTeamProfile.record}`,
        bestOdds: game.bestOdds,
        broadcastNetwork: game.broadcastNetwork,
        venue: game.venue,
        edgeSummary: game.edgeSummary,
        weatherSummary: game.weather ? `${game.weather.conditions} · ${game.weather.wind}` : "Indoor or weather neutral",
    }));

    const previewCards: PreviewCard[] = realMarkets.length > 0
        ? realMarkets
            .filter((market) => parseFloat(market.edge) > 0.5)
            .sort((left, right) => parseFloat(right.edge) - parseFloat(left.edge))
            .slice(0, 3)
            .map((market) => ({
                title: market.event,
                score: scoreFromPercent(market.edge, 30),
                detail: `${market.market} · ${market.startsIn}`,
                href: "/edges",
            }))
        : todayGames.length > 0
            ? todayGames.slice(0, 3).map((game) => ({
                title: `${game.awayTeam} vs ${game.homeTeam}`,
                score: scoreFromPercent(game.edgeSummary, 40),
                detail: new Date(game.startTime).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    timeZone: "America/New_York",
                }),
                href: `/game/${game.id}`,
            }))
            : buildFallbackCards();

    return (
        <main className="page-shell landing-page">
            <HomeIntro />

            <section className="landing-hero">
                <div className="landing-hero-top">
                    <div className="landing-logo-wrap">
                        <div className="landing-logo-bull">
                            <RunningBullMark className="landing-logo-bull-mark" />
                        </div>
                        <div className="landing-logo-text">EL JEFE SPORTS</div>
                    </div>
                </div>

                <div className="landing-hero-copy">
                    <p className="landing-hero-kicker">Real-time edge intelligence</p>
                    <h1 className="landing-hero-title">
                        <span className="landing-hero-title-red">Lead the herd.</span>
                        <br />
                        Take the book.
                    </h1>
                    <p className="landing-hero-sub">
                        When the bull charges, <span className="landing-hero-sub-red">the game changes.</span>
                        <br />
                        El Jefe turns live odds, momentum, and market behavior into one clear edge score before the books adjust.
                    </p>
                    <div className="landing-actions">
                        <Link className="landing-button landing-button-primary" href="#todays-edges">
                            See today&apos;s edges
                        </Link>
                        <Link className="landing-button landing-button-ghost" href="#how-it-works">
                            How El Jefe thinks
                        </Link>
                    </div>
                </div>
            </section>

            <section className="landing-explain" id="how-it-works">
                <div className="landing-section-heading">
                    <p className="landing-eyebrow">The edge is the truth the market hasn&apos;t priced yet.</p>
                    <h2>Make the market readable.</h2>
                </div>

                <div className="landing-pillars">
                    <article className="landing-pillar">
                        <h3>Speed</h3>
                        <p>Reads the market faster than humans can.</p>
                    </article>
                    <article className="landing-pillar">
                        <h3>Signal</h3>
                        <p>Filters noise from real movement.</p>
                    </article>
                    <article className="landing-pillar">
                        <h3>Strength</h3>
                        <p>Scores edges with clarity and confidence.</p>
                    </article>
                </div>
            </section>

            <section className="landing-preview" id="todays-edges">
                <div className="landing-section-heading">
                    <p className="landing-eyebrow">Today&apos;s edges</p>
                    <h2>Start where the numbers break first.</h2>
                </div>

                <div className="landing-cards">
                    {previewCards.map((card) => (
                        <article className="landing-card" key={`${card.title}-${card.score}`}>
                            <h3>{card.title}</h3>
                            <p className="landing-card-detail">{card.detail}</p>
                            <p className="landing-score">Edge Score: {card.score}</p>
                            <Link className="landing-card-button" href={card.href}>
                                View breakdown
                            </Link>
                        </article>
                    ))}
                </div>
            </section>

            <section className="content-section">
                <div className="section-heading">
                    <p className="eyebrow">Today&apos;s slate</p>
                    <h2>Records, venue context, weather, and direct drill-in for every live matchup.</h2>
                </div>
                <GameTable rows={slateRows} />
            </section>

            <section className="landing-footer-note">
                <p>El Jefe Sports © 2026</p>
                <p>Built to find the move before the book finishes the thought.</p>
            </section>
        </main>
    );
}
