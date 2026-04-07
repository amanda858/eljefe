import express from "express";
import { formatPercent } from "../lib/oddsMath.js";
import { getTodayEdges } from "../services/edgesService.js";
const router = express.Router();
router.get("/today", async (_request, response) => {
    const edges = await getTodayEdges();
    response.json({
        edges: edges.map((edge) => ({
            ...edge,
            consensusProbability: formatPercent(edge.consensusProbability),
            impliedProbability: formatPercent(edge.impliedProbability),
            edge: formatPercent(edge.edge),
        })),
    });
});
export { router as edgesRouter };
