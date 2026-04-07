"use client";

import { startTransition, useEffect, useState } from "react";
import type { EventSnapshot } from "@/lib/site-data";

type EventCockpitProps = {
    initialSport?: string;
    initialEvents: EventSnapshot[];
    sports: string[];
    compact?: boolean;
};

export function EventCockpit({ initialSport = "All", initialEvents, sports, compact = false }: EventCockpitProps) {
    const [selectedSport, setSelectedSport] = useState(initialSport);
    const [events, setEvents] = useState(initialEvents);
    const [selectedEventId, setSelectedEventId] = useState(initialEvents[0]?.id ?? "");
    const [selectedEvent, setSelectedEvent] = useState<EventSnapshot | null>(initialEvents[0] ?? null);
    const [selectedMarketKey, setSelectedMarketKey] = useState(initialEvents[0]?.markets[0]?.key ?? "");
    const [isEventsLoading, setIsEventsLoading] = useState(false);
    const [isDetailLoading, setIsDetailLoading] = useState(false);
    const hasEvents = events.length > 0;

    useEffect(() => {
        const controller = new AbortController();
        const params = new URLSearchParams();

        if (selectedSport !== "All") {
            params.set("sport", selectedSport);
        }

        setIsEventsLoading(true);

        fetch(`/api/events?${params.toString()}`, { signal: controller.signal })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error("Failed to load events");
                }

                return response.json() as Promise<{ events: EventSnapshot[] }>;
            })
            .then((data) => {
                startTransition(() => {
                    setEvents(data.events);
                    const nextEvent = data.events[0] ?? null;
                    setSelectedEventId(nextEvent?.id ?? "");
                    setSelectedEvent(nextEvent);
                    setSelectedMarketKey(nextEvent?.markets[0]?.key ?? "");
                });
            })
            .catch((error) => {
                if (error instanceof Error && error.name === "AbortError") {
                    return;
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setIsEventsLoading(false);
                }
            });

        return () => controller.abort();
    }, [selectedSport]);

    useEffect(() => {
        if (!selectedEventId) {
            setSelectedEvent(null);
            return;
        }

        const controller = new AbortController();

        setIsDetailLoading(true);

        fetch(`/api/events/${selectedEventId}`, { signal: controller.signal })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error("Failed to load event detail");
                }

                return response.json() as Promise<{ event: EventSnapshot }>;
            })
            .then((data) => {
                startTransition(() => {
                    setSelectedEvent(data.event);
                    setSelectedMarketKey((current) => {
                        if (current && data.event.markets.some((market) => market.key === current)) {
                            return current;
                        }

                        return data.event.markets[0]?.key ?? "";
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
                    setIsDetailLoading(false);
                }
            });

        return () => controller.abort();
    }, [selectedEventId]);

    const selectedMarket = selectedEvent?.markets.find((market) => market.key === selectedMarketKey) ?? selectedEvent?.markets[0] ?? null;

    return (
        <section className={`event-cockpit ${compact ? "event-cockpit-compact" : ""}`}>
            <div className="event-cockpit-controls">
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
                <label className="market-control">
                    <span>Upcoming game</span>
                    <select value={selectedEventId} onChange={(event) => setSelectedEventId(event.target.value)}>
                        {events.map((event) => (
                            <option key={event.id} value={event.id}>
                                {event.event}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="market-board-status">
                <span>{events.length} upcoming games</span>
                <span>{isEventsLoading || isDetailLoading ? "Refreshing" : hasEvents ? "Live event board" : "Live events unavailable"}</span>
            </div>

            {hasEvents && selectedEvent ? (
                <div className="event-cockpit-layout">
                    <aside className="event-summary-panel">
                        <div className="card-header">
                            <div>
                                <p>Live event review</p>
                                <span>
                                    {selectedEvent.league} · {selectedEvent.status}
                                </span>
                            </div>
                            <strong>{selectedEvent.scoreBug}</strong>
                        </div>
                        <h3>{selectedEvent.event}</h3>
                        <p className="market-detail-copy">{selectedEvent.headline}</p>
                        <div className="event-summary-grid">
                            <article className="market-detail-card">
                                <p className="card-kicker">Favorite</p>
                                <p className="market-detail-copy">{selectedEvent.favorite}</p>
                            </article>
                            <article className="market-detail-card">
                                <p className="card-kicker">Total</p>
                                <p className="market-detail-copy">{selectedEvent.total}</p>
                            </article>
                            <article className="market-detail-card">
                                <p className="card-kicker">Starts</p>
                                <p className="market-detail-copy">{selectedEvent.startsIn}</p>
                            </article>
                            <article className="market-detail-card">
                                <p className="card-kicker">Venue</p>
                                <p className="market-detail-copy">{selectedEvent.venue}</p>
                            </article>
                        </div>
                        <div className="sports-hub-badges">
                            {selectedEvent.tags.map((tag) => (
                                <span key={tag}>{tag}</span>
                            ))}
                        </div>
                        <div className="event-analytics-grid">
                            <article className="market-detail-card">
                                <p className="card-kicker">Model edge</p>
                                <p className="market-detail-copy">{selectedEvent.analytics.modelEdge}</p>
                            </article>
                            <article className="market-detail-card">
                                <p className="card-kicker">Public split</p>
                                <p className="market-detail-copy">{selectedEvent.analytics.publicBetSplit}</p>
                            </article>
                            <article className="market-detail-card">
                                <p className="card-kicker">Sharp money</p>
                                <p className="market-detail-copy">{selectedEvent.analytics.sharpMoney}</p>
                            </article>
                            <article className="market-detail-card">
                                <p className="card-kicker">Volatility</p>
                                <p className="market-detail-copy">{selectedEvent.analytics.volatility}</p>
                            </article>
                            <article className="market-detail-card">
                                <p className="card-kicker">Bankroll</p>
                                <p className="market-detail-copy">{selectedEvent.analytics.bankroll}</p>
                            </article>
                            <article className="market-detail-card">
                                <p className="card-kicker">Market state</p>
                                <p className="market-detail-copy">{selectedEvent.analytics.marketState}</p>
                            </article>
                        </div>
                    </aside>

                    <section className="event-market-panel">
                        <div className="event-market-tabs">
                            {selectedEvent.markets.map((market) => (
                                <button
                                    className={`event-market-tab ${selectedMarket?.key === market.key ? "event-market-tab-active" : ""}`}
                                    key={market.key}
                                    onClick={() => setSelectedMarketKey(market.key)}
                                    type="button"
                                >
                                    {market.label}
                                </button>
                            ))}
                        </div>

                        {selectedMarket ? (
                            <div className="event-market-stack">
                                <div className="event-market-highlight">
                                    <div>
                                        <p className="card-kicker">Reviewed odds</p>
                                        <h3>{selectedMarket.recommendation}</h3>
                                        <p className="market-detail-copy">{selectedMarket.summary}</p>
                                    </div>
                                    <div className="event-market-metrics">
                                        <div>
                                            <span>Fair</span>
                                            <strong>{selectedMarket.fair}</strong>
                                        </div>
                                        <div>
                                            <span>Edge</span>
                                            <strong>{selectedMarket.edge}</strong>
                                        </div>
                                        <div>
                                            <span>Confidence</span>
                                            <strong>{selectedMarket.confidence}</strong>
                                        </div>
                                    </div>
                                </div>

                                <div className="event-trend-panel">
                                    <div className="card-header">
                                        <div>
                                            <p>Movement history</p>
                                            <span>How the number evolved</span>
                                        </div>
                                        <span>{selectedEvent.sport} tape</span>
                                    </div>
                                    <div className="event-trend-rail">
                                        {selectedEvent.trend.map((point) => (
                                            <article className="event-trend-stop" key={`${selectedEvent.id}-${point.label}`}>
                                                <span>{point.label}</span>
                                                <strong>{point.price}</strong>
                                                <p>{point.edge}</p>
                                            </article>
                                        ))}
                                    </div>
                                </div>

                                <div className="event-lines-table">
                                    <div className="event-lines-head">
                                        <span>Book</span>
                                        <span>Selection</span>
                                        <span>Line</span>
                                        <span>Price</span>
                                        <span>Move</span>
                                    </div>
                                    {selectedMarket.books.map((book) => (
                                        <article className="event-lines-row" key={`${selectedMarket.key}-${book.book}-${book.selection}`}>
                                            <strong>{book.book}</strong>
                                            <span>{book.selection}</span>
                                            <span>{book.line}</span>
                                            <span>{book.price}</span>
                                            <span>{book.movement}</span>
                                        </article>
                                    ))}
                                </div>

                                <div className="event-prop-panel">
                                    <div className="card-header">
                                        <div>
                                            <p>Prop radar</p>
                                            <span>Angles for real enthusiasts</span>
                                        </div>
                                        <span>{selectedEvent.propAngles.length} props screened</span>
                                    </div>
                                    <div className="event-prop-stack">
                                        {selectedEvent.propAngles.map((prop) => (
                                            <article className="event-prop-card" key={`${selectedEvent.id}-${prop.player}-${prop.market}`}>
                                                <div>
                                                    <strong>{prop.player}</strong>
                                                    <span>{prop.market} · {prop.line}</span>
                                                </div>
                                                <div className="event-prop-meta">
                                                    <strong>{prop.edge}</strong>
                                                    <span>{prop.note}</span>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </section>
                </div>
            ) : (
                <article className="season-empty-state">
                    <p className="card-kicker">No live event feed</p>
                    <h3>Upcoming games stay empty until the odds feed is connected.</h3>
                    <p className="market-detail-copy">Set ODDS_API_KEY and reload. The event cockpit no longer fills itself with editorial sample matchups.</p>
                </article>
            )}
        </section>
    );
}