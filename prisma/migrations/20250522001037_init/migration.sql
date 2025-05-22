/*
  Warnings:

  - Added the required column `team_a` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team_b` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Match" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "map" TEXT NOT NULL,
    "team_a" TEXT NOT NULL,
    "team_b" TEXT NOT NULL,
    "winner" TEXT NOT NULL
);
INSERT INTO "new_Match" ("id", "map", "winner") SELECT "id", "map", "winner" FROM "Match";
DROP TABLE "Match";
ALTER TABLE "new_Match" RENAME TO "Match";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
