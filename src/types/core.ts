type TeamRole = "T" | "CT";

interface ScoreboardRow {
  kills: number;
  deaths: number;
  assists: number;
  flashAssists: number;
}

interface Kill {
  killer: string;
  killed: string;
  weapon: string;
  headshot: boolean;
}

interface Assist {
  assister: string;
  killed: string;
}

interface Round {
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

type Half = {
  T: string;
  CT: string;
  rounds: Round[];
};

interface Match {
  map: string;
  halves: Half[];
  winner: {
    team: string;
  };
  scoreboard: Record<string, ScoreboardRow>;
}
