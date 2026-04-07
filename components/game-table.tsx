import Link from "next/link";

export type GameTableRow = {
    id: string;
    league: string;
    startsAt: string;
    matchup: string;
    awayRecord: string;
    homeRecord: string;
    bestOdds: string;
    broadcastNetwork: string;
    venue: string;
    edgeSummary: string;
    weatherSummary: string;
};

type GameTableProps = {
    rows: GameTableRow[];
};

export function GameTable({ rows }: GameTableProps) {
    if (!rows.length) {
        return (
            <article className="season-empty-state">
                <p className="card-kicker">Today's slate unavailable</p>
                <h3>Connect live odds and schedule feeds to populate the slate table.</h3>
                <p className="market-detail-copy">
                    The MVP slate shows matchup, best odds, broadcast, and a direct game drill-in only when real feeds are live.
                </p>
            </article>
        );
    }

    return (
        <div className="edges-table-wrap">
            <table className="edges-table game-table">
                <thead>
                    <tr>
                        <th>League</th>
                        <th>Date</th>
                        <th>Matchup</th>
                        <th>Best odds</th>
                        <th>Broadcast</th>
                        <th>Edge</th>
                        <th>Conditions</th>
                        <th>Game</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.id}>
                            <td>
                                <div className="game-table-league-cell">
                                    <span>{row.league}</span>
                                </div>
                            </td>
                            <td>{row.startsAt}</td>
                            <td className="edges-table-event">
                                <div className="game-table-matchup-cell">
                                    <strong>{row.matchup}</strong>
                                    <span>{row.awayRecord} · {row.homeRecord}</span>
                                </div>
                            </td>
                            <td className="edges-table-mono">{row.bestOdds}</td>
                            <td>
                                <div className="game-table-broadcast-cell">
                                    <strong>{row.broadcastNetwork}</strong>
                                    <span>{row.venue}</span>
                                </div>
                            </td>
                            <td>{row.edgeSummary}</td>
                            <td>{row.weatherSummary}</td>
                            <td>
                                <Link className="table-link" href={`/game/${row.id}`}>
                                    Open game
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}