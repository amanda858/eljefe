import { NextRequest, NextResponse } from "next/server";
import { getRealEvents, isOddsApiConfigured } from "@/lib/odds-api";

export async function GET(request: NextRequest) {
    const sport = request.nextUrl.searchParams.get("sport") ?? undefined;

    if (isOddsApiConfigured()) {
        const events = await getRealEvents({ sport });
        return NextResponse.json({ events });
    }

    return NextResponse.json({
        events: [],
    });
}