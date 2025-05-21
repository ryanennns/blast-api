-- CreateTable
CREATE TABLE "Half" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "matchId" TEXT NOT NULL,
    "terroristTeam" TEXT NOT NULL,
    "ctTeam" TEXT NOT NULL,
    CONSTRAINT "Half_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
