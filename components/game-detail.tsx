import type { CSSProperties } from "react";
import type { BackendGameOddsResponse } from "@/lib/backend-api";
import type { EventSnapshot } from "@/lib/site-data";

type GameDetailProps = {
    payload: BackendGameOddsResponse;
    intel: EventSnapshot | null;
};

function formatPrice(price: number) {
    return price > 0 ? `+${price}` : `${price}`;
}

function formatStartTime(value: string) {
    return new Date(value).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
}

function marketLabel(marketType: string) {
    if (marketType === "MONEYLINE") return "Moneyline";
    if (marketType === "SPREAD") return "Spread";
    if (marketType === "TOTAL") return "Total";
    return marketType;
}

function selectionLabel(selection: string, payload: BackendGameOddsResponse) {
    if (selection === "HOME") return payload.game.homeTeam;
    if (selection === "AWAY") return payload.game.awayTeam;
    if (selection === "OVER") return "Over";
    if (selection === "UNDER") return "Under";
    return selection;
}

function buildTeamMarkStyle(primaryColor: string, secondaryColor: string): CSSProperties {
    return {
        background: `radial-gradient(circle at 20% 20%, ${secondaryColor}, ${primaryColor})`,
        boxShadow: `inset 0 0 0 1px ${secondaryColor}66`,
    };
}

function TeamMark({
    name,
    profile,
}: {
    name: string;
    profile: BackendGameOddsResponse["game"]["homeTeamProfile"];
}) {
    return (
        <article className="game-team-card">
            <div className="game-team-mark" style={buildTeamMarkStyle(profile.primaryColor, profile.secondaryColor)}>
                <span>{profile.abbr}</span>
            </div>
            <div className="game-team-copy">
                <p className="card-kicker">Team mark</p>
                <h2>{name}</h2>
                <div className="game-team-meta">
                    <span>{profile.record}</span>
                    <span>{profile.recentForm}</span>
                </div>
            </div>
        </article>
    );
}

