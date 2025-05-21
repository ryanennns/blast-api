/*
  Warnings:

  - Added the required column `halfId` to the `Round` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Round" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "winner" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "halfId" TEXT NOT NULL,
    "winMethod" TEXT NOT NULL,
    CONSTRAINT "Round_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Round_halfId_fkey" FOREIGN KEY ("halfId") REFERENCES "Half" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Round" ("id", "matchId", "number", "winMethod", "winner") SELECT "id", "matchId", "number", "winMethod", "winner" FROM "Round";
DROP TABLE "Round";
ALTER TABLE "new_Round" RENAME TO "Round";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
