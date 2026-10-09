
import express from "express";

import {
  getBooks,
  addBook,
  getBookById,
  updateBook,
  deleteBook
} from "../controllers/bookController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getBooks);
router.get("/:id", getBookById);

// Protected routes
router.post("/", protect, addBook);
router.put("/:id", protect, updateBook);
router.delete("/:id", protect, deleteBook);

export default router;
