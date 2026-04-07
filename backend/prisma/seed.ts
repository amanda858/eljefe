import { pathToFileURL } from "node:url";
import { PrismaClient } from "@prisma/client";
import { books, games, leagues, oddsSnapshots, teams } from "../src/lib/mock-data.js";

const prisma = new PrismaClient();

export async function seedDatabase(client: PrismaClient) {
    await client.oddsSnapshot.deleteMany();
    await client.game.deleteMany();
    await client.book.deleteMany();
    await client.team.deleteMany();
    await client.league.deleteMany();

    await client.league.createMany({
        data: leagues,
    });

    await client.team.createMany({
        data: teams,
    });

    await client.book.createMany({
        data: books,
    });

    await client.game.createMany({
        data: games.map((game) => ({
            ...game,
            startTime: new Date(game.startTime),
        })),
    });

    await client.oddsSnapshot.createMany({
        data: oddsSnapshots.map((snapshot) => ({
            ...snapshot,
            createdAt: new Date(snapshot.createdAt),
        })),
    });
}

async function main() {
    await seedDatabase(prisma);
}

const isDirectRun = Boolean(process.argv[1]) && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
    main()
        .then(async () => {
            await prisma.$disconnect();
        })
        .catch(async (error) => {
            console.error(error);
            await prisma.$disconnect();
            process.exit(1);
        });
}