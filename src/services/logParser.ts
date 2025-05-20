import {
  ASSIST_REGEX,
  FLASH_ASSIST_REGEX,
  KILL_REGEX,
} from "./const.ts";

interface ScoreboardRow {
  kills: number;
  deaths: number;
  assists: number;
  flashAssists: number;
}

interface Kill {
  killer: string;
  killee: string;
  weapon: string;
  headshot: boolean;
}

interface Assist {
  assister: string;
  killee: string;
}

const parseKillLog = (line: string): Kill | null => {
  const match = line.match(KILL_REGEX);

  if (match) {
    const [_, killer, killee, weapon, headshot] = match;

    // shox has forced me to trim these names :|
    return {
      killer: killer.trim(),
      killee: killee.trim(),
      weapon,
      headshot: !!headshot,
    };
  }

  return null;
};

const parseAssistLog = (line: string): Assist | null => {
  const match = line.match(ASSIST_REGEX);

  if (match) {
    const [_, assister, killee] = match;

    return { assister: assister.trim(), killee: killee.trim() };
  }

  return null;
};

const parseFlashAssistLog = (line: string): Assist | null => {
  const match = line.match(FLASH_ASSIST_REGEX);

  if (match) {
    const [_, assister, killee] = match;

    return { assister: assister.trim(), killee: killee.trim() };
  }

  return null;
};

const createScoreboard = (
  killFeed: Kill[],
  assistFeed: Assist[],
  flashAssistFeed: Assist[],
): Record<string, ScoreboardRow> => {
  const scoreboard: Record<string, ScoreboardRow> = {};

  const players = new Set<string>();
  killFeed.forEach(({ killer, killee }) => {
    players.add(killer);
    players.add(killee);
  });

  players.forEach((username) => {
    scoreboard[username] = {
      kills: 0,
      deaths: 0,
      assists: 0,
      flashAssists: 0,
    };
  });

  killFeed.forEach((kill) => {
    scoreboard[kill.killer].kills += 1;
    scoreboard[kill.killee].deaths += 1;
  });

  assistFeed.forEach(({assister}) => (scoreboard[assister].assists += 1));

  flashAssistFeed.forEach(
    ({assister}) => (scoreboard[assister].flashAssists += 1),
  );

  return scoreboard;
};

export const parseLog = (text: string) => {
  const lastMatchStartIndex = text.lastIndexOf("Match_Start");
  if (lastMatchStartIndex !== -1) {
    text = text.slice(lastMatchStartIndex);
  }

  const logLines = text.split("\n");

  const killFeed = logLines
    .filter((l) => l.match(KILL_REGEX))
    .map(parseKillLog)
    .filter((k) => k !== null);

  const assistFeed = logLines
    .filter((l) => l.match(ASSIST_REGEX))
    .map(parseAssistLog)
    .filter((a) => a !== null);

  const flashAssistFeed = logLines
    .filter((l) => l.match(FLASH_ASSIST_REGEX))
    .map(parseFlashAssistLog)
    .filter((a) => a !== null);

  const scoreboard = createScoreboard(killFeed, assistFeed, flashAssistFeed);

  return {
    rounds: (text.match(/Round_End/g) || []).length,
    scoreboard,
  };
};
