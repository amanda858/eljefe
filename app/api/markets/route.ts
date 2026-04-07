import { NextRequest, NextResponse } from "next/server";
import { sportsUniverse } from "@/lib/site-data";
import { getRealMarkets, isOddsApiConfigured } from "@/lib/odds-api";

export async function GET(request: NextRequest) {
    const sport = request.nextUrl.searchParams.get("sport") ?? undefined;
    const query = request.nextUrl.searchParams.get("query") ?? undefined;

    if (isOddsApiConfigured()) {
        const markets = await getRealMarkets({ sport, query });
        return NextResponse.json({ markets, sports: sportsUniverse });
    }

    return NextResponse.json({
        markets: [],
        sports: sportsUniverse,
    });
}