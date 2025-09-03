import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../../contexts/GameContext";
import { Product } from "../../types";
import { Shuffle } from "lucide-react";

const Round2: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [roundType, setRoundType] = useState<
    "higher-lower" | "going-once" | "multiple-choice"
  >("higher-lower");
  const [products, setProducts] = useState<Product[]>([]);

  const { gameState } = useGame();
  const navigate = useNavigate();
  console.log(products);
  useEffect(() => {
    // Randomly select round type
    const types: ("higher-lower" | "going-once" | "multiple-choice")[] = [
      "higher-lower",
      "going-once",
      "multiple-choice",
    ];
    const randomType = types[Math.floor(Math.random() * types.length)];
    setRoundType(randomType);

    // Fetch products
    const productCount =
      randomType === "higher-lower" ? gameState.players.length : 3;
    fetch(`http://localhost:5000/api/products?count=${productCount}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(console.error);
  }, [gameState.players.length]);

  const getRoundTitle = () => {
    switch (roundType) {
      case "higher-lower":
        return "Higher or Lower?";
      case "going-once":
        return "Going Once";
      case "multiple-choice":
        return "Multiple Choice";
      default:
        return "Round 2";
    }
  };

  const getRoundDescription = () => {
    switch (roundType) {
      case "higher-lower":
        return "One player guesses first, then others decide if the actual price is higher or lower!";
      case "going-once":
        return "Choose from revealed prices or pass - but choose wisely!";
      case "multiple-choice":
        return "Pick the correct price from multiple options!";
      default:
        return "";
    }
  };

  const startRound = () => {
    setStarted(true);
    // Navigate to the specific round type component
    navigate(`/game/round/2/${roundType}`);
  };

  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white border-opacity-20">
            <div className="mb-6">
              <Shuffle className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <h1 className="text-5xl font-bold text-white mb-2">Round 2</h1>
              <h2 className="text-3xl font-semibold text-yellow-400 mb-4">
                {getRoundTitle()}
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                {getRoundDescription()}
              </p>
            </div>

            {/* Round Type Indicator */}
            <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-4 mb-8">
              <h3 className="text-xl font-bold text-white mb-2">
                Selected Game Mode:
              </h3>
              <div className="text-2xl font-bold text-yellow-400">
                {getRoundTitle()}
              </div>
            </div>

            <button
              onClick={startRound}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105"
            >
              Start Round 2
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-white text-xl">Loading round...</div>
    </div>
  );
};

export default Round2;
