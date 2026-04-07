import Link from "next/link";
import { notFound } from "next/navigation";
import { GameDetail } from "@/components/game-detail";
import { getBackendGameOdds, type BackendTodayGame } from "@/lib/backend-api";
import { getRealEvents, isOddsApiConfigured } from "@/lib/odds-api";
import { getEventSnapshots, type EventSnapshot } from "@/lib/site-data";

type GamePageProps = {
    params: Promise<{
        id: string;
    }>;
};

function normalizeLabel(value: string) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

async function getMatchedEventSnapshot(game: BackendTodayGame) {
    const matchup = normalizeLabel(`${game.awayTeam} at ${game.homeTeam}`);
    const candidateEvents: EventSnapshot[] = isOddsApiConfigured()
        ? await getRealEvents({ sport: game.leagueCode })
        : getEventSnapshots({ sport: game.leagueCode });

    return candidateEvents.find((event) => normalizeLabel(event.event) === matchup) ?? null;
}

export default async function GamePage({ params }: GamePageProps) {
    const { id } = await params;

    const payload = await getBackendGameOdds(id);

    if (!payload) {
        notFound();
    }

    const intel = await getMatchedEventSnapshot(payload.game);

    return (
        <main className="page-shell">
            <section className="content-section compact-breadcrumb-section">
                <div className="sport-tags">
                    <Link href="/">Today</Link>
                    <Link href="/edges">Best Edges</Link>
                    <Link href="/dashboard">Dashboard</Link>
                </div>
            </section>
            <GameDetail payload={payload} intel={intel} />
        </main>
    );
}