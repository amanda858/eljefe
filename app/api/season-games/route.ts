import { NextRequest, NextResponse } from "next/server";
import {
    filterSeasonGameCards,
    getSeasonGameFilterOptions,
    isSeasonMarketFamily,
    isSeasonWindow,
    type SeasonMarketFamily,
    type SeasonWindow,
} from "@/lib/site-data";
import { getSeasonFeedSnapshot } from "@/lib/season-feed";

export async function GET(request: NextRequest) {
    const snapshot = await getSeasonFeedSnapshot();
    const sport = request.nextUrl.searchParams.get("sport") ?? undefined;
    const query = request.nextUrl.searchParams.get("query") ?? undefined;
    const network = request.nextUrl.searchParams.get("network") ?? undefined;
    const windowParam = request.nextUrl.searchParams.get("window");
    const marketFamilyParam = request.nextUrl.searchParams.get("marketFamily");
    const window: SeasonWindow | undefined = windowParam && isSeasonWindow(windowParam) ? windowParam : undefined;
    const marketFamily: SeasonMarketFamily | undefined =
        marketFamilyParam && isSeasonMarketFamily(marketFamilyParam) ? marketFamilyParam : undefined;
    const optionSourceGames = filterSeasonGameCards(snapshot.games, { sport, query, window });

    return NextResponse.json({
        games: filterSeasonGameCards(snapshot.games, { sport, query, window, network, marketFamily }),
        filters: getSeasonGameFilterOptions(optionSourceGames),
        source: snapshot.source,
    });
}