
import Link from "next/link";
import { Link2, ShieldCheck, Zap, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Link2,
    title: "Simple to use",
    description: "Make long web addresses easier to share.",
  },
  {
    icon: Zap,
    title: "Fast experience",
    description: "A clean interface designed for quick access.",
  },
  {
    icon: ShieldCheck,
    title: "Built with care",
    description: "Created as a modern web development project.",
  },
];

export default function AboutPage() {
  return (
    <section className="flex flex-1 items-center justify-center bg-slate-950 px-4 py-10 text-white sm:px-6 sm:py-14">
      <div className="mx-auto w-full max-w-5xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
            ABOUT LINKLY
          </p>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Less URL.
            <span className="text-cyan-400"> More sharing.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-lg sm:leading-8">
            Linkly is a URL-shortening project designed to make
            long web addresses easier to share and manage. Our
            goal is to deliver a simple, intuitive experience
            through a modern and responsive interface.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-5">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-slate-900 p-5 transition hover:border-cyan-400/40 sm:p-6"
            >
              <Icon size={27} className="text-cyan-400" />

              <h2 className="mt-4 text-lg font-bold">
                {title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-9 flex justify-center sm:mt-12">
          <Link
            href="/generate"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-7 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            Try the Shortener <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
