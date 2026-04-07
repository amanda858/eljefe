"use client";

import Link from "next/link";
import { startTransition, useDeferredValue, useEffect, useState } from "react";
import type { MarketBoardEntry, MarketDetail } from "@/lib/site-data";

type MarketBoardProps = {
    initialMarkets: MarketBoardEntry[];
    sports: string[];
    compact?: boolean;
};

export function MarketBoard({ initialMarkets, sports, compact = false }: MarketBoardProps) {
    const [markets, setMarkets] = useState(initialMarkets);
    const [selectedSport, setSelectedSport] = useState("All");
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedMarketId, setSelectedMarketId] = useState<string | null>(initialMarkets[0]?.id ?? null);
    const [selectedMarketDetail, setSelectedMarketDetail] = useState<MarketDetail | null>(null);
    const [isDetailLoading, setIsDetailLoading] = useState(false);
    const deferredSearch = useDeferredValue(search);
    const hasMarkets = markets.length > 0;

    useEffect(() => {
        const controller = new AbortController();
        const params = new URLSearchParams();

        if (selectedSport !== "All") {
            params.set("sport", selectedSport);
        }

        if (deferredSearch.trim()) {
            params.set("query", deferredSearch.trim());
        }

        setIsLoading(true);

        fetch(`/api/markets?${params.toString()}`, { signal: controller.signal })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error("Failed to load market board");
                }

                return response.json() as Promise<{ markets: MarketBoardEntry[] }>;
            })
            .then((data) => {
                startTransition(() => {
                    setMarkets(data.markets);
                    setSelectedMarketId((current) => {
                        if (current && data.markets.some((market) => market.id === current)) {
                            return current;
                        }

                        return data.markets[0]?.id ?? null;
                    });
                });
            })
            .catch((error) => {
                if (error instanceof Error && error.name === "AbortError") {
                    return;
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            });

        return () => controller.abort();
    }, [selectedSport, deferredSearch]);

    useEffect(() => {
        if (!selectedMarketId) {
            setSelectedMarketDetail(null);
            return;
        }

        const controller = new AbortController();

        setIsDetailLoading(true);

        fetch(`/api/markets/${selectedMarketId}`, { signal: controller.signal })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error("Failed to load market detail");
                }

                return response.json() as Promise<{ detail: MarketDetail }>;
            })
            .then((data) => {
                startTransition(() => {
                    setSelectedMarketDetail(data.detail);
                });
            })
            .catch((error) => {
                if (error instanceof Error && error.name === "AbortError") {
                    return;
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setIsDetailLoading(false);
                }
            });

        return () => controller.abort();
    }, [selectedMarketId]);

    const selectedMarket = markets.find((market) => market.id === selectedMarketId) ?? markets[0] ?? null;

    return (
        <section className={`market-board ${compact ? "market-board-compact" : ""}`}>
            <div className="market-board-controls">
                <label className="market-control">
                    <span>Sport</span>
                    <select value={selectedSport} onChange={(event) => setSelectedSport(event.target.value)}>
                        <option value="All">All</option>
                        {sports.map((sport) => (
                            <option key={sport} value={sport}>
                                {sport}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="market-control market-search">
                    <span>Search</span>
                    <input
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Team, market, book, trigger"
                    />
                </label>
            </div>

            <div className="market-board-status">
                <span>{markets.length} markets surfaced</span>
                <span>{isLoading ? "Refreshing" : hasMarkets ? "Live odds from sportsbooks" : "Live odds unavailable"}</span>
            </div>

            {hasMarkets ? (
                <div className="market-board-table">
                    <div className="market-board-head">
                        <span>Event</span>
                        <span>Market</span>
                        <span>Best line</span>
                        <span>Fair</span>
                        <span>Edge</span>
                        <span>Confidence</span>
                        <span>Trigger</span>
                    </div>
                    {markets.map((market) => (
                        <button className="market-board-row" key={market.id} onClick={() => setSelectedMarketId(market.id)} type="button">
                            <div>
                                <strong>{market.event}</strong>
                                <span>
                                    <Link href={`/sports/${market.sport.toLowerCase()}`}>{market.sport}</Link>
                                    {" · "}
                                    {market.league}
                                    {" · "}
                                    {market.startsIn}
                                </span>
                            </div>
                            <span>{market.market}</span>
                            <span>{market.bestLine}</span>
                            <span>{market.fair}</span>
                            <span>{market.edge}</span>
                            <span>{market.confidence}</span>
                            <span>{market.trigger}</span>
                        </button>
                    ))}
                </div>
            ) : (
                <article className="season-empty-state">
                    <p className="card-kicker">No live board</p>
                    <h3>Connect a live odds feed before surfacing markets.</h3>
                    <p className="market-detail-copy">Set ODDS_API_KEY and reload. Until then, El Jefe now leaves the market board empty instead of fabricating a sportsbook screen.</p>
                </article>
            )}

            {hasMarkets && selectedMarket ? (
                <aside className="market-detail-panel">
                    <div className="card-header">
                        <div>
                            <p>Selected market</p>
                            <span>{isDetailLoading ? "Refreshing detail" : "Execution brief"}</span>
                        </div>
                        <strong>{selectedMarket.edge}</strong>
                    </div>
                    <div className="market-detail-grid">
                        <div>
                            <p className="card-kicker">Event</p>
                            <h3>{selectedMarket.event}</h3>
                            <p className="market-detail-copy">{selectedMarket.market} · {selectedMarket.bestLine} · fair {selectedMarket.fair}</p>
                        </div>
                        <div>
                            <p className="card-kicker">Books</p>
                            <p className="market-detail-copy">{selectedMarket.books.join(" · ")}</p>
                        </div>
                    </div>
                    {selectedMarketDetail ? (
                        <div className="market-detail-stack">
                            <article className="market-detail-card">
                                <p className="card-kicker">Why it rates</p>
                                <p className="market-detail-copy">{selectedMarketDetail.thesis}</p>
                            </article>
                            <article className="market-detail-card">
                                <p className="card-kicker">Execution</p>
                                <p className="market-detail-copy">{selectedMarketDetail.execution}</p>
                            </article>
                            <article className="market-detail-card">
                                <p className="card-kicker">Timing window</p>
                                <p className="market-detail-copy">{selectedMarketDetail.timingWindow}</p>
                            </article>
                            <article className="market-detail-card">
                                <p className="card-kicker">Primary risk</p>
                                <p className="market-detail-copy">{selectedMarketDetail.risk}</p>
                            </article>
                            <article className="market-detail-card market-signal-card">
                                <p className="card-kicker">Source signals</p>
                                <div className="sports-hub-badges">
                                    {selectedMarketDetail.sourceSignals.map((signal) => (
                                        <span key={signal}>{signal}</span>
                                    ))}
                                </div>
                            </article>
                        </div>
                    ) : null}
                </aside>
            ) : null}
        </section>
    );
}