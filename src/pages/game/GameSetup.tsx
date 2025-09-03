import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Minus, Users, Play } from "lucide-react";
import { Player } from "../../types";
import { useGame } from "../../contexts/GameContext";

const GameSetup: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const navigate = useNavigate();
  const { setPlayers: setGamePlayers } = useGame();

  const addPlayer = () => {
    if (newPlayerName.trim() && players.length < 4) {
      const newPlayer: Player = {
        id: Date.now().toString(),
        name: newPlayerName.trim(),
        score: 0,
      };
      setPlayers([...players, newPlayer]);
      setNewPlayerName("");
      setShowAddPlayer(false);
    }
  };

  const removePlayer = (playerId: string) => {
    setPlayers(players.filter((p) => p.id !== playerId));
  };

  const startGame = () => {
    if (players.length >= 2) {
      setGamePlayers(players);
      // navigate("/game/round/1");
      navigate("/game/round/final");
    }
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-blue-900 to-purple-900">
      <div className="max-w-2xl w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">SUMA</h1>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white border-opacity-20">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Enter Players
            </h2>
            <p className="text-gray-300">Add 2-4 players to start the game</p>
          </div>

          {/* Players List */}
          <div className="space-y-4 mb-8">
            {players.map((player) => (
              <div
                key={player.id}
                className="flex items-center space-x-4 bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-4 border border-white border-opacity-30"
              >
                {/* Player Placard SVG (simplified) */}
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {player.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-lg">
                    {player.name}
                  </h3>
                </div>
                <button
                  onClick={() => removePlayer(player.id)}
                  className="p-2 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
              </div>
            ))}

            {/* Add Player Boxes */}
            {Array.from({ length: 4 - players.length }).map((_, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 border border-white border-opacity-30 border-dashed"
              >
                {showAddPlayer && index === 0 ? (
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      value={newPlayerName}
                      onChange={(e) => setNewPlayerName(e.target.value)}
                      placeholder="Enter player name"
                      className="flex-1 px-4 py-2 bg-white bg-opacity-30 border border-gray-300 border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === "Enter" && addPlayer()}
                      autoFocus
                    />
                    <button
                      onClick={addPlayer}
                      disabled={!newPlayerName.trim()}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setShowAddPlayer(false)}
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowAddPlayer(true)}
                    className="w-full h-full flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                  >
                    <Plus className="h-8 w-8" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Player Count Info */}
          <div className="flex items-center justify-center space-x-2 mb-8 text-gray-300">
            <Users className="h-5 w-5" />
            <span>{players.length}/4 players added</span>
            {players.length < 2 && (
              <span className="text-red-400">(Minimum 2 required)</span>
            )}
          </div>

          {/* Start Game Button */}
          <button
            onClick={startGame}
            disabled={players.length < 2}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-6 rounded-lg transition-all transform hover:scale-105 disabled:transform-none disabled:opacity-50"
          >
            <Play className="h-6 w-6" />
            <span className="text-lg">Start Game</span>
          </button>

          {/* Disclaimer */}
          <div className="mt-8 bg-yellow-400 bg-opacity-20 backdrop-blur-md rounded-lg p-4 border border-yellow-400 border-opacity-30">
            <p className="text-sm text-yellow-200 text-center">
              <strong>Disclaimer:</strong> Products shown in questions are
              determined as of {currentDate}, and the prices are approximated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSetup;
