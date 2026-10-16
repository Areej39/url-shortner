
"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-cyan-900/50 bg-slate-950 px-6 py-6 text-center text-sm text-slate-400">
      <p>
        © {year ?? "2026"} URL Shortener. All rights reserved.
      </p>
    </footer>
  );
}
