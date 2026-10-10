
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Stars({ rating }) {
  return (
    <span className="text-lg tracking-wide text-amber-400">
      {"★".repeat(rating)}
      <span className="text-slate-200">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

export default function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const loadReviews = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/reviews/me");
      setReviews(response.data.reviews || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Could not load your reviews."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const startEditing = (review) => {
    setEditingId(review._id);
    setEditRating(review.rating);
    setEditComment(review.comment);
    setError("");
    setMessage("");
  };

  const saveEdit = async (e) => {
    e.preventDefault();

    if (!editComment.trim()) {
      setError("Please enter a review comment.");
      return;
    }

    const currentReview = reviews.find((review) => review._id === editingId);

    if (!currentReview?.book?._id) {
      setError("Book information is missing. Please refresh the page.");
      return;
    }

    setSaving(true);
    setError("");
    setMessage("");

    try {
      await api.post(`/books/${currentReview.book._id}/reviews`, {
        rating: editRating,
        comment: editComment.trim(),
      });

      setEditingId(null);
      setMessage("Your review was updated successfully.");
      await loadReviews();
    } catch (err) {
      setError(err.response?.data?.message || "Could not update your review.");
    } finally {
      setSaving(false);
    }
  };

  const deleteReview = async (reviewId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) return;

    setDeletingId(reviewId);
    setError("");
    setMessage("");

    try {
      await api.delete(`/reviews/${reviewId}`);
      setReviews((current) =>
        current.filter((review) => review._id !== reviewId)
      );
      setMessage("Your review was deleted.");
      if (editingId === reviewId) setEditingId(null);
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete your review.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-pink-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-500 p-7 text-white shadow-xl shadow-purple-200 sm:p-10">
          <div className="absolute -right-8 -top-12 h-48 w-48 rounded-full border-[28px] border-white/10" />
          <div className="relative">
            <span className="text-4xl">💌</span>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-purple-100">
              Your reading journal
            </p>
            <h1 className="mt-2 text-3xl font-black sm:text-4xl">
              My Reviews
            </h1>
            <p className="mt-3 max-w-lg leading-7 text-purple-100">
              All your ratings, thoughts, and favorite reading moments in one place.
            </p>
            {!loading && (
              <span className="mt-5 inline-block rounded-full bg-white/15 px-4 py-2 text-sm font-bold">
                {reviews.length} {reviews.length === 1 ? "review" : "reviews"} shared
              </span>
            )}
          </div>
        </section>

        {message && (
          <p role="status" className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-800">
            {message}
          </p>
        )}

        {error && (
          <p role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </p>
        )}

        {loading ? (
          <div className="py-16 text-center">
            <p className="text-4xl">📚</p>
            <p className="mt-3 font-semibold text-violet-700">
              Opening your reading journal...
            </p>
          </div>
        ) : reviews.length === 0 ? (
          <section className="mt-8 rounded-3xl border border-dashed border-violet-200 bg-white px-5 py-14 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-pink-100 text-4xl">
              ✍️
            </div>
            <h2 className="mt-5 text-2xl font-black text-slate-900">
              Your story starts here
            </h2>
            <p className="mx-auto mt-2 max-w-md leading-7 text-slate-500">
              You haven't written any reviews yet. Explore the bookshelf and
              share your thoughts on a book.
            </p>
            <Link
              to="/books"
              className="mt-6 inline-block rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5"
            >
              Explore Books →
            </Link>
          </section>
        ) : (
          <section className="mt-8 space-y-5">
            {reviews.map((review, index) => (
              <article
                key={review._id}
                className="overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm transition hover:shadow-lg hover:shadow-violet-100/70"
              >
                <div className="grid sm:grid-cols-[150px_1fr]">
                  <div
                    className={`flex min-h-40 items-center justify-center bg-gradient-to-br ${
                      [
                        "from-violet-500 to-fuchsia-500",
                        "from-cyan-500 to-blue-600",
                        "from-orange-400 to-pink-500",
                        "from-emerald-400 to-teal-600",
                      ][index % 4]
                    } p-4`}
                  >
                    {review.book?.coverUrl ? (
                      <img
                        src={review.book.coverUrl}
                        alt={`Cover of ${review.book.title}`}
                        className="max-h-44 max-w-full rounded-lg object-contain shadow-lg"
                      />
                    ) : (
                      <span className="text-5xl">📚</span>
                    )}
                  </div>

                  <div className="min-w-0 p-5 sm:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs font-bold uppercase tracking-widest text-fuchsia-600">
                          {review.book?.genre || "Book review"}
                        </p>
                        <h2 className="mt-2 break-words text-xl font-black text-slate-900">
                          {review.book?.title || "Book no longer available"}
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                          by {review.book?.author || "Unknown author"}
                        </p>
                      </div>
                      <div className="rounded-xl bg-amber-50 px-3 py-2 text-center">
                        <p className="text-xs font-bold text-amber-700">YOUR RATING</p>
                        <Stars rating={review.rating} />
                      </div>
                    </div>

                    {editingId === review._id ? (
                      <form onSubmit={saveEdit} className="mt-5 space-y-4">
                        <div>
                          <label className="mb-2 block text-sm font-bold text-slate-700">
                            Update rating
                          </label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((value) => (
                              <button
                                key={value}
                                type="button"
                                aria-label={`Rate ${value} stars`}
                                aria-pressed={editRating === value}
                                onClick={() => setEditRating(value)}
                                className={`rounded-lg px-2 py-1 text-xl ${
                                  value <= editRating
                                    ? "bg-amber-100 text-amber-500"
                                    : "bg-slate-100 text-slate-300"
                                }`}
                              >
                                ★
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor={`comment-${review._id}`}
                            className="mb-2 block text-sm font-bold text-slate-700"
                          >
                            Edit your comment
                          </label>
                          <textarea
                            id={`comment-${review._id}`}
                            rows={4}
                            maxLength={2000}
                            required
                            value={editComment}
                            onChange={(e) => setEditComment(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                          />
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <button
                            type="submit"
                            disabled={saving}
                            className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 font-bold text-white disabled:opacity-60"
                          >
                            {saving ? "Saving..." : "Save Changes"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-600 hover:bg-slate-50"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <p className="mt-5 whitespace-pre-line leading-7 text-slate-600">
                          {review.comment}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-3">
                          {review.book?._id && (
                            <Link
                              to={`/books/${review.book._id}`}
                              className="rounded-xl bg-violet-100 px-4 py-2.5 text-sm font-bold text-violet-700 transition hover:bg-violet-200"
                            >
                              View Book
                            </Link>
                          )}
                          <button
                            onClick={() => startEditing(review)}
                            className="rounded-xl border border-pink-200 bg-pink-50 px-4 py-2.5 text-sm font-bold text-pink-700 transition hover:bg-pink-100"
                          >
                            ✏️ Edit Review
                          </button>
                          <button
                            onClick={() => deleteReview(review._id)}
                            disabled={deletingId === review._id}
                            className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                          >
                            {deletingId === review._id
                              ? "Deleting..."
                              : "🗑 Delete"}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
