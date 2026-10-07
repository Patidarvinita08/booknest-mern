import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { protect } from "./middleware/auth.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/auth/protected-test", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "You are authenticated!",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email
    }
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "BookNest server is healthy"
  });
});

app.listen(PORT, () => {
  console.log(`BookNest server running on port ${PORT}`);
});