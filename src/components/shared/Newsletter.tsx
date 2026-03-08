"use client";

import { useState, useRef } from "react";
import Reveal from "../animations/reveal";
import { showToast } from "@/lib/toast";
import { WEBSITE_NAME } from "@/lib/constants";
import { Spinner } from "../ui/spinner";

type State = "idle" | "loading" | "success" | "error";

const perks = [
  { icon: "✦", text: "Early access to new arrivals" },
  { icon: "✦", text: "Members-only offers & events" },
  { icon: "✦", text: "Style notes from our editors" },
];

export default function Newsletter() {
  const [state, setState] = useState<State>("idle");
  const [email, setEmail] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || state === "loading") return;

    setState("loading");

    // Replace with real API call later
    await new Promise((r) => setTimeout(r, 1200));

    setState("success");
    showToast.subscribed(email);
  }

  return (
    <Reveal>
      <section className="relative overflow-hidden bg-stone-900 text-stone-300" data-reveal>
        {/* Background decoration — large serif watermark */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 text-[22vw] font-light text-white/3 leading-none select-none hidden lg:block"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {WEBSITE_NAME}
        </div>

        {/* Diagonal accent line */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 h-full w-px bg-linear-to-b from-transparent via-stone-600 to-transparent opacity-40"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-full w-px bg-linear-to-b from-transparent via-stone-600 to-transparent opacity-40"
        />

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-12 lg:gap-0 items-center">
            {/* ── LEFT: Copy ── */}
            <div className="lg:pr-16">
              <p className="text-sm tracking-[0.5em] uppercase mb-6">
                The Edit
              </p>

              <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-light text-white leading-[1.1] tracking-tight mb-6">
                Stay in the <em className="not-italic text-stone-400">loop.</em>
              </h2>

              <p className="text-sm leading-relaxed max-w-sm mb-10">
                Subscribe to The Edit — our weekly curation of new arrivals,
                style notes, and exclusive offers delivered to your inbox.
              </p>

              {/* Perks */}
              <ul className="flex flex-col gap-3">
                {perks.map((perk) => (
                  <li key={perk.text} className="flex items-center gap-3">
                    <span className="text-primary text-xs">{perk.icon}</span>
                    <span className="text-xs text-stone-400 tracking-wide">
                      {perk.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Divider ── */}
            <div className="hidden lg:block w-px h-full min-h-60 bg-linear-to-b from-transparent via-stone-700 to-transparent" />

            {/* ── RIGHT: Form ── */}
            <div className="lg:pl-16">
              {state === "success" ? (
                <div className="flex flex-col gap-5">
                  {/* Success state */}
                  <div className="w-12 h-12 rounded-full border border-stone-600 flex items-center justify-center mb-2">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path
                        d="M3 9l4.5 4.5L15 5"
                        stroke="#a8a29e"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p
                      className="text-xl font-light text-white mb-2"
                    >
                      You&apos;re on the list.
                    </p>
                    <p className="text-sm leading-relaxed">
                      Welcome to The Edit. Your first issue arrives soon.
                    </p>
                  </div>
                  <div className="h-px bg-stone-800 w-12" />
                  <p className="text-xs tracking-[0.4em] uppercase">
                    {email}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div>
                    <p
                      className="text-xl font-semibold text-white mb-2"
                    >
                      Subscribe to The Edit
                    </p>
                    <p className="text-xs tracking-wide">
                      Join 50,000+ members. Unsubscribe anytime.
                    </p>
                  </div>

                  {/* Input row */}
                  <div className="flex flex-col sm:flex-row gap-0">
                    <div className="relative flex-1">
                      <input
                        ref={inputRef}
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        className="w-full bg-white/5 border border-stone-700 sm:border-r-0 px-5 py-4 text-sm text-white placeholder:text-stone-400 focus:outline-none focus:border-stone-400 transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={state === "loading"}
                      className="group relative overflow-hidden bg-white text-stone-900 px-8 py-4 text-[11px] tracking-[0.3em] uppercase font-medium hover:bg-stone-100 transition-colors disabled:opacity-70 shrink-0"
                    >
                      <span
                        className={`transition-all duration-300 ${
                          state === "loading" ? "opacity-0" : "opacity-100"
                        }`}
                      >
                        Subscribe
                      </span>
                      {state === "loading" && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <Spinner className="" />
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Fine print */}
                  <p className="text-xs leading-relaxed">
                    By subscribing you agree to receive marketing emails from
                    <span className="uppercase text-white">{WEBSITE_NAME}</span>. We respect your privacy and will never share your
                    data.
                  </p>
                </form>
              )}

              {/* Social proof */}
              <div className="mt-10 pt-8 border-t border-stone-800 flex items-center gap-6">
                {[
                  { value: "50K+", label: "Subscribers" },
                  { value: "Weekly", label: "Frequency" },
                  { value: "0", label: "Spam, ever" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-0.5">
                    <span
                      className="text-lg font-light text-white"
                    >
                      {stat.value}
                    </span>
                    <span className="text-[9px] tracking-[0.35em] uppercase text-stone-400">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
