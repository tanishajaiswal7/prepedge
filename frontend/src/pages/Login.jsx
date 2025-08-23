import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataProvider";

function Login() {
  const { setUser } = useContext(DataContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const API_URL = import.meta.env.VITE_BACKEND_URL;

  
  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok) {
        setUser(data.data);
        localStorage.setItem("token", data.data);
        navigate("/");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500">
      <h1 className="text-white text-5xl font-extrabold mb-10 drop-shadow-lg tracking-wide">
        Welcome Back to <span className="text-yellow-300">ProScout</span>
      </h1>

      <div className="flex flex-col bg-white/10 backdrop-blur-lg shadow-2xl shadow-black/30 p-12 rounded-2xl w-[90%] sm:w-[400px] items-center gap-6 border border-white/20">
        <h2 className="font-bold text-3xl text-white tracking-wide drop-shadow-md">
          Login In
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-3 w-full text-lg font-medium border border-white/30 text-white placeholder-white/70 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 w-full text-lg font-medium border border-white/30 text-white placeholder-white/70 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
        />

        <button
          onClick={handleLogin}
          className="w-full py-3 mt-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg shadow-lg hover:scale-[1.02] active:scale-[0.98] transition"
        >
          Login
        </button>

        
        <div className="w-full flex items-center gap-3">
          <span className="h-px bg-white/30 w-full" />
          <span className="text-white/70 text-sm whitespace-nowrap">or</span>
          <span className="h-px bg-white/30 w-full" />
        </div>

        
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-3 shadow hover:shadow-md active:scale-[0.98] transition"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="text-white/80 text-sm mt-2">
          New User?{" "}
          <Link className="text-yellow-300 font-semibold hover:underline" to="/signup">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
