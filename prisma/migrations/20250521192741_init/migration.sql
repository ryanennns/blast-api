-- CreateTable
CREATE TABLE "Kill" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "roundId" TEXT NOT NULL,
    "killer" TEXT NOT NULL,
    "killed" TEXT NOT NULL,
    "weapon" TEXT NOT NULL,
    "headshot" BOOLEAN NOT NULL,
    CONSTRAINT "Kill_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
