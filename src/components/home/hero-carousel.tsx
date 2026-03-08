"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";

interface HeroSlide {
  id: string;
  src: string;
  label: string;
  order: number;
  isActive: boolean;
}

export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });
  const isPaused = useRef(false);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
      setActiveIndex(index);
    },
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setActiveIndex(emblaApi.selectedScrollSnap()));
    emblaApi.on("pointerDown", () => {
      isPaused.current = true;
    });
    emblaApi.on("pointerUp", () => {
      isPaused.current = false;
    });
  }, [emblaApi]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused.current && emblaApi) emblaApi.scrollNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [emblaApi]);

  if (!slides.length) return null;

  return (
    <section
      className="relative w-full min-h-[90vh] overflow-hidden bg-linear-to-l from-primary/2 via-primary/5 to-primary/2 border-b"
      onMouseEnter={() => {
        isPaused.current = true;
      }}
      onMouseLeave={() => {
        isPaused.current = false;
      }}
    >
      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 min-h-screen md:h-[92vh] flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_2fr_250px] gap-4 lg:gap-12 items-center">
          {/* ── LEFT ── */}
          <div className="flex flex-col justify-between h-fit py-6 lg:py-20">
            <div>
              <p className="hidden md:block text-[10px] tracking-[0.5em] uppercase text-stone-400 mb-10">
                Spring / Summer 2025
              </p>
              <h1 className="font-bold text-[14vw] lg:text-[4.5rem] leading-tight lg:leading-16 tracking-tight text-stone-900">
                Effort <span className="text-primary/40">less</span> elegance.
              </h1>
            </div>

            <div className="flex flex-col gap-6 mt-4 lg:mt-8">
              <p className="text-sm text-stone-500 leading-relaxed max-w-sm">
                Curated pieces for the modern wardrobe. Timeless silhouettes,
                refined details.
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-3 bg-stone-900 text-stone-50 px-7 py-3.5 text-[11px] tracking-[0.25em] uppercase transition-all hover:bg-stone-700 w-fit"
                >
                  Shop Collection
                  <svg
                    className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M1 7h12M8 2l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <Link
                  href="/products?category=new"
                  className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-stone-500 hover:text-stone-900 transition-colors w-fit"
                >
                  <span className="w-4 h-px bg-stone-400" />
                  New Arrivals
                </Link>
              </div>
            </div>

            {/* Slide counter */}
            <div className="hidden lg:flex items-center gap-3 mt-auto pt-10">
              <span
                className="text-2xl font-light text-primary"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 h-px bg-stone-200 max-w-15 relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-primary transition-all duration-500"
                  style={{
                    width: `${((activeIndex + 1) / slides.length) * 100}%`,
                  }}
                />
              </div>
              <span className="text-xs text-stone-400">
                {String(slides.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* ── CENTER ── */}
          <div className="relative h-[40svh] lg:h-[80vh] overflow-hidden">
            <div ref={emblaRef} className="h-full w-full overflow-hidden">
              <div className="flex h-full">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className="flex-[0_0_100%] min-w-0 relative h-full px-2"
                  >
                    <div
                      className={`relative w-full h-full transition-all duration-700 ${activeIndex === index ? "opacity-100 scale-100" : "opacity-40 scale-95"}`}
                    >
                      <Image
                        src={slide.src}
                        alt={slide.label}
                        width={400}
                        height={500}
                        className="object-contain h-full"
                        priority={index === 0}
                      />
                    </div>
                    <div className="absolute inset-0 bg-linear-to-t from-stone-900/20 via-transparent to-transparent" />
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-6 left-6 z-10">
              <p className="text-sm tracking-[0.4em] uppercase text-white/90">
                {slides[activeIndex].label}
              </p>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="hidden lg:flex flex-col justify-center gap-0 h-full py-20">
            <p className="text-[9px] tracking-[0.4em] uppercase text-stone-400 mb-6">
              Collection
            </p>

            <div className="flex flex-col gap-3">
              {slides.map((slide, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={slide.id}
                    onClick={() => scrollTo(index)}
                    className="group relative flex items-center gap-4 text-left"
                  >
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-300 ${isActive ? "bg-stone-900" : "bg-transparent group-hover:bg-stone-300"}`}
                    />
                    <div
                      className={`relative ml-4 overflow-hidden transition-all duration-500 ${isActive ? "w-18 h-24 opacity-100" : "w-14 h-19 opacity-50 group-hover:opacity-75 group-hover:w-16 group-hover:h-21.5"}`}
                    >
                      <Image
                        src={slide.src}
                        alt={slide.label}
                        fill
                        className="object-cover"
                      />
                      {!isActive && (
                        <div className="absolute inset-0 bg-stone-100/30" />
                      )}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span
                        className={`text-[9px] tracking-[0.35em] uppercase transition-colors duration-300 ${isActive ? "text-stone-900" : "text-stone-400 group-hover:text-stone-600"}`}
                      >
                        {slide.label}
                      </span>
                      <span
                        className={`font-serif text-xl font-light leading-none transition-colors duration-300 ${isActive ? "text-stone-900" : "text-stone-300"}`}
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-auto pt-10 border-t border-stone-200">
              <Link
                href="/products"
                className="text-[9px] tracking-[0.4em] uppercase text-stone-400 hover:text-stone-900 transition-colors flex items-center gap-2"
              >
                View all
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path
                    d="M1 4h10M7.5 1 11 4l-3.5 3"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
