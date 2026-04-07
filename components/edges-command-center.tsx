"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { BackendTodayEdge } from "@/lib/backend-api";

type EdgesCommandCenterProps = {
    entries: BackendTodayEdge[];
};

function getEntryId(entry: BackendTodayEdge) {
    return `${entry.gameId}-${entry.marketType}-${entry.selection}-${entry.bestBook}`;
}

function formatStartDate(value: string) {
    return new Date(value).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/New_York",
    });
}

function formatStartTime(value: string) {
    return new Date(value).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/New_York",
    });
}

function formatStartDateInput(value: string) {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/New_York",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date(value));
}

function normalizeMarket(value: string) {
    return value.toUpperCase();
}

function buildTeamMarkStyle(primaryColor: string, secondaryColor: string) {
    return {
        background: `radial-gradient(circle at 20% 20%, ${secondaryColor}, ${primaryColor})`,
        boxShadow: `inset 0 0 0 1px ${secondaryColor}66`,
    };
}

export function EdgesCommandCenter({ entries }: EdgesCommandCenterProps) {
    const [selectedSport, setSelectedSport] = useState("ALL");
    const [selectedMarket, setSelectedMarket] = useState("ALL");
    const [selectedDate, setSelectedDate] = useState("");
    const [search, setSearch] = useState("");
    const [selectedEntryId, setSelectedEntryId] = useState<string | null>(entries[0] ? getEntryId(entries[0]) : null);

    useEffect(() => {
        setSelectedDate(formatStartDateInput(new Date().toISOString()));
    }, []);

    const sports = useMemo(() => {
        return ["ALL", ...new Set(entries.map((entry) => entry.sport))];
    }, [entries]);

    const markets = useMemo(() => {
        return ["ALL", ...new Set(entries.map((entry) => normalizeMarket(entry.marketType)))];
    }, [entries]);

    const filteredEntries = useMemo(() => {
        const query = search.trim().toLowerCase();

        return entries.filter((entry) => {
            if (selectedSport !== "ALL" && entry.sport !== selectedSport) {
                return false;
            }

            if (selectedMarket !== "ALL" && normalizeMarket(entry.marketType) !== selectedMarket) {
                return false;
            }

            if (selectedDate) {
                const startDate = formatStartDateInput(entry.startTime);
                if (startDate !== selectedDate) {
                    return false;
                }
            }

            if (query) {
                const text = `${entry.game} ${entry.sport} ${entry.bestLine} ${entry.bestBook}`.toLowerCase();
                if (!text.includes(query)) {
                    return false;
                }
            }

            return true;
        });
    }, [entries, search, selectedDate, selectedMarket, selectedSport]);

    useEffect(() => {
        if (!filteredEntries.length) {
            setSelectedEntryId(null);
            return;
        }

        if (!selectedEntryId || !filteredEntries.some((entry) => getEntryId(entry) === selectedEntryId)) {
            setSelectedEntryId(getEntryId(filteredEntries[0]));
        }
    }, [filteredEntries, selectedEntryId]);

    const selectedEntry = filteredEntries.find((entry) => getEntryId(entry) === selectedEntryId) ?? null;

    return (
        <div className="command-center-shell">
            <div className="command-center-top-bar">
                <div className="command-center-logo">EL JEFE SPORTS</div>

                <select value={selectedSport} onChange={(event) => setSelectedSport(event.target.value)}>
                    {sports.map((sport) => (
                        <option key={sport} value={sport}>{sport === "ALL" ? "All Sports" : sport}</option>
                    ))}
                </select>

                <input type="date" value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)} />

                <select value={selectedMarket} onChange={(event) => setSelectedMarket(event.target.value)}>
                    {markets.map((market) => (
                        <option key={market} value={market}>{market === "ALL" ? "All Markets" : market}</option>
                    ))}
                </select>

                <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search team..."
                />
            </div>

            <div className="command-center-main">
                <section className="command-center-table-container">
                    <div className="command-center-table-header">
                        <h2>Today&apos;s Edges</h2>
                        <span>{filteredEntries.length} live edges</span>
                    </div>

                    <div className="command-center-table-scroll">
                        <table className="command-center-table">
                            <thead>
                                <tr>
                                    <th>Game</th>
                                    <th>Sport</th>
                                    <th>Start</th>
                                    <th>Best Line</th>
                                    <th>Edge</th>
                                    <th>Market</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEntries.length > 0 ? filteredEntries.map((entry) => {
                                    const entryId = getEntryId(entry);
                                    const isSelected = entryId === selectedEntryId;
                                    const edgeValue = parseFloat(entry.edge.replace("%", ""));
                                    return (
                                        <tr
                                            className={isSelected ? "command-center-row-active" : undefined}
                                            key={entryId}
                                            onClick={() => setSelectedEntryId(entryId)}
                                        >
                                            <td>{entry.game}</td>
                                            <td>{entry.sport}</td>
                                            <td>{formatStartTime(entry.startTime)}</td>
                                            <td>{entry.bestLine}</td>
                                            <td>
                                                <span className={`command-center-edge-pill ${edgeValue >= 5 ? "command-center-edge-pill-high" : ""}`}>
                                                    {entry.edgeScore}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="command-center-market-pill">{normalizeMarket(entry.marketType)}</span>
                                            </td>
                                        </tr>
                                    );
                                }) : (
                                    <tr>
                                        <td colSpan={6} className="command-center-empty-cell">
                                            No games match the current filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                <aside className="command-center-detail">
                    <h2>Edge Breakdown</h2>

                    {selectedEntry ? (
                        <>
                            <div className="command-center-detail-game">
                                <h3>{selectedEntry.game}</h3>
                                <p>{selectedEntry.sport} · {formatStartDate(selectedEntry.startTime)}</p>
                                <p>{selectedEntry.venue}</p>
                                <p>Best line: {selectedEntry.bestLine}</p>
                                <Link className="table-link command-center-open-link" href={`/game/${selectedEntry.gameId}`}>
                                    Open full game view
                                </Link>
                            </div>

                            <div className="command-center-team-strip">
                                <div className="command-center-team-card">
                                    <div className="command-center-team-mark" style={buildTeamMarkStyle(selectedEntry.awayTeamProfile.primaryColor, selectedEntry.awayTeamProfile.secondaryColor)}>
                                        {selectedEntry.awayTeamProfile.abbr}
                                    </div>
                                    <div>
                                        <strong>{selectedEntry.teams[1]}</strong>
                                        <span>{selectedEntry.awayTeamProfile.record} · {selectedEntry.awayTeamProfile.recentForm}</span>
                                    </div>
                                </div>
                                <div className="command-center-team-card">
                                    <div className="command-center-team-mark" style={buildTeamMarkStyle(selectedEntry.homeTeamProfile.primaryColor, selectedEntry.homeTeamProfile.secondaryColor)}>
                                        {selectedEntry.homeTeamProfile.abbr}
                                    </div>
                                    <div>
                                        <strong>{selectedEntry.teams[0]}</strong>
                                        <span>{selectedEntry.homeTeamProfile.record} · {selectedEntry.homeTeamProfile.recentForm}</span>
                                    </div>
                                </div>
                            </div>

                            {selectedEntry.weather ? (
                                <>
                                    <div className="command-center-detail-section-title">Weather</div>
                                    <div className="command-center-detail-grid">
                                        <div><strong>{selectedEntry.weather.conditions}</strong><span>Conditions</span></div>
                                        <div><strong>{selectedEntry.weather.temperature}</strong><span>Temperature</span></div>
                                        <div><strong>{selectedEntry.weather.humidity}</strong><span>Humidity</span></div>
                                        <div><strong>{selectedEntry.weather.wind}</strong><span>Wind</span></div>
                                    </div>
                                </>
                            ) : null}

                            <div className="command-center-detail-section-title">Edge components</div>
                            <div className="command-center-detail-grid">
                                <div><strong>{Math.round(selectedEntry.components.market * 100)}%</strong><span>Market</span></div>
                                <div><strong>{Math.round(selectedEntry.components.momentum * 100)}%</strong><span>Momentum</span></div>
                                <div><strong>{Math.round(selectedEntry.components.pattern * 100)}%</strong><span>Pattern</span></div>
                                <div><strong>{Math.round(selectedEntry.components.risk * 100)}%</strong><span>Risk</span></div>
                            </div>

                            <div className="command-center-detail-section-title">Books & lines</div>
                            <div className="command-center-detail-grid">
                                <div><strong>{selectedEntry.bestBook}</strong><span>Best book</span></div>
                                <div><strong>{selectedEntry.bestLine}</strong><span>Best line</span></div>
                                <div><strong>{selectedEntry.consensusProbability}</strong><span>Fair probability</span></div>
                                <div><strong>{selectedEntry.impliedProbability}</strong><span>Implied probability</span></div>
                            </div>

                            <div className="command-center-book-grid">
                                {selectedEntry.books.map((book) => (
                                    <div className="command-center-book-card" key={`${selectedEntry.gameId}-${book.book}-${book.line}`}>
                                        <strong>{book.line}</strong>
                                        <span>{book.book}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="command-center-edge-breakdown">
                                <strong>Why this edge:</strong> {selectedEntry.explanation}
                            </div>
                            <div className="command-center-detail-section-title">YouTube news signal</div>
                            <div className="command-center-detail-grid">
                                <div><strong>{selectedEntry.youtubeSignal.boostApplied ? `+${Math.round(selectedEntry.youtubeSignal.momentumDelta * 100)} pts` : "No boost"}</strong><span>Momentum delta</span></div>
                                <div><strong>{selectedEntry.youtubeSignal.clips.length}</strong><span>Vetted clips</span></div>
                            </div>

                            {selectedEntry.youtubeSignal.clips.length > 0 ? (
                                <div className="command-center-news-list">
                                    {selectedEntry.youtubeSignal.clips.map((clip) => (
                                        <a className="command-center-news-card" href={clip.url} key={clip.videoId} rel="noreferrer" target="_blank">
                                            <strong>{clip.title}</strong>
                                            <span>{clip.channelTitle}</span>
                                            <span>{clip.viewCount.toLocaleString("en-US")} views</span>
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <div className="command-center-edge-breakdown">
                                    No fresh vetted lineup or injury clips passed the whitelist and keyword filter for this edge.
                                </div>
                            )}
                            <div className="command-center-engine-version">Engine {selectedEntry.engineVersion}</div>
                        </>
                    ) : (
                        <div className="command-center-detail-game">
                            <h3>Select a game</h3>
                            <p>Choose a matchup from the table to see the full edge breakdown.</p>
                        </div>
                    )}
                </aside>
            </div>

            <div className="command-center-footer">
                El Jefe Sports © 2026 · Command Center
            </div>
        </div>
    );
}