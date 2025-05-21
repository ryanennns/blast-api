import { PrismaClient } from "../../../prisma/generated/prisma/default";
import { Match } from "../../types/core";

const prisma = new PrismaClient();
export const saveParsedMatch = async (match: Match): Promise<string | null> => {
  try {
    await prisma.$transaction(async (tx) => {
      const dbMatch = await tx.match.create({
        data: {
          map: match.map,
          winner: match.winner.team,
        },
      });
      for (const half of match.halves) {
        const dbHalf = await tx.half.create({
          data: {
            terroristTeam: half.T,
            ctTeam: half.CT,
            matchId: dbMatch.id,
          },
        });

        for (const round of half.rounds) {
          let dbRound = await tx.round.create({
            data: {
              number: round.number,
              winner: round.roundWinner.team,
              winMethod: round.roundWinner.method,
              matchId: dbMatch.id,
              halfId: dbHalf.id,
            },
          });

          await tx.kill.createMany({
            data: round.killFeed.map((kill, index) => ({
              order: index,
              killer: kill.killer,
              killed: kill.killed,
              weapon: kill.weapon,
              headshot: kill.headshot,
              roundId: dbRound.id,
            })),
          });

          await tx.assist.createMany({
            data: round.assistFeed.map((assist, index) => ({
              order: index,
              assister: assist.assister,
              killed: assist.killed,
              roundId: dbRound.id,
            })),
          });

          await tx.flashAssist.createMany({
            data: round.flashAssistFeed.map((assist, index) => ({
              order: index,
              assister: assist.assister,
              killed: assist.killed,
              roundId: dbRound.id,
            })),
          });
        }
      }

      return dbMatch.id;
    });
  } catch (error) {
    console.error("Error saving match:", error);
  }

  return null;
};
