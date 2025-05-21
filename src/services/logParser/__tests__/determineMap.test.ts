import { determineMap } from "../index";

describe("determineMap", () => {
  it("should throw if no map name found", () => {
    const log = "some nonsense, not a long";

    expect(() => determineMap(log)).toThrow(
      "Could not find map name in log. Please check the log format.",
    );
  });

  it("should determine map from log", () => {
    const expectedMap = `de_nuke`;
    const log = `
      11/28/2021 - 20:00:23: World triggered "Match_Start" on "fy_iceworld"
      11/28/2021 - 20:00:23: World triggered "Match_Start" on "cs_office"
      11/28/2021 - 20:00:23: World triggered "Match_Start" on "de_snickers"
      11/28/2021 - 20:00:23: World triggered "Match_Start" on "${expectedMap}"
    `;

    const map = determineMap(log);

    expect(map).toEqual(expectedMap);
  });
});
