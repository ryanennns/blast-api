/*
  Warnings:

  - You are about to drop the column `assists` on the `Scoreboard` table. All the data in the column will be lost.
  - You are about to drop the column `deaths` on the `Scoreboard` table. All the data in the column will be lost.
  - You are about to drop the column `flashAssists` on the `Scoreboard` table. All the data in the column will be lost.
  - You are about to drop the column `kills` on the `Scoreboard` table. All the data in the column will be lost.
  - You are about to drop the column `player` on the `Scoreboard` table. All the data in the column will be lost.
  - You are about to drop the column `team` on the `Scoreboard` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "ScoreboardRow" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "team" TEXT NOT NULL,
    "player" TEXT NOT NULL,
    "kills" INTEGER NOT NULL,
    "deaths" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "flashAssists" INTEGER NOT NULL,
    "scoreboardId" TEXT NOT NULL,
    CONSTRAINT "ScoreboardRow_scoreboardId_fkey" FOREIGN KEY ("scoreboardId") REFERENCES "Scoreboard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Scoreboard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "matchId" TEXT NOT NULL,
    CONSTRAINT "Scoreboard_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Scoreboard" ("id", "matchId") SELECT "id", "matchId" FROM "Scoreboard";
DROP TABLE "Scoreboard";
ALTER TABLE "new_Scoreboard" RENAME TO "Scoreboard";
CREATE UNIQUE INDEX "Scoreboard_matchId_key" ON "Scoreboard"("matchId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
