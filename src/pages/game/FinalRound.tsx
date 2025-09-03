import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../../contexts/GameContext";
import Timer from "../../components/Timer";
import PlayerCard from "../../components/PlayerCard";
import { Product } from "../../types";

const FinalRound: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [roundData, setRoundData] = useState<Product[][]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [selections, setSelections] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const { gameState } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch final round data
    fetch("http://localhost:5000/api/products/final-round")
      .then((res) => res.json())
      .then((data) => setRoundData(data))
      .catch(console.error);
  }, []);

  const startRound = () => {
    setStarted(true);
  };

  const submitSelection = (playerId: string, row: number) => {
    setSelections((prev) => ({
      ...prev,
      [playerId]: row,
    }));
  };

  const showRoundResults = () => {
    setShowResults(true);
  };

  const nextRound = () => {
    if (currentRound < roundData.length - 1) {
      setCurrentRound(currentRound + 1);
      setSelections({});
      setShowResults(false);
    } else {
      // Game completed, show final scores
      navigate("/game/results");
    }
  };

  const allPlayersSelected = () => {
    return gameState.players.every(
      (player) => selections[player.id] !== undefined
    );
  };

  const getMostExpensiveRow = (products: Product[]) => {
    let maxTotal = 0;
    let maxRow = 1;

    for (let i = 0; i < 3; i++) {
      const total = products[i].price * (products[i].quantity || 1);
      if (total > maxTotal) {
        maxTotal = total;
        maxRow = i + 1;
      }
    }

    return maxRow;
  };

  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white border-opacity-20">
            <h1 className="text-5xl font-bold text-white mb-4">Final Round</h1>
            <h2 className="text-3xl font-semibold text-yellow-400 mb-8">
              Priciest Shelf?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Look at three rows of products and select which row has the
              highest total value!
            </p>
            <button
              onClick={startRound}
              className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105"
            >
              Start Final Round
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (roundData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading final round...</div>
      </div>
    );
  }

  const products = roundData[currentRound];

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <Timer className="flex justify-center mb-8" />

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Final Round</h1>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-2">
            Priciest Shelf?
          </h2>
          <p className="text-gray-300">
            Round {currentRound + 1} of {roundData.length}
          </p>
        </div>

        {/* Product Rows */}
        <div className="space-y-6 mb-8">
          {[1, 2, 3].map((row) => {
            const product = products[row - 1];
            const totalPrice = product.price * (product.quantity || 1);

            return (
              <div
                key={row}
                className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white border-opacity-20"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-yellow-400 text-black font-bold text-xl px-4 py-2 rounded-lg">
                      Row {row}
                    </div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {product.name}
                      </h3>
                      <p className="text-gray-300">
                        Quantity: {product.quantity || 1}x
                      </p>
                      {showResults && (
                        <p className="text-yellow-400 font-bold text-lg">
                          Total: ${totalPrice.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>

                  {showResults && getMostExpensiveRow(products) === row && (
                    <div className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold">
                      MOST EXPENSIVE!
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Player Selection Area */}
        {!showResults && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {gameState.players.map((player) => (
              <div
                key={player.id}
                className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white border-opacity-20"
              >
                <PlayerCard
                  player={player}
                  showScore={false}
                  className="mb-4"
                />

                {selections[player.id] ? (
                  <div className="bg-green-600 bg-opacity-20 rounded-lg p-3 text-center">
                    <span className="text-green-200 font-semibold">
                      Selected Row {selections[player.id]}
                    </span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-white text-sm mb-2">
                      Select the most expensive row:
                    </p>
                    {[1, 2, 3].map((row) => (
                      <button
                        key={row}
                        onClick={() => submitSelection(player.id, row)}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                      >
                        Row {row}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {showResults && (
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white border-opacity-20 mb-8">
            <h3 className="text-2xl font-bold text-white text-center mb-6">
              Round Results
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {gameState.players.map((player) => {
                const selectedRow = selections[player.id];
                const correctRow = getMostExpensiveRow(products);
                const correct = selectedRow === correctRow;

                return (
                  <div
                    key={player.id}
                    className={`p-4 rounded-lg ${
                      correct
                        ? "bg-green-600 bg-opacity-30"
                        : "bg-red-600 bg-opacity-30"
                    }`}
                  >
                    <h4 className="font-bold text-white">{player.name}</h4>
                    <p className="text-gray-300">Selected: Row {selectedRow}</p>
                    <p
                      className={`font-bold ${
                        correct ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {correct ? "✓ Correct!" : "✗ Wrong"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {!showResults && allPlayersSelected() && (
          <div className="text-center">
            <button
              onClick={showRoundResults}
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105"
            >
              Reveal Results
            </button>
          </div>
        )}

        {showResults && (
          <div className="text-center">
            <button
              onClick={nextRound}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105"
            >
              {currentRound < roundData.length - 1
                ? "Next Round"
                : "View Final Results"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinalRound;
