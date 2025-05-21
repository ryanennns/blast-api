import fs from "fs";
import { logToScoreboard } from "../index";

const log = fs.readFileSync(
  "./src/services/logParser/__tests__/fixtures/NAVIvsVitaGF-Nuke.txt",
  "utf-8",
);

describe("logToScoreboard", () => {
  it("should generate correct scoreboard", () => {
    const scoreboard = logToScoreboard(log);
    expect(scoreboard).toEqual([
      {
        player: "ZywOo",
        team: "TeamVitality",
        kills: 21,
        deaths: 14,
        assists: 3,
        flashAssists: 0,
      },
      {
        player: "s1mple",
        team: "NAVI GGBET",
        kills: 18,
        deaths: 17,
        assists: 2,
        flashAssists: 3,
      },
      {
        player: "Perfecto",
        team: "NAVI GGBET",
        kills: 10,
        deaths: 17,
        assists: 2,
        flashAssists: 0,
      },
      {
        player: "b1t",
        team: "NAVI GGBET",
        kills: 17,
        deaths: 18,
        assists: 2,
        flashAssists: 1,
      },
      {
        player: "electronic",
        team: "NAVI GGBET",
        kills: 9,
        deaths: 16,
        assists: 4,
        flashAssists: 3,
      },
      {
        player: "shox",
        team: "TeamVitality",
        kills: 20,
        deaths: 17,
        assists: 3,
        flashAssists: 0,
      },
      {
        player: "Boombl4",
        team: "NAVI GGBET",
        kills: 9,
        deaths: 18,
        assists: 0,
        flashAssists: 0,
      },
      {
        player: "misutaaa",
        team: "TeamVitality",
        kills: 15,
        deaths: 9,
        assists: 3,
        flashAssists: 0,
      },
      {
        player: "apEX",
        team: "TeamVitality",
        kills: 20,
        deaths: 10,
        assists: 3,
        flashAssists: 1,
      },
      {
        player: "Kyojin",
        team: "TeamVitality",
        kills: 10,
        deaths: 13,
        assists: 5,
        flashAssists: 0,
      },
    ]);
  });
});
