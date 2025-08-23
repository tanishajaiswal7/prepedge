import express from "express";
import passport from "passport";
import session from "express-session";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import dotenv from "dotenv";
import connectdb from "./db/connectDb.js";
import cookieParser from "cookie-parser";
import auth from "./routes/auth.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// ✅ Session middleware (before passport.initialize and passport.session)
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// ✅ Passport middleware (after session setup)
app.use(passport.initialize());
app.use(passport.session());

// ✅ Import passport config AFTER dotenv is loaded
import "./utils/passportConfig.js";

const server = createServer(app);


const allowedOrigins = [
  "http://localhost:3000",           // local dev
  process.env.CLIENT_URL             // frontend prod (Vercel)
];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectdb();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// ✅ Mount routes
app.use("/api", auth);     // login, register, logout
app.use("/auth", auth);    // google auth routes (google, callback)

// Socket.io
io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  socket.on("leaveRoom", (room) => {
    socket.leave(room);
    console.log(`User ${socket.id} left room ${room}`);
  });

  socket.on("message", ({ room, data }) => {
    io.to(room).emit("recieve-message", data);
  });

  socket.on("display-code", ({ room, data }) => {
    io.to(room).emit("recieve-code", data);
  });

  socket.on("input-change", ({ room, data }) => {
    io.to(room).emit("recieve-input", data);
  });

  socket.on("output-change", ({ room, data }) => {
    io.to(room).emit("recieve-output", data);
  });

  socket.on("change-language", ({ room, data }) => {
    io.to(room).emit("recieve-language", data);
  });

  socket.on("text-change", ({ room, data }) => {
    io.to(room).emit("recieve-text", data);
  });
});

app.get("/", (req, res) => {
  res.send("Hello there!");
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
