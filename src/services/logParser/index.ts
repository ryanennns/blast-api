import {
  ASSIST_REGEX,
  BOMB_DEFUSED_INDICATOR,
  CT_TEAM_REGEX,
  CTS_WIN_INDICATOR,
  FLASH_ASSIST_REGEX,
  HALFTIME_REGEX,
  KILL_REGEX,
  TARGET_BOMBED_INDICATOR,
  TERRORIST_TEAM_REGEX,
  TERRORISTS_WIN_INDICATOR,
} from "./const.ts";

const parseKillLog = (line: string): Kill | null => {
  const match = line.match(KILL_REGEX);

  if (match) {
    const [_, killer, killed, weapon, headshot] = match;

    // shox has forced me to trim these names :|
    return {
      killer: killer.trim(),
      killed: killed.trim(),
      weapon,
      headshot: !!headshot,
    };
  }

  return null;
};

const parseAssistLog = (line: string): Assist | null => {
  const match = line.match(ASSIST_REGEX);

  if (match) {
    const [_, assister, killed] = match;

    return { assister: assister.trim(), killed: killed.trim() };
  }

  return null;
};

const parseFlashAssistLog = (line: string): Assist | null => {
  const match = line.match(FLASH_ASSIST_REGEX);

  if (match) {
    const [_, assister, killed] = match;

    return { assister: assister.trim(), killed: killed.trim() };
  }

  return null;
};

const scoreboardFromFeeds = (
  killFeed: Kill[],
  assistFeed: Assist[],
  flashAssistFeed: Assist[],
): Record<string, ScoreboardRow> => {
  const scoreboard: Record<string, ScoreboardRow> = {};

  const players = new Set<string>();
  killFeed.forEach(({ killer, killed }) => {
    players.add(killer);
    players.add(killed);
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
    scoreboard[kill.killed].deaths += 1;
  });

  assistFeed.forEach(({ assister }) => (scoreboard[assister].assists += 1));

  flashAssistFeed.forEach(
    ({ assister }) => (scoreboard[assister].flashAssists += 1),
  );

  return scoreboard;
};

const determineRoundWinner = (
  round: string[],
): {
  team: TeamRole;
  method: "kills" | "bomb" | "defusal";
} => {
  const terroristsWinByKills = round.some((line) =>
    line.includes(TERRORISTS_WIN_INDICATOR),
  );
  const terroristsWinByBomb = round.some((line) =>
    line.includes(TARGET_BOMBED_INDICATOR),
  );
  const ctsWinByKills = round.some((line) => line.includes(CTS_WIN_INDICATOR));
  const ctsWinByDefusal = round.some((line) =>
    line.includes(BOMB_DEFUSED_INDICATOR),
  );

  const terroristsWin = terroristsWinByBomb || terroristsWinByKills;
  const ctsWin = ctsWinByDefusal || ctsWinByKills;

  if (terroristsWin === ctsWin) {
    throw new Error("Win conditions uncertain for round");
  }

  return terroristsWin
    ? { team: "T", method: terroristsWinByKills ? "kills" : "bomb" }
    : { team: "CT", method: ctsWinByKills ? "kills" : "defusal" };
};

const determineRoundTeams = (round: string[]): Record<TeamRole, string> => {
  const [_a, ctTeam] = round.join("\n").match(CT_TEAM_REGEX) ?? [];
  const [_b, terroristTeam] =
    round.join("\n").match(TERRORIST_TEAM_REGEX) ?? [];

  console.log(round);

  return {
    T: terroristTeam,
    CT: ctTeam,
  };
};

export const logToScoreboard = (text: string) => {
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

  return scoreboardFromFeeds(killFeed, assistFeed, flashAssistFeed);
};

export const determineWinnerByRounds = (rounds: Round[]) => {
  const { T, CT } = rounds[0].teams;
  const teams: Record<string, number> = {
    [T]: 0,
    [CT]: 0,
  };

  rounds.forEach((round) => {
    const roundWinningTeam = round.teams[round.roundWinner.team];
    teams[roundWinningTeam]++;
  });

  if (Object.values(teams).length !== 2) {
    throw new Error(
      "Log could not be parsed into two teams; please check source.",
    );
  }

  const [winner] = Object.entries(teams).sort((a, b) => {
    return b[1] - a[1];
  })[0];

  return winner;
};

export const logToMatch = (text: string): Match => {
  const halves = logToHalves(text);
  const winner = determineWinnerByRounds(halves.flatMap((half) => half.rounds));
  const scoreboard = logToScoreboard(text);

  return {
    halves,
    winner: {
      team: winner,
    },
    scoreboard,
  };
};

export const logToHalves = (text: string): Half[] => {
  const lastMatchStartIndex = text.lastIndexOf("Match_Start");

  if (lastMatchStartIndex === -1) {
    throw new Error("Match_Start not found in log");
  }
  text = text.slice(lastMatchStartIndex);

  let halves = text
    .split(HALFTIME_REGEX)
    .map((half) =>
      half
        .split(/.*Round_End.*/g)
        .filter((r) => !r.includes("Game Over") && r.includes("Round_Start")),
    );

  if (halves.length !== 2) {
    throw new Error(
      "Log could not be parsed into two halves; please check source.",
    );
  }

  const mappedRounds: Half[] = halves
    .map((half) =>
      half.map((round): Round => {
        const roundLogLines = round.split("\n");

        const killFeed = roundLogLines
          .filter((l) => l.match(KILL_REGEX))
          .map(parseKillLog)
          .filter((k) => k !== null);

        const assistFeed = roundLogLines
          .filter((l) => l.match(ASSIST_REGEX))
          .map(parseAssistLog)
          .filter((a) => a !== null);

        const flashAssistFeed = roundLogLines
          .filter((l) => l.match(FLASH_ASSIST_REGEX))
          .map(parseFlashAssistLog)
          .filter((a) => a !== null);

        const teams = determineRoundTeams(roundLogLines);
        const roundWinner = determineRoundWinner(roundLogLines);

        return {
          killFeed,
          assistFeed,
          flashAssistFeed,
          roundWinner,
          teams,
        };
      }),
    )
    .map((half: Round[]): Half => {
      const { T, CT } = half[0].teams;

      return {
        T,
        CT,
        rounds: half,
      };
    });

  return mappedRounds;
};
