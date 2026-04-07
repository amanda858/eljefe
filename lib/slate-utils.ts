import type { BackendTodayEdge, BackendTodayGame } from "@/lib/backend-api";
import type { GameTableRow } from "@/components/game-table";

export type EdgePreviewRow = {
    id: string;
    sport: string;
    game: string;
    bestLine: string;
    edgeScore: number;
    edge: string;
    recordSummary: string;
    weatherSummary: string;
    youtubeSummary: string;
};

export function mapGameToSlateRow(game: BackendTodayGame): GameTableRow {
    return {
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
    };
}

export function mapEdgeToPreviewRow(edge: BackendTodayEdge): EdgePreviewRow {
    return {
        id: `${edge.gameId}-${edge.marketType}-${edge.selection}`,
        sport: edge.sport,
        game: edge.game,
        bestLine: `${edge.bestLine} · ${edge.bestBook}`,
        edgeScore: edge.edgeScore,
        edge: edge.edge,
        recordSummary: `${edge.awayTeamProfile.abbr} ${edge.awayTeamProfile.record} vs ${edge.homeTeamProfile.abbr} ${edge.homeTeamProfile.record}`,
        weatherSummary: edge.weather ? `${edge.weather.temperature} · ${edge.weather.wind}` : "No weather adjustment",
        youtubeSummary: edge.youtubeSignal.boostApplied
            ? `${edge.youtubeSignal.clips.length} vetted clip${edge.youtubeSignal.clips.length === 1 ? "" : "s"} boosted momentum`
            : "No vetted YouTube boost",
    };
}