-- CreateTable
CREATE TABLE "Assist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "roundId" TEXT NOT NULL,
    "assister" TEXT NOT NULL,
    "killed" TEXT NOT NULL,
    CONSTRAINT "Assist_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
