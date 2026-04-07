import "dotenv/config";
import cors from "cors";
import express from "express";
import { edgesRouter } from "./routes/edges.js";
import { gamesRouter } from "./routes/games.js";
import { ingestRouter } from "./routes/ingest.js";
import { oddsRouter } from "./routes/odds.js";

const app = express();
const host = process.env.HOST ?? "0.0.0.0";
const port = Number(process.env.PORT ?? 4000);

app.use(cors());
app.use(express.json());

app.get("/health", (_request, response) => {
    response.json({ ok: true, service: "eljefe-backend" });
});

app.use("/games", gamesRouter);
app.use("/games", oddsRouter);
app.use("/edges", edgesRouter);
app.use("/ingest", ingestRouter);

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
    const message = error instanceof Error ? error.message : "Unknown error";
    response.status(500).json({ error: message });
});

app.listen(port, host, () => {
    console.log(`[eljefe-backend] listening on ${host}:${port}`);
});