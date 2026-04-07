import { NextResponse } from "next/server";
import { getSeasonFeedSnapshot } from "@/lib/season-feed";

export async function GET() {
    const seasonFeed = await getSeasonFeedSnapshot();

    return NextResponse.json({
        source: seasonFeed.source,
        preview: seasonFeed.games.slice(0, 5).map((game) => ({
            id: game.id,
            event: game.event,
            sport: game.sport,
            watchNetwork: game.watchNetwork,
            hasCrowdContext: game.crowdSignals.length > 0 || game.crowdTemperature !== "Unavailable",
            provenance: game.provenance ?? null,
        })),
    });
}