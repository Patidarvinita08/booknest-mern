import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

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

app.get("/", (req, res) => {
  res.json({
    message: "BookNest API is running"
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