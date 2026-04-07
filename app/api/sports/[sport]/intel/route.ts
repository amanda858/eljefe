import { NextResponse } from "next/server";
import { getSportHub } from "@/lib/site-data";

type Context = {
    params: Promise<{
        sport: string;
    }>;
};

export async function GET(_request: Request, context: Context) {
    const { sport } = await context.params;
    const normalizedSport = decodeURIComponent(sport);
    const hub = getSportHub(normalizedSport);

    if (!hub) {
        return NextResponse.json({ error: "Sport not found" }, { status: 404 });
    }

    return NextResponse.json({
        sport: hub.sport,
        items: [],
    });
}