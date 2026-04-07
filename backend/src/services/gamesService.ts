import { prisma } from "../lib/db.js";
import { getGameWeather, getTeamProfile, type GameWeather, type TeamProfile } from "../lib/gameMetadata.js";
import { americanToImpliedProbability, formatPercent } from "../lib/oddsMath.js";

export type TodayGame = {
    id: string;
    league: string;
    leagueCode: string;
    homeTeam: string;
    awayTeam: string;
    homeTeamProfile: TeamProfile;
    awayTeamProfile: TeamProfile;
    startTime: string;
    venue: string;
    broadcastNetwork: string;
    bestOdds: string;
    bestBook: string;
    edgeSummary: string;
    weather: GameWeather | null;
};

type OddsRow = {
    book: {
        id: string;
        name: string;
    };
    selection: string;
    price: number;
};

function formatAmerican(price: number) {
    return price > 0 ? `+${price}` : `${price}`;
}

function summarizeCurrentOdds(rows: OddsRow[]) {
    if (!rows.length) {
        return {
            bestOdds: "Unavailable",
            bestBook: "No books",
            edgeSummary: "0.0%",
        };
    }

    const bestRow = [...rows].sort((left, right) => right.price - left.price)[0];
    const consensusProbability = rows.reduce((sum, row) => sum + americanToImpliedProbability(row.price), 0) / rows.length;
    const bestProbability = americanToImpliedProbability(bestRow.price);
    const edge = Math.max(consensusProbability - bestProbability, 0);

    return {
        bestOdds: `${bestRow.selection} ${formatAmerican(bestRow.price)}`,
        bestBook: bestRow.book.name,
        edgeSummary: formatPercent(edge),
    };
}

async function joinGame(gameId: string) {
    const game = await prisma.game.findUnique({
        where: { id: gameId },
        include: {
            league: true,
            homeTeam: true,
            awayTeam: true,
            oddsSnapshots: {
                where: { marketType: "MONEYLINE" },
                include: { book: true },
                orderBy: { createdAt: "desc" },
            },
        },
    });

    if (!game) {
        return null;
    }

    const latestByBookSelection = new Map<string, OddsRow>();

    for (const row of game.oddsSnapshots) {
        const key = `${row.book.id}:${row.selection}`;
        if (!latestByBookSelection.has(key)) {
            latestByBookSelection.set(key, {
                book: { id: row.book.id, name: row.book.name },
                selection: row.selection,
                price: row.price,
            });
        }
    }

    const summary = summarizeCurrentOdds([...latestByBookSelection.values()]);
    const homeTeamProfile = getTeamProfile(game.homeTeam.name, game.homeTeam.abbr);
    const awayTeamProfile = getTeamProfile(game.awayTeam.name, game.awayTeam.abbr);
    const weather = getGameWeather(game.league.code, game.venue);

    return {
        id: game.id,
        league: game.league.name,
        leagueCode: game.league.code,
        homeTeam: game.homeTeam.name,
        awayTeam: game.awayTeam.name,
        homeTeamProfile,
        awayTeamProfile,
        startTime: game.startTime.toISOString(),
        venue: game.venue,
        broadcastNetwork: game.broadcastNetwork ?? "Unavailable",
        bestOdds: summary.bestOdds,
        bestBook: summary.bestBook,
        edgeSummary: summary.edgeSummary,
        weather,
    } satisfies TodayGame;
}

export async function getTodayGames() {
    const games = await prisma.game.findMany({
        orderBy: { startTime: "asc" },
        select: { id: true },
    });

    const joined = await Promise.all(games.map((game) => joinGame(game.id)));
    return joined.filter((game): game is TodayGame => Boolean(game));
}

export async function getGameById(id: string) {
    return joinGame(id);
}