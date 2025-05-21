/*
  Warnings:

  - Added the required column `order` to the `Assist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `FlashAssist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Kill` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assist" (
    "order" INTEGER NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "roundId" TEXT NOT NULL,
    "assister" TEXT NOT NULL,
    "killed" TEXT NOT NULL,
    CONSTRAINT "Assist_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Assist" ("assister", "id", "killed", "roundId") SELECT "assister", "id", "killed", "roundId" FROM "Assist";
DROP TABLE "Assist";
ALTER TABLE "new_Assist" RENAME TO "Assist";
CREATE TABLE "new_FlashAssist" (
    "order" INTEGER NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "roundId" TEXT NOT NULL,
    "assister" TEXT NOT NULL,
    "killed" TEXT NOT NULL,
    CONSTRAINT "FlashAssist_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FlashAssist" ("assister", "id", "killed", "roundId") SELECT "assister", "id", "killed", "roundId" FROM "FlashAssist";
DROP TABLE "FlashAssist";
ALTER TABLE "new_FlashAssist" RENAME TO "FlashAssist";
CREATE TABLE "new_Kill" (
    "order" INTEGER NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "roundId" TEXT NOT NULL,
    "killer" TEXT NOT NULL,
    "killed" TEXT NOT NULL,
    "weapon" TEXT NOT NULL,
    "headshot" BOOLEAN NOT NULL,
    CONSTRAINT "Kill_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Kill" ("headshot", "id", "killed", "killer", "roundId", "weapon") SELECT "headshot", "id", "killed", "killer", "roundId", "weapon" FROM "Kill";
DROP TABLE "Kill";
ALTER TABLE "new_Kill" RENAME TO "Kill";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
