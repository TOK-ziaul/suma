import React, { useState, useEffect } from "react";
import { useGame } from "../../contexts/GameContext";
import Timer from "../../components/Timer";
import PlayerCard from "../../components/PlayerCard";

interface ShelfProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  multiplier: number;
  totalPrice: number;
}

const FinalRound: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [shelves, setShelves] = useState<ShelfProduct[]>([]);
  const [selections, setSelections] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [roundScores, setRoundScores] = useState<Record<string, number>>({});

  const { gameState, updatePlayerScore } = useGame();

  useEffect(() => {
    // Fetch 3 products for final round (one per row)
    fetch("http://localhost:5000/api/products?count=3")
      .then((res) => res.json())
      .then((data) => {
        const productsWithMultiplier = data.map((product: ShelfProduct) => {
          const multiplier = Math.floor(Math.random() * 3) + 1; // 1-3x
          return {
            ...product,
            multiplier,
            totalPrice: product.price * multiplier,
          };
        });
        setShelves(productsWithMultiplier);
      })
      .catch(console.error);
  }, []);

  const startRound = () => setStarted(true);

  const submitSelection = (playerId: string, rowIndex: number) => {
    setSelections((prev) => ({
      ...prev,
      [playerId]: rowIndex,
    }));
  };

  const allPlayersSubmitted = () =>
    gameState.players.every((player) => selections[player.id] !== undefined);

  const calculatePoints = (
    selectedRow: number,
    actualMostExpensive: number
  ) => {
    // Placeholder: assign points, logic can be updated later
    return selectedRow === actualMostExpensive ? 200 : 0;
  };

  const revealResults = () => {
    const prices = shelves.map((p) => p.totalPrice);
    const mostExpensiveIndex = prices.indexOf(Math.max(...prices));

    const scores: Record<string, number> = {};
    gameState.players.forEach((player) => {
      const points = calculatePoints(selections[player.id], mostExpensiveIndex);
      scores[player.id] = points;
      updatePlayerScore(player.id, points);
    });

    setRoundScores(scores);
    setShowResults(true);
  };

  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-blue-900 to-purple-900">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white border-opacity-20">
            <h1 className="text-5xl font-bold text-white mb-4">Final Round</h1>
            <h2 className="text-3xl font-semibold text-yellow-400 mb-8">
              Priciest Shelf?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Look at 3 products and their multipliers. Choose which row is the
              most expensive!
            </p>
            <button
              onClick={startRound}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105"
            >
              Start Final Round
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (shelves.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-purple-900">
        <div className="text-white text-xl">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-blue-900 to-purple-900">
      <div className="max-w-4xl mx-auto">
        {/* Timer */}
        <div className="flex justify-center mb-8">
          <Timer />
        </div>

        {/* Rows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {shelves.map((product) => (
            <div
              key={product.id}
              className="relative bg-white bg-opacity-5 backdrop-blur-md rounded-xl p-4 text-center"
            >
              {showResults && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-green-600 bg-opacity-70 text-white font-bold px-3 py-1 rounded">
                  ${product.totalPrice.toFixed(2)}
                </div>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 mx-auto object-cover rounded-lg mb-2"
              />
              <div className="text-white font-semibold mb-1">
                {product.multiplier}x
              </div>
              <div className="text-yellow-400 font-bold">{product.name}</div>
            </div>
          ))}
        </div>

        {/* Players Selection */}
        {!showResults && (
          <div className="flex justify-between gap-4 mb-6">
            {gameState.players.map((player) => (
              <div
                key={player.id}
                className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-4 border w-full"
              >
                <PlayerCard
                  player={player}
                  showScore={false}
                  className="mb-3"
                />
                <div className="grid grid-cols-3 gap-2">
                  {shelves.map((_, rowIndex) => (
                    <button
                      key={rowIndex}
                      onClick={() => submitSelection(player.id, rowIndex)}
                      disabled={selections[player.id] !== undefined}
                      className={`py-2 rounded-lg transition-all ${
                        selections[player.id] === rowIndex
                          ? "bg-yellow-600 text-white"
                          : "bg-white bg-opacity-20 text-white hover:bg-opacity-30"
                      }`}
                    >
                      Row {rowIndex + 1}
                    </button>
                  ))}
                </div>
                {selections[player.id] !== undefined && (
                  <div className="mt-2 bg-green-600 bg-opacity-20 rounded-lg p-1 text-center">
                    <span className="text-green-200 font-semibold">
                      Selected: Row {selections[player.id] + 1}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Reveal Button */}
        {!showResults && allPlayersSubmitted() && (
          <div className="text-center mb-8">
            <button
              onClick={revealResults}
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-3 px-6 rounded-lg text-xl transition-all transform hover:scale-105"
            >
              Reveal Results
            </button>
          </div>
        )}

        {/* Results */}
        {showResults && (
          <div className="flex justify-between  gap-4">
            {gameState.players.map((player) => (
              <div
                key={player.id}
                className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-4 text-center w-full"
              >
                <h4 className="font-bold text-white">{player.name}</h4>
                <p className="text-gray-300">
                  Selected: Row {selections[player.id] + 1}
                </p>
                <p className="text-yellow-400 font-bold">
                  +{roundScores[player.id]} points
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinalRound;
