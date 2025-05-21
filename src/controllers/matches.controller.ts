import type { Request, Response } from "express";
import { PrismaClient } from "../../prisma/generated/prisma/default";

const prisma = new PrismaClient();
export const getMatch = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  const match = await prisma.match.findUnique({
    where: { id: uuid },
  });

  if (!match) {
    res.status(404).json({ error: "Match not found" });
  }

  const round_count = await prisma.round.count({
    where: { matchId: uuid },
  });

  res.json({ match: { ...match, round_count } });
};

export const getMatchRounds = async (req: Request, res: Response) => {
  const rounds = await prisma.round.findMany({
    where: {
      matchId: req.params.uuid,
    },
  });

  if (!rounds) {
    res.status(404).json({ error: "Rounds not found" });
  }

  res.send({ rounds });
};

export const getMatchHalves = async (req: Request, res: Response) => {
  const halves = await prisma.half.findMany({
    where: {
      matchId: req.params.uuid,
    },
  });

  if (!halves) {
    res.status(404).json({ error: "Halves not found" });
  }

  const mappedHalves = await Promise.all(
    halves.map(async (half) => {
      const round_count = await prisma.round.count({
        where: {
          halfId: half.id,
        },
      });

      return {
        ...half,
        roundCount: round_count,
      };
    }),
  );

  console.log(mappedHalves);

  res.send({ halves: mappedHalves });
};
