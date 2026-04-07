import { NextRequest, NextResponse } from "next/server";
import { getEventSnapshots } from "@/lib/site-data";

export async function GET(request: NextRequest) {
    const sport = request.nextUrl.searchParams.get("sport") ?? undefined;

    return NextResponse.json({
        events: getEventSnapshots({ sport }),
    });
}