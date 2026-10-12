
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(form.email, form.password);
      navigate("/books");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden bg-gradient-to-br from-violet-100 via-fuchsia-50 to-cyan-100 px-4 py-12">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-purple-300/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-pink-300/40 blur-3xl" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-violet-900/15 md:grid-cols-2">
        <section className="relative flex min-h-72 flex-col justify-between overflow-hidden bg-gradient-to-br from-violet-700 via-purple-600 to-fuchsia-500 p-8 text-white sm:p-10">
          <div className="absolute -right-14 top-20 h-48 w-48 rounded-full border-[24px] border-white/10" />
          <div className="absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-pink-400/20" />

          <div className="relative">
            <span className="text-4xl">📚</span>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-purple-100">
              Your reading community
            </p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
              Stories bring
              <br />
              us together.
            </h2>
            <p className="mt-5 max-w-sm leading-7 text-purple-100">
              Find your next favorite book, share your reviews, and discover
              stories through fellow readers.
            </p>
          </div>

          <div className="relative mt-10 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-lg">★★★★★</p>
            <p className="mt-1 text-sm text-purple-50">
              Every great book starts a new conversation.
            </p>
          </div>
        </section>

        <section className="flex items-center justify-center p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
            <div>
              <span className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-700">
                Welcome back
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
                Sign in to BookNest
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Pick up where your reading journey left off.
              </p>
            </div>

            {error && (
              <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-4 py-3.5 font-bold text-white shadow-lg shadow-purple-500/25 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-500/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing you in..." : "Sign In →"}
            </button>

            <p className="text-center text-sm text-slate-500">
              New to BookNest?{" "}
              <Link to="/register" className="font-bold text-violet-700 hover:text-fuchsia-600">
                Create an account
              </Link>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
