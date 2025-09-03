import React from "react";
import { Player } from "../types";
import { Trophy, Star } from "lucide-react";

interface PlayerCardProps {
  player: Player;
  isWinner?: boolean;
  showScore?: boolean;
  className?: string;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  isWinner = false,
  showScore = true,
  className = "",
}) => {
  return (
    <div
      className={`
      bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-4 
      border border-white border-opacity-30 shadow-lg
      ${
        isWinner
          ? "ring-2 ring-yellow-400 bg-gradient-to-r from-yellow-400/20 to-amber-500/20"
          : ""
      }
      ${className}
    `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {player?.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-white flex items-center space-x-1">
              <span>{player?.name}</span>
              {isWinner && <Trophy className="h-4 w-4 text-yellow-400" />}
            </h3>
            {showScore && (
              <p className="text-sm text-gray-300 flex items-center space-x-1">
                <Star className="h-3 w-3" />
                <span>{player?.score} points</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
