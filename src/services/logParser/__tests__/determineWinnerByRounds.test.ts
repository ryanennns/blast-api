import { determineWinnerByRounds } from "../index.ts";

describe("determineWinnerByRounds", () => {
  it("should throw if more than two teams are found", () => {
    const rounds: Round[] = [
      {
        teams: {
          T: "Team One",
          CT: "Team Two",
        },
        roundWinner: {
          team: "T",
          method: "kills",
        },
        killFeed: [],
        assistFeed: [],
        flashAssistFeed: [],
      },
      {
        teams: {
          T: "Team Three",
          CT: "Team Four",
        },
        roundWinner: {
          team: "CT",
          method: "kills",
        },
        killFeed: [],
        assistFeed: [],
        flashAssistFeed: [],
      },
    ];

    expect(() => determineWinnerByRounds(rounds)).toThrow(
      "Log could not be parsed into two teams; please check source.",
    );
  });

  it("should throw if less than two teams are found", () => {
    const rounds: Round[] = [
      {
        teams: {
          T: "Team One",
          CT: "Team One",
        },
        roundWinner: {
          team: "T",
          method: "kills",
        },
        killFeed: [],
        assistFeed: [],
        flashAssistFeed: [],
      },
    ];

    expect(() => determineWinnerByRounds(rounds)).toThrow(
      "Log could not be parsed into two teams; please check source.",
    );
  });

  it("should return the correct winner for a match with a clear winner", () => {
    const teamOne = "Team One";
    const teamTwo = "Team Two";
    const rounds: Round[] = [
      {
        teams: {
          T: teamOne,
          CT: teamTwo,
        },
        roundWinner: {
          team: "T",
          method: "kills",
        },
        killFeed: [],
        assistFeed: [],
        flashAssistFeed: [],
      },
      {
        teams: {
          T: teamOne,
          CT: teamTwo,
        },
        roundWinner: {
          team: "T",
          method: "kills",
        },
        killFeed: [],
        assistFeed: [],
        flashAssistFeed: [],
      },
      {
        teams: {
          T: teamTwo,
          CT: teamOne,
        },
        roundWinner: {
          team: "CT",
          method: "kills",
        },
        killFeed: [],
        assistFeed: [],
        flashAssistFeed: [],
      },
    ];

    const result = determineWinnerByRounds(rounds);

    expect(result).toEqual(teamOne);
  });
});
