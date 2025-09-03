export interface User {
  id: string;
  email: string;
  phone: string;
  phoneVerified: boolean;
}

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity?: number;
  row?: number;
}

export interface Player {
  id: string;
  name: string;
  score: number;
}

export interface GameRound {
  type: "guess" | "higher-lower" | "going-once" | "multiple-choice" | "final";
  products: Product[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submissions: Record<string, any>;
  completed: boolean;
}

export interface GameState {
  players: Player[];
  currentRound: number;
  rounds: GameRound[];
  timer: {
    started: boolean;
    startTime: number;
    elapsed: number;
  };
  gameCompleted: boolean;
}
