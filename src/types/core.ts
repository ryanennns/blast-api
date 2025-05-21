export type TeamRole = "T" | "CT";

export interface ScoreboardRow {
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
}

export interface Assist {
  assister: string;
  killed: string;
}

export interface Round {
  killFeed: Kill[];
  assistFeed: Assist[];
  flashAssistFeed: Assist[];
  roundWinner: {
    team: TeamRole;
    method: "kills" | "bomb" | "defusal";
  };
  teams: {
    T: string;
    CT: string;
  };
}

export interface Half {
  T: string;
  CT: string;
  rounds: Round[];
}

export interface Match {
  map: string;
  halves: Half[];
  winner: {
    team: string;
  };
  scoreboard: Record<string, ScoreboardRow>;
}
