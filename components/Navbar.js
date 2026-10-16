"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Link2 } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const getLinkClass = (path) =>
    `transition-colors duration-200 ${
      pathname === path
        ? "text-cyan-400"
        : "text-white hover:text-cyan-400"
    }`;

  return (
    <nav className="relative z-50 shrink-0 border-b border-white/10 bg-slate-950 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold"
        >
          <Link2 className="text-cyan-400" size={27} />
          Link<span className="text-cyan-400">ly</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 sm:flex">
          <Link href="/generate" className={getLinkClass("/generate")}>
            Shorten
          </Link>

          <Link href="/about" className={getLinkClass("/about")}>
            About Us
          </Link>

          <Link
            href="/generate"
            className="rounded-xl bg-cyan-400 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 transition hover:bg-white/10 sm:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="absolute left-0 top-full w-full border-b border-white/10 bg-slate-950 px-4 py-4 shadow-xl sm:hidden">
          <div className="flex flex-col gap-2">
            <Link
              href="/generate"
              onClick={() => setMenuOpen(false)}
              className={`rounded-lg px-4 py-3 ${getLinkClass("/generate")}`}
            >
              Shorten
            </Link>

            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className={`rounded-lg px-4 py-3 ${getLinkClass("/about")}`}
            >
              About Us
            </Link>

            <Link
              href="/generate"
              onClick={() => setMenuOpen(false)}
              className="mt-1 rounded-lg bg-cyan-400 px-4 py-3 text-center font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}