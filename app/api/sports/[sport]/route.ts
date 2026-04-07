import { NextRequest, NextResponse } from "next/server";
import { getFilteredMarkets, getSportHub } from "@/lib/site-data";
import { getRealMarkets, isOddsApiConfigured } from "@/lib/odds-api";

type Context = {
    params: Promise<{
        sport: string;
    }>;
};

export async function GET(_request: NextRequest, context: Context) {
    const { sport } = await context.params;
    const normalizedSport = decodeURIComponent(sport);
    const hub = getSportHub(normalizedSport);

    if (!hub) {
        return NextResponse.json({ error: "Sport not found" }, { status: 404 });
    }

    const markets = isOddsApiConfigured()
        ? await getRealMarkets({ sport: hub.sport })
        : getFilteredMarkets({ sport: hub.sport });

    return NextResponse.json({
        hub,
        markets: markets.length > 0 ? markets : getFilteredMarkets({ sport: hub.sport }),
    });
}