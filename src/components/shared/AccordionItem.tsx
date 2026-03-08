"use client";

import { useState } from "react";

export default function AccordionItem({
  label,
  content,
}: {
  label: string;
  content: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-stone-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-xs tracking-[0.35em] uppercase text-stone-600">
          {label}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`transition-transform duration-300 text-stone-400 ${open ? "rotate-45" : ""}`}
        >
          <path
            d="M6 1v10M1 6h10"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-40 pb-4" : "max-h-0"
        }`}
      >
        <p className="text-sm text-stone-500 leading-relaxed">{content}</p>
      </div>
    </div>
  );
}