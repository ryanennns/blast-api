-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ScoreboardRow" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "player" TEXT NOT NULL,
    "team" TEXT NOT NULL DEFAULT '',
    "kills" INTEGER NOT NULL,
    "deaths" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "flashAssists" INTEGER NOT NULL,
    "scoreboardId" TEXT NOT NULL,
    CONSTRAINT "ScoreboardRow_scoreboardId_fkey" FOREIGN KEY ("scoreboardId") REFERENCES "Scoreboard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ScoreboardRow" ("assists", "deaths", "flashAssists", "id", "kills", "player", "scoreboardId") SELECT "assists", "deaths", "flashAssists", "id", "kills", "player", "scoreboardId" FROM "ScoreboardRow";
DROP TABLE "ScoreboardRow";
ALTER TABLE "new_ScoreboardRow" RENAME TO "ScoreboardRow";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
