import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../../contexts/GameContext";
import Timer from "../../components/Timer";
import PlayerCard from "../../components/PlayerCard";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Product } from "../../types";

const HigherLower: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState(0);
  const [phase, setPhase] = useState<"guess" | "predict" | "results">("guess");
  const [selectedGuesser, setSelectedGuesser] = useState<string>("");

  const [guesserIndex, setGuesserIndex] = useState(0);
  const [guessedPrice, setGuessedPrice] = useState<number>(0);

  const [predictions, setPredictions] = useState<
    Record<string, "higher" | "lower">
  >({});
  const [roundScores, setRoundScores] = useState<Record<string, number>>({});

  const { gameState, updatePlayerScore } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products for round
    fetch("http://localhost:5000/api/products?count=3")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(console.error);
  }, []);

  const product = products[currentProduct];
  const remainingPlayers = gameState.players.filter(
    (p) => p.id !== selectedGuesser
  );

  const submitGuess = (playerId: string, guess: number) => {
    setSelectedGuesser(playerId);
    setGuessedPrice(guess);
    setPhase("predict");
  };

  const submitPrediction = (
    playerId: string,
    prediction: "higher" | "lower"
  ) => {
    setPredictions((prev) => ({
      ...prev,
      [playerId]: prediction,
    }));
  };

  const allPredictionsSubmitted = () => {
    return remainingPlayers.every(
      (player) => predictions[player.id] !== undefined
    );
  };

  const showProductResults = () => {
    if (!product) return;
    const scores: Record<string, number> = {};

    // Guesser scoring (closer to actual → more points, placeholder logic for now)
    const guessDiff = Math.abs(product.price - guessedPrice);
    const guessScore = guessDiff <= product.price * 0.1 ? 50 : 0;
    scores[selectedGuesser] = guessScore;
    updatePlayerScore(selectedGuesser, guessScore);

    // Prediction scoring
    remainingPlayers.forEach((player) => {
      const prediction = predictions[player.id];
      const correct =
        (product.price > guessedPrice && prediction === "higher") ||
        (product.price < guessedPrice && prediction === "lower");

      const points = correct ? 25 : 0;
      scores[player.id] = points;
      updatePlayerScore(player.id, points);
    });

    setRoundScores(scores);
    setPhase("results");
  };

  const nextProduct = () => {
    if (currentProduct < products.length - 1) {
      setCurrentProduct((prev) => prev + 1);
      setGuesserIndex((prev) => prev + 1); // 👈 rotate guesser
      setPhase("guess");
      setGuessedPrice(0);
      setPredictions({});
      setRoundScores({});
    } else {
      navigate("/game/round/final");
    }
  };

  useEffect(() => {
    if (gameState.players.length > 0) {
      setSelectedGuesser(
        gameState.players[guesserIndex % gameState.players.length].id
      );
    }
  }, [currentProduct, gameState.players, guesserIndex]);

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-purple-900">
        <div className="text-white text-xl">Loading products...</div>
      </div>
    );
  }

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
              {phase === "results" && (
                <div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-xl">
                  ${product.price.toFixed(2)}
                </div>
              )}
            </div>
          </div>

          {/* Guess Phase */}
          {phase === "guess" && (
            <div>
              <h3 className="text-xl font-bold text-white text-center mb-6">
                One player must guess the price first!
              </h3>
              <div className=" w-fit mx-auto">
                {selectedGuesser && (
                  <div
                    key={selectedGuesser}
                    className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white border-opacity-20 "
                  >
                    <PlayerCard
                      player={
                        gameState.players.find((p) => p.id === selectedGuesser)!
                      }
                      showScore={false}
                      className="mb-4"
                    />

                    <form
                      className="relative"
                      onSubmit={(e) => {
                        e.preventDefault();
                        const input = e.currentTarget.elements.namedItem(
                          "guess"
                        ) as HTMLInputElement;
                        const value = parseFloat(input.value);
                        if (!isNaN(value) && value > 0) {
                          submitGuess(selectedGuesser, value);
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
                        placeholder="Enter your guess"
                        className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-20 border border-gray-300 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />

                      <button
                        type="submit"
                        className="mt-2 bg-gradient-to-r from-green-600 to-emerald-600 p-3 hover:from-green-700 hover:to-emerald-700 text-white font-bold  rounded-lg transition-all w-full"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Predict Phase */}
          {phase === "predict" && (
            <div>
              <h3 className="text-xl font-bold text-white text-center mb-2">
                {gameState.players.find((p) => p.id === selectedGuesser)?.name}{" "}
                guessed ${guessedPrice.toFixed(2)}
              </h3>
              <p className="text-gray-300 text-center mb-6">
                Is the actual price higher or lower?
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {remainingPlayers.map((player) => (
                  <div
                    key={player.id}
                    className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white border-opacity-20"
                  >
                    <PlayerCard
                      player={player}
                      showScore={false}
                      className="mb-4"
                    />

                    {predictions[player.id] ? (
                      <div className="bg-green-600 bg-opacity-20 rounded-lg p-3 text-center">
                        <span className="text-green-200 font-semibold">
                          Voted: {predictions[player.id].toUpperCase()}
                        </span>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => submitPrediction(player.id, "higher")}
                          className="flex-1 flex items-center justify-center space-x-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                        >
                          <ArrowUp className="h-4 w-4" />
                          <span>Higher</span>
                        </button>
                        <button
                          onClick={() => submitPrediction(player.id, "lower")}
                          className="flex-1 flex items-center justify-center space-x-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                        >
                          <ArrowDown className="h-4 w-4" />
                          <span>Lower</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {allPredictionsSubmitted() && (
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
          )}

          {/* Results Phase */}
          {phase === "results" && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white text-center mb-6">
                Round Results
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-6">
                  <h4 className="font-bold text-white mb-2">Guesser</h4>
                  <p className="text-gray-300">
                    {
                      gameState.players.find((p) => p.id === selectedGuesser)
                        ?.name
                    }
                    : ${guessedPrice.toFixed(2)}
                  </p>
                  <p className="text-yellow-400 font-bold">
                    {product.price > guessedPrice
                      ? "Price was HIGHER"
                      : "Price was LOWER"}
                  </p>
                  <p className="text-green-400">
                    +{roundScores[selectedGuesser] || 0} points
                  </p>
                </div>

                <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-6">
                  <h4 className="font-bold text-white mb-4">Predictions</h4>
                  <div className="space-y-2">
                    {remainingPlayers.map((player) => {
                      const prediction = predictions[player.id];
                      const correct =
                        (product.price > guessedPrice &&
                          prediction === "higher") ||
                        (product.price < guessedPrice &&
                          prediction === "lower");
                      return (
                        <div
                          key={player.id}
                          className={`p-2 rounded ${
                            correct ? "bg-green-500" : "bg-red-500"
                          } bg-opacity-30`}
                        >
                          <span className="text-white">
                            {player.name}: {prediction?.toUpperCase()}
                          </span>
                          <span className="text-yellow-400 ml-2">
                            +{roundScores[player.id] || 0} points
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={nextProduct}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105"
                >
                  {currentProduct < products.length - 1
                    ? "Next Product"
                    : "Final Round"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HigherLower;
