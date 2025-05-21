import fs from "fs";
import { logToScoreboard } from "../index";

const log = fs.readFileSync(
  "./src/services/logParser/__tests__/fixtures/NAVIvsVitaGF-Nuke.txt",
  "utf-8",
);

describe("logToScoreboard", () => {
  it("should generate correct scoreboard", () => {
    const scoreboard = logToScoreboard(log);
    expect(scoreboard).toEqual({
      ZywOo: { kills: 21, deaths: 14, assists: 3, flashAssists: 0 },
      s1mple: { kills: 18, deaths: 17, assists: 2, flashAssists: 3 },
      Perfecto: { kills: 10, deaths: 17, assists: 2, flashAssists: 0 },
      b1t: { kills: 17, deaths: 18, assists: 2, flashAssists: 1 },
      electronic: { kills: 9, deaths: 16, assists: 4, flashAssists: 3 },
      shox: { kills: 20, deaths: 17, assists: 3, flashAssists: 0 },
      Boombl4: { kills: 9, deaths: 18, assists: 0, flashAssists: 0 },
      misutaaa: { kills: 15, deaths: 9, assists: 3, flashAssists: 0 },
      apEX: { kills: 20, deaths: 10, assists: 3, flashAssists: 1 },
      Kyojin: { kills: 10, deaths: 13, assists: 5, flashAssists: 0 },
    });
  });
});
