import express from "express";
import passport from "passport";
import { login, logout, signup, googleAuthCallback } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", signup);
router.post("/logout", logout);

// Google auth routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login`, 
  }),
  googleAuthCallback
);

export default router;
