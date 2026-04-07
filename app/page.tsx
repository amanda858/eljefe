import Link from "next/link";
import { GameTable, type GameTableRow } from "@/components/game-table";
import { getBackendTodayGames } from "@/lib/backend-api";
import { getRealMarkets, isOddsApiConfigured } from "@/lib/odds-api";

type BetCard = {
    title: string;
    score: number;
    detail: string;
    href: string;
    league?: string;
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

function getScoreClass(score: number) {
    if (score >= 80) return "bet-score-high";
    if (score >= 70) return "bet-score-mid";
    return "bet-score-low";
}

function buildFallbackCards(): BetCard[] {
    return [
        {
            title: "Lakers vs Suns",
            score: 72,
            detail: "Signal preview · awaiting live market feed",
            href: "/edges",
            league: "NBA",
        },
        {
            title: "Yankees vs Red Sox",
            score: 64,
            detail: "Signal preview · awaiting live market feed",
            href: "/edges",
            league: "MLB",
        },
        {
            title: "Chiefs vs Bills",
            score: 81,
            detail: "Signal preview · awaiting live market feed",
            href: "/edges",
            league: "NFL",
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

    const betCards: BetCard[] = realMarkets.length > 0
        ? realMarkets
            .filter((market) => parseFloat(market.edge) > 0.5)
            .sort((left, right) => parseFloat(right.edge) - parseFloat(left.edge))
            .slice(0, 6)
            .map((market) => ({
                title: market.event,
                score: scoreFromPercent(market.edge, 30),
                detail: `${market.market} · ${market.startsIn}`,
                href: "/edges",
            }))
        : todayGames.length > 0
            ? todayGames.slice(0, 6).map((game) => ({
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
                league: game.leagueCode,
            }))
            : buildFallbackCards();

    const todayDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        timeZone: "America/New_York",
    });

    return (
        <main className="page-shell bets-page">
            <section className="bets-page-header">
                <div className="bets-page-header-left">
                    <p className="bets-page-date">{todayDate}</p>
                    <h1 className="bets-page-title">Today&apos;s Best Bets</h1>
                    <p className="bets-page-sub">
                        {betCards.length} value plays surfaced · edge-ranked, model-verified
                    </p>
                </div>
                <div className="bets-page-header-right">
                    <Link className="bets-cta-button" href="/edges">
                        Full Command Center
                    </Link>
                    <Link className="bets-cta-button bets-cta-secondary" href="/dashboard">
                        Dashboard
                    </Link>
                </div>
            </section>

            <section className="bets-grid-section">
                <div className="bets-section-label">
                    <span className="bets-section-dot" />
                    Top value plays
                </div>
                <div className="bets-card-grid">
                    {betCards.map((card) => (
                        <article className="bet-card" key={`${card.title}-${card.score}`}>
                            <div className="bet-card-top">
                                {card.league && (
                                    <span className="bet-card-league">{card.league}</span>
                                )}
                                <span className={`bet-card-score ${getScoreClass(card.score)}`}>
                                    {card.score}
                                </span>
                            </div>
                            <h3 className="bet-card-title">{card.title}</h3>
                            <p className="bet-card-detail">{card.detail}</p>
                            <Link className="bet-card-link" href={card.href}>
                                View breakdown →
                            </Link>
                        </article>
                    ))}
                </div>
            </section>

            <section className="bets-slate-section">
                <div className="bets-section-label">
                    <span className="bets-section-dot" />
                    Today&apos;s full slate
                </div>
                <GameTable rows={slateRows} />
            </section>

            <footer className="bets-page-footer">
                <p>El Jefe Sports © 2026 · Real-time edge intelligence</p>
                <div className="bets-page-footer-links">
                    <Link href="/edges">Command Center</Link>
                    <Link href="/dashboard">Dashboard</Link>
                    <Link href="/sports">Sports</Link>
                    <Link href="/status">Status</Link>
                </div>
            </footer>
        </main>
    );
}
