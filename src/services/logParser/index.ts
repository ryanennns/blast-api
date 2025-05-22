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
} from "./const";
import {
  Assist,
  Half,
  Kill,
  Match,
  Round,
  ScoreboardRow,
  TeamRole,
} from "../../types/core";

const parseKillLog = (line: string): Kill | null => {
  const match = line.match(KILL_REGEX);

  if (match) {
    const [_, killer, side, killed, weapon, headshot] = match;

    // shox has forced me to trim these names :|
    return {
      killer: killer.trim(),
      killed: killed.trim(),
      weapon,
      headshot: !!headshot,
      killerSide: side === "TERRORIST" ? "T" : "CT",
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

interface KillFeedItem {
  killer: string;
  killed: string;
  weapon: string;
  headshot: boolean;
  killerTeam: string;
  killedTeam: string;
}

const scoreboardFromFeeds = (
  killFeed: KillFeedItem[],
  assistFeed: Assist[],
  flashAssistFeed: Assist[],
): ScoreboardRow[] => {
  const scoreboardMap = new Map<string, ScoreboardRow>();

  killFeed.forEach(({ killer, killed, killerTeam, killedTeam }) => {
    if (!scoreboardMap.has(killer)) {
      scoreboardMap.set(killer, {
        player: killer,
        team: killerTeam,
        kills: 0,
        deaths: 0,
        assists: 0,
        flashAssists: 0,
      });
    }

    if (!scoreboardMap.has(killed)) {
      scoreboardMap.set(killed, {
        player: killed,
        team: killedTeam,
        kills: 0,
        deaths: 0,
        assists: 0,
        flashAssists: 0,
      });
    }

    scoreboardMap.get(killer)!.kills += 1;
    scoreboardMap.get(killed)!.deaths += 1;
  });

  assistFeed.forEach(({ assister }) => {
    if (!scoreboardMap.has(assister)) return;
    scoreboardMap.get(assister)!.assists += 1;
  });

  flashAssistFeed.forEach(({ assister }) => {
    if (!scoreboardMap.has(assister)) return;
    scoreboardMap.get(assister)!.flashAssists += 1;
  });

  return Array.from(scoreboardMap.values());
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

export const determineRoundTeams = (
  round: string[],
): Record<TeamRole, string> => {
  const text = round.join("\n");

  const ctMatches = [...text.matchAll(CT_TEAM_REGEX)];
  const terroristMatches = [...text.matchAll(TERRORIST_TEAM_REGEX)];

  const ctTeam = ctMatches.at(-1)?.[1];
  const terroristTeam = terroristMatches.at(-1)?.[1];

  if (ctTeam === undefined || terroristTeam === undefined) {
    throw new Error("Unable to determine round teams");
  }

  return {
    T: terroristTeam,
    CT: ctTeam,
  };
};

export const determineMap = (text: string): string => {
  const matches = [
    ...text.matchAll(/World triggered "Match_Start" on "(.*)"/g),
  ];

  const mapName = matches.at(-1)?.[1];

  if (matches.length < 1 || mapName === undefined) {
    throw new Error(
      "Could not find map name in log. Please check the log format.",
    );
  }

  return mapName;
};

export const determineScorelineByRounds = (rounds: Round[]) => {
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

  const winner = Object.entries(teams)
    .sort((a, b) => {
      return b[1] - a[1];
    })
    .map(([team, score]) => {
      return {
        team,
        score,
      };
    });

  return winner;
};

export const logToScoreboard = (text: string) => {
  const lastMatchStartIndex = text.lastIndexOf("Match_Start");
  if (lastMatchStartIndex !== -1) {
    text = text.slice(lastMatchStartIndex);
  }

  let halves = baseParsing(text);

  let killFeed: KillFeedItem[] = [];

  halves.forEach((half) => {
    half.forEach((round) => {
      const roundLines = round.split("\n");

      const teams = determineRoundTeams(roundLines);

      const temp = roundLines
        .filter((l) => l.match(KILL_REGEX))
        .map(parseKillLog)
        .filter((k) => k !== null);

      killFeed.push(
        ...temp.map((kill: Kill) => {
          const killedSide = kill.killerSide === "T" ? "CT" : "T";
          return {
            ...kill,
            killerTeam: teams[kill.killerSide],
            killedTeam: teams[killedSide],
          };
        }),
      );
    });
  });

  const logLines = text.split("\n");

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

const baseParsing = (text: string): string[][] => {
  const lastMatchStartIndex = text.lastIndexOf("Match_Start");

  if (lastMatchStartIndex === -1) {
    throw new Error("Match_Start not found in log");
  }
  text = text.slice(lastMatchStartIndex);

  return text
    .split(HALFTIME_REGEX)
    .map((half) =>
      half
        .split(/.*Round_End.*/g)
        .filter((r) => !r.includes("Game Over") && r.includes("Round_Start")),
    );
};

export const logToHalves = (text: string): Half[] => {
  let halves = baseParsing(text);

  if (halves.length !== 2) {
    throw new Error(
      "Log could not be parsed into two halves; please check source.",
    );
  }

  let roundCount = 0;
  const mappedRounds: Half[] = halves
    .map((half: string[]) =>
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

        roundCount++;
        return {
          number: roundCount,
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

export const logToMatch = (text: string): Match => {
  const halves = logToHalves(text);
  const scoreline = determineScorelineByRounds(
    halves.flatMap((half) => half.rounds),
  );
  const scoreboard = logToScoreboard(text);
  const map = determineMap(text);

  return {
    map,
    halves,
    teams: {
      a: scoreline[0].team,
      b: scoreline[1].team,
    },
    score: {
      a: scoreline[0].score,
      b: scoreline[1].score,
    },
    winner: {
      team: scoreline[0].team,
    },
    scoreboard,
  };
};
