import Book from "../models/Book.js";
import Review from "../models/Review.js";

export const getBooks = async (req, res) => {
  try {
    const { search, genre } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } }
      ];
    }

    if (genre) {
      filter.genre = {
        $regex: `^${genre}$`,
        $options: "i"
      };
    }

    const books = await Book.find(filter)
      .populate("addedBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: books.length,
      books
    });
  } catch (error) {
    console.error("Get books error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching books"
    });
  }
};

export const addBook = async (req, res) => {
  try {
    const {
      title,
      author,
      genre,
      coverUrl,
      description
    } = req.body;

    if (!title || !author || !genre || !description) {
      return res.status(400).json({
        success: false,
        message: "Title, author, genre and description are required"
      });
    }

    const book = await Book.create({
      title,
      author,
      genre,
      coverUrl: coverUrl || "",
      description,
      addedBy: req.user._id
    });

    return res.status(201).json({
      success: true,
      message: "Book added successfully",
      book
    });
  } catch (error) {
    console.error("Add book error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while adding book"
    });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id)
      .populate("addedBy", "name");

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    // Fetch all reviews for this book
    const reviews = await Review.find({ book: book._id })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    // Calculate the average rating on the server
    const totalRating = reviews.reduce(
      (total, review) => total + review.rating,
      0
    );

    const reviewCount = reviews.length;

    const averageRating =
      reviewCount > 0
        ? Number((totalRating / reviewCount).toFixed(1))
        : 0;

    return res.status(200).json({
      success: true,
      book,
      averageRating,
      reviewCount,
      reviews
    });
  } catch (error) {
    console.error("Get book by ID error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching book"
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre, coverUrl, description } = req.body;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    // Only the person who added the book can edit it
    if (book.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to edit this book"
      });
    }

    // Update only fields that were provided
    if (title !== undefined) book.title = title;
    if (author !== undefined) book.author = author;
    if (genre !== undefined) book.genre = genre;
    if (coverUrl !== undefined) book.coverUrl = coverUrl;
    if (description !== undefined) book.description = description;

    await book.save();

    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      book
    });
  } catch (error) {
    console.error("Update book error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while updating book"
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    // Only the person who added the book can delete it
    if (book.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this book"
      });
    }

    // Remove reviews belonging to this book too
    await Review.deleteMany({ book: book._id });

    await book.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Book and its reviews deleted successfully"
    });
  } catch (error) {
    console.error("Delete book error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while deleting book"
    });
  }
};

