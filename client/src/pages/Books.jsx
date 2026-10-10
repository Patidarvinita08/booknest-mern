
import { Link } from "react-router-dom";

const features = [
  {
    emoji: "📚",
    title: "Discover stories",
    description: "Explore books across genres and find your next great read.",
    color: "bg-violet-100",
  },
  {
    emoji: "⭐",
    title: "Share your reviews",
    description: "Rate your favorite books and help other readers choose.",
    color: "bg-amber-100",
  },
  {
    emoji: "💜",
    title: "Build your collection",
    description: "Add books and create a community around your reading.",
    color: "bg-pink-100",
  },
];

export default function Books() {
  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-b from-violet-50 via-white to-pink-50">
      <section className="mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-8 sm:pt-16">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-700 via-purple-600 to-fuchsia-500 px-6 py-12 text-white shadow-2xl shadow-purple-500/20 sm:px-12 sm:py-16 lg:px-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full border-[45px] border-white/10" />
          <div className="pointer-events-none absolute -bottom-24 right-1/4 h-64 w-64 rounded-full bg-pink-400/20 blur-2xl" />

          <div className="relative grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-purple-100 backdrop-blur">
                ✨ A little magic on every page
              </span>

              <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Find your
                <br />
                next <span className="text-yellow-300">favorite</span> story.
              </h1>

              <p className="mt-5 max-w-lg text-base leading-7 text-purple-100 sm:text-lg">
                A cozy corner for book lovers. Discover new reads, share honest
                reviews, and see what other readers are loving.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/register"
                  className="rounded-xl bg-white px-6 py-3.5 font-bold text-violet-700 shadow-lg transition hover:-translate-y-1 hover:bg-yellow-100"
                >
                  Start your journey →
                </Link>
                <Link
                  to="/login"
                  className="rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/20"
                >
                  Sign in
                </Link>
              </div>

              <p className="mt-6 text-sm text-purple-100">
                📖 Read more. Discover more. Share more.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute inset-8 rounded-full bg-pink-400/30 blur-3xl" />
              <div className="relative grid grid-cols-2 gap-4">
                <div className="mt-10 rotate-[-5deg] rounded-2xl bg-amber-300 p-5 text-slate-900 shadow-2xl transition hover:rotate-0">
                  <div className="text-4xl">🌻</div>
                  <p className="mt-8 text-xs font-bold uppercase tracking-widest">Chapter One</p>
                  <p className="mt-2 text-xl font-black">A world of wonder</p>
                  <p className="mt-3 text-xs">Your next adventure awaits.</p>
                </div>
                <div className="rotate-[5deg] rounded-2xl bg-cyan-200 p-5 text-slate-900 shadow-2xl transition hover:rotate-0">
                  <div className="text-4xl">🌊</div>
                  <p className="mt-8 text-xs font-bold uppercase tracking-widest">Chapter Two</p>
                  <p className="mt-2 text-xl font-black">Stories that stay</p>
                  <p className="mt-3 text-xs">Every page holds a feeling.</p>
                </div>
                <div className="col-span-2 mx-auto w-4/5 rounded-2xl border border-white/20 bg-white/15 p-4 text-center backdrop-blur-md">
                  <p className="text-lg tracking-widest text-yellow-300">★★★★★</p>
                  <p className="mt-1 text-sm font-semibold">
                    Great books are even better when shared.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-14 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-full bg-fuchsia-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-fuchsia-700">
              Made for book lovers
            </span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Your reading life, <span className="text-violet-600">reimagined.</span>
            </h2>
            <p className="mt-4 leading-7 text-slate-500">
              More than a bookshelf — a place to discover, discuss, and
              celebrate the books you love.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/70"
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.color} text-3xl transition group-hover:scale-110`}>
                  {feature.emoji}
                </div>
                <h3 className="mt-5 text-xl font-extrabold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-500">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <footer className="border-t border-violet-100 py-6 text-center text-sm text-slate-500">
          <span className="font-bold text-violet-700">BookNest</span> · Every
          reader belongs here. 💜
        </footer>
      </section>
    </main>
  );
}
