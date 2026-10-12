
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/useAuth";

function Stars({ rating = 0 }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= Math.round(rating) ? "text-amber-400" : "text-slate-200"}
        >
          ★
        </span>
      ))}
    </span>
  );
}

export default function BookDetail() {
  const { id } = useParams();
  const { user } = useAuth();

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadBook = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get(`/books/${id}`);
      const data = response.data;

      setBook(data.book);
      setReviews(data.reviews || []);
      setAverageRating(data.averageRating || 0);
      setReviewCount(data.reviewCount ?? data.reviews?.length ?? 0);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load this book.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadBook();
  }, [loadBook]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!comment.trim()) {
      setError("Please write a comment before submitting your review.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await api.post(`/books/${id}/reviews`, {
        rating,
        comment: comment.trim(),
      });

      setMessage(response.data.message || "Your review has been saved!");
      setComment("");
      await loadBook();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not save your review. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-violet-50 px-4 py-20 text-center">
        <div className="text-4xl">📚</div>
        <p className="mt-4 font-semibold text-violet-700">Opening your book...</p>
      </main>
    );
  }

  if (error && !book) {
    return (
      <main className="min-h-screen bg-violet-50 px-4 py-20">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-center shadow-lg">
          <p className="text-4xl">😕</p>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Book unavailable</h1>
          <p className="mt-2 text-slate-600">{error}</p>
          <Link to="/books" className="mt-6 inline-block font-bold text-violet-700">
            ← Back to books
          </Link>
        </div>
      </main>
    );
  }

  if (!book) return null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-pink-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/books"
          className="inline-flex items-center gap-2 font-semibold text-violet-700 transition hover:text-fuchsia-600"
        >
          ← Back to books
        </Link>

        <section className="mt-6 overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-violet-100">
          <div className="grid md:grid-cols-[300px_1fr]">
            <div className="relative flex min-h-72 items-center justify-center overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-500 p-8">
              <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border-[30px] border-white/10" />
              <div className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-pink-300/20 blur-xl" />

              {book.coverUrl ? (
                <img
                  src={book.coverUrl}
                  alt={`Cover of ${book.title}`}
                  className="relative max-h-80 w-auto max-w-full rounded-xl object-contain shadow-2xl"
                />
              ) : (
                <div className="relative text-center text-white">
                  <span className="text-7xl">📚</span>
                  <p className="mt-4 text-xl font-black">{book.title}</p>
                </div>
              )}
            </div>

            <div className="p-6 sm:p-10">
              <span className="inline-block rounded-full bg-fuchsia-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-fuchsia-700">
                {book.genre}
              </span>

              <h1 className="mt-5 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
                {book.title}
              </h1>
              <p className="mt-3 text-lg text-slate-500">
                by <span className="font-semibold text-violet-700">{book.author}</span>
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="text-2xl font-black text-slate-900">
                  {Number(averageRating).toFixed(1)}
                </span>
                <div>
                  <Stars rating={averageRating} />
                  <p className="text-sm text-slate-500">
                    {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
                  </p>
                </div>
              </div>

              <div className="my-6 h-px bg-gradient-to-r from-violet-200 via-pink-200 to-transparent" />

              <h2 className="text-lg font-bold text-slate-900">About this book</h2>
              <p className="mt-3 whitespace-pre-line leading-7 text-slate-600">
                {book.description}
              </p>

              <p className="mt-5 text-sm text-slate-500">
                Added by {book.addedBy?.name || "a BookNest reader"}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="mb-5">
              <p className="text-sm font-bold uppercase tracking-widest text-fuchsia-600">
                Reader community
              </p>
              <h2 className="mt-2 text-3xl font-black text-slate-900">
                Reader reviews 💬
              </h2>
            </div>

            {reviews.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-violet-200 bg-white p-8 text-center">
                <span className="text-4xl">💌</span>
                <p className="mt-3 font-bold text-slate-800">No reviews yet</p>
                <p className="mt-2 text-sm text-slate-500">
                  Be the first to share your thoughts about this book.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <article
                    key={review._id}
                    className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 font-bold text-white">
                          {(review.user?.name || "R").charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">
                            {review.user?.name || "Reader"}
                          </p>
                          <Stars rating={review.rating} />
                        </div>
                      </div>
                      <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">
                        {review.rating}/5
                      </span>
                    </div>

                    <p className="mt-4 whitespace-pre-line leading-7 text-slate-600">
                      {review.comment}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-xl shadow-violet-100/60 sm:p-8">
            <span className="text-3xl">✍️</span>
            <h2 className="mt-3 text-2xl font-black text-slate-900">
              Share your review
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Tell the community what you thought of this book.
            </p>

            {message && (
              <p role="status" className="mt-5 rounded-xl bg-emerald-50 p-3 text-sm font-medium text-emerald-700">
                {message}
              </p>
            )}

            {error && book && (
              <p role="alert" className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}

            {!user ? (
              <div className="mt-6 rounded-2xl bg-violet-50 p-5">
                <p className="font-semibold text-violet-900">
                  Log in to write a review.
                </p>
                <Link
                  to="/login"
                  className="mt-4 inline-block rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 font-bold text-white"
                >
                  Sign in →
                </Link>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="mt-6 space-y-5">
                <div>
                  <label className="mb-3 block text-sm font-bold text-slate-700">
                    Your rating
                  </label>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Choose rating">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        aria-label={`${value} star${value > 1 ? "s" : ""}`}
                        aria-pressed={rating === value}
                        onClick={() => setRating(value)}
                        className={`rounded-xl px-3 py-2 text-xl transition ${
                          value <= rating
                            ? "bg-amber-100 text-amber-500"
                            : "bg-slate-100 text-slate-300"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-sm font-semibold text-violet-700">
                    {rating} out of 5 stars
                  </p>
                </div>

                <div>
                  <label htmlFor="review-comment" className="mb-2 block text-sm font-bold text-slate-700">
                    Your thoughts
                  </label>
                  <textarea
                    id="review-comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    rows={5}
                    maxLength={2000}
                    placeholder="What did you love about this book?"
                    className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 leading-6 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Saving review..." : "Submit Review →"}
                </button>

                <p className="text-xs leading-5 text-slate-500">
                  You can have one review per book. Submitting another review
                  updates your existing rating and comment.
                </p>
              </form>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
