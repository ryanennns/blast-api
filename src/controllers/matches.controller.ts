import type { Request, Response } from "express";
import { PrismaClient } from "../../prisma/generated/prisma/default";

const prisma = new PrismaClient();

export const listMatches = async (req: Request, res: Response) => {
  const matches = await prisma.match.findMany({});

  res.json({ matches });
};

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

  const scoreboard = await prisma.scoreboard.findFirst({
    where: { matchId: uuid },
    include: {
      scoreboardRows: {
        select: {
          player: true,
          team: true,
          kills: true,
          deaths: true,
          assists: true,
          flashAssists: true,
        },
      },
    },
  });

  res.json({ match: { ...match, scoreboard, round_count } });
};

export const getMatchKills = async (req: Request, res: Response) => {
  const kills = await prisma.kill.findMany({
    where: {
      round: {
        matchId: req.params.uuid,
      },
    },
  });

  if (!kills) {
    res.status(404).json({ error: "Kills not found" });
  }

  res.send({ kills });
};

export const getMatchRounds = async (req: Request, res: Response) => {
  const rounds = await prisma.round.findMany({
    where: {
      matchId: req.params.uuid,
    },
    include: {
      kills: {
        select: {
          killer: true,
          killed: true,
          weapon: true,
          headshot: true,
          order: true,
        },
      },
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
