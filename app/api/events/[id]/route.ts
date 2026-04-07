import { NextResponse } from "next/server";
import { getRealEvent, isOddsApiConfigured } from "@/lib/odds-api";

type Context = {
    params: Promise<{
        id: string;
    }>;
};

export async function GET(_request: Request, context: Context) {
    const { id } = await context.params;

    if (!isOddsApiConfigured()) {
        return NextResponse.json({ error: "Live event feed not configured" }, { status: 404 });
    }

    const event = await getRealEvent(id);

    if (!event) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ event });
}