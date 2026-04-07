import { NextResponse } from "next/server";
import { getValueEngineAccuracy } from "@/lib/value-engine";

export async function GET() {
    const accuracy = await getValueEngineAccuracy();
    return NextResponse.json(accuracy);
}