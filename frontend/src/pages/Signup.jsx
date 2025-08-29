import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataProvider";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const { setUser } = useContext(DataContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BACKEND_URL;


  // Manual signup
  const handleSignup = async () => {
    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, username, password }),
      });

      const data = await res.json();

      if (data.data && data.user) {
        localStorage.setItem("token", data.data);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser({ token: data.data, ...data.user });
        navigate("/");
      } else {
        console.log("Signup failed:", data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Google login
  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 px-4 py-8">
      <h1 className="text-white text-3xl sm:text-4xl lg:text-4xl font-extrabold mb-6 lg:mb-8 drop-shadow-lg tracking-wide text-center">
        Welcome to <span className="text-yellow-300">ProScout</span>
      </h1>

      <div className="flex flex-col shadow-2xl border border-white/20 p-6 sm:p-8 lg:p-12 rounded-2xl w-full max-w-md bg-white/10 backdrop-blur-lg">
        <h2 className="text-xl lg:text-2xl font-bold text-center text-white mb-6">Create Account</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 w-full text-base lg:text-lg font-medium border border-white/30 text-white placeholder-white/70 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 w-full text-base lg:text-lg font-medium border border-white/30 text-white placeholder-white/70 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 w-full text-base lg:text-lg font-medium border border-white/30 text-white placeholder-white/70 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 w-full text-base lg:text-lg font-medium border border-white/30 text-white placeholder-white/70 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
          />
        </div>

        <button
          onClick={handleSignup}
          className="w-full py-3 mt-6 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-base lg:text-lg shadow-lg hover:scale-[1.02] active:scale-[0.98] transition"
        >
          Sign Up
        </button>

        <div className="w-full flex items-center gap-3 my-4">
          <span className="h-px bg-white/30 w-full" />
          <span className="text-white/70 text-sm whitespace-nowrap">or</span>
          <span className="h-px bg-white/30 w-full" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-3 shadow hover:shadow-md active:scale-[0.98] transition font-medium"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="text-white/80 text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link className="text-yellow-300 font-semibold hover:underline" to="/login">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
