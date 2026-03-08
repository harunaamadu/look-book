"use client";

import { useState } from "react";
import Link from "next/link";

const categories = ["Tops & Dresses", "Trousers", "Outerwear"];

const sizingData = {
  "Tops & Dresses": {
    headers: ["Size", "UK", "EU", "US", "Bust (cm)", "Waist (cm)", "Hip (cm)"],
    rows: [
      ["XS", "6–8", "34–36", "2–4", "80–84", "62–66", "88–92"],
      ["S", "8–10", "36–38", "4–6", "84–88", "66–70", "92–96"],
      ["M", "10–12", "38–40", "6–8", "88–93", "70–75", "96–101"],
      ["L", "12–14", "40–42", "8–10", "93–99", "75–81", "101–107"],
      ["XL", "14–16", "42–44", "10–12", "99–105", "81–87", "107–113"],
    ],
  },
  Trousers: {
    headers: [
      "Size",
      "UK",
      "EU",
      "US",
      "Waist (cm)",
      "Hip (cm)",
      "Inseam (cm)",
    ],
    rows: [
      ["XS", "6–8", "34–36", "2–4", "62–66", "88–92", "76"],
      ["S", "8–10", "36–38", "4–6", "66–70", "92–96", "77"],
      ["M", "10–12", "38–40", "6–8", "70–75", "96–101", "78"],
      ["L", "12–14", "40–42", "8–10", "75–81", "101–107", "79"],
      ["XL", "14–16", "42–44", "10–12", "81–87", "107–113", "80"],
    ],
  },
  Outerwear: {
    headers: [
      "Size",
      "UK",
      "EU",
      "US",
      "Bust (cm)",
      "Shoulder (cm)",
      "Length (cm)",
    ],
    rows: [
      ["XS", "6–8", "34–36", "2–4", "84–88", "37–38", "88"],
      ["S", "8–10", "36–38", "4–6", "88–92", "38–39", "90"],
      ["M", "10–12", "38–40", "6–8", "92–97", "39–41", "92"],
      ["L", "12–14", "40–42", "8–10", "97–103", "41–43", "94"],
      ["XL", "14–16", "42–44", "10–12", "103–109", "43–45", "96"],
    ],
  },
};

const howToMeasure = [
  {
    label: "Bust",
    instruction:
      "Measure around the fullest part of your chest, keeping the tape parallel to the floor and your arms relaxed at your sides.",
  },
  {
    label: "Waist",
    instruction:
      "Measure around your natural waistline — the narrowest part of your torso, usually just above the belly button.",
  },
  {
    label: "Hip",
    instruction:
      "Stand with feet together and measure around the fullest part of your hips and seat, approximately 20cm below your waistline.",
  },
  {
    label: "Inseam",
    instruction:
      "Measure from the top of your inner thigh down to the ankle bone. Best measured on a well-fitting pair of trousers.",
  },
  {
    label: "Shoulder",
    instruction:
      "Measure from the edge of one shoulder across the back to the edge of the other shoulder, following the natural curve.",
  },
];

export default function SizeGuidePage() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const data = sizingData[activeCategory as keyof typeof sizingData];

  return (
    <main className="min-h-screen bg-[#fafaf8]">
      {/* Hero */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <p className="text-xs tracking-[0.5em] uppercase text-stone-400 mb-4">
            Fit & Sizing
          </p>
          <h1 className="text-5xl md:text-6xl font-light text-stone-900 leading-none tracking-tight mb-4">
            Size <em className="not-italic text-stone-400">Guide</em>
          </h1>
          <p className="text-sm text-stone-500 max-w-md leading-relaxed">
            All measurements are in centimetres. If you&apos;re between sizes,
            we recommend sizing up for a relaxed fit.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col gap-16">
        {/* Category tabs */}
        <section>
          <div className="flex gap-1 mb-8 border-b border-stone-200">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 text-xs tracking-[0.3em] uppercase transition-all border-b-2 -mb-px ${
                  activeCategory === cat
                    ? "border-stone-900 text-stone-900"
                    : "border-transparent text-stone-400 hover:text-stone-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Size table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-stone-900 text-white">
                  {data.headers.map((h) => (
                    <th
                      key={h}
                      className="px-5 py-4 text-[9px] tracking-[0.4em] uppercase font-normal text-left first:text-center"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.rows.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-stone-100 transition-colors hover:bg-stone-50 ${
                      i % 2 === 0 ? "bg-white" : "bg-[#fafaf8]"
                    }`}
                  >
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`px-5 py-4 ${
                          j === 0
                            ? "text-center font-medium text-stone-900 bg-stone-50 text-xs tracking-widest"
                            : "text-stone-600 text-xs"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-stone-400 tracking-wide">
            ✦ All measurements are body measurements, not garment measurements.
            Actual garment dimensions may vary by style.
          </p>
        </section>

        {/* How to measure */}
        <section>
          <div className="mb-8">
            <p className="text-xs tracking-[0.5em] uppercase text-stone-400 mb-3">
              Guidance
            </p>
            <h2 className="text-3xl font-light text-stone-900">
              How to measure
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-200">
            {howToMeasure.map((item) => (
              <div
                key={item.label}
                className="bg-[#fafaf8] p-7 flex flex-col gap-3"
              >
                <p className="text-[9px] tracking-[0.45em] uppercase text-stone-400">
                  {item.label}
                </p>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {item.instruction}
                </p>
              </div>
            ))}
            {/* Tips card */}
            <div className="bg-stone-900 p-7 flex flex-col gap-3">
              <p className="text-[9px] tracking-[0.45em] uppercase text-stone-500">
                Pro tip
              </p>
              <p className="text-sm text-stone-300 leading-relaxed">
                Use a soft measuring tape and wear fitted clothing or measure
                directly on skin for the most accurate results. Ask a friend to
                help if possible.
              </p>
            </div>
          </div>
        </section>

        {/* Still unsure */}
        <div className="border border-stone-200 bg-white p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-xl font-light text-stone-900 mb-1">
              Still unsure of your size?
            </p>
            <p className="text-sm text-stone-400">
              Our stylists are happy to advise on fit for any piece.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 bg-stone-900 text-white px-8 py-3 text-xs tracking-[0.35em] uppercase hover:bg-stone-700 transition-colors"
          >
            Ask a stylist
          </Link>
        </div>
      </div>
    </main>
  );
}
