import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { LogOut, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      {user && location.pathname !== "/" && (
        <header className="bg-black bg-opacity-30 backdrop-blur-md border-b border-white border-opacity-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <button
                  onClick={() => navigate("/")}
                  className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors"
                >
                  <p className="font-bold text-2xl rounded-full bg-purple-400 w-10 h-10 flex items-center justify-center">
                    <span>S</span>
                  </p>
                  <span className="font-bold text-lg">SUMA - Price Master</span>
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-white">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">{user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-white hover:text-red-400 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
