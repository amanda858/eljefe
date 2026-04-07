import express from "express";
import { getGameById } from "../services/gamesService.js";
import { getLatestOddsForGame } from "../services/oddsService.js";
const router = express.Router();
router.get("/:id/odds", async (request, response) => {
    const game = await getGameById(request.params.id);
    if (!game) {
        response.status(404).json({ error: "Game not found" });
        return;
    }
    const odds = await getLatestOddsForGame(request.params.id);
    response.json({ game, odds });
});
export { router as oddsRouter };
