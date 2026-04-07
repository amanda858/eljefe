import { NextResponse } from "next/server";
import { getRealMarketDetail, isOddsApiConfigured } from "@/lib/odds-api";

type Context = {
    params: Promise<{
        id: string;
    }>;
};

export async function GET(_request: Request, context: Context) {
    const { id } = await context.params;

    if (!isOddsApiConfigured()) {
        return NextResponse.json({ error: "Live market feed not configured" }, { status: 404 });
    }

    const detail = await getRealMarketDetail(id);

    if (!detail) {
        return NextResponse.json({ error: "Market not found" }, { status: 404 });
    }

    return NextResponse.json({ detail });
}