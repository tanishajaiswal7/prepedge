// routes/auth.js
import express from "express";
import passport from "passport";
import { login, logout, signup, googleAuthCallback } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", signup);
router.post("/logout", logout);

// ✅ Google auth routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000/login" }),
  googleAuthCallback //function from 
    // authControllers.js to handle successful login
);

export default router;
