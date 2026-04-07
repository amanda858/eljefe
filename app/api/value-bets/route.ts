import { NextRequest, NextResponse } from "next/server";
import { getValueEngineIntegration } from "@/lib/value-engine";

export async function GET(request: NextRequest) {
    const minEdgeParam = request.nextUrl.searchParams.get("min_edge");
    const minEdge = minEdgeParam ? Number(minEdgeParam) : 0.03;
    const integration = await getValueEngineIntegration(Number.isFinite(minEdge) ? minEdge : 0.03);

    return NextResponse.json(integration);
}