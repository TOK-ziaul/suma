// // First, let's fix GameSetup.tsx to match REQ-006 exactly
// [file name]: GameSetup.tsx
// [file content begin]
// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { Plus, Minus, Users, Play } from 'lucide-react';
// // import { Player } from '../../types';
// // import { useGame } from '../../contexts/GameContext';

// // const GameSetup: React.FC = () => {
// //   const [players, setPlayers] = useState<Player[]>([]);
// //   const [newPlayerName, setNewPlayerName] = useState('');
// //   const [showAddPlayer, setShowAddPlayer] = useState(false);
// //   const navigate = useNavigate();
// //   const { setPlayers: setGamePlayers } = useGame();

// //   const addPlayer = () => {
// //     if (newPlayerName.trim() && players.length < 4) {
// //       const newPlayer: Player = {
// //         id: Date.now().toString(),
// //         name: newPlayerName.trim(),
// //         score: 0
// //       };
// //       setPlayers([...players, newPlayer]);
// //       setNewPlayerName('');
// //       setShowAddPlayer(false);
// //     }
// //   };

// //   const removePlayer = (playerId: string) => {
// //     setPlayers(players.filter(p => p.id !== playerId));
// //   };

// //   const startGame = () => {
// //     if (players.length >= 2) {
// //       setGamePlayers(players);
// //       navigate('/game/round/1');
// //     }
// //   };

// //   const currentDate = new Date().toLocaleDateString('en-US', {
// //     year: 'numeric',
// //     month: 'long',
// //     day: 'numeric'
// //   });

// //   return (
// //     <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-blue-900 to-purple-900">
// //       <div className="max-w-2xl w-full">
// //         {/* Logo */}
// //         <div className="text-center mb-8">
// //           <h1 className="text-4xl font-bold text-white mb-2">SUMA-BOLT</h1>
// //         </div>

// //         <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white border-opacity-20">
// //           {/* Header */}
// //           <div className="text-center mb-8">
// //             <h2 className="text-3xl font-bold text-white mb-2">Enter Players</h2>
// //             <p className="text-gray-300">Add 2-4 players to start the game</p>
// //           </div>

// //           {/* Players List */}
// //           <div className="space-y-4 mb-8">
// //             {players.map((player) => (
// //               <div key={player.id} className="flex items-center space-x-4 bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-4 border border-white border-opacity-30">
// //                 {/* Player Placard SVG (simplified) */}
// //                 <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
// //                   <span className="text-white font-bold text-lg">
// //                     {player.name.charAt(0).toUpperCase()}
// //                   </span>
// //                 </div>
// //                 <div className="flex-1">
// //                   <h3 className="font-semibold text-white text-lg">{player.name}</h3>
// //                 </div>
// //                 <button
// //                   onClick={() => removePlayer(player.id)}
// //                   className="p-2 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors"
// //                 >
// //                   <Minus className="h-4 w-4" />
// //                 </button>
// //               </div>
// //             ))}

// //             {/* Add Player Boxes */}
// //             {Array.from({ length: 4 - players.length }).map((_, index) => (
// //               <div key={index} className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 border border-white border-opacity-30 border-dashed">
// //                 {showAddPlayer && index === 0 ? (
// //                   <div className="flex space-x-4">
// //                     <input
// //                       type="text"
// //                       value={newPlayerName}
// //                       onChange={(e) => setNewPlayerName(e.target.value)}
// //                       placeholder="Enter player name"
// //                       className="flex-1 px-4 py-2 bg-white bg-opacity-30 border border-gray-300 border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                       onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
// //                       autoFocus
// //                     />
// //                     <button
// //                       onClick={addPlayer}
// //                       disabled={!newPlayerName.trim()}
// //                       className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
// //                     >
// //                       Add
// //                     </button>
// //                     <button
// //                       onClick={() => setShowAddPlayer(false)}
// //                       className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
// //                     >
// //                       Cancel
// //                     </button>
// //                   </div>
// //                 ) : (
// //                   <button
// //                     onClick={() => setShowAddPlayer(true)}
// //                     className="w-full h-full flex items-center justify-center text-gray-300 hover:text-white transition-colors"
// //                   >
// //                     <Plus className="h-8 w-8" />
// //                   </button>
// //                 )}
// //               </div>
// //             ))}
// //           </div>

// //           {/* Player Count Info */}
// //           <div className="flex items-center justify-center space-x-2 mb-8 text-gray-300">
// //             <Users className="h-5 w-5" />
// //             <span>{players.length}/4 players added</span>
// //             {players.length < 2 && (
// //               <span className="text-red-400">(Minimum 2 required)</span>
// //             )}
// //           </div>

// //           {/* Start Game Button */}
// //           <button
// //             onClick={startGame}
// //             disabled={players.length < 2}
// //             className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-6 rounded-lg transition-all transform hover:scale-105 disabled:transform-none disabled:opacity-50"
// //           >
// //             <Play className="h-6 w-6" />
// //             <span className="text-lg">Start Game</span>
// //           </button>

// //           {/* Disclaimer */}
// //           <div className="mt-8 bg-yellow-400 bg-opacity-20 backdrop-blur-md rounded-lg p-4 border border-yellow-400 border-opacity-30">
// //             <p className="text-sm text-yellow-200 text-center">
// //               <strong>Disclaimer:</strong> Products shown in questions are determined as of {currentDate},
// //               and the prices are approximated.
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default GameSetup;
// [file content end]

// // Now let's fix Round1.tsx to match REQ-007, REQ-008, REQ-009
// [file name]: Round1.tsx
// [file content begin]
// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useGame } from '../../contexts/GameContext';
// // import Timer from '../../components/Timer';
// // import PlayerCard from '../../components/PlayerCard';
// // import { Product } from '../../types';
// // import { DollarSign } from 'lucide-react';

// // const Round1: React.FC = () => {
// //   const [started, setStarted] = useState(false);
// //   const [products, setProducts] = useState<Product[]>([]);
// //   const [currentProduct, setCurrentProduct] = useState(0);
// //   const [submissions, setSubmissions] = useState<Record<string, Record<number, number>>>({});
// //   const [showResults, setShowResults] = useState(false);
// //   const [roundScores, setRoundScores] = useState<Record<string, number>>({});

// //   const { gameState, updatePlayerScore } = useGame();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     // Fetch products for round 1
// //     fetch('http://localhost:5000/api/products?count=3')
// //       .then(res => res.json())
// //       .then(data => setProducts(data))
// //       .catch(console.error);
// //   }, []);

// //   const startRound = () => {
// //     setStarted(true);
// //   };

// //   const submitGuess = (playerId: string, guess: number) => {
// //     setSubmissions(prev => ({
// //       ...prev,
// //       [playerId]: {
// //         ...prev[playerId],
// //         [currentProduct]: guess
// //       }
// //     }));
// //   };

// //   const calculatePoints = (actualPrice: number, guess: number): number => {
// //     const difference = Math.abs(actualPrice - guess);
// //     const percentage = difference / actualPrice;

// //     if (percentage <= 0.05) return 100; // Within 5%
// //     if (percentage <= 0.10) return 75;  // Within 10%
// //     if (percentage <= 0.20) return 50;  // Within 20%
// //     if (percentage <= 0.35) return 25;  // Within 35%
// //     return 0; // More than 35% off
// //   };

// //   const showProductResults = () => {
// //     const product = products[currentProduct];
// //     const scores: Record<string, number> = {};

// //     gameState.players.forEach(player => {
// //       const guess = submissions[player.id]?.[currentProduct] || 0;
// //       const points = calculatePoints(product.price, guess);
// //       scores[player.id] = points;
// //       updatePlayerScore(player.id, points);
// //     });

// //     setRoundScores(scores);
// //     setShowResults(true);
// //   };

// //   const nextProduct = () => {
// //     if (currentProduct < products.length - 1) {
// //       setCurrentProduct(currentProduct + 1);
// //       setShowResults(false);
// //     } else {
// //       // Round 1 completed, go to round 2
// //       navigate('/game/round/2');
// //     }
// //   };

// //   const allPlayersSubmitted = () => {
// //     return gameState.players.every(player =>
// //       submissions[player.id]?.[currentProduct] !== undefined
// //     );
// //   };

// //   if (!started) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-blue-900 to-purple-900">
// //         <div className="max-w-2xl w-full text-center">
// //           <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white border-opacity-20">
// //             <h1 className="text-5xl font-bold text-white mb-4">Round 1</h1>
// //             <h2 className="text-3xl font-semibold text-yellow-400 mb-8">How much do I say?</h2>
// //             <p className="text-gray-300 mb-8 text-lg">
// //               Guess the price of 3 different products. The closer you get, the more points you earn!
// //             </p>
// //             <button
// //               onClick={startRound}
// //               className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105"
// //             >
// //               Start Round 1
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (products.length === 0) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-purple-900">
// //         <div className="text-white text-xl">Loading products...</div>
// //       </div>
// //     );
// //   }

// //   const product = products[currentProduct];

// //   return (
// //     <div className="min-h-screen p-4 bg-gradient-to-b from-blue-900 to-purple-900">
// //       <div className="max-w-6xl mx-auto">
// //         {/* Timer */}
// //         <div className="flex justify-center mb-8">
// //           <Timer />
// //         </div>

// //         {/* Product Display */}
// //         <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white border-opacity-20 mb-8">
// //           <div className="text-center mb-6">
// //             <h2 className="text-2xl font-bold text-white mb-2">
// //               Product {currentProduct + 1} of {products.length}
// //             </h2>
// //             <h3 className="text-3xl font-bold text-yellow-400">{product.name}</h3>
// //           </div>

// //           <div className="flex justify-center mb-8">
// //             <div className="relative">
// //               <img
// //                 src={product.image}
// //                 alt={product.name}
// //                 className="w-80 h-80 object-cover rounded-lg shadow-2xl"
// //               />
// //               {showResults && (
// //                 <div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-xl">
// //                   ${product.price.toFixed(2)}
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {showResults && (
// //             <div className="mb-8">
// //               <h3 className="text-2xl font-bold text-white text-center mb-4">Round Results</h3>
// //               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
// //                 {gameState.players.map(player => {
// //                   const guess = submissions[player.id]?.[currentProduct] || 0;
// //                   const points = roundScores[player.id] || 0;
// //                   return (
// //                     <div key={player.id} className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-4 text-center">
// //                       <h4 className="font-bold text-white">{player.name}</h4>
// //                       <p className="text-gray-300">Guess: ${guess.toFixed(2)}</p>
// //                       <p className="text-yellow-400 font-bold">+{points} points</p>
// //                     </div>
// //                   );
// //                 })}
// //               </div>
// //               <div className="text-center mt-6">
// //                 <button
// //                   onClick={nextProduct}
// //                   className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
// //                 >
// //                   {currentProduct < products.length - 1 ? 'Next Product' : 'Continue to Round 2'}
// //                 </button>
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Players Submission Area */}
// //         {!showResults && (
// //           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
// //             {gameState.players.map(player => (
// //               <div key={player.id} className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white border-opacity-20">
// //                 <PlayerCard player={player} showScore={false} className="mb-4" />

// //                 <div className="space-y-4">
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-300 mb-2">
// //                       Your Price Guess
// //                     </label>
// //                     <div className="relative">
// //                       <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
// //                       <input
// //                         type="number"
// //                         step="0.01"
// //                         min="0"
// //                         placeholder="0.00"
// //                         className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-20 border border-gray-300 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                         disabled={submissions[player.id]?.[currentProduct] !== undefined}
// //                         onChange={(e) => {
// //                           const value = parseFloat(e.target.value) || 0;
// //                           if (value > 0) {
// //                             submitGuess(player.id, value);
// //                           }
// //                         }}
// //                       />
// //                     </div>
// //                   </div>

// //                   {submissions[player.id]?.[currentProduct] !== undefined && (
// //                     <div className="bg-green-600 bg-opacity-20 rounded-lg p-3 text-center">
// //                       <span className="text-green-200 font-semibold">Submitted!</span>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}

// //         {!showResults && allPlayersSubmitted() && (
// //           <div className="text-center mt-8">
// //             <button
// //               onClick={showProductResults}
// //               className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105"
// //             >
// //               Reveal Results
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Round1;
// [file content end]

// // Now let's create the missing GoingOnce component for Round2
// [file name]: GoingOnce.tsx
// [file content begin]
// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useGame } from '../../contexts/GameContext';
// // import Timer from '../../components/Timer';
// // import PlayerCard from '../../components/PlayerCard';
// // import { Product } from '../../types';
// // import { Check, X } from 'lucide-react';

// // const GoingOnce: React.FC = () => {
// //   const [products, setProducts] = useState<Product[]>([]);
// //   const [currentProduct, setCurrentProduct] = useState(0);
// //   const [revealedPrices, setRevealedPrices] = useState<number[]>([]);
// //   const [currentRevealIndex, setCurrentRevealIndex] = useState(0);
// //   const [selections, setSelections] = useState<Record<string, number | null>>({});
// //   const [showResults, setShowResults] = useState(false);
// //   const [roundScores, setRoundScores] = useState<Record<string, number>>({});

// //   const { gameState, updatePlayerScore } = useGame();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     // Fetch products for round
// //     fetch('http://localhost:5000/api/products?count=3')
// //       .then(res => res.json())
// //       .then(data => setProducts(data))
// //       .catch(console.error);
// //   }, []);

// //   useEffect(() => {
// //     if (products.length > 0) {
// //       // Generate 5 potential prices for the current product
// //       const product = products[currentProduct];
// //       const actualPrice = product.price;
// //       const prices = [actualPrice];

// //       // Generate 4 other prices (some close, some further away)
// //       for (let i = 0; i < 4; i++) {
// //         const variance = Math.random() * 0.5 + 0.1; // 10-60% variance
// //         const direction = Math.random() > 0.5 ? 1 : -1;
// //         const newPrice = actualPrice * (1 + direction * variance);
// //         prices.push(parseFloat(newPrice.toFixed(2)));
// //       }

// //       // Shuffle prices
// //       setRevealedPrices(prices.sort(() => Math.random() - 0.5));
// //     }
// //   }, [products, currentProduct]);

// //   const submitSelection = (playerId: string, price: number | null) => {
// //     setSelections(prev => ({
// //       ...prev,
// //       [playerId]: price
// //     }));
// //   };

// //   const nextReveal = () => {
// //     if (currentRevealIndex < revealedPrices.length - 1) {
// //       setCurrentRevealIndex(currentRevealIndex + 1);
// //       setSelections({});
// //     } else {
// //       // All prices revealed, show results
// //       showProductResults();
// //     }
// //   };

// //   const calculatePoints = (selectedPrice: number | null, actualPrice: number): number => {
// //     if (selectedPrice === null) return 0;
// //     if (selectedPrice === actualPrice) return 100;

// //     const difference = Math.abs(selectedPrice - actualPrice);
// //     const percentage = difference / actualPrice;

// //     if (percentage <= 0.05) return 75;
// //     if (percentage <= 0.10) return 50;
// //     if (percentage <= 0.20) return 25;
// //     return 0;
// //   };

// //   const showProductResults = () => {
// //     const product = products[currentProduct];
// //     const scores: Record<string, number> = {};

// //     gameState.players.forEach(player => {
// //       const selectedPrice = selections[player.id];
// //       const points = calculatePoints(selectedPrice, product.price);
// //       scores[player.id] = points;
// //       updatePlayerScore(player.id, points);
// //     });

// //     setRoundScores(scores);
// //     setShowResults(true);
// //   };

// //   const nextProduct = () => {
// //     if (currentProduct < products.length - 1) {
// //       setCurrentProduct(currentProduct + 1);
// //       setRevealedPrices([]);
// //       setCurrentRevealIndex(0);
// //       setSelections({});
// //       setShowResults(false);
// //     } else {
// //       navigate('/game/round/final');
// //     }
// //   };

// //   const allPlayersSubmitted = () => {
// //     return gameState.players.every(player => selections[player.id] !== undefined);
// //   };

// //   if (products.length === 0) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-purple-900">
// //         <div className="text-white text-xl">Loading products...</div>
// //       </div>
// //     );
// //   }

// //   const product = products[currentProduct];
// //   const currentPrice = revealedPrices[currentRevealIndex];

// //   return (
// //     <div className="min-h-screen p-4 bg-gradient-to-b from-blue-900 to-purple-900">
// //       <div className="max-w-6xl mx-auto">
// //         {/* Timer */}
// //         <div className="flex justify-center mb-8">
// //           <Timer />
// //         </div>

// //         {/* Product Display */}
// //         <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white border-opacity-20 mb-8">
// //           <div className="text-center mb-6">
// //             <h2 className="text-2xl font-bold text-white mb-2">
// //               Product {currentProduct + 1} of {products.length}
// //             </h2>
// //             <h3 className="text-3xl font-bold text-yellow-400">{product.name}</h3>
// //           </div>

// //           <div className="flex justify-center mb-8">
// //             <div className="relative">
// //               <img
// //                 src={product.image}
// //                 alt={product.name}
// //                 className="w-80 h-80 object-cover rounded-lg shadow-2xl"
// //               />
// //               {showResults && (
// //                 <div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-xl">
// //                   ${product.price.toFixed(2)}
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Price Reveal Box */}
// //           {!showResults && (
// //             <div className="mb-8">
// //               <h3 className="text-xl font-bold text-white text-center mb-4">
// //                 Price Reveal {currentRevealIndex + 1} of {revealedPrices.length}
// //               </h3>
// //               <div className="bg-blue-600 bg-opacity-30 rounded-xl p-6 text-center mb-6">
// //                 <p className="text-gray-300 mb-2">Potential Price:</p>
// //                 <div className="text-4xl font-bold text-yellow-400">
// //                   ${currentPrice?.toFixed(2)}
// //                 </div>
// //               </div>

// //               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
// //                 {gameState.players.map(player => (
// //                   <div key={player.id} className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-4">
// //                     <PlayerCard player={player} showScore={false} className="mb-3" />

// //                     {selections[player.id] !== undefined ? (
// //                       <div className="bg-green-600 bg-opacity-20 rounded-lg p-2 text-center">
// //                         <span className="text-green-200 text-sm">
// //                           {selections[player.id] !== null ? 'Selected' : 'Passed'}
// //                         </span>
// //                       </div>
// //                     ) : (
// //                       <div className="flex space-x-2">
// //                         <button
// //                           onClick={() => submitSelection(player.id, currentPrice)}
// //                           className="flex-1 flex items-center justify-center space-x-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors text-sm"
// //                         >
// //                           <Check className="h-4 w-4" />
// //                           <span>Choose</span>
// //                         </button>
// //                         <button
// //                           onClick={() => submitSelection(player.id, null)}
// //                           className="flex-1 flex items-center justify-center space-x-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors text-sm"
// //                         >
// //                           <X className="h-4 w-4" />
// //                           <span>Pass</span>
// //                         </button>
// //                       </div>
// //                     )}
// //                   </div>
// //                 ))}
// //               </div>

// //               {allPlayersSubmitted() && (
// //                 <div className="text-center mt-6">
// //                   <button
// //                     onClick={nextReveal}
// //                     className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
// //                   >
// //                     {currentRevealIndex < revealedPrices.length - 1 ? 'Reveal Next Price' : 'Show Results'}
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           )}

// //           {showResults && (
// //             <div className="mb-8">
// //               <h3 className="text-2xl font-bold text-white text-center mb-4">Round Results</h3>

// //               <div className="grid grid-cols-5 gap-4 mb-6">
// //                 {revealedPrices.map((price, index) => (
// //                   <div
// //                     key={index}
// //                     className={`p-3 rounded-lg text-center ${
// //                       price === product.price
// //                         ? 'bg-green-600 text-white'
// //                         : 'bg-white bg-opacity-20 text-gray-300'
// //                     }`}
// //                   >
// //                     <div className="font-bold">${price.toFixed(2)}</div>
// //                     {price === product.price && <div className="text-xs">ACTUAL</div>}
// //                   </div>
// //                 ))}
// //               </div>

// //               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
// //                 {gameState.players.map(player => {
// //                   const selectedPrice = selections[player.id];
// //                   const points = roundScores[player.id] || 0;
// //                   return (
// //                     <div key={player.id} className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-4 text-center">
// //                       <h4 className="font-bold text-white">{player.name}</h4>
// //                       <p className="text-gray-300">
// //                         {selectedPrice !== null ? `Selected: $${selectedPrice?.toFixed(2)}` : 'Passed'}
// //                       </p>
// //                       <p className="text-yellow-400 font-bold">+{points} points</p>
// //                     </div>
// //                   );
// //                 })}
// //               </div>

// //               <div className="text-center">
// //                 <button
// //                   onClick={nextProduct}
// //                   className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
// //                 >
// //                   {currentProduct < products.length - 1 ? 'Next Product' : 'Final Round'}
// //                 </button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default GoingOnce;
// [file content end]

// // Now let's create the MultipleChoice component for Round2
// [file name]: MultipleChoice.tsx
// [file content begin]
// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useGame } from '../../contexts/GameContext';
// // import Timer from '../../components/Timer';
// // import PlayerCard from '../../components/PlayerCard';
// // import { Product } from '../../types';

// // const MultipleChoice: React.FC = () => {
// //   const [products, setProducts] = useState<Product[]>([]);
// //   const [currentProduct, setCurrentProduct] = useState(0);
// //   const [options, setOptions] = useState<number[]>([]);
// //   const [selections, setSelections] = useState<Record<string, number>>({});
// //   const [showResults, setShowResults] = useState(false);
// //   const [roundScores, setRoundScores] = useState<Record<string, number>>({});

// //   const { gameState, updatePlayerScore } = useGame();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     // Fetch products for round
// //     fetch('http://localhost:5000/api/products?count=3')
// //       .then(res => res.json())
// //       .then(data => setProducts(data))
// //       .catch(console.error);
// //   }, []);

// //   useEffect(() => {
// //     if (products.length > 0) {
// //       // Generate 5 options for the current product
// //       const product = products[currentProduct];
// //       const actualPrice = product.price;
// //       const prices = [actualPrice];

// //       // Generate 4 other prices (some close, some further away)
// //       for (let i = 0; i < 4; i++) {
// //         const variance = Math.random() * 0.5 + 0.1; // 10-60% variance
// //         const direction = Math.random() > 0.5 ? 1 : -1;
// //         const newPrice = actualPrice * (1 + direction * variance);
// //         prices.push(parseFloat(newPrice.toFixed(2)));
// //       }

// //       // Shuffle prices
// //       setOptions(prices.sort(() => Math.random() - 0.5));
// //     }
// //   }, [products, currentProduct]);

// //   const submitSelection = (playerId: string, price: number) => {
// //     setSelections(prev => ({
// //       ...prev,
// //       [playerId]: price
// //     }));
// //   };

// //   const calculatePoints = (selectedPrice: number, actualPrice: number): number => {
// //     if (selectedPrice === actualPrice) return 100;

// //     const difference = Math.abs(selectedPrice - actualPrice);
// //     const percentage = difference / actualPrice;

// //     if (percentage <= 0.05) return 75;
// //     if (percentage <= 0.10) return 50;
// //     if (percentage <= 0.20) return 25;
// //     return 0;
// //   };

// //   const showProductResults = () => {
// //     const product = products[currentProduct];
// //     const scores: Record<string, number> = {};

// //     gameState.players.forEach(player => {
// //       const selectedPrice = selections[player.id];
// //       const points = calculatePoints(selectedPrice, product.price);
// //       scores[player.id] = points;
// //       updatePlayerScore(player.id, points);
// //     });

// //     setRoundScores(scores);
// //     setShowResults(true);
// //   };

// //   const nextProduct = () => {
// //     if (currentProduct < products.length - 1) {
// //       setCurrentProduct(currentProduct + 1);
// //       setOptions([]);
// //       setSelections({});
// //       setShowResults(false);
// //     } else {
// //       navigate('/game/round/final');
// //     }
// //   };

// //   const allPlayersSubmitted = () => {
// //     return gameState.players.every(player => selections[player.id] !== undefined);
// //   };

// //   if (products.length === 0) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-purple-900">
// //         <div className="text-white text-xl">Loading products...</div>
// //       </div>
// //     );
// //   }

// //   const product = products[currentProduct];

// //   return (
// //     <div className="min-h-screen p-4 bg-gradient-to-b from-blue-900 to-purple-900">
// //       <div className="max-w-6xl mx-auto">
// //         {/* Timer */}
// //         <div className="flex justify-center mb-8">
// //           <Timer />
// //         </div>

// //         {/* Product Display */}
// //         <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white border-opacity-20 mb-8">
// //           <div className="text-center mb-6">
// //             <h2 className="text-2xl font-bold text-white mb-2">
// //               Product {currentProduct + 1} of {products.length}
// //             </h2>
// //             <h3 className="text-3xl font-bold text-yellow-400">{product.name}</h3>
// //           </div>

// //           <div className="flex justify-center mb-8">
// //             <div className="relative">
// //               <img
// //                 src={product.image}
// //                 alt={product.name}
// //                 className="w-80 h-80 object-cover rounded-lg shadow-2xl"
// //               />
// //               {showResults && (
// //                 <div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-xl">
// //                   ${product.price.toFixed(2)}
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Price Options */}
// //           {!showResults && (
// //             <div className="mb-8">
// //               <h3 className="text-xl font-bold text-white text-center mb-4">
// //                 Select the correct price:
// //               </h3>

// //               <div className="grid grid-cols-5 gap-4 mb-6">
// //                 {options.map((price, index) => (
// //                   <div
// //                     key={index}
// //                     className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-4 text-center cursor-pointer hover:bg-opacity-30 transition-colors"
// //                     onClick={() => {
// //                       // This is just for display, players will select individually
// //                     }}
// //                   >
// //                     <div className="text-xl font-bold text-yellow-400">${price.toFixed(2)}</div>
// //                   </div>
// //                 ))}
// //               </div>

// //               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
// //                 {gameState.players.map(player => (
// //                   <div key={player.id} className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-4">
// //                     <PlayerCard player={player} showScore={false} className="mb-3" />

// //                     {selections[player.id] !== undefined ? (
// //                       <div className="bg-green-600 bg-opacity-20 rounded-lg p-2 text-center">
// //                         <span className="text-green-200 text-sm">
// //                           Selected: ${selections[player.id]?.toFixed(2)}
// //                         </span>
// //                       </div>
// //                     ) : (
// //                       <div className="grid grid-cols-2 gap-2">
// //                         {options.slice(0, 2).map((price, index) => (
// //                           <button
// //                             key={index}
// //                             onClick={() => submitSelection(player.id, price)}
// //                             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors text-sm"
// //                           >
// //                             ${price.toFixed(2)}
// //                           </button>
// //                         ))}
// //                         {options.slice(2, 4).map((price, index) => (
// //                           <button
// //                             key={index + 2}
// //                             onClick={() => submitSelection(player.id, price)}
// //                             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors text-sm"
// //                           >
// //                             ${price.toFixed(2)}
// //                           </button>
// //                         ))}
// //                         <button
// //                           onClick={() => submitSelection(player.id, options[4])}
// //                           className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors text-sm"
// //                         >
// //                           ${options[4]?.toFixed(2)}
// //                         </button>
// //                       </div>
// //                     )}
// //                   </div>
// //                 ))}
// //               </div>

// //               {allPlayersSubmitted() && (
// //                 <div className="text-center mt-6">
// //                   <button
// //                     onClick={showProductResults}
// //                     className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
// //                   >
// //                     Reveal Results
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           )}

// //           {showResults && (
// //             <div className="mb-8">
// //               <h3 className="text-2xl font-bold text-white text-center mb-4">Round Results</h3>

// //               <div className="grid grid-cols-5 gap-4 mb-6">
// //                 {options.map((price, index) => (
// //                   <div
// //                     key={index}
// //                     className={`p-3 rounded-lg text-center ${
// //                       price === product.price
// //                         ? 'bg-green-600 text-white'
// //                         : 'bg-white bg-opacity-20 text-gray-300'
// //                     }`}
// //                   >
// //                     <div className="font-bold">${price.toFixed(2)}</div>
// //                     {price === product.price && <div className="text-xs">ACTUAL</div>}
// //                   </div>
// //                 ))}
// //               </div>

// //               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
// //                 {gameState.players.map(player => {
// //                   const selectedPrice = selections[player.id];
// //                   const points = roundScores[player.id] || 0;
// //                   return (
// //                     <div key={player.id} className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-4 text-center">
// //                       <h4 className="font-bold text-white">{player.name}</h4>
// //                       <p className="text-gray-300">Selected: ${selectedPrice?.toFixed(2)}</p>
// //                       <p className="text-yellow-400 font-bold">+{points} points</p>
// //                     </div>
// //                   );
// //                 })}
// //               </div>

// //               <div className="text-center">
// //                 <button
// //                   onClick={nextProduct}
// //                   className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
// //                 >
// //                   {currentProduct < products.length - 1 ? 'Next Product' : 'Final Round'}
// //                 </button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MultipleChoice;
// [file content end]

// // Now let's fix FinalRound.tsx to match REQ-018, REQ-019, REQ-020
// [file name]: FinalRound.tsx
// [file content begin]
// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useGame } from '../../contexts/GameContext';
// // import Timer from '../../components/Timer';
// // import PlayerCard from '../../components/PlayerCard';

// // interface ShelfProduct {
// //   id: string;
// //   name: string;
// //   image: string;
// //   price: number;
// //   multiplier: number;
// //   totalPrice: number;
// // }

// // const FinalRound: React.FC = () => {
// //   const [started, setStarted] = useState(false);
// //   const [shelves, setShelves] = useState<ShelfProduct[][]>([]);
// //   const [currentShelf, setCurrentShelf] = useState(0);
// //   const [selections, setSelections] = useState<Record<string, number>>({});
// //   const [showResults, setShowResults] = useState(false);
// //   const [roundScores, setRoundScores] = useState<Record<string, number>>({});

// //   const { gameState, updatePlayerScore } = useGame();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     // Fetch products for final round
// //     fetch('http://localhost:5000/api/products?count=9')
// //       .then(res => res.json())
// //       .then(data => {
// //         // Create 3 shelves with 3 products each
// //         const shelvesData: ShelfProduct[][] = [];
// //         for (let i = 0; i < 3; i++) {
// //           const shelf: ShelfProduct[] = [];
// //           for (let j = 0; j < 3; j++) {
// //             const product = data[i * 3 + j];
// //             const multiplier = Math.floor(Math.random() * 3) + 1; // 1-3 multiplier
// //             shelf.push({
// //               ...product,
// //               multiplier,
// //               totalPrice: product.price * multiplier
// //             });
// //           }
// //           shelvesData.push(shelf);
// //         }
// //         setShelves(shelvesData);
// //       })
// //       .catch(console.error);
// //   }, []);

// //   const startRound = () => {
// //     setStarted(true);
// //   };

// //   const submitSelection = (playerId: string, shelfIndex: number) => {
// //     setSelections(prev => ({
// //       ...prev,
// //       [playerId]: shelfIndex
// //     }));
// //   };

// //   const calculatePoints = (selectedShelf: number, actualMostExpensive: number): number => {
// //     if (selectedShelf === actualMostExpensive) return 200;
// //     return 0;
// //   };

// //   const showShelfResults = () => {
// //     const currentShelves = shelves[currentShelf];
// //     // Find which shelf is the most expensive
// //     const shelfTotals = currentShelves.map(shelf =>
// //       shelf.reduce((sum, product) => sum + product.totalPrice, 0)
// //     );
// //     const mostExpensiveIndex = shelfTotals.indexOf(Math.max(...shelfTotals));

// //     const scores: Record<string, number> = {};

// //     gameState.players.forEach(player => {
// //       const selectedShelf = selections[player.id];
// //       const points = calculatePoints(selectedShelf, mostExpensiveIndex);
// //       scores[player.id] = points;
// //       updatePlayerScore(player.id, points);
// //     });

// //     setRoundScores(scores);
// //     setShowResults(true);
// //   };

// //   const nextShelf = () => {
// //     if (currentShelf < shelves.length - 1) {
// //       setCurrentShelf(currentShelf + 1);
// //       setSelections({});
// //       setShowResults(false);
// //     } else {
// //       navigate('/game/results');
// //     }
// //   };

// //   const allPlayersSubmitted = () => {
// //     return gameState.players.every(player => selections[player.id] !== undefined);
// //   };

// //   if (!started) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-blue-900 to-purple-900">
// //         <div className="max-w-2xl w-full text-center">
// //           <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white border-opacity-20">
// //             <h1 className="text-5xl font-bold text-white mb-4">Final Round</h1>
// //             <h2 className="text-3xl font-semibold text-yellow-400 mb-8">Priciest Shelf?</h2>
// //             <p className="text-gray-300 mb-8 text-lg">
// //               Look at 3 shelves with products and multipliers. Choose which shelf is the most expensive!
// //             </p>
// //             <button
// //               onClick={startRound}
// //               className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105"
// //             >
// //               Start Final Round
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (shelves.length === 0) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-purple-900">
// //         <div className="text-white text-xl">Loading products...</div>
// //       </div>
// //     );
// //   }

// //   const currentShelves = shelves[currentShelf];

// //   return (
// //     <div className="min-h-screen p-4 bg-gradient-to-b from-blue-900 to-purple-900">
// //       <div className="max-w-6xl mx-auto">
// //         {/* Timer */}
// //         <div className="flex justify-center mb-8">
// //           <Timer />
// //         </div>

// //         {/* Shelves Display */}
// //         <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white border-opacity-20 mb-8">
// //           <div className="text-center mb-6">
// //             <h2 className="text-2xl font-bold text-white mb-2">
// //               Shelf Set {currentShelf + 1} of {shelves.length}
// //             </h2>
// //             <h3 className="text-3xl font-bold text-yellow-400">Which shelf is the most expensive?</h3>
// //           </div>

// //           <div className="grid grid-cols-3 gap-6 mb-8">
// //             {currentShelves.map((shelf, shelfIndex) => (
// //               <div key={shelfIndex} className="bg-white bg-opacity-5 backdrop-blur-md rounded-xl p-4">
// //                 <h4 className="text-xl font-bold text-white text-center mb-4">Row {shelfIndex + 1}</h4>

// //                 <div className="space-y-4">
// //                   {shelf.map((product, productIndex) => (
// //                     <div key={productIndex} className="bg-white bg-opacity-10 rounded-lg p-3">
// //                       <div className="flex items-center space-x-3 mb-2">
// //                         <img
// //                           src={product.image}
// //                           alt={product.name}
// //                           className="w-16 h-16 object-cover rounded"
// //                         />
// //                         <div className="flex-1">
// //                           <h5 className="font-semibold text-white">{product.name}</h5>
// //                           <p className="text-gray-300">${product.price.toFixed(2)} × {product.multiplier}</p>
// //                         </div>
// //                       </div>
// //                       {showResults && (
// //                         <div className="bg-green-600 bg-opacity-30 rounded p-2 text-center">
// //                           <span className="text-green-200 font-semibold">
// //                             Total: ${product.totalPrice.toFixed(2)}
// //                           </span>
// //                         </div>
// //                       )}
// //                     </div>
// //                   ))}
// //                 </div>

// //                 {showResults && (
// //                   <div className="mt-4 bg-blue-600 bg-opacity-30 rounded-lg p-3 text-center">
// //                     <span className="text-white font-bold">
// //                       Shelf Total: $
// //                       {shelf.reduce((sum, product) => sum + product.totalPrice, 0).toFixed(2)}
// //                     </span>
// //                   </div>
// //                 )}
// //               </div>
// //             ))}
// //           </div>

// //           {showResults && (
// //             <div className="mb-8">
// //               <h3 className="text-2xl font-bold text-white text-center mb-4">Round Results</h3>

