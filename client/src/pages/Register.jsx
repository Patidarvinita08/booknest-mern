
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(form.name, form.email, form.password);
      navigate("/books");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 via-violet-50 to-cyan-100 px-4 py-12">
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-fuchsia-300/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-0 h-80 w-80 rounded-full bg-violet-300/40 blur-3xl" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-violet-900/15 md:grid-cols-2">
        <section className="relative order-2 flex min-h-72 flex-col justify-between overflow-hidden bg-gradient-to-br from-fuchsia-600 via-purple-600 to-violet-700 p-8 text-white sm:p-10 md:order-1">
          <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full border-[28px] border-white/10" />
          <div className="absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-violet-400/20" />

          <div className="relative">
            <span className="text-4xl">✨</span>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-100">
              A world of stories awaits
            </p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
              Your next
              <br />
              chapter starts here.
            </h2>
            <p className="mt-5 max-w-sm leading-7 text-purple-100">
              Join a community of readers. Explore books, rate your favorites,
              and inspire others with your reviews.
            </p>
          </div>

          <div className="relative mt-10 grid grid-cols-3 gap-2">
            {[
              ["📖", "Discover"],
              ["⭐", "Review"],
              ["💜", "Connect"],
            ].map(([emoji, label]) => (
              <div key={label} className="rounded-xl border border-white/15 bg-white/10 p-3 text-center backdrop-blur-sm">
                <div className="text-2xl">{emoji}</div>
                <p className="mt-1 text-xs font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="order-1 flex items-center justify-center p-6 sm:p-10 md:order-2">
          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
            <div>
              <span className="inline-flex rounded-full bg-fuchsia-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-fuchsia-700">
                Join the community
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
                Create your account
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Your next favorite read is waiting for you.
              </p>
            </div>

            {error && (
              <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="What should we call you?"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-fuchsia-500 focus:bg-white focus:ring-4 focus:ring-fuchsia-100"
              />
            </div>

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
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-fuchsia-500 focus:bg-white focus:ring-4 focus:ring-fuchsia-100"
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
                autoComplete="new-password"
                minLength={6}
                required
                value={form.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-fuchsia-500 focus:bg-white focus:ring-4 focus:ring-fuchsia-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-violet-600 px-4 py-3.5 font-bold text-white shadow-lg shadow-fuchsia-500/25 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-fuchsia-500/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating your account..." : "Create Account →"}
            </button>

            <p className="text-center text-sm text-slate-500">
              Already a member?{" "}
              <Link to="/login" className="font-bold text-violet-700 hover:text-fuchsia-600">
                Sign in
              </Link>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
