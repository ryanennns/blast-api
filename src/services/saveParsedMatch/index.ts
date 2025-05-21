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
        let dbRound = await prisma.round.create({
          data: {
            number: round.number,
            winner: round.roundWinner.team,
            winMethod: round.roundWinner.method,
            matchId: dbMatch.id,
            halfId: dbHalf.id,
          },
        });

        for (const kill of round.killFeed) {
          await prisma.kill.create({
            data: {
              killer: kill.killer,
              killed: kill.killed,
              weapon: kill.weapon,
              headshot: kill.headshot,
              roundId: dbRound.id,
            },
          });
        }

        for (const assist of round.assistFeed) {
          await prisma.assist.create({
            data: {
              assister: assist.assister,
              killed: assist.killed,
              roundId: dbRound.id,
            },
          });
        }

        for (const flashAssist of round.flashAssistFeed) {
          await prisma.flashAssist.create({
            data: {
              assister: flashAssist.assister,
              killed: flashAssist.killed,
              roundId: dbRound.id,
            },
          });
        }
      }
    }
  } catch (error) {
    console.error("Error saving match:", error);
  }
};
