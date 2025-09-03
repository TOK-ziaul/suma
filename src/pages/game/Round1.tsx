import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../../contexts/GameContext";
import Timer from "../../components/Timer";
import PlayerCard from "../../components/PlayerCard";
import { Product } from "../../types";

const Round1: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState(0);
  const [submissions, setSubmissions] = useState<
    Record<string, Record<number, number>>
  >({});
  const [showResults, setShowResults] = useState(false);
  const [roundScores, setRoundScores] = useState<Record<string, number>>({});

  const { gameState, updatePlayerScore } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products for round 1
    fetch("http://localhost:5000/api/products?count=3")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(console.error);
  }, []);

  const startRound = () => {
    setStarted(true);
  };

  const submitGuess = (playerId: string, guess: number) => {
    setSubmissions((prev) => ({
      ...prev,
      [playerId]: {
        ...prev[playerId],
        [currentProduct]: guess,
      },
    }));
  };

  const calculatePoints = (actualPrice: number, guess: number): number => {
    const difference = Math.abs(actualPrice - guess);
    const percentage = difference / actualPrice;

    if (percentage <= 0.05) return 100; // Within 5%
    if (percentage <= 0.1) return 75; // Within 10%
    if (percentage <= 0.2) return 50; // Within 20%
    if (percentage <= 0.35) return 25; // Within 35%
    return 0; // More than 35% off
  };

  const showProductResults = () => {
    const product = products[currentProduct];
    const scores: Record<string, number> = {};

    gameState.players.forEach((player) => {
      const guess = submissions[player.id]?.[currentProduct] || 0;
      const points = calculatePoints(product.price, guess);
      scores[player.id] = points;
      updatePlayerScore(player.id, points);
    });

    setRoundScores(scores);
    setShowResults(true);
  };

  const nextProduct = () => {
    if (currentProduct < products.length - 1) {
      setCurrentProduct(currentProduct + 1);
      setShowResults(false);
    } else {
      // Round 1 completed, go to round 2
      navigate("/game/round/2");
    }
  };

  const allPlayersSubmitted = () => {
    return gameState.players.every(
      (player) => submissions[player.id]?.[currentProduct] !== undefined
    );
  };

  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-blue-900 to-purple-900">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white border-opacity-20">
            <h1 className="text-5xl font-bold text-white mb-4">Round 1</h1>
            <h2 className="text-3xl font-semibold text-yellow-400 mb-8">
              How much do I say?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Guess the price of 3 different products. The closer you get, the
              more points you earn!
            </p>
            <button
              onClick={startRound}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105"
            >
              Start Round 1
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-purple-900">
        <div className="text-white text-xl">Loading products...</div>
      </div>
    );
  }

  const product = products[currentProduct];

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-blue-900 to-purple-900">
      <div className="max-w-6xl mx-auto">
        {/* Timer */}
        <div className="flex justify-center mb-8">
          <Timer />
        </div>

        {/* Product Display */}
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white border-opacity-20 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Product {currentProduct + 1} of {products.length}
            </h2>
            <h3 className="text-3xl font-bold text-yellow-400">
              {product.name}
            </h3>
          </div>

          <div className="flex justify-center mb-8">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-80 h-80 object-cover rounded-lg shadow-2xl"
              />
              {showResults && (
                <div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-xl">
                  ${product.price.toFixed(2)}
                </div>
              )}
            </div>
          </div>

          {showResults && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white text-center mb-4">
                Round Results
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {gameState.players.map((player) => {
                  const guess = submissions[player.id]?.[currentProduct] || 0;
                  const points = roundScores[player.id] || 0;
                  return (
                    <div
                      key={player.id}
                      className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-4 text-center"
                    >
                      <h4 className="font-bold text-white">{player.name}</h4>
                      <p className="text-gray-300">
                        Guess: ${guess.toFixed(2)}
                      </p>
                      <p className="text-yellow-400 font-bold">
                        +{points} points
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="text-center mt-6">
                <button
                  onClick={nextProduct}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
                >
                  {currentProduct < products.length - 1
                    ? "Next Product"
                    : "Continue to Round 2"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Players Submission Area */}
        {!showResults && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Price Guess
                    </label>
                    <form
                      className="relative"
                      onSubmit={(e) => {
                        e.preventDefault(); // stop page reload
                        const input = e.currentTarget.elements.namedItem(
                          "guess"
                        ) as HTMLInputElement;
                        const value = parseFloat(input.value);
                        if (!isNaN(value) && value > 0) {
                          submitGuess(player.id, value);
                        }
                      }}
                    >
                      <p className="absolute left-3 top-3 h-5 w-5 text-gray-400">
                        KR
                      </p>
                      <input
                        name="guess"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-20 border border-gray-300 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={
                          submissions[player.id]?.[currentProduct] !== undefined
                        }
                      />

                      {submissions[player.id]?.[currentProduct] !==
                      undefined ? (
                        <div className="mt-2 bg-green-600 bg-opacity-20 rounded-lg p-3 text-center">
                          <span className="text-green-200 font-semibold">
                            Submitted!
                          </span>
                        </div>
                      ) : (
                        <button
                          type="submit"
                          className="mt-2 bg-gradient-to-r from-green-600 to-emerald-600 p-3 hover:from-green-700 hover:to-emerald-700 text-white font-bold  rounded-lg transition-all w-full"
                          disabled={
                            submissions[player.id]?.[currentProduct] !==
                            undefined
                          }
                        >
                          Submit
                        </button>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!showResults && allPlayersSubmitted() && (
          <div className="text-center mt-8">
            <button
              onClick={showProductResults}
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105"
            >
              Reveal Results
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Round1;
