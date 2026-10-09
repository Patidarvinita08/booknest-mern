import Review from "../models/Review.js";
import Book from "../models/Book.js";

export const addOrUpdateReview = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const { rating, comment } = req.body;

    // Validate rating
    if (
      rating === undefined ||
      rating === null ||
      rating < 1 ||
      rating > 5
    ) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5"
      });
    }

    // Validate comment
    if (!comment || !comment.trim()) {
      return res.status(400).json({
        success: false,
        message: "Comment is required"
      });
    }

    // Check whether the book exists
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    // Check if this user has already reviewed this book
    let review = await Review.findOne({
      book: bookId,
      user: req.user._id
    });

    if (review) {
      // Existing review → update it
      review.rating = rating;
      review.comment = comment.trim();

      await review.save();

      return res.status(200).json({
        success: true,
        message: "Review updated successfully",
        review
      });
    }

    // No existing review → create one
    review = await Review.create({
      book: bookId,
      user: req.user._id,
      rating,
      comment: comment.trim()
    });

    return res.status(201).json({
      success: true,
      message: "Review added successfully",
      review
    });
  } catch (error) {
    console.error("Add/update review error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while adding review"
    });
  }
};
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found"
      });
    }

    // Only the user who wrote the review can delete it
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this review"
      });
    }

    await review.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully"
    });
  } catch (error) {
    console.error("Delete review error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while deleting review"
    });
  }
};

export const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      user: req.user._id
    })
      .populate("book", "title author genre coverUrl")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      reviews
    });
  } catch (error) {
    console.error("Get my reviews error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching your reviews"
    });
  }
};
