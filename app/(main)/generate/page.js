"use client";
import { useState, useEffect } from "react";
import {
  Link2,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Copy,
} from "lucide-react";

export default function GeneratePage() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [preferredUrl, setPreferredUrl] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const [loading, setLoading] = useState(false);
  const [createdUrl, setCreatedUrl] = useState("");

 const [baseUrl, setBaseUrl] = useState("your-domain.com");

useEffect(() => {
  setBaseUrl(window.location.origin);
}, []);

  const cleanPreferredUrl = preferredUrl
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .toLowerCase();

  const previewUrl = cleanPreferredUrl
    ? `${baseUrl}/${cleanPreferredUrl}`
    : "";


async function handleSubmit(event) {
  event.preventDefault();
  setError("");
  setCopied(false);
  setCreatedUrl("");

  let parsedUrl;

  try {
    parsedUrl = new URL(originalUrl.trim());
  } catch {
    setError("Enter a valid URL, including https://");
    return;
  }

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    setError("Only HTTP and HTTPS URLs are supported.");
    return;
  }

  if (!cleanPreferredUrl) {
    setError("Enter a preferred short URL.");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: parsedUrl.href,
        shorturl: cleanPreferredUrl,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to create short link.");
    }

    setCreatedUrl(`${window.location.origin}/${cleanPreferredUrl}`);
  } catch (error) {
    setError(error.message || "Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
}


  async function handleCopy() {
    if (!previewUrl) return;

    try {
      await navigator.clipboard.writeText(previewUrl);
      setCopied(true);
    } catch {
      setError("Couldn't copy the preview. Please copy it manually.");
    }
  }

  return (
    <section className="flex flex-1 items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-sky-100 px-4 py-12 sm:px-6">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500 text-white shadow-lg shadow-cyan-500/25">
            <Link2 size={30} />
          </div>

          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white px-4 py-2 text-sm font-medium text-cyan-700">
            <Sparkles size={15} />
            Simple. Fast. Shareable.
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Shorten your links
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-slate-600 sm:text-base">
            Turn a long URL into a clean, memorable link you can share
            anywhere.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="originalUrl"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Original URL
              </label>

              <input
                id="originalUrl"
                type="url"
                value={originalUrl}
                onChange={(event) => setOriginalUrl(event.target.value)}
                placeholder="https://example.com/your-long-link"
                required
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
              />

              <p className="mt-2 text-xs text-slate-500">
                Paste the full destination URL, including https://
              </p>
            </div>

            <div>
              <label
                htmlFor="preferredUrl"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Preferred short URL
              </label>

              <div className="flex overflow-hidden rounded-xl border border-slate-300 bg-slate-50 transition focus-within:border-cyan-500 focus-within:ring-4 focus-within:ring-cyan-500/10">
                <span className="flex shrink-0 items-center border-r border-slate-200 bg-slate-100 px-3 text-xs text-slate-500 sm:px-4 sm:text-sm">
                  {baseUrl || "your-domain.com"}/
                </span>

                <input
                  id="preferredUrl"
                  type="text"
                  value={preferredUrl}
                  onChange={(event) => {
                    setPreferredUrl(event.target.value);
                    setCopied(false);
                  }}
                  placeholder="my-link"
                  maxLength={40}
                  required
                  pattern="[a-zA-Z0-9_-]+"
                  title="Use letters, numbers, hyphens, or underscores."
                  className="min-w-0 flex-1 bg-transparent px-3 py-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:px-4"
                />
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Choose a memorable name using letters, numbers, - or _.
              </p>
            </div>

            {previewUrl && (
              <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-cyan-800">
                  Your link preview
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="break-all text-sm font-medium text-slate-800">
                    {previewUrl}
                  </span>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-cyan-200 bg-white px-3 py-2 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-100"
                  >
                    {copied ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <Copy size={16} />
                    )}
                    {copied ? "Copied" : "Copy preview"}
                  </button>
                </div>
              </div>
            )}

            {error && (
              <p
                role="status"
                className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700"
              >
                {error}
              </p>
            )}


            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-4 font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating your link..." : "Shorten URL"}
              {!loading && <ArrowRight size={18} />}
            </button>


            {createdUrl && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-800">
                  <CheckCircle2 size={18} />
                  Your short link is ready!
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={createdUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-sm font-medium text-cyan-700 underline"
                  >
                    {createdUrl}
                  </a>

                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(createdUrl);
                        setCopied(true);
                        setError("");
                      } catch {
                        setError("Unable to copy the link. Please copy it manually.");
                      }
                    }}
                    className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-100"
                  >
                    {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                    {copied ? "Copied!" : "Copy link"}
                  </button>
                </div>
              </div>
            )}


          </form>

          <p className="mt-5 text-center text-xs leading-5 text-slate-500">
            Your preferred name must be available before a short link can
            be created.
          </p>
        </div>
      </div>
    </section>
  );
}
