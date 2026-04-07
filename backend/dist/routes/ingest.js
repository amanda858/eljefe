import express from "express";
import { prisma } from "../lib/db.js";
const router = express.Router();
const MARKET_TYPES = new Set(["MONEYLINE", "SPREAD", "TOTAL"]);
const SELECTIONS = new Set(["HOME", "AWAY", "OVER", "UNDER"]);
router.post("/odds", async (request, response) => {
    const payload = Array.isArray(request.body?.snapshots) ? request.body.snapshots : [];
    const snapshots = payload.filter((item) => {
        return Boolean(item
            && typeof item === "object"
            && "gameId" in item
            && "bookId" in item
            && "price" in item
            && "marketType" in item
            && "selection" in item
            && typeof item.gameId === "string"
            && typeof item.bookId === "string"
            && typeof item.price === "number"
            && typeof item.marketType === "string"
            && typeof item.selection === "string"
            && MARKET_TYPES.has(item.marketType)
            && SELECTIONS.has(item.selection));
    });
    if (!snapshots.length) {
        response.status(400).json({ accepted: false, count: 0, message: "No valid snapshots provided." });
        return;
    }
    await prisma.oddsSnapshot.createMany({
        data: snapshots.map((snapshot) => ({
            gameId: snapshot.gameId,
            bookId: snapshot.bookId,
            marketType: snapshot.marketType,
            selection: snapshot.selection,
            price: snapshot.price,
            line: snapshot.line ?? null,
            createdAt: snapshot.createdAt ? new Date(snapshot.createdAt) : new Date(),
        })),
    });
    response.status(202).json({
        accepted: true,
        count: snapshots.length,
        message: "Odds snapshots persisted.",
    });
});
export { router as ingestRouter };
