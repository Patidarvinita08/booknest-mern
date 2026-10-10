
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Books() {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [genre, setGenre] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        const fetchBooks = async () => {
            setLoading(true);
            setError("");

            try {
                const params = {};
                if (search.trim()) params.search = search.trim();
                if (genre) params.genre = genre;

                const response = await api.get("/books", {
                    params,
                    signal: controller.signal,
                });

                setBooks(response.data.books || []);
            } catch (err) {
                if (err.code !== "ERR_CANCELED") {
                    setError(
                        err.response?.data?.message ||
                        "Could not load books. Please check your backend."
                    );
                }
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        };

        const timer = setTimeout(fetchBooks, 250);

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [search, genre]);

    const genres = [...new Set(books.map((book) => book.genre).filter(Boolean))];

    return (
        <main className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-pink-50">
            {/* Hero */}
            <section className="px-4 pb-8 pt-10 sm:px-8">
                <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-700 via-purple-600 to-fuchsia-500 px-6 py-10 text-white shadow-xl shadow-purple-200 sm:px-10 sm:py-14">
                    <div className="absolute -right-12 -top-16 h-64 w-64 rounded-full border-[35px] border-white/10" />
                    <div className="absolute bottom-0 right-1/3 h-36 w-36 rounded-full bg-pink-400/20 blur-2xl" />

                    <div className="relative max-w-2xl">
                        <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest">
                            ✨ Your reading community
                        </span>

                        <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">
                            Find your next
                            <br />
                            <span className="text-yellow-300">favorite story.</span>
                        </h1>

                        <p className="mt-4 max-w-xl leading-7 text-purple-100">
                            Explore books, discover new authors, and find your next
                            unforgettable read.
                        </p>
                    </div>
                </div>
            </section>

            {/* Search and filters */}
            <section className="mx-auto max-w-7xl px-4 py-6 sm:px-8">
                <div className="rounded-2xl border border-violet-100 bg-white p-4 shadow-lg shadow-violet-100/50 sm:p-6">
                    <div className="grid gap-4 md:grid-cols-[1fr_240px]">
                        <div>
                            <label
                                htmlFor="book-search"
                                className="mb-2 block text-sm font-bold text-slate-700"
                            >
                                Search books
                            </label>
                            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-100">
                                <span aria-hidden="true">🔎</span>
                                <input
                                    id="book-search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search by title or author..."
                                    className="w-full bg-transparent py-3.5 text-slate-800 outline-none placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="genre-filter"
                                className="mb-2 block text-sm font-bold text-slate-700"
                            >
                                Filter by genre
                            </label>
                            <select
                                id="genre-filter"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-700 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                            >
                                <option value="">All genres</option>
                                {genres.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {(search || genre) && (
                        <button
                            onClick={() => {
                                setSearch("");
                                setGenre("");
                            }}
                            className="mt-4 text-sm font-bold text-fuchsia-600 hover:text-violet-700"
                        >
                            ✕ Clear filters
                        </button>
                    )}
                </div>
            </section>

            {/* Book listing */}
            <section className="mx-auto max-w-7xl px-4 pb-16 pt-5 sm:px-8">

                <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-widest text-fuchsia-600">
                            The bookshelf
                        </p>
                        <h2 className="mt-2 text-3xl font-black text-slate-900">
                            Explore books <span className="text-violet-600">📚</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-3">
                        {!loading && !error && (
                            <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-bold text-violet-700">
                                {books.length} {books.length === 1 ? "book" : "books"}
                            </span>
                        )}

                        <Link
                            to="/books/add"
                            className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5"
                        >
                            + Add Book
                        </Link>
                    </div>
                </div>


                {loading ? (
                    <div
                        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        aria-label="Loading books"
                    >
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="animate-pulse rounded-2xl border border-slate-100 bg-white p-4"
                            >
                                <div className="h-48 rounded-xl bg-violet-100" />
                                <div className="mt-4 h-5 w-3/4 rounded bg-slate-200" />
                                <div className="mt-3 h-4 w-1/2 rounded bg-slate-100" />
                                <div className="mt-5 h-10 rounded-xl bg-pink-100" />
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
                        <p className="text-3xl">😕</p>
                        <h3 className="mt-3 text-xl font-bold text-red-800">
                            Something went wrong
                        </h3>
                        <p className="mt-2 text-sm text-red-700">{error}</p>
                        <button
                            onClick={() => {
                                setSearch((value) => value);
                            }}
                            className="mt-5 rounded-xl bg-red-600 px-5 py-3 font-bold text-white hover:bg-red-700"
                        >
                            Try again
                        </button>
                    </div>
                ) : books.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-violet-200 bg-white px-5 py-14 text-center">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-pink-100 text-4xl">
                            📖
                        </div>
                        <h3 className="mt-5 text-2xl font-black text-slate-800">
                            No books found just yet
                        </h3>
                        <p className="mx-auto mt-2 max-w-md leading-7 text-slate-500">
                            Try another search or clear your filters. Your next favorite
                            might be just around the corner.
                        </p>
                        <button
                            onClick={() => {
                                setSearch("");
                                setGenre("");
                            }}
                            className="mt-5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 font-bold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5"
                        >
                            Show all books
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {books.map((book, index) => {
                            const accents = [
                                "from-violet-500 to-fuchsia-500",
                                "from-cyan-500 to-blue-600",
                                "from-orange-400 to-pink-500",
                                "from-emerald-400 to-teal-600",
                            ];

                            return (
                                <article
                                    key={book._id}
                                    className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/70"
                                >
                                    <div
                                        className={`relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br ${accents[index % accents.length]}`}
                                    >
                                        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border-[20px] border-white/15" />
                                        <div className="absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-white/10" />

                                        {book.coverUrl ? (
                                            <img
                                                src={book.coverUrl}
                                                alt={`Cover of ${book.title}`}
                                                className="relative h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = "none";
                                                }}
                                            />
                                        ) : (
                                            <div className="relative text-center text-white">
                                                <span className="text-5xl">📚</span>
                                                <p className="mt-2 max-w-48 px-3 font-bold">
                                                    {book.title}
                                                </p>
                                            </div>
                                        )}

                                        <span className="absolute left-3 top-3 rounded-full border border-white/30 bg-white/90 px-3 py-1 text-xs font-bold text-violet-800 shadow-sm">
                                            {book.genre}
                                        </span>
                                    </div>

                                    <div className="p-5">
                                        <h3 className="line-clamp-1 text-lg font-extrabold text-slate-900">
                                            {book.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-slate-500">
                                            by {book.author}
                                        </p>

                                        <div className="mt-4 flex items-center justify-between gap-2">
                                            <span className="text-sm font-bold text-amber-500">
                                                ⭐ Rating available on details
                                            </span>
                                        </div>

                                        <Link
                                            to={`/books/${book._id}`}
                                            className="mt-5 block rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3 text-center text-sm font-bold text-white shadow-md shadow-violet-200 transition hover:from-violet-700 hover:to-fuchsia-700"
                                        >
                                            View Book →
                                        </Link>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>
        </main>
    );
}
