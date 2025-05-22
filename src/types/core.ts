export type TeamRole = "T" | "CT";

export interface ScoreboardRow {
  player: string;
  team: string;
  kills: number;
  deaths: number;
  assists: number;
  flashAssists: number;
}

export interface Kill {
  killer: string;
  killed: string;
  weapon: string;
  headshot: boolean;
  killerSide: TeamRole;
}

export interface Assist {
  assister: string;
  killed: string;
}

export interface Round {
  number: number;
  roundWinner: {
    team: TeamRole;
    method: "kills" | "bomb" | "defusal";
  };
  teams: {
    T: string;
    CT: string;
  };
  killFeed: Kill[];
  assistFeed: Assist[];
  flashAssistFeed: Assist[];
}

export interface Half {
  T: string;
  CT: string;
  rounds: Round[];
}

export interface Match {
  map: string;
  halves: Half[];
  teams: {
    a: string;
    b: string;
  };
  score: {
    a: number;
    b: number;
  };
  winner: {
    team: string;
  };
  scoreboard: ScoreboardRow[];
}
