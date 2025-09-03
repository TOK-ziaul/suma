import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { GameProvider } from "./contexts/GameContext";
import Layout from "./components/Layout";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GameSetup from "./pages/game/GameSetup";
import Round1 from "./pages/game/Round1";
import Round2 from "./pages/game/Round2";
import HigherLower from "./pages/game/HigherLower";
import FinalRound from "./pages/game/FinalRound";
import GameResults from "./pages/game/GameResults";
import MultipleChoice from "./pages/game/MultipleChoice";
import GoingOnce from "./pages/game/GoingOnce";

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <Router>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/game/setup"
                element={
                  <ProtectedRoute>
                    <GameSetup />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/game/round/1"
                element={
                  <ProtectedRoute>
                    <Round1 />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/game/round/2"
                element={
                  <ProtectedRoute>
                    <Round2 />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/game/round/2/higher-lower"
                element={
                  <ProtectedRoute>
                    <HigherLower />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/game/round/2/multiple-choice"
                element={
                  <ProtectedRoute>
                    <MultipleChoice />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/game/round/2/going-once"
                element={
                  <ProtectedRoute>
                    <GoingOnce />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/game/round/final"
                element={
                  <ProtectedRoute>
                    <FinalRound />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/game/results"
                element={
                  <ProtectedRoute>
                    <GameResults />
                  </ProtectedRoute>
                }
              />

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Layout>
        </Router>
      </GameProvider>
    </AuthProvider>
  );
}

export default App;
