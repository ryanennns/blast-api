import { PrismaClient } from "../../../prisma/generated/prisma/default";
import { Match } from "../../types/core.ts";

export const saveParsedMatch = async (match: Match) => {
  const prisma = new PrismaClient();

  const dbMatch = await prisma.match.create({
    data: {
      map: match.map,
      winner: match.winner.team,
    },
  });

  try {
    for (const round of match.halves.flatMap((half) => half.rounds)) {
      await prisma.round.create({
        data: {
          number: round.number,
          winner: round.roundWinner.team,
          winMethod: round.roundWinner.method,
          matchId: dbMatch.id,
        },
      });
    }
  } catch (error) {
    console.error("Error saving match:", error);
  }
};
