import { NextResponse } from "next/server";
import { getMarketDetail } from "@/lib/site-data";
import { getRealMarketDetail, isOddsApiConfigured } from "@/lib/odds-api";

type Context = {
    params: Promise<{
        id: string;
    }>;
};

export async function GET(_request: Request, context: Context) {
    const { id } = await context.params;

    if (isOddsApiConfigured()) {
        const detail = await getRealMarketDetail(id);
        if (!detail) {
            return NextResponse.json({ error: "Market not found" }, { status: 404 });
        }
        return NextResponse.json({ detail });
    }

    const detail = getMarketDetail(id);

    if (!detail) {
        return NextResponse.json({ error: "Market not found" }, { status: 404 });
    }

    return NextResponse.json({ detail });
}