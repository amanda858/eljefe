import { prisma } from "../lib/db.js";
export async function getLatestOddsForGame(gameId) {
    const rows = await prisma.oddsSnapshot.findMany({
        where: { gameId },
        include: { book: true },
        orderBy: [{ createdAt: "desc" }, { bookId: "asc" }],
    });
    return rows.map((row) => ({
        id: row.id,
        book: row.book.name,
        marketType: row.marketType,
        selection: row.selection,
        price: row.price,
        line: row.line,
        createdAt: row.createdAt.toISOString(),
    }));
}
