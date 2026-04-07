import { NextResponse } from "next/server";
import { getEventSnapshot } from "@/lib/site-data";
import { getRealEvent, isOddsApiConfigured } from "@/lib/odds-api";

type Context = {
    params: Promise<{
        id: string;
    }>;
};

export async function GET(_request: Request, context: Context) {
    const { id } = await context.params;

    if (isOddsApiConfigured()) {
        const event = await getRealEvent(id);
        if (!event) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }
        return NextResponse.json({ event });
    }

    const event = getEventSnapshot(id);

    if (!event) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ event });
}