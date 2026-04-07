import express from "express";
import { getTodayGames } from "../services/gamesService.js";
const router = express.Router();
router.get("/today", async (_request, response) => {
    const games = await getTodayGames();
    response.json({ games });
});
export { router as gamesRouter };
