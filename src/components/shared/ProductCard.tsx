"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import WishlistButton from "./WishlistButton";
import { formatPrice } from "@/lib/currencies";
import { useCurrencyStore } from "@/store/currency.store";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAt?: number | null;
  images: { url: string; alt: string | null }[];
  category: { name: string };
  variants: { color: string | null; colorHex: string | null }[];
}

export default function ProductCard({
  id,
  name,
  slug,
  price,
  compareAt,
  images,
  category,
  variants,
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  const primaryImage = images[0]?.url ?? "/images/placeholder.jpg";
  const secondaryImage = images[1]?.url ?? primaryImage;

  // Unique colors only
  const uniqueColors = variants.reduce(
    (acc, v) => {
      if (v.color && !acc.find((c) => c.color === v.color)) {
        acc.push({ color: v.color, colorHex: v.colorHex });
      }
      return acc;
    },
    [] as { color: string | null; colorHex: string | null }[],
  );

  const isOnSale = compareAt && compareAt > price;
  const discount = isOnSale
    ? Math.round(((compareAt - price) / compareAt) * 100)
    : null;

  const { currency } = useCurrencyStore();

  return (
    <Link
      href={`/products/${slug}`}
      className="group flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div className="relative aspect-3/4 overflow-hidden bg-stone-100 mb-4">
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <WishlistButton
            productId={id}
            productSlug={slug}
            initialWishlisted={false} // fetched per-card would be expensive — use optimistic
            isSignedIn={false} // passed from parent or use a context
            variant="icon"
          />
        </div>

        {/* Primary image */}
        <Image
          src={primaryImage}
          alt={name}
          fill
          className={`object-cover transition-all duration-700 ${
            hovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
          }`}
        />

        {/* Secondary image (hover) */}
        <Image
          src={secondaryImage}
          alt={`${name} alternate`}
          fill
          className={`object-cover transition-all duration-700 ${
            hovered ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        />

        {/* Sale badge */}
        {discount && (
          <div className="absolute top-3 left-3 bg-stone-900 text-stone-50 px-2 py-1 text-[9px] tracking-[0.25em] uppercase">
            −{discount}%
          </div>
        )}

        {/* Quick add — appears on hover */}
        <div
          className={`absolute bottom-0 inset-x-0 bg-stone-900/90 backdrop-blur-sm py-3 text-center transition-all duration-300 ${
            hovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          <span className="text-xs tracking-[0.35em] uppercase text-stone-50">
            Quick View
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2">
        <p className="text-[9px] tracking-[0.35em] uppercase text-stone-400">
          {category.name}
        </p>

        <h3
          className="text-sm font-light text-stone-900 leading-snug group-hover:text-stone-600 transition-colors"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-stone-900">
            {formatPrice(price, currency)}
          </span>
          {isOnSale && (
            <span className="text-xs text-stone-400 line-through">
              {formatPrice(compareAt!, currency)}
            </span>
          )}
        </div>

        {/* Color swatches */}
        {uniqueColors.length > 0 && (
          <div className="flex items-center gap-1.5 mt-1">
            {uniqueColors.slice(0, 5).map((c) => (
              <span
                key={c.color}
                title={c.color ?? ""}
                className="w-3 h-3 rounded-full border border-stone-200 ring-offset-1 hover:ring-1 hover:ring-stone-400 transition-all"
                style={{ backgroundColor: c.colorHex ?? "#ccc" }}
              />
            ))}
            {uniqueColors.length > 5 && (
              <span className="text-[9px] text-stone-400">
                +{uniqueColors.length - 5}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
