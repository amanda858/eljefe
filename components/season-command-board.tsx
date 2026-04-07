"use client";

import { startTransition, useEffect, useMemo, useState } from "react";
import {
    getSeasonMarketFamily,
    seasonMarketFamilyLabels,
    type SeasonFieldProvenance,
    type SeasonGameCard,
    type SeasonGameFilterOptions,
    type SeasonMarketFamily,
    type SeasonWindow,
} from "@/lib/site-data";
import { isVerifiedSeasonField, isVerifiedSeasonSource, type SeasonFeedSource } from "@/lib/season-feed";

type SeasonCommandBoardProps = {
    initialGames: SeasonGameCard[];
    sports: string[];
    initialSport?: string;
    initialWindow?: SeasonWindow;
    maxItems?: number;
    compact?: boolean;
    initialSource?: SeasonFeedSource;
};

type SeasonNetworkOption = {
    value: string;
    count: number;
};

type SeasonMarketFamilyOption = {
    value: SeasonMarketFamily | "All";
    count: number;
};

const seasonWindows: Array<{ value: SeasonWindow; label: string }> = [
    { value: "today", label: "Today" },
    { value: "next-30", label: "Next 30" },
    { value: "summer", label: "Summer" },
    { value: "football", label: "Football" },
    { value: "full-year", label: "Full year" },
];

function formatCalendarDate(value: string) {
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        timeZone: "UTC",
    }).format(new Date(value));
}

function formatSourceTimestamp(value: string) {
    const date = new Date(value);

    const monthDay = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        timeZone: "UTC",
    }).format(date);

    const time = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "UTC",
    }).format(date);

    return `${monthDay} ${time} UTC`;
}

function formatProvenanceLabel(value: SeasonFieldProvenance | undefined) {
    switch (value) {
        case "feed":
            return "Base feed";
        case "overlay":
            return "Overlay";
        case "derived":
            return "Derived";
        case "seeded":
            return "Seeded";
        case "missing":
        default:
            return "Missing";
    }
}

