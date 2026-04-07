-- Create enums
CREATE TYPE "MarketType" AS ENUM ('MONEYLINE', 'SPREAD', 'TOTAL');
CREATE TYPE "Selection" AS ENUM ('HOME', 'AWAY', 'OVER', 'UNDER');

-- Create tables
CREATE TABLE "League" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    CONSTRAINT "League_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "leagueId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "abbr" TEXT NOT NULL,
    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "leagueId" TEXT NOT NULL,
    "homeTeamId" TEXT NOT NULL,
    "awayTeamId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "venue" TEXT NOT NULL,
    "broadcastNetwork" TEXT,
    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "OddsSnapshot" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "marketType" "MarketType" NOT NULL,
    "selection" "Selection" NOT NULL,
    "price" INTEGER NOT NULL,
    "line" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "OddsSnapshot_pkey" PRIMARY KEY ("id")
);

-- Indexes
CREATE UNIQUE INDEX "League_code_key" ON "League"("code");
CREATE UNIQUE INDEX "Book_code_key" ON "Book"("code");
CREATE UNIQUE INDEX "Team_leagueId_abbr_key" ON "Team"("leagueId", "abbr");
CREATE INDEX "OddsSnapshot_gameId_marketType_selection_createdAt_idx" ON "OddsSnapshot"("gameId", "marketType", "selection", "createdAt");

-- Foreign keys
ALTER TABLE "Team" ADD CONSTRAINT "Team_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Game" ADD CONSTRAINT "Game_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Game" ADD CONSTRAINT "Game_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Game" ADD CONSTRAINT "Game_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "OddsSnapshot" ADD CONSTRAINT "OddsSnapshot_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "OddsSnapshot" ADD CONSTRAINT "OddsSnapshot_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;