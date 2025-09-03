import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Play, Settings, History, UserPlus, LogIn, Trophy } from "lucide-react";

const Home: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white border-opacity-20">
            <Trophy className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-white mb-4">SUMA</h1>
            <p className="text-gray-300 mb-8 text-lg">
              Create an account to play the ultimate price guessing game!
            </p>

            <div className="space-y-4">
              <button
                onClick={() => navigate("/register")}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
              >
                <UserPlus className="h-5 w-5" />
                <span>Sign Up</span>
              </button>

              <button
                onClick={() => navigate("/login")}
                className="w-full flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <Trophy className="h-20 w-20 text-yellow-400 mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-white mb-4">SUMA</h1>
          <p className="text-xl text-gray-300">Welcome back, {user.email}!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Play Game */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white border-opacity-20 hover:bg-opacity-20 transition-all transform hover:scale-105">
            <button
              onClick={() => navigate("/game/setup")}
              className="w-full text-left"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full">
                  <Play className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Play Game</h2>
                  <p className="text-gray-300">Start a new game session</p>
                </div>
              </div>
            </button>
          </div>

          {/* Account Settings */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white border-opacity-20 hover:bg-opacity-20 transition-all transform hover:scale-105">
            <button
              onClick={() => navigate("/settings")}
              className="w-full text-left"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full">
                  <Settings className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Settings</h2>
                  <p className="text-gray-300">Manage your account</p>
                </div>
              </div>
            </button>
          </div>

          {/* Order History */}
          <div className="md:col-span-2">
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white border-opacity-20 hover:bg-opacity-20 transition-all transform hover:scale-105">
              <button
                onClick={() => navigate("/history")}
                className="w-full text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full">
                    <History className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Game History
                    </h2>
                    <p className="text-gray-300">
                      View your past games and achievements
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Free Trial Notice */}
        <div className="mt-8 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 backdrop-blur-md rounded-xl p-4 border border-yellow-400/30">
          <div className="flex items-center space-x-2 text-yellow-300">
            <Trophy className="h-5 w-5" />
            <span className="font-semibold">Free Trial Available!</span>
          </div>
          <p className="text-sm text-gray-200 mt-1">
            Enjoy one round of the complete game experience at no cost.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
