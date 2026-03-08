"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImage {
  url: string;
  alt: string | null;
  order: number;
}

export default function ProductGallery({
  images,
  name,
}: {
  images: ProductImage[];
  name: string;
}) {
  const [active, setActive] = useState(0);

  if (!images.length) {
    return (
      <div className="relative w-full aspect-3/4 bg-stone-100 flex items-center justify-center">
        <span className="text-stone-400 text-sm tracking-wide">No images</span>
      </div>
    );
  }

  return (
    <div className="flex gap-4 w-full">
      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="hidden md:flex flex-col gap-3 w-18 shrink-0">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative w-18 overflow-hidden border-2 transition-all duration-200 ${
                active === i
                  ? "border-stone-900"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <div
                className="relative w-full"
                style={{ paddingBottom: "133.33%" }}
              >
                <Image
                  src={img.url}
                  alt={img.alt ?? name}
                  fill
                  sizes="72px"
                  className="object-cover"
                />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="relative flex-1 w-full aspect-3/4 overflow-hidden bg-stone-100 group">
        <Image
          src={images[active].url}
          alt={images[active].alt ?? name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />

        {/* Prev / Next arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setActive((p) => (p - 1 + images.length) % images.length)
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-10"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M9 2L4 7l5 5"
                  stroke="#1a1a18"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() => setActive((p) => (p + 1) % images.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-10"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M5 2l5 5-5 5"
                  stroke="#1a1a18"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </>
        )}

        {/* Dot indicators (mobile) */}
        {images.length > 1 && (
          <div className="absolute bottom-4 inset-x-0 flex justify-center gap-1.5 md:hidden z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all ${
                  active === i ? "bg-stone-900 w-4" : "bg-stone-400 w-1.5"
                }`}
              />
            ))}
          </div>
        )}

        {/* Image counter */}
        <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-2 py-1 text-[9px] tracking-[0.3em] uppercase text-stone-600 z-10">
          {active + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}
