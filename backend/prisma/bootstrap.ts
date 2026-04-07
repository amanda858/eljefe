import { PrismaClient } from "@prisma/client";
import { seedDatabase } from "./seed.js";

const prisma = new PrismaClient();

async function main() {
    const existingLeagues = await prisma.league.count();

    if (existingLeagues > 0) {
        console.log(`[eljefe-backend] database already initialized with ${existingLeagues} leagues`);
        return;
    }

    console.log("[eljefe-backend] seeding initial Postgres data");
    await seedDatabase(prisma);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    });