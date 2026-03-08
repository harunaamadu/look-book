import { WEBSITE_NAME } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — LOOK",
  description:
    "The story behind LOOK — fashion built on craft, intention, and quiet confidence.",
};

const values = [
  {
    number: "01",
    title: "Intentional design",
    body: "Every piece begins as a question: will this still feel right in ten years? We design for longevity — not trends.",
  },
  {
    number: "02",
    title: "Responsible sourcing",
    body: "We work only with certified mills and factories that meet our strict standards for labour, environmental impact, and material quality.",
  },
  {
    number: "03",
    title: "Radical transparency",
    body: "We publish the origin of every fabric and the name of every supplier. You deserve to know where your clothes come from.",
  },
  {
    number: "04",
    title: "Considered quantity",
    body: "We produce in small runs. When a style sells out, it rarely returns. This is fashion that means something.",
  },
];

const milestones = [
  {
    year: "2018",
    event:
      "LOOK founded in a Shoreditch studio apartment by two former fashion editors.",
  },
  {
    year: "2019",
    event: "First collection — 12 pieces, sold out in 48 hours.",
  },
  {
    year: "2020",
    event: "Launched sustainable packaging. Became carbon neutral.",
  },
  { year: "2021", event: "Opened our Savile Row studio by appointment." },
  { year: "2023", event: "Reached 100,000 customers across 40 countries." },
  {
    year: "2025",
    event:
      "Introduced our repair & care programme — extending garment life indefinitely.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fafaf8]">
      {/* Hero — editorial full bleed */}
      <div className="relative bg-stone-900 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        >
          <span
            className="text-[20vw] font-light text-white/3 leading-none"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {WEBSITE_NAME}
          </span>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-28 md:py-40">
          <p className="text-[10px] tracking-[0.5em] uppercase text-stone-500 mb-8">
            Est. 2018 — London
          </p>
          <h1 className="text-5xl md:text-7xl font-light text-white leading-[1.05] tracking-tight max-w-3xl mb-8">
            Fashion built on{" "}
            <em className="not-italic text-stone-400">quiet confidence.</em>
          </h1>
          <p className="text-base text-stone-400 max-w-lg leading-relaxed">
            LOOK was born from a simple frustration: too many clothes, not
            enough meaning. We set out to build a wardrobe worth keeping.
          </p>
        </div>
      </div>

      {/* Mission statement */}
      <div className="border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 items-start">
          <div>
            <p className="text-[10px] tracking-[0.5em] uppercase text-stone-400">
              Our mission
            </p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-light text-stone-900 leading-relaxed">
              &ldquo;To make clothes that ask something of the person wearing
              them — and reward them for it.&rdquo;
            </p>
            <div className="mt-8 h-px w-12 bg-stone-900" />
            <p className="mt-4 text-xs text-stone-400 tracking-widest uppercase">
              Clara & James, Co-founders
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col gap-24">
        {/* Values */}
        <section>
          <div className="mb-12">
            <p className="text-[10px] tracking-[0.5em] uppercase text-stone-400 mb-3">
              What we stand for
            </p>
            <h2 className="text-3xl font-light text-stone-900">Our values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-200">
            {values.map((v) => (
              <div
                key={v.number}
                className="bg-[#fafaf8] p-10 flex flex-col gap-5 group hover:bg-white transition-colors"
              >
                <span className="text-5xl font-light text-stone-200 leading-none group-hover:text-stone-300 transition-colors">
                  {v.number}
                </span>
                <div>
                  <h3 className="text-lg font-light text-stone-900 mb-3">
                    {v.title}
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed">
                    {v.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section>
          <div className="mb-12">
            <p className="text-[10px] tracking-[0.5em] uppercase text-stone-400 mb-3">
              Journey
            </p>
            <h2 className="text-3xl font-light text-stone-900">
              Our story so far
            </h2>
          </div>

          <div className="relative flex flex-col gap-0">
            {/* Vertical line */}
            <div className="absolute left-18 top-0 bottom-0 w-px bg-stone-200 hidden md:block" />

            {milestones.map((m, i) => (
              <div
                key={m.year}
                className="grid grid-cols-1 md:grid-cols-[9rem_1fr] gap-4 md:gap-12 items-start py-8 border-b border-stone-100 last:border-0"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-light text-stone-300 shrink-0">
                    {m.year}
                  </span>
                  {/* Dot on the line */}
                  <div className="hidden md:flex w-3 h-3 rounded-full border-2 border-stone-900 bg-[#fafaf8] shrink-0 relative z-10" />
                </div>
                <p className="text-sm text-stone-600 leading-relaxed md:py-1">
                  {m.event}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="bg-stone-900 p-12 md:p-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { value: "100K+", label: "Customers worldwide" },
              { value: "40+", label: "Countries shipped" },
              { value: "12", label: "Certified suppliers" },
              { value: "100%", label: "Carbon neutral" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2">
                <span className="text-4xl md:text-5xl font-light text-white leading-none">
                  {stat.value}
                </span>
                <span className="text-[10px] tracking-[0.35em] uppercase text-stone-500">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA row */}
        <section className="flex flex-col md:flex-row gap-4">
          <Link
            href="/products"
            className="flex-1 border border-stone-900 text-stone-900 py-5 text-[11px] tracking-[0.35em] uppercase text-center hover:bg-stone-900 hover:text-white transition-all"
          >
            Shop the collection
          </Link>
          <Link
            href="/contact"
            className="flex-1 bg-stone-900 text-white py-5 text-[11px] tracking-[0.35em] uppercase text-center hover:bg-stone-700 transition-colors"
          >
            Get in touch
          </Link>
        </section>
      </div>
    </main>
  );
}