export function GameDetail({ payload, intel }: GameDetailProps) {
    const { game, odds } = payload;
    const groupedMarkets = odds.reduce<Record<string, typeof odds>>((groups, line) => {
        const current = groups[line.marketType] ?? [];
        current.push(line);
        groups[line.marketType] = current;
        return groups;
    }, {});
    const orderedMarkets = ["MONEYLINE", "SPREAD", "TOTAL"].filter((marketType) => groupedMarkets[marketType]);
    const reviewedMarkets = intel?.markets ?? [];
    const propAngles = intel?.propAngles ?? [];
    const trend = intel?.trend ?? [];
    const availableCoverage = [
        orderedMarkets.length > 0 ? `${orderedMarkets.length} live core markets` : "Live core markets pending",
        reviewedMarkets.length > 0 ? `${reviewedMarkets.length} reviewed market angles` : "No reviewed market overlays",
        propAngles.length > 0 ? `${propAngles.length} prop angles` : "No prop angles loaded",
    ];

    return (
        <div className="game-detail-stack">
            <section className="game-detail-hero">
                <div className="dashboard-panel dark-panel game-hero-panel">
                    <div className="game-detail-heading">
                        <p className="eyebrow">Game detail</p>
                        <h1 className="page-title">{game.awayTeam} at {game.homeTeam}</h1>
                        <p className="hero-text">
                            {intel?.headline ?? "Operator view for the matchup, current odds grid, reviewed market angles, and the live book inventory for this event."}
                        </p>
                    </div>
                    <div className="game-team-rail">
                        <TeamMark name={game.awayTeam} profile={game.awayTeamProfile} />
                        <div className="game-versus-pill">at</div>
                        <TeamMark name={game.homeTeam} profile={game.homeTeamProfile} />
                    </div>
                    <div className="sports-hub-badges">
                        {availableCoverage.map((item) => (
                            <span key={item}>{item}</span>
                        ))}
                        {intel?.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                        ))}
                    </div>
                </div>
                <div className="game-detail-summary-grid">
                    <article className="summary-card">
                        <p>League</p>
                        <h2>{game.leagueCode}</h2>
                        <span>{formatStartTime(game.startTime)}</span>
                    </article>
                    <article className="summary-card">
                        <p>Broadcast</p>
                        <h2>{game.broadcastNetwork || "Unavailable"}</h2>
                        <span>{game.venue}</span>
                    </article>
                    <article className="summary-card">
                        <p>Best odds</p>
                        <h2>{game.bestOdds}</h2>
                        <span>{game.bestBook}</span>
                    </article>
                    <article className="summary-card">
                        <p>Edge summary</p>
                        <h2>{game.edgeSummary}</h2>
                        <span>{odds.length} live odds rows</span>
                    </article>
                </div>
            </section>

            <section className="game-detail-grid">
                <article className="dashboard-panel light-panel">
                    <div className="card-header light-header">
                        <p>Team form</p>
                        <span>Records and recent results</span>
                    </div>
                    <div className="game-summary-cards">
                        <article className="market-detail-card">
                            <p className="card-kicker">Away record</p>
                            <p className="market-detail-copy">{game.awayTeamProfile.record}</p>
                        </article>
                        <article className="market-detail-card">
                            <p className="card-kicker">Away recent</p>
                            <p className="market-detail-copy">{game.awayTeamProfile.recentForm}</p>
                        </article>
                        <article className="market-detail-card">
                            <p className="card-kicker">Home record</p>
                            <p className="market-detail-copy">{game.homeTeamProfile.record}</p>
                        </article>
                        <article className="market-detail-card">
                            <p className="card-kicker">Home recent</p>
                            <p className="market-detail-copy">{game.homeTeamProfile.recentForm}</p>
                        </article>
                        <article className="market-detail-card">
                            <p className="card-kicker">Venue</p>
                            <p className="market-detail-copy">{game.venue}</p>
                        </article>
                        <article className="market-detail-card">
                            <p className="card-kicker">Reviewed angle</p>
                            <p className="market-detail-copy">{intel?.markets[0]?.recommendation ?? game.bestOdds}</p>
                        </article>
                    </div>
                </article>

                <article className="dashboard-panel dark-panel">
                    <div className="card-header">
                        <p>Predictor board</p>
                        <span>Model versus market context</span>
                    </div>
                    <div className="game-summary-cards game-summary-cards-dark">
                        <article className="market-detail-card market-detail-card-dark">
                            <p className="card-kicker">Model edge</p>
                            <p className="market-detail-copy">{intel?.analytics.modelEdge ?? game.edgeSummary}</p>
                        </article>
                        <article className="market-detail-card market-detail-card-dark">
                            <p className="card-kicker">Public split</p>
                            <p className="market-detail-copy">{intel?.analytics.publicBetSplit ?? "Awaiting split overlay"}</p>
                        </article>
                        <article className="market-detail-card market-detail-card-dark">
                            <p className="card-kicker">Sharp money</p>
                            <p className="market-detail-copy">{intel?.analytics.sharpMoney ?? "Awaiting sharp handle overlay"}</p>
                        </article>
                        <article className="market-detail-card market-detail-card-dark">
                            <p className="card-kicker">Market state</p>
                            <p className="market-detail-copy">{intel?.analytics.marketState ?? "Current backend quote inventory only"}</p>
                        </article>
                        <article className="market-detail-card market-detail-card-dark">
                            <p className="card-kicker">Volatility</p>
                            <p className="market-detail-copy">{intel?.analytics.volatility ?? "Medium"}</p>
                        </article>
                        <article className="market-detail-card market-detail-card-dark">
                            <p className="card-kicker">Bankroll note</p>
                            <p className="market-detail-copy">{intel?.analytics.bankroll ?? "Size by edge and price sensitivity."}</p>
                        </article>
                    </div>
                </article>
            </section>

            {game.weather ? (
                <section className="dashboard-panel light-panel game-weather-panel">
                    <div className="card-header light-header">
                        <p>Baseball weather</p>
                        <span>Conditions at first pitch</span>
                    </div>
                    <div className="game-weather-grid">
                        <article className="market-detail-card">
                            <p className="card-kicker">Conditions</p>
                            <p className="market-detail-copy">{game.weather.conditions}</p>
                        </article>
                        <article className="market-detail-card">
                            <p className="card-kicker">Temperature</p>
                            <p className="market-detail-copy">{game.weather.temperature}</p>
                        </article>
                        <article className="market-detail-card">
                            <p className="card-kicker">Humidity</p>
                            <p className="market-detail-copy">{game.weather.humidity}</p>
                        </article>
                        <article className="market-detail-card">
                            <p className="card-kicker">Wind</p>
                            <p className="market-detail-copy">{game.weather.wind}</p>
                        </article>
                    </div>
                    <p className="market-detail-copy game-weather-impact">{game.weather.impact}</p>
                </section>
            ) : null}

            {reviewedMarkets.length > 0 ? (
                <section className="content-section game-markets-section">
                    <div className="section-heading">
                        <p className="eyebrow">Reviewed markets</p>
                        <h2>Moneyline, totals, derivatives, and board-level price quality.</h2>
                    </div>
                    <div className="game-market-grid">
                        {reviewedMarkets.map((market) => (
                            <article className="game-market-card" key={market.key}>
                                <div className="card-header light-header">
                                    <div>
                                        <p>{market.label}</p>
                                        <span>{market.recommendation}</span>
                                    </div>
                                    <span>{market.confidence}</span>
                                </div>
                                <div className="game-market-metrics">
                                    <div>
                                        <span>Fair</span>
                                        <strong>{market.fair}</strong>
                                    </div>
                                    <div>
                                        <span>Edge</span>
                                        <strong>{market.edge}</strong>
                                    </div>
                                </div>
                                <p className="market-detail-copy">{market.summary}</p>
                                <div className="game-book-chip-grid">
                                    {market.books.map((book) => (
                                        <article className="game-book-chip" key={`${market.key}-${book.book}-${book.selection}`}>
                                            <strong>{book.book}</strong>
                                            <span>{book.selection}</span>
                                            <span>{book.line}</span>
                                            <span>{book.price}</span>
                                            <span>{book.movement}</span>
                                        </article>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            ) : null}

            {propAngles.length > 0 ? (
                <section className="dashboard-panel light-panel">
                    <div className="card-header light-header">
                        <p>Prop board</p>
                        <span>Player-level angles available for this game</span>
                    </div>
                    <div className="game-prop-grid">
                        {propAngles.map((prop) => (
                            <article className="market-detail-card game-prop-card" key={`${prop.player}-${prop.market}-${prop.line}`}>
                                <p className="card-kicker">{prop.player}</p>
                                <h3>{prop.market}</h3>
                                <div className="game-prop-meta">
                                    <span>{prop.line}</span>
                                    <span>{prop.edge}</span>
                                </div>
                                <p className="market-detail-copy">{prop.note}</p>
                            </article>
                        ))}
                    </div>
                </section>
            ) : null}

            {trend.length > 0 ? (
                <section className="dashboard-panel dark-panel">
                    <div className="card-header">
                        <p>Movement tape</p>
                        <span>Reviewed sequence for the best angle</span>
                    </div>
                    <div className="game-trend-rail">
                        {trend.map((point) => (
                            <article className="game-trend-stop" key={`${point.label}-${point.price}`}>
                                <span>{point.label}</span>
                                <strong>{point.price}</strong>
                                <p>{point.edge}</p>
                            </article>
                        ))}
                    </div>
                </section>
            ) : null}

            <section className="content-section game-markets-section">
                <div className="section-heading">
                    <p className="eyebrow">Live odds grid</p>
                    <h2>Book-by-book pricing grouped by moneyline, spread, and total.</h2>
                </div>
                <div className="game-market-grid">
                    {orderedMarkets.map((marketType) => {
                        const lines = groupedMarkets[marketType] ?? [];

                        return (
                            <article className="game-market-card" key={marketType}>
                                <div className="card-header light-header">
                                    <div>
                                        <p>{marketLabel(marketType)}</p>
                                        <span>{lines.length} current rows</span>
                                    </div>
                                    <span>{lines[0]?.book ?? ""}</span>
                                </div>
                                <div className="game-market-metrics">
                                    <div>
                                        <span>Selections</span>
                                        <strong>{new Set(lines.map((line) => line.selection)).size}</strong>
                                    </div>
                                    <div>
                                        <span>Books</span>
                                        <strong>{new Set(lines.map((line) => line.book)).size}</strong>
                                    </div>
                                </div>
                                <p className="market-detail-copy">Current market state across the books reporting to the backend service.</p>
                                <div className="edges-table-wrap compact-table-wrap">
                                    <table className="edges-table game-book-table">
                                        <thead>
                                            <tr>
                                                <th>Book</th>
                                                <th>Selection</th>
                                                <th>Line</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {lines.map((line) => (
                                                <tr key={line.id}>
                                                    <td>{line.book}</td>
                                                    <td>{selectionLabel(line.selection, payload)}</td>
                                                    <td className="edges-table-mono">{line.line ?? "-"}</td>
                                                    <td className="edges-table-mono">{formatPrice(line.price)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}