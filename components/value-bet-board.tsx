import type { ValueBetCard, ValueEnginePerformanceSummary } from "@/lib/site-data";

type ValueBetBoardProps = {
    bets: ValueBetCard[];
    performance: ValueEnginePerformanceSummary;
    source: "service" | "unavailable";
    modelVersion: string;
    generatedAt: string;
    compact?: boolean;
};

function formatPercent(value: number) {
    return `${(value * 100).toFixed(1)}%`;
}

function formatOdds(odds: number) {
    return odds > 0 ? `+${odds}` : `${odds}`;
}

function formatGeneratedAt(value: string) {
    const timestamp = Date.parse(value);

    if (Number.isNaN(timestamp)) {
        return "Unavailable";
    }

    return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "UTC",
    }).format(new Date(timestamp));
}

export function ValueBetBoard({ bets, performance, source, modelVersion, generatedAt, compact = false }: ValueBetBoardProps) {
    const visibleBets = compact ? bets.slice(0, 3) : bets;
    const hitRateEntries = Object.entries(performance.hitRateByEdgeBucket);
    const exposureEntries = Object.entries(performance.exposureByBook).sort((left, right) => right[1] - left[1]).slice(0, 3);
    const sourceLabel = source === "service" ? `Service recommendations · ${modelVersion}` : "Value engine unavailable";

    if (source !== "service" || visibleBets.length === 0) {
        return (
            <section className={`value-bet-board ${compact ? "value-bet-board-compact" : ""}`}>
                <div className="market-board-status">
                    <span>0 moneyline value bets surfaced</span>
                    <span>{sourceLabel}</span>
                </div>

                <article className="season-empty-state">
                    <p className="card-kicker">No live value engine</p>
                    <h3>Model recommendations stay empty until the service is connected.</h3>
                    <p className="market-detail-copy">Set VALUE_ENGINE_URL and reload. This board no longer shows fallback picks, seeded ROI, or placeholder model output.</p>
                </article>
            </section>
        );
    }

    return (
        <section className={`value-bet-board ${compact ? "value-bet-board-compact" : ""}`}>
            <div className="market-board-status">
                <span>{visibleBets.length} moneyline value bets surfaced</span>
                <span>{sourceLabel}</span>
            </div>

            <div className="metrics-strip metrics-grid value-bet-metrics">
                <div>
                    <strong>{formatPercent(performance.roiTotal)}</strong>
                    <span>Total ROI</span>
                    <p>ROI from settled tracked recommendations captured by the service ledger when live history is available.</p>
                </div>
                <div>
                    <strong>{visibleBets.length}</strong>
                    <span>Qualified bets</span>
                    <p>Filtered by edge, positive unit EV, and confidence thresholds.</p>
                </div>
                <div>
                    <strong>{hitRateEntries[0]?.[1] ? formatPercent(hitRateEntries[0][1]) : "0.0%"}</strong>
                    <span>Edge bucket lead</span>
                    <p>Best realized hit rate among the tracked settled edge buckets in the current recommendation ledger.</p>
                </div>
                <div>
                    <strong>{formatGeneratedAt(generatedAt)} UTC</strong>
                    <span>Generated</span>
                    <p>Recommendation timestamp used for audit and reproducibility.</p>
                </div>
            </div>

            <div className="system-grid value-bet-card-grid">
                {visibleBets.map((bet) => (
                    <article className="system-card value-bet-card" key={`${bet.gameId}-${bet.bookId}-${bet.team}`}>
                        <p className="card-kicker">{bet.league} · {bet.market}</p>
                        <h3>{bet.team}</h3>
                        <p>{bet.opponent} · {bet.bookId} · {formatOdds(bet.bookAmericanOdds)}</p>
                        <div className="value-bet-stat-row">
                            <div>
                                <span>Our win</span>
                                <strong>{formatPercent(bet.ourProbability)}</strong>
                            </div>
                            <div>
                                <span>Book fair</span>
                                <strong>{formatPercent(bet.bookFairProbability)}</strong>
                            </div>
                            <div>
                                <span>Edge</span>
                                <strong>{formatPercent(bet.edge)}</strong>
                            </div>
                        </div>
                        <div className="value-bet-stat-row">
                            <div>
                                <span>Unit EV</span>
                                <strong>{formatPercent(bet.expectedValuePerUnit)}</strong>
                            </div>
                            <div>
                                <span>Confidence</span>
                                <strong>{bet.confidence.toFixed(1)}</strong>
                            </div>
                            <div>
                                <span>Stake</span>
                                <strong>${bet.stakeSize.toFixed(0)}</strong>
                            </div>
                        </div>
                        <p className="market-detail-copy">
                            Bankroll fraction {formatPercent(bet.bankrollFraction)} · {bet.riskFlags.length ? bet.riskFlags.join(", ") : "no active risk flags"}
                        </p>
                    </article>
                ))}
            </div>

            <div className="market-detail-stack value-bet-summary-grid">
                <article className="market-detail-card">
                    <p className="card-kicker">Hit rate by edge</p>
                    {hitRateEntries.map(([bucket, rate]) => (
                        <p className="market-detail-copy" key={bucket}>{bucket} · {formatPercent(rate)}</p>
                    ))}
                </article>
                <article className="market-detail-card">
                    <p className="card-kicker">Book exposure</p>
                    {exposureEntries.map(([book, exposure]) => (
                        <p className="market-detail-copy" key={book}>{book} · {formatPercent(exposure)}</p>
                    ))}
                </article>
                <article className="market-detail-card market-signal-card">
                    <p className="card-kicker">Operating rule</p>
                    <p className="market-detail-copy">The board only surfaces recommendations where the model beats the no-vig book probability, clears the minimum edge threshold, and survives bankroll limits. Settled outcomes are written back into the service ledger so the summary cards reflect tracked results instead of editorial baselines.</p>
                </article>
            </div>
        </section>
    );
}