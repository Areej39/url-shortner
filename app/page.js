
import Link from "next/link";

export default function Home() {
  return (
    <main className="landing-page relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 text-white">
      <div
        className="landing-background absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/landing-bg.png')" }}
      />

      <div className="absolute inset-0 bg-slate-950/65" />

      <section className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="landing-tag mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
          Short links. Bigger possibilities.
        </p>

        <h1 className="landing-heading text-4xl font-extrabold sm:text-6xl md:text-8xl">
          Make Every Link
          <span className="block text-cyan-400">Count.</span>
        </h1>

        <p className="landing-description mx-auto mt-6 max-w-xl text-lg text-slate-200">
          Turn long URLs into short, shareable links in seconds.
          Simple, fast, and easy to use.
        </p>

        <div className="landing-buttons mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/generate"
            className="rounded-xl bg-cyan-400 px-8 py-4 font-bold text-slate-950 shadow-lg shadow-cyan-400/20 transition duration-300 hover:-translate-y-1 hover:bg-cyan-300"
          >
            Try Now →
          </Link>

          <Link
            href="/about"
            className="rounded-xl border border-white/50 px-8 py-4 font-semibold transition duration-300 hover:-translate-y-1 hover:bg-white/10"
          >
            About Us
          </Link>
        </div>
      </section>
    </main>
  );
}