// //               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
// //                 {gameState.players.map(player => {
// //                   const selectedShelf = selections[player.id];
// //                   const points = roundScores[player.id] || 0;
// //                   return (
// //                     <div key={player.id} className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-4 text-center">
// //                       <h4 className="font-bold text-white">{player.name}</h4>
// //                       <p className="text-gray-300">Selected: Row {selectedShelf !== undefined ? selectedShelf + 1 : 'None'}</p>
// //                       <p className="text-yellow-400 font-bold">+{points} points</p>
// //                     </div>
// //                   );
// //                 })}
// //               </div>

// //               <div className="text-center">
// //                 <button
// //                   onClick={nextShelf}
// //                   className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
// //                 >
// //                   {currentShelf < shelves.length - 1 ? 'Next Shelf Set' : 'See Final Results'}
// //                 </button>
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Players Selection Area */}
// //         {!showResults && (
// //           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
// //             {gameState.players.map(player => (
// //               <div key={player.id} className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white border-opacity-20">
// //                 <PlayerCard player={player} showScore={false} className="mb-4" />

// //                 <div className="space-y-3">
// //                   <h4 className="text-lg font-semibold text-white text-center">Select a Row</h4>

// //                   <div className="grid grid-cols-3 gap-2">
// //                     {[0, 1, 2].map(shelfIndex => (
// //                       <button
// //                         key={shelfIndex}
// //                         onClick={() => submitSelection(player.id, shelfIndex)}
// //                         disabled={selections[player.id] !== undefined}
// //                         className={`py-3 rounded-lg transition-all ${
// //                           selections[player.id] === shelfIndex
// //                             ? 'bg-yellow-600 text-white'
// //                             : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
// //                         }`}
// //                       >
// //                         Row {shelfIndex + 1}
// //                       </button>
// //                     ))}
// //                   </div>

// //                   {selections[player.id] !== undefined && (
// //                     <div className="bg-green-600 bg-opacity-20 rounded-lg p-2 text-center">
// //                       <span className="text-green-200 font-semibold">
// //                         Selected: Row {selections[player.id] + 1}
// //                       </span>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}

// //         {!showResults && allPlayersSubmitted() && (
// //           <div className="text-center mt-8">
// //             <button
// //               onClick={showShelfResults}
// //               className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105"
// //             >
// //               Reveal Results
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default FinalRound;
// [file content end]

// // Finally, let's update the GameResults component to properly display the winner
// [file name]: GameResults.tsx
// [file content begin]
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useGame } from '../../contexts/GameContext';
// import { Trophy, Play, Home } from 'lucide-react';

// const GameResults: React.FC = () => {
//   const { gameState, resetGame } = useGame();
//   const navigate = useNavigate();

//   // Sort players by score in descending order
//   const sortedPlayers = [...gameState.players].sort((a, b) => b.score - a.score);
//   const winner = sortedPlayers[0];

//   const playAgain = () => {
//     resetGame();
//     navigate('/game/setup');
//   };

//   const goHome = () => {
//     resetGame();
//     navigate('/');
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-blue-900 to-purple-900">
//       <div className="max-w-4xl w-full">
//         <div className="text-center mb-8">
//           <h1 className="text-5xl font-bold text-white mb-4">Game Results</h1>
//           <h2 className="text-3xl font-semibold text-yellow-400">Final Scores</h2>
//         </div>

//         <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white border-opacity-20 mb-8">
//           {/* Winner Announcement */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center p-4 bg-yellow-500 rounded-full mb-4">
//               <Trophy className="h-12 w-12 text-white" />
//             </div>
//             <h3 className="text-3xl font-bold text-white mb-2">Congratulations {winner.name}!</h3>
//             <p className="text-gray-300 text-xl">You won with {winner.score} points</p>
//           </div>

//           {/* Players Ranking */}
//           <div className="space-y-4 mb-8">
//             {sortedPlayers.map((player, index) => (
//               <div
//                 key={player.id}
//                 className={`flex items-center justify-between p-6 rounded-xl ${
//                   index === 0
//                     ? 'bg-gradient-to-r from-yellow-600 to-orange-600'
//                     : 'bg-white bg-opacity-20 backdrop-blur-md'
//                 }`}
//               >
//                 <div className="flex items-center space-x-4">
//                   <div className="text-2xl font-bold text-white">#{index + 1}</div>
//                   <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//                     <span className="text-white font-bold text-lg">
//                       {player.name.charAt(0).toUpperCase()}
//                     </span>
//                   </div>
//                   <div>
//                     <h4 className="text-xl font-semibold text-white">{player.name}</h4>
//                     {index === 0 && (
//                       <span className="text-yellow-200 font-medium">Winner!</span>
//                     )}
//                   </div>
//                 </div>
//                 <div className="text-2xl font-bold text-white">{player.score} points</div>
//               </div>
//             ))}
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4">
//             <button
//               onClick={playAgain}
//               className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-lg transition-all transform hover:scale-105"
//             >
//               <Play className="h-6 w-6" />
//               <span className="text-lg">Play Again</span>
//             </button>
//             <button
//               onClick={goHome}
//               className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-4 px-6 rounded-lg transition-all transform hover:scale-105"
//             >
//               <Home className="h-6 w-6" />
//               <span className="text-lg">Main Menu</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GameResults;
// [file content end]
