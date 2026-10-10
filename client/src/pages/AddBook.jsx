
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const initialForm = {
  title: "",
  author: "",
  genre: "",
  coverUrl: "",
  description: "",
};

const genres = [
  "Fantasy",
  "Romance",
  "Mystery",
  "Science Fiction",
  "Thriller",
  "Self-help",
  "Biography",
  "History",
  "Fiction",
  "Non-fiction",
  "Other",
];

export default function AddBook() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/books", {
        ...form,
        title: form.title.trim(),
        author: form.author.trim(),
        genre: form.genre.trim(),
        coverUrl: form.coverUrl.trim(),
        description: form.description.trim(),
      });

      navigate("/books");
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Your session may have expired. Please log in again.");
      } else {
        setError(
          err.response?.data?.message ||
            "Could not add the book. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-pink-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/books"
          className="font-semibold text-violet-700 transition hover:text-fuchsia-600"
        >
          ← Back to books
        </Link>

        <div className="mt-6 grid overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-violet-100 md:grid-cols-[0.8fr_1.2fr]">
          <aside className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-violet-700 via-purple-600 to-fuchsia-500 p-8 text-white sm:p-10">
            <div className="absolute -right-12 top-10 h-48 w-48 rounded-full border-[28px] border-white/10" />
            <div className="absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-pink-300/20 blur-xl" />

            <div className="relative">
              <span className="text-5xl">📚</span>
              <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-purple-100">
                Grow our bookshelf
              </p>
              <h1 className="mt-3 text-4xl font-black leading-tight">
                Every book deserves a place.
              </h1>
              <p className="mt-5 leading-7 text-purple-100">
                Add a book you love and help another reader discover their
                next favorite story.
              </p>
            </div>

            <div className="relative mt-12 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
              <p className="text-2xl">✨ 💜 ⭐</p>
              <p className="mt-3 font-bold">Share the book love</p>
              <p className="mt-1 text-sm leading-6 text-purple-100">
                Your contribution makes our reading community richer.
              </p>
            </div>
          </aside>

          <section className="p-6 sm:p-10">
            <span className="inline-block rounded-full bg-fuchsia-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-fuchsia-700">
              Add a new book
            </span>

            <h2 className="mt-4 text-3xl font-black text-slate-900">
              Book details
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Fill in the details below to add your book to BookNest.
            </p>

            {error && (
              <p
                role="alert"
                className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div>
                <label htmlFor="title" className="mb-2 block text-sm font-bold text-slate-700">
                  Book title *
                </label>
                <input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  maxLength={200}
                  placeholder="Enter the book title"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                />
              </div>

              <div>
                <label htmlFor="author" className="mb-2 block text-sm font-bold text-slate-700">
                  Author *
                </label>
                <input
                  id="author"
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  required
                  maxLength={150}
                  placeholder="Who wrote this book?"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                />
              </div>

              <div>
                <label htmlFor="genre" className="mb-2 block text-sm font-bold text-slate-700">
                  Genre *
                </label>
                <select
                  id="genre"
                  name="genre"
                  value={form.genre}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                >
                  <option value="">Choose a genre</option>
                  {genres.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="coverUrl" className="mb-2 block text-sm font-bold text-slate-700">
                  Book cover URL
                </label>
                <input
                  id="coverUrl"
                  name="coverUrl"
                  type="url"
                  value={form.coverUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/book-cover.jpg"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Optional. Paste a publicly accessible image URL.
                </p>
              </div>

              <div>
                <label htmlFor="description" className="mb-2 block text-sm font-bold text-slate-700">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  maxLength={5000}
                  rows={5}
                  placeholder="What is this book about?"
                  className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 leading-6 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-4 font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Adding your book..." : "Add Book to BookNest →"}
              </button>

              <p className="text-center text-xs leading-5 text-slate-500">
                Your account will be recorded as the book's contributor.
              </p>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