export function SeasonCommandBoard({
    initialGames,
    sports,
    initialSport = "All",
    initialWindow = "full-year",
    maxItems,
    compact = false,
    initialSource,
}: SeasonCommandBoardProps) {
    const [selectedSport, setSelectedSport] = useState(initialSport);
    const [selectedWindow, setSelectedWindow] = useState<SeasonWindow>(initialWindow);
    const [selectedNetwork, setSelectedNetwork] = useState("All");
    const [selectedMarketFamily, setSelectedMarketFamily] = useState<SeasonMarketFamily | "All">("All");
    const [query, setQuery] = useState("");
    const [games, setGames] = useState(initialGames);
    const [selectedGameId, setSelectedGameId] = useState(initialGames[0]?.id ?? "");
    const [isLoading, setIsLoading] = useState(false);
    const [source, setSource] = useState<SeasonFeedSource>(
        initialSource ?? {
            mode: "seeded",
            status: "seeded",
            label: "Seeded schedule",
            lastUpdated: "2026-04-02T00:00:00Z",
            endpoint: null,
            reason: null,
            gameCount: initialGames.length,
            networkCoverage: initialGames.filter((game: SeasonGameCard) => game.watchNetwork && game.watchNetwork !== "Unavailable").length,
            crowdCoverage: initialGames.filter((game: SeasonGameCard) => game.crowdSignals.length > 0 || game.crowdTemperature !== "Unavailable").length,
        },
    );

    const initialFilterOptions = useMemo<SeasonGameFilterOptions>(
        () => ({
            networks: [...new Set(initialGames.map((game: SeasonGameCard) => game.watchNetwork))]
                .sort((left, right) => left.localeCompare(right))
                .map((value) => ({
                    value,
                    count: initialGames.filter((game: SeasonGameCard) => game.watchNetwork === value).length,
                })),
            marketFamilies: [...new Set(initialGames.map((game: SeasonGameCard) => getSeasonMarketFamily(game)))]
                .sort((left, right) => seasonMarketFamilyLabels[left].localeCompare(seasonMarketFamilyLabels[right]))
                .map((value) => ({
                    value,
                    count: initialGames.filter((game: SeasonGameCard) => getSeasonMarketFamily(game) === value).length,
                })),
        }),
        [initialGames],
    );
    const [filterOptions, setFilterOptions] = useState<SeasonGameFilterOptions>(initialFilterOptions);

    const networkOptions = useMemo<SeasonNetworkOption[]>(
        () => [{ value: "All", count: games.length }, ...filterOptions.networks],
        [filterOptions, games.length],
    );
    const marketFamilyOptions = useMemo<SeasonMarketFamilyOption[]>(
        () => [{ value: "All", count: games.length }, ...filterOptions.marketFamilies],
        [filterOptions, games.length],
    );
    const selectedMarketFamilyLabel =
        selectedMarketFamily === "All" ? null : seasonMarketFamilyLabels[selectedMarketFamily as SeasonMarketFamily];
    const activeFilters = useMemo(
        () => [
            selectedSport !== "All" ? selectedSport : null,
            selectedNetwork !== "All" ? selectedNetwork : null,
            selectedMarketFamilyLabel,
        ].filter((value): value is string => Boolean(value)),
        [selectedMarketFamilyLabel, selectedNetwork, selectedSport],
    );

    useEffect(() => {
        const controller = new AbortController();
        const params = new URLSearchParams();

        if (selectedSport !== "All") {
            params.set("sport", selectedSport);
        }

        if (query.trim()) {
            params.set("query", query.trim());
        }

        if (selectedNetwork !== "All") {
            params.set("network", selectedNetwork);
        }

        if (selectedMarketFamily !== "All") {
            params.set("marketFamily", selectedMarketFamily);
        }

        params.set("window", selectedWindow);

        setIsLoading(true);

        fetch(`/api/season-games?${params.toString()}`, { signal: controller.signal })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error("Failed to load season games");
                }

                return response.json() as Promise<{ games: SeasonGameCard[]; filters: SeasonGameFilterOptions; source: SeasonFeedSource }>;
            })
            .then((data) => {
                startTransition(() => {
                    setGames(data.games);
                    setFilterOptions(data.filters);
                    setSource(data.source);
                    setSelectedNetwork((current: string) =>
                        current === "All" || data.filters.networks.some((option) => option.value === current) ? current : "All",
                    );
                    setSelectedMarketFamily((current: SeasonMarketFamily | "All") =>
                        current === "All" || data.filters.marketFamilies.some((option) => option.value === current) ? current : "All",
                    );
                    setSelectedGameId((current: string) => {
                        if (current && data.games.some((game: SeasonGameCard) => game.id === current)) {
                            return current;
                        }

                        return data.games[0]?.id ?? "";
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
    }, [query, selectedMarketFamily, selectedNetwork, selectedSport, selectedWindow]);

    const visibleGames = useMemo(() => (typeof maxItems === "number" ? games.slice(0, maxItems) : games), [games, maxItems]);
    const selectedGame = visibleGames.find((game: SeasonGameCard) => game.id === selectedGameId) ?? visibleGames[0] ?? null;
    const uniqueNetworks = useMemo(() => new Set(games.map((game: SeasonGameCard) => game.watchNetwork)).size, [games]);
    const uniqueSports = useMemo(() => new Set(games.map((game: SeasonGameCard) => game.sport)).size, [games]);
    const averageEdge = useMemo(() => {
        if (!games.length) {
            return "0.0%";
        }

        const totalEdge = games.reduce((sum: number, game: SeasonGameCard) => sum + Number.parseFloat(game.edge.replace("%", "")), 0);
        return `${(totalEdge / games.length).toFixed(1)}%`;
    }, [games]);
    const hasVerifiedSchedule = isVerifiedSeasonSource(source);
    const sourceSummary =
        source.status === "live"
            ? source.label
            : source.status === "stale"
                ? `${source.label} stale`
                : source.status === "fallback"
                    ? "Verified schedule unavailable"
                    : source.label;
    const sourceTimestamp = useMemo(
        () => formatSourceTimestamp(source.lastUpdated),
        [source.lastUpdated],
    );
    const sourceBadgeLabel =
        source.status === "live"
            ? "Verified feed"
            : source.status === "stale"
                ? "Stale feed"
                : source.status === "fallback"
                    ? "Unavailable"
                    : "Not configured";
    const hasCrowdContext = selectedGame
        ? hasVerifiedSchedule &&
        (isVerifiedSeasonField(selectedGame.provenance?.crowdSignals) || isVerifiedSeasonField(selectedGame.provenance?.crowdTemperature))
        : false;
    const hasNetworkContext = selectedGame ? hasVerifiedSchedule && isVerifiedSeasonField(selectedGame.provenance?.watchNetwork) : false;
    const hasVerifiedWatchWindow = selectedGame
        ? hasVerifiedSchedule && isVerifiedSeasonField(selectedGame.provenance?.watchWindow, { allowDerived: true })
        : false;
    const hasVerifiedRationale = selectedGame ? hasVerifiedSchedule && isVerifiedSeasonField(selectedGame.provenance?.rationale) : false;
    const selectedGameProvenance = selectedGame?.provenance;

    return (
        <section className={`season-command-board ${compact ? "season-command-board-compact" : ""}`}>
            <div className="market-board-controls">
                <label className="market-control">
                    <span>Sport</span>
                    <select value={selectedSport} onChange={(event: { target: { value: string } }) => setSelectedSport(event.target.value)}>
                        <option value="All">All</option>
                        {sports.map((sport) => (
                            <option key={sport} value={sport}>
                                {sport}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="market-control market-search">
                    <span>Search the calendar</span>
                    <input
                        type="search"
                        value={query}
                        onChange={(event: { target: { value: string } }) => setQuery(event.target.value)}
                        placeholder="Event, network, market, crowd signal"
                    />
                </label>
                <label className="market-control">
                    <span>Network</span>
                    <select value={selectedNetwork} onChange={(event: { target: { value: string } }) => setSelectedNetwork(event.target.value)}>
                        {networkOptions.map((network: SeasonNetworkOption) => (
                            <option key={network.value} value={network.value}>
                                {network.value} ({network.count})
                            </option>
                        ))}
                    </select>
                </label>
                <label className="market-control">
                    <span>Market family</span>
                    <select
                        value={selectedMarketFamily}
                        onChange={(event: { target: { value: string } }) => setSelectedMarketFamily(event.target.value as SeasonMarketFamily | "All")}
                    >
                        {marketFamilyOptions.map((marketFamily: SeasonMarketFamilyOption) => (
                            <option key={marketFamily.value} value={marketFamily.value}>
                                {marketFamily.value === "All" ? "All" : seasonMarketFamilyLabels[marketFamily.value]} ({marketFamily.count})
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="season-window-row" role="tablist" aria-label="season windows">
                {seasonWindows.map((window) => (
                    <button
                        className={`season-window-chip ${selectedWindow === window.value ? "season-window-chip-active" : ""}`}
                        key={window.value}
                        onClick={() => setSelectedWindow(window.value)}
                        type="button"
                    >
                        {window.label}
                    </button>
                ))}
            </div>

            <div className="market-board-status">
                <span>
                    {games.length
                        ? `${visibleGames.length}${visibleGames.length !== games.length ? ` of ${games.length}` : ""} verified games in the selected window`
                        : "No verified games in the selected window"}
                </span>
                <span>{isLoading ? "Refreshing verified schedule" : `${sourceSummary} · ${sourceTimestamp}`}</span>
            </div>

            <div className="season-feed-meta-row" aria-label="season feed status">
                <span className={`season-feed-badge season-feed-badge-${source.status}`}>{sourceBadgeLabel}</span>
                <span className="season-feed-meta-copy">{source.gameCount} verified games mapped into the 2026 season window.</span>
                <span className="season-feed-meta-copy">Verified networks {source.networkCoverage}/{source.gameCount}</span>
                <span className="season-feed-meta-copy">Verified crowd context {source.crowdCoverage}/{source.gameCount}</span>
                {source.reason ? <span className="season-feed-meta-copy">{source.reason}</span> : null}
            </div>

            {activeFilters.length ? (
                <div className="season-active-filter-row" aria-label="active season filters">
                    {activeFilters.map((filter: string) => (
                        <span className="season-active-filter-chip" key={filter}>
                            {filter}
                        </span>
                    ))}
                </div>
            ) : null}

            <div className="season-stats-grid">
                <article className="season-stat-card">
                    <span>Games</span>
                    <strong>{games.length}</strong>
                </article>
                <article className="season-stat-card">
                    <span>Networks</span>
                    <strong>{uniqueNetworks}</strong>
                </article>
                <article className="season-stat-card">
                    <span>Sports</span>
                    <strong>{uniqueSports}</strong>
                </article>
                <article className="season-stat-card">
                    <span>Avg edge</span>
                    <strong>{averageEdge}</strong>
                </article>
            </div>

            {selectedGame ? (
                <div className="season-command-layout">
                    <div className="season-game-list">
                        {visibleGames.map((game) => {
                            const isActive = game.id === selectedGame.id;

                            return (
                                <button
                                    className={`season-game-row ${isActive ? "season-game-row-active" : ""}`}
                                    key={game.id}
                                    onClick={() => setSelectedGameId(game.id)}
                                    type="button"
                                >
                                    <div className="season-game-date">
                                        <span>{formatCalendarDate(game.commenceAt)}</span>
                                        <strong>
                                            {hasVerifiedSchedule && isVerifiedSeasonField(game.provenance?.watchWindow, { allowDerived: true })
                                                ? game.watchWindow
                                                : "Time unverified"}
                                        </strong>
                                    </div>
                                    <div>
                                        <strong>{game.event}</strong>
                                        <span>{game.league} · {game.market}</span>
                                    </div>
                                    <div>
                                        <strong>{game.recommendation}</strong>
                                        <span>{game.bestBook} · {game.bestPrice}</span>
                                    </div>
                                    <div>
                                        <strong>
                                            {hasVerifiedSchedule && isVerifiedSeasonField(game.provenance?.watchNetwork)
                                                ? game.watchNetwork
                                                : "Network unverified"}
                                        </strong>
                                        <span>
                                            {hasVerifiedSchedule && isVerifiedSeasonField(game.provenance?.watchNetwork)
                                                ? "Verified listing"
                                                : "Awaiting verified feed"}
                                        </span>
                                    </div>
                                    <div className="season-game-meta">
                                        <strong>{game.edge}</strong>
                                        <span>{game.confidence}</span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <article className="season-game-detail">
                        <div className="card-header">
                            <div>
                                <p>Season recommendation deck</p>
                                <span>{selectedGame.sport} · {selectedGame.league}</span>
                            </div>
                            <span className="season-network-chip">{hasNetworkContext ? selectedGame.watchNetwork : "Network unverified"}</span>
                        </div>

                        <div className="season-provenance-row" aria-label="field provenance">
                            <span className="season-provenance-chip">Network: {formatProvenanceLabel(selectedGameProvenance?.watchNetwork)}</span>
                            <span className="season-provenance-chip">Window: {formatProvenanceLabel(selectedGameProvenance?.watchWindow)}</span>
                            <span className="season-provenance-chip">Crowd: {formatProvenanceLabel(selectedGameProvenance?.crowdTemperature)}</span>
                            <span className="season-provenance-chip">Rationale: {formatProvenanceLabel(selectedGameProvenance?.rationale)}</span>
                        </div>

                        <div>
                            <p className="card-kicker">Recommended bet</p>
                            <h3>{selectedGame.recommendation}</h3>
                            <p className="market-detail-copy">
                                {hasVerifiedRationale ? selectedGame.rationale : "No verified rationale is attached for this game yet."}
                            </p>
                        </div>

                        <div className="season-detail-grid">
                            <article className="market-detail-card">
                                <p className="card-kicker">Best number</p>
                                <p className="market-detail-copy">{selectedGame.bestBook} · {selectedGame.bestPrice}</p>
                            </article>
                            <article className="market-detail-card">
                                <p className="card-kicker">Projected edge</p>
                                <p className="market-detail-copy">{selectedGame.edge}</p>
                            </article>
                            <article className="market-detail-card">
                                <p className="card-kicker">Confidence</p>
                                <p className="market-detail-copy">{selectedGame.confidence}</p>
                            </article>
                            <article className="market-detail-card">
                                <p className="card-kicker">Crowd read</p>
                                <p className="market-detail-copy">{hasCrowdContext ? selectedGame.crowdTemperature : "No verified crowd context attached."}</p>
                            </article>
                        </div>

                        <div className="market-detail-stack">
                            <article className="market-detail-card">
                                <p className="card-kicker">Watch window</p>
                                <p className="market-detail-copy">
                                    {hasVerifiedWatchWindow ? `${selectedGame.watchWindow} · ${selectedGame.venue}` : `Watch time unverified · ${selectedGame.venue}`}
                                </p>
                            </article>
                            <article className="market-detail-card">
                                <p className="card-kicker">Market focus</p>
                                <p className="market-detail-copy">{selectedGame.market}</p>
                            </article>
                        </div>

                        <div>
                            <div className="card-header">
                                <div>
                                    <p>Crowd-sourced rationale</p>
                                    <span>{hasCrowdContext ? "Verified crowd context attached" : "No verified crowd overlay attached for this game"}</span>
                                </div>
                                <span>{selectedGame.tags.length ? selectedGame.tags.join(" · ") : "No tags"}</span>
                            </div>
                            {selectedGame.crowdSignals.length ? (
                                <div className="season-signal-grid">
                                    {selectedGame.crowdSignals.map((signal) => (
                                        <article className="season-signal-card" key={`${selectedGame.id}-${signal.source}`}>
                                            <p className="card-kicker">{signal.source}</p>
                                            <h3>{signal.signal}</h3>
                                            <p className="market-detail-copy">{signal.impact}</p>
                                        </article>
                                    ))}
                                </div>
                            ) : (
                                <article className="season-empty-state">
                                    <p className="card-kicker">No crowd overlay</p>
                                    <h3>Only upstream schedule fields are available for this game.</h3>
                                    <p className="market-detail-copy">Attach a real context overlay feed to surface network corrections, crowd signals, or rationale without falling back to seeded editorial detail.</p>
                                </article>
                            )}
                        </div>
                    </article>
                </div>
            ) : (
                <article className="season-empty-state">
                    <p className="card-kicker">No verified games available</p>
                    <h3>Connect a verified season feed or widen the filter once schedule data is available.</h3>
                    <p className="market-detail-copy">This board only renders schedule, network, and crowd context from a configured upstream feed.</p>
                </article>
            )}
        </section>
    );
}