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
    for (const half of match.halves) {
      const dbHalf = await prisma.half.create({
        data: {
          terroristTeam: half.T,
          ctTeam: half.CT,
          matchId: dbMatch.id,
        },
      });

      for (const round of half.rounds) {
        await prisma.round.create({
          data: {
            number: round.number,
            winner: round.roundWinner.team,
            winMethod: round.roundWinner.method,
            matchId: dbMatch.id,
            halfId: dbHalf.id,
          },
        });
      }
    }
  } catch (error) {
    console.error("Error saving match:", error);
  }
};
