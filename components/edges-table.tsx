import type { BackendTodayEdge } from "@/lib/backend-api";

type EdgesTableProps = {
    entries: BackendTodayEdge[];
};

export function EdgesTable({ entries }: EdgesTableProps) {
    if (!entries.length) {
        return null;
    }

    const formatStartTime = (value: string) => new Date(value).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZone: "America/New_York",
    });

    return (
        <div className="edges-table-wrap">
            <table className="edges-table">
                <thead>
                    <tr>
                        <th>Sport</th>
                        <th>Event</th>
                        <th>Market</th>
                        <th>Best line</th>
                        <th>Fair</th>
                        <th>Edge</th>
                        <th>Confidence</th>
                        <th>Trigger</th>
                        <th>Starts</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry) => (
                        <tr key={`${entry.gameId}-${entry.marketType}-${entry.selection}`}>
                            <td><span className="edge-sport-tag">{entry.league}</span></td>
                            <td className="edges-table-event">{entry.game}</td>
                            <td>{entry.marketType}</td>
                            <td className="edges-table-mono">{entry.selection} {entry.bestPrice > 0 ? `+${entry.bestPrice}` : entry.bestPrice}</td>
                            <td className="edges-table-mono">{entry.consensusProbability}</td>
                            <td><span className="edge-badge">{entry.edge}</span></td>
                            <td>{entry.impliedProbability}</td>
                            <td><span className="edge-trigger-tag">{entry.bestBook}</span></td>
                            <td>{formatStartTime(entry.startTime)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}