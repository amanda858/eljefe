export type BackendTodayGame = {
    id: string;
    league: string;
    leagueCode: string;
    homeTeam: string;
    awayTeam: string;
    homeTeamProfile: {
        abbr: string;
        record: string;
        recentForm: string;
        primaryColor: string;
        secondaryColor: string;
    };
    awayTeamProfile: {
        abbr: string;
        record: string;
        recentForm: string;
        primaryColor: string;
        secondaryColor: string;
    };
    startTime: string;
    venue: string;
    broadcastNetwork: string;
    bestOdds: string;
    bestBook: string;
    edgeSummary: string;
    weather: null | {
        temperature: string;
        humidity: string;
        wind: string;
        conditions: string;
        impact: string;
    };
};

export type BackendOddsLine = {
    id: string;
    book: string;
    marketType: string;
    selection: string;
    price: number;
    line: number | null;
    createdAt: string;
};

export type BackendGameOddsResponse = {
    game: BackendTodayGame;
    odds: BackendOddsLine[];
};

export type BackendTodayEdge = {
    gameId: string;
    sport: string;
    game: string;
    league: string;
    teams: [string, string];
    homeTeamProfile: {
        abbr: string;
        record: string;
        recentForm: string;
        primaryColor: string;
        secondaryColor: string;
    };
    awayTeamProfile: {
        abbr: string;
        record: string;
        recentForm: string;
        primaryColor: string;
        secondaryColor: string;
    };
    startTime: string;
    venue: string;
    weather: null | {
        temperature: string;
        humidity: string;
        wind: string;
        conditions: string;
        impact: string;
    };
    marketType: string;
    selection: string;
    bestLine: string;
    bestBook: string;
    bestPrice: number;
    consensusProbability: string;
    impliedProbability: string;
    edge: string;
    edgeScore: number;
    components: {
        market: number;
        momentum: number;
        pattern: number;
        risk: number;
    };
    engineVersion: string;
    explanation: string;
    timestamp: number;
    youtubeSignal: {
        teams: string[];
        boostApplied: boolean;
        momentumDelta: number;
        clips: Array<{
            videoId: string;
            title: string;
            channelTitle: string;
            publishedAt: string;
            viewCount: number;
            url: string;
        }>;
    };
    books: Array<{
        book: string;
        line: string;
        price: number;
        updatedAt: string;
    }>;
};

function getBackendBaseUrl() {
    return process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:4000";
}

async function backendFetch<T>(path: string): Promise<T | null> {
    try {
        const response = await fetch(`${getBackendBaseUrl()}${path}`, {
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            return null;
        }

        return response.json() as Promise<T>;
    } catch {
        return null;
    }
}

export async function getBackendTodayGames() {
    const payload = await backendFetch<{ games: BackendTodayGame[] }>("/games/today");
    return payload?.games ?? [];
}

export async function getBackendTodayEdges() {
    const payload = await backendFetch<{ edges: BackendTodayEdge[] }>("/edges/today");
    return payload?.edges ?? [];
}

export async function getBackendGameOdds(id: string) {
    return backendFetch<BackendGameOddsResponse>(`/games/${id}/odds`);
}