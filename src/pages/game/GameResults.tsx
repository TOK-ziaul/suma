import React from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../../contexts/GameContext";
import { Trophy, Play, Home } from "lucide-react";

const GameResults: React.FC = () => {
  const { gameState, resetGame } = useGame();
  const navigate = useNavigate();

  // Sort players by score in descending order
  const sortedPlayers = [...gameState.players].sort(
    (a, b) => b.score - a.score
  );
  const winner = sortedPlayers[0];

  const playAgain = () => {
    resetGame();
    navigate("/game/setup");
  };

  const goHome = () => {
    resetGame();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-blue-900 to-purple-900">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">Game Results</h1>
          <h2 className="text-3xl font-semibold text-yellow-400">
            Final Scores
          </h2>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white border-opacity-20 mb-8">
          {/* Winner Announcement */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-4 bg-yellow-500 rounded-full mb-4">
              <Trophy className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">
              Congratulations {winner.name}!
            </h3>
            <p className="text-gray-300 text-xl">
              You won with {winner.score} points
            </p>
          </div>

          {/* Players Ranking */}
          <div className="space-y-4 mb-8">
            {sortedPlayers.map((player, index) => (
              <div
                key={player.id}
                className={`flex items-center justify-between p-6 rounded-xl ${
                  index === 0
                    ? "bg-gradient-to-r from-yellow-600 to-orange-600"
                    : "bg-white bg-opacity-20 backdrop-blur-md"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl font-bold text-white">
                    #{index + 1}
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {player.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white">
                      {player.name}
                    </h4>
                    {index === 0 && (
                      <span className="text-yellow-200 font-medium">
                        Winner!
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">
                  {player.score} points
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={playAgain}
              className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-lg transition-all transform hover:scale-105"
            >
              <Play className="h-6 w-6" />
              <span className="text-lg">Play Again</span>
            </button>
            <button
              onClick={goHome}
              className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-4 px-6 rounded-lg transition-all transform hover:scale-105"
            >
              <Home className="h-6 w-6" />
              <span className="text-lg">Main Menu</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameResults;
