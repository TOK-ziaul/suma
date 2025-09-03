import React, { createContext, useContext, useState } from "react";
import { GameState, Player } from "../types";

interface GameContextType {
  gameState: GameState;
  setPlayers: (players: Player[]) => void;
  updatePlayerScore: (playerId: string, points: number) => void;
  startTimer: () => void;
  resetTimer: () => void;
  getElapsedTime: () => string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submitAnswer: (playerId: string, answer: any) => void;
  nextRound: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    currentRound: 0,
    rounds: [],
    timer: {
      started: false,
      startTime: 0,
      elapsed: 0,
    },
    gameCompleted: false,
  });

  const setPlayers = (players: Player[]) => {
    setGameState((prev) => ({
      ...prev,
      players,
      rounds: generateRounds(),
    }));
  };

  const updatePlayerScore = (playerId: string, points: number) => {
    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((player) =>
        player.id === playerId
          ? { ...player, score: player.score + points }
          : player
      ),
    }));
  };

  const generateRounds = () => {
    // This will be populated with actual game data from the API
    return [];
  };

  const startTimer = () => {
    setGameState((prev) => ({
      ...prev,
      timer: {
        ...prev.timer,
        started: true,
        startTime: Date.now(),
      },
    }));
  };

  const resetTimer = () => {
    setGameState((prev) => ({
      ...prev,
      timer: {
        started: false,
        startTime: 0,
        elapsed: 0,
      },
    }));
  };

  const getElapsedTime = () => {
    const { started, startTime } = gameState.timer;
    if (!started) return "0:00";

    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitAnswer = (playerId: string, answer: any) => {
    setGameState((prev) => {
      const newState = { ...prev };
      const currentRound = newState.rounds[newState.currentRound];
      if (currentRound) {
        currentRound.submissions[playerId] = answer;
      }
      return newState;
    });
  };

  const nextRound = () => {
    setGameState((prev) => ({
      ...prev,
      currentRound: prev.currentRound + 1,
      gameCompleted: prev.currentRound + 1 >= prev.rounds.length,
    }));
  };

  const resetGame = () => {
    setGameState({
      players: [],
      currentRound: 0,
      rounds: [],
      timer: {
        started: false,
        startTime: 0,
        elapsed: 0,
      },
      gameCompleted: false,
    });
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        setPlayers,
        updatePlayerScore,
        startTimer,
        resetTimer,
        getElapsedTime,
        submitAnswer,
        nextRound,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
