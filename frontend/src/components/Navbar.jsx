import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataProvider";
import { FaBars, FaTimes } from "react-icons/fa";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function Navbar() {
  const { user, setUser } = useContext(DataContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 shadow-xl relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg flex-shrink-0">
            ProScout
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-lg lg:text-xl font-semibold text-white hover:text-yellow-300 transition">
              Home
            </Link>
            <a href="#features" className="text-lg lg:text-xl font-semibold text-white hover:text-yellow-300 transition">
              Features
            </a>

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-white font-semibold text-sm lg:text-base hidden lg:block">
                  Hello, {user.username || "User"}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm lg:text-lg font-semibold text-white border border-white hover:bg-white hover:text-indigo-600 rounded-xl shadow-lg py-2 px-3 lg:px-4 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="text-sm lg:text-lg font-semibold text-white bg-indigo-500 hover:bg-indigo-600 rounded-xl shadow-lg py-2 px-3 lg:px-4 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-sm lg:text-lg font-semibold text-indigo-600 bg-white hover:bg-gray-100 rounded-xl shadow-lg py-2 px-3 lg:px-4 transition"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-yellow-300 focus:outline-none focus:text-yellow-300 transition"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-indigo-700 bg-opacity-95 absolute top-16 left-0 right-0 z-50 shadow-lg">
            <div className="px-4 py-4 space-y-4">
              <Link 
                to="/" 
                className="block text-lg font-semibold text-white hover:text-yellow-300 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <a 
                href="#features" 
                className="block text-lg font-semibold text-white hover:text-yellow-300 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>

              {user ? (
                <div className="space-y-3 pt-2 border-t border-indigo-500">
                  <span className="block text-white font-semibold">
                    Hello, {user.username || "User"}
                  </span>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left text-lg font-semibold text-white border border-white hover:bg-white hover:text-indigo-600 rounded-xl shadow-lg py-2 px-4 transition"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-3 pt-2 border-t border-indigo-500">
                  <Link
                    to="/login"
                    className="block text-center text-lg font-semibold text-white bg-indigo-500 hover:bg-indigo-600 rounded-xl shadow-lg py-2 px-4 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block text-center text-lg font-semibold text-indigo-600 bg-white hover:bg-gray-100 rounded-xl shadow-lg py-2 px-4 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Signup
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
