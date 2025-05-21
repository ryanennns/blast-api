-- CreateTable
CREATE TABLE "FlashAssist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "roundId" TEXT NOT NULL,
    "assister" TEXT NOT NULL,
    "killed" TEXT NOT NULL,
    CONSTRAINT "FlashAssist_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
