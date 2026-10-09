
import express from "express";

import {
  addOrUpdateReview,
  deleteReview,
  getMyReviews
} from "../controllers/reviewController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/books/:id/reviews",
  protect,
  addOrUpdateReview
);

router.get(
  "/reviews/me",
  protect,
  getMyReviews
);

router.delete(
  "/reviews/:id",
  protect,
  deleteReview
);

export default router;
