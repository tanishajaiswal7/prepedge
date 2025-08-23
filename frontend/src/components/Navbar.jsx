import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataProvider";

function Navbar() {
  const { user, setUser } = useContext(DataContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex p-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 justify-between items-center shadow-xl">
      <Link to="/" className="text-4xl font-bold text-white drop-shadow-lg">
        ProScout
      </Link>

      <div className="flex gap-6 items-center">
        <Link to="/" className="text-xl font-semibold text-white hover:text-yellow-300 transition">
          Home
        </Link>
        <a href="#features" className="text-xl font-semibold text-white hover:text-yellow-300 transition">
          Features
        </a>

        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-white font-semibold">
              Hello, {user.username || "User"}
            </span>
            <button
              onClick={handleLogout}
              className="text-lg font-semibold text-white border border-white hover:bg-white hover:text-indigo-600 rounded-xl shadow-lg py-2 px-4 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link
              to="/login"
              className="text-lg font-semibold text-white bg-indigo-500 hover:bg-indigo-600 rounded-xl shadow-lg py-2 px-4 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-lg font-semibold text-indigo-600 bg-white hover:bg-gray-100 rounded-xl shadow-lg py-2 px-4 transition"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
