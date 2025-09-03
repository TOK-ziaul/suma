import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../../contexts/GameContext";
import Timer from "../../components/Timer";
import PlayerCard from "../../components/PlayerCard";
import { Product } from "../../types";

const MultipleChoice: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [selections, setSelections] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
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

  useEffect(() => {
    if (products.length > 0) {
      // Generate 5 options for the current product
      const product = products[currentProduct];
      const actualPrice = product.price;
      const prices = [actualPrice];

      // Generate 4 other prices (some close, some further away)
      for (let i = 0; i < 4; i++) {
        const variance = Math.random() * 0.5 + 0.1; // 10-60% variance
        const direction = Math.random() > 0.5 ? 1 : -1;
        const newPrice = actualPrice * (1 + direction * variance);
        prices.push(parseFloat(newPrice.toFixed(2)));
      }

      // Shuffle prices
      setOptions(prices.sort(() => Math.random() - 0.5));
    }
  }, [products, currentProduct]);

  const submitSelection = (playerId: string, price: number) => {
    setSelections((prev) => ({
      ...prev,
      [playerId]: price,
    }));
  };

  const calculatePoints = (
    selectedPrice: number,
    actualPrice: number
  ): number => {
    if (selectedPrice === actualPrice) return 100;

    const difference = Math.abs(selectedPrice - actualPrice);
    const percentage = difference / actualPrice;

    if (percentage <= 0.05) return 75;
    if (percentage <= 0.1) return 50;
    if (percentage <= 0.2) return 25;
    return 0;
  };

  const showProductResults = () => {
    const product = products[currentProduct];
    const scores: Record<string, number> = {};

    gameState.players.forEach((player) => {
      const selectedPrice = selections[player.id];
      const points = calculatePoints(selectedPrice, product.price);
      scores[player.id] = points;
      updatePlayerScore(player.id, points);
    });

    setRoundScores(scores);
    setShowResults(true);
  };

  const nextProduct = () => {
    if (currentProduct < products.length - 1) {
      setCurrentProduct(currentProduct + 1);
      setOptions([]);
      setSelections({});
      setShowResults(false);
    } else {
      navigate("/game/round/final");
    }
  };

  const allPlayersSubmitted = () => {
    return gameState.players.every(
      (player) => selections[player.id] !== undefined
    );
  };

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

          {/* Price Options */}
          {!showResults && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white text-center mb-4">
                Select the correct price:
              </h3>

              <div className="grid grid-cols-5 gap-4 mb-6">
                {options.map((price, index) => (
                  <div
                    key={index}
                    className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-4 text-center cursor-pointer hover:bg-opacity-30 transition-colors"
                    onClick={() => {
                      // This is just for display, players will select individually
                    }}
                  >
                    <div className="text-xl font-bold text-yellow-400">
                      ${price.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {gameState.players.map((player) => (
                  <div
                    key={player.id}
                    className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-4"
                  >
                    <PlayerCard
                      player={player}
                      showScore={false}
                      className="mb-3"
                    />

                    {selections[player.id] !== undefined ? (
                      <div className="bg-green-600 bg-opacity-20 rounded-lg p-2 text-center">
                        <span className="text-green-200 text-sm">
                          Selected: ${selections[player.id]?.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {options.slice(0, 2).map((price, index) => (
                          <button
                            key={index}
                            onClick={() => submitSelection(player.id, price)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors text-sm"
                          >
                            ${price.toFixed(2)}
                          </button>
                        ))}
                        {options.slice(2, 4).map((price, index) => (
                          <button
                            key={index + 2}
                            onClick={() => submitSelection(player.id, price)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors text-sm"
                          >
                            ${price.toFixed(2)}
                          </button>
                        ))}
                        <button
                          onClick={() => submitSelection(player.id, options[4])}
                          className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors text-sm"
                        >
                          ${options[4]?.toFixed(2)}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {allPlayersSubmitted() && (
                <div className="text-center mt-6">
                  <button
                    onClick={showProductResults}
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
                  >
                    Reveal Results
                  </button>
                </div>
              )}
            </div>
          )}

          {showResults && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white text-center mb-4">
                Round Results
              </h3>

              <div className="grid grid-cols-5 gap-4 mb-6">
                {options.map((price, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg text-center ${
                      price === product.price
                        ? "bg-green-600 text-white"
                        : "bg-white bg-opacity-20 text-gray-300"
                    }`}
                  >
                    <div className="font-bold">${price.toFixed(2)}</div>
                    {price === product.price && (
                      <div className="text-xs">ACTUAL</div>
                    )}
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {gameState.players.map((player) => {
                  const selectedPrice = selections[player.id];
                  const points = roundScores[player.id] || 0;
                  return (
                    <div
                      key={player.id}
                      className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-4 text-center"
                    >
                      <h4 className="font-bold text-white">{player.name}</h4>
                      <p className="text-gray-300">
                        Selected: ${selectedPrice?.toFixed(2)}
                      </p>
                      <p className="text-yellow-400 font-bold">
                        +{points} points
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="text-center">
                <button
                  onClick={nextProduct}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
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

export default MultipleChoice;
