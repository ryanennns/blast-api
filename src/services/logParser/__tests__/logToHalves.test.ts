import { logToHalves } from "../index";

const targetBombed = `11/28/2021 - 20:05:53: Team "TERRORIST" triggered "SFUI_Notice_Target_Bombed" (CT "6") (T "1")`;
const bombDefused = `11/28/2021 - 20:45:36: Team "CT" triggered "SFUI_Notice_Bomb_Defused" (CT "2") (T "0")`;
const ctsWin = `11/28/2021 - 21:02:14: Team "CT" triggered "SFUI_Notice_CTs_Win" (CT "9") (T "1")`;
const tsWin = `11/28/2021 - 21:07:42: Team "TERRORIST" triggered "SFUI_Notice_Terrorists_Win" (CT "9") (T "3")`;

const terroristTeam = "NAVI GGBET";
const ctTeam = "TeamVitality";
const teamInitializer = `
11/28/2021 - 20:45:36: MatchStatus: Team playing "CT": ${ctTeam}
11/28/2021 - 20:45:36: MatchStatus: Team playing "TERRORIST": ${terroristTeam}
`;

describe("logToRounds", () => {
  it("should throw if no Match_Start is found", () => {
    const invalidLog = "snickers not a log";
    expect(() => logToHalves(invalidLog)).toThrow(
      "Match_Start not found in log",
    );
  });

  it("should throw if more than two halves are found", () => {
    const log = `
      11/28/2021 - 20:00:23: World triggered "Match_Start" on "de_nuke"
      11/28/2021 - 20:01:08: World triggered "Round_Start"
      ${targetBombed}
      11/28/2021 - 20:03:22: World triggered "Round_End"
      11/28/2021 - 20:03:42: Match pause is enabled - mp_halftime_pausematch
      11/28/2021 - 20:04:08: World triggered "Round_Start"
      ${targetBombed}
      11/28/2021 - 20:06:22: World triggered "Round_End"
      11/28/2021 - 20:03:42: Match pause is enabled - mp_halftime_pausematch
      `;

    expect(() => logToHalves(log)).toThrow(
      "Log could not be parsed into two halves; please check source.",
    );
  });

  it("should throw if less than two halves are found", () => {
    const log = `
      11/28/2021 - 20:00:23: World triggered "Match_Start" on "de_nuke"
      11/28/2021 - 20:01:08: World triggered "Round_Start"
      ${targetBombed}
      11/28/2021 - 20:03:22: World triggered "Round_End"
      `;

    expect(() => logToHalves(log)).toThrow(
      "Log could not be parsed into two halves; please check source.",
    );
  });

  it("should split a match into halves", () => {
    const log = `
      11/28/2021 - 20:00:23: World triggered "Match_Start" on "de_nuke"
      11/28/2021 - 20:01:08: World triggered "Round_Start"
      ${teamInitializer}
      ${targetBombed}
      11/28/2021 - 20:03:22: World triggered "Round_End"
      11/28/2021 - 20:03:42: Match pause is enabled - mp_halftime_pausematch
      11/28/2021 - 20:04:08: World triggered "Round_Start"
      ${teamInitializer}
      ${targetBombed}
      11/28/2021 - 20:06:22: World triggered "Round_End"
      11/28/2021 - 20:07:17: Game Over: competitive 1092904694 de_nuke score 6:16 after 50 min
    `;

    const halves = logToHalves(log);
    expect(halves).toHaveLength(2);
  });

  it("should parse kills, assists, and flash assists correctly", () => {
    const log = `
      11/28/2021 - 20:00:23: World triggered "Match_Start" on "de_nuke"
      11/28/2021 - 20:01:08: World triggered "Round_Start"
      11/28/2021 - 20:52:42: "Perfecto<28><STEAM_1:0:80477379><TERRORIST>" [263 -1267 -416] killed "Kyojin<34><STEAM_1:1:22851120><CT>" [368 -1457 -352] with "deagle"
      11/28/2021 - 20:48:49: "Kyojin<34><STEAM_1:1:22851120><CT>" assisted killing "electronic<31><STEAM_1:1:41889689><TERRORIST>"
      11/28/2021 - 20:52:42: "s1mple<30><STEAM_1:1:36968273><TERRORIST>" flash-assisted killing "Kyojin<34><STEAM_1:1:22851120><CT>"
      ${teamInitializer}
      ${targetBombed}
      11/28/2021 - 20:03:22: World triggered "Round_End"
      11/28/2021 - 20:03:42: Match pause is enabled - mp_halftime_pausematch
      11/28/2021 - 20:04:08: World triggered "Round_Start"
      ${teamInitializer}
      ${targetBombed}
      11/28/2021 - 20:06:22: World triggered "Round_End"
      11/28/2021 - 20:07:17: Game Over: competitive 1092904694 de_nuke score 6:16 after 50 min
    `;

    const halves = logToHalves(log);

    expect(halves).toHaveLength(2);

    const firstRound = halves[0].rounds[0];

    expect(firstRound.killFeed[0]).toEqual({
      killer: "Perfecto",
      killed: "Kyojin",
      weapon: "deagle",
      headshot: false,
    });

    expect(firstRound.assistFeed[0]).toEqual({
      assister: "Kyojin",
      killed: "electronic",
    });

    expect(firstRound.flashAssistFeed[0]).toEqual({
      assister: "s1mple",
      killed: "Kyojin",
    });
  });

  it.each([
    { method: targetBombed, expectedWinner: "T", expectedMethod: "bomb" },
    { method: bombDefused, expectedWinner: "CT", expectedMethod: "defusal" },
    { method: ctsWin, expectedWinner: "CT", expectedMethod: "kills" },
    { method: tsWin, expectedWinner: "T", expectedMethod: "kills" },
  ])(
    "should parse round winner correctly",
    ({ method, expectedWinner, expectedMethod }) => {
      const log = `log
      11/28/2021 - 20:00:23: World triggered "Match_Start" on "de_nuke"
      11/28/2021 - 20:01:08: World triggered "Round_Start"
      ${teamInitializer}
      ${method}
      11/28/2021 - 20:03:22: World triggered "Round_End"
      11/28/2021 - 20:03:42: Match pause is enabled - mp_halftime_pausematch
      11/28/2021 - 20:04:08: World triggered "Round_Start"
      ${teamInitializer}
      ${method}
      11/28/2021 - 20:06:22: World triggered "Round_End"
    `;

      const halves = logToHalves(log);

      expect(halves).toHaveLength(2);

      const firstRound = halves[0].rounds[0];
      expect(firstRound.roundWinner).toEqual({
        team: expectedWinner,
        method: expectedMethod,
      });
    },
  );

  it("should parse team names correctly", () => {
    const log = `
      11/28/2021 - 20:00:23: World triggered "Match_Start" on "de_nuke"
      11/28/2021 - 20:45:36: MatchStatus: Team playing "CT": ${ctTeam}
      11/28/2021 - 20:45:36: MatchStatus: Team playing "TERRORIST": ${terroristTeam}
      11/28/2021 - 20:01:08: World triggered "Round_Start"
      ${teamInitializer}
      ${targetBombed}
      11/28/2021 - 20:03:22: World triggered "Round_End"
      11/28/2021 - 20:03:42: Match pause is enabled - mp_halftime_pausematch
      11/28/2021 - 20:04:08: World triggered "Round_Start"
      ${teamInitializer}
      ${targetBombed}
      11/28/2021 - 20:06:22: World triggered "Round_End"
      11/28/2021 - 20:07:17: Game Over: competitive 1092904694 de_nuke score 6:16 after 50 min
    `;

    const halves = logToHalves(log);

    expect(halves).toHaveLength(2);
    expect(halves[0].T).toBe(terroristTeam);
    expect(halves[0].CT).toBe(ctTeam);
  });
});
