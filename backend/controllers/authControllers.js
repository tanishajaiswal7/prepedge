import dotenv from "dotenv";
dotenv.config();
import User from "../db/model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// LOGIN
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).send("user not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send("password incorrect");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({
      message: "login success",
      data: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server error");
  }
};

// LOGOUT
export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};

// SIGNUP
export const signup = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    const u = await User.findOne({ username });
    if (u) return res.status(409).send("username already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, username, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return res.status(201).json({
      message: "user registered successfully",
      data: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server error");
  }
};

// GOOGLE CALLBACK
export const googleAuthCallback = async (req, res) => {
  try {
    const user = req.user;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // ✅ Only send token to frontend
    res.redirect(`${process.env.CLIENT_URL}/auth/google/callback?token=${token}`);
  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server error");
  }
};
