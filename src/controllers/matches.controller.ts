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

  const roundCount = await prisma.round.count({
    where: { matchId: uuid },
  });

  res.json({ match: { ...match, roundCount } });
};

export const getMatchRounds = async (req: Request, res: Response) => {
  const rounds = await prisma.round.findMany({
    where: {
      matchId: req.params.uuid,
    },
  });

  res.send({ rounds });
};
