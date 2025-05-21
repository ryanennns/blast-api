-- CreateTable
CREATE TABLE "Scoreboard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "team" TEXT NOT NULL,
    "player" TEXT NOT NULL,
    "kills" INTEGER NOT NULL,
    "deaths" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "flashAssists" INTEGER NOT NULL,
    "matchId" TEXT NOT NULL,
    CONSTRAINT "Scoreboard_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Scoreboard_matchId_key" ON "Scoreboard"("matchId");
