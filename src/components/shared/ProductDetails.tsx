"use client";

import { useCartStore } from "@/store/cart.store";
import { useState } from "react";
import StarRating from "./StarRating";

interface Variant {
  id: string;
  size: string | null;
  color: string | null;
  colorHex: string | null;
  stock: number;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  variants: Variant[];
  images: { url: string; alt: string | null; order: number }[];
}

interface RatingSummary {
  average: number;
  total: number;
}

export default function ProductDetails({
  product,
  summary,
}: {
  product: Product;
  summary: RatingSummary;
}) {
  const { addItem } = useCartStore();

  const uniqueColors = product.variants.reduce(
    (acc, v) => {
      if (v.color && !acc.find((c) => c.color === v.color)) {
        acc.push({ color: v.color, colorHex: v.colorHex });
      }
      return acc;
    },
    [] as { color: string | null; colorHex: string | null }[],
  );

  const uniqueSizes = [
    ...new Set(product.variants.map((v) => v.size).filter(Boolean)),
  ];

  const [selectedColor, setSelectedColor] = useState(
    uniqueColors[0]?.color ?? null,
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const hasSizes = uniqueSizes.length > 0;

  const selectedVariant = hasSizes
    ? product.variants.find(
        (v) => v.color === selectedColor && v.size === selectedSize,
      )
    : product.variants.find((v) => v.color === selectedColor);

  const outOfStock = selectedVariant ? selectedVariant.stock === 0 : false;
  const lowStock =
    selectedVariant && selectedVariant.stock > 0 && selectedVariant.stock <= 3;

  function handleAddToCart() {
    if (hasSizes && !selectedSize) return;
    if (!selectedVariant) return;

    addItem({
      id: selectedVariant.id,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url ?? "/images/placeholder.jpg",
      color: selectedColor,
      colorHex: selectedVariant.colorHex,
      size: selectedSize,
      stock: selectedVariant.stock,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="flex flex-col gap-7 mb-4">
      {/* Color selector */}
      {uniqueColors.length > 0 && (
        <div>
          <p className="text-[9px] tracking-[0.4em] uppercase text-stone-400 mb-3">
            Colour — <span className="text-stone-700">{selectedColor}</span>
          </p>
          <div className="flex gap-2.5">
            {uniqueColors.map(({ color, colorHex }) => (
              <button
                key={color}
                title={color ?? ""}
                onClick={() => {
                  setSelectedColor(color);
                  setSelectedSize(null);
                }}
                className={`w-7 h-7 rounded-full border-2 transition-all ${
                  selectedColor === color
                    ? "border-stone-900 scale-110 ring-2 ring-stone-900 ring-offset-2"
                    : "border-stone-200 hover:border-stone-500"
                }`}
                style={{ backgroundColor: colorHex ?? "#ccc" }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size selector */}
      {uniqueSizes.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[9px] tracking-[0.4em] uppercase text-stone-400">
              Size{" "}
              {selectedSize && (
                <span className="text-stone-700">— {selectedSize}</span>
              )}
            </p>
            <button className="text-[9px] tracking-[0.3em] uppercase text-stone-400 underline underline-offset-2 hover:text-stone-900 transition-colors">
              Size guide
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {uniqueSizes.map((size) => {
              const variant = product.variants.find(
                (v) => v.size === size && v.color === selectedColor,
              );
              const soldOut = !variant || variant.stock === 0;
              return (
                <button
                  key={size}
                  disabled={soldOut}
                  onClick={() => setSelectedSize(size!)}
                  className={`min-w-12 h-10 px-3 text-[10px] tracking-[0.2em] border transition-all ${
                    soldOut
                      ? "border-stone-200 text-stone-300 cursor-not-allowed line-through"
                      : selectedSize === size
                        ? "border-stone-900 bg-stone-900 text-white"
                        : "border-stone-300 text-stone-600 hover:border-stone-900"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {summary.total > 0 && (
        <div className="flex items-center gap-2">
          <StarRating rating={summary.average} size="sm" />
          <span className="text-xs text-stone-400">({summary.total})</span>
        </div>
      )}

      {/* Stock warning */}
      {lowStock && (
        <p className="text-[10px] tracking-[0.3em] uppercase text-amber-600">
          Only {selectedVariant!.stock} left
        </p>
      )}

      {/* Add to cart */}
      <button
        onClick={handleAddToCart}
        disabled={(hasSizes && !selectedSize) || outOfStock || added}
        className={`w-full py-4 text-[11px] tracking-[0.35em] uppercase transition-all duration-300 ${
          added
            ? "bg-green-800 text-white"
            : outOfStock
              ? "bg-stone-200 text-stone-400 cursor-not-allowed"
              : hasSizes && !selectedSize
                ? "bg-stone-100 text-stone-400 cursor-not-allowed"
                : "bg-stone-900 text-white hover:bg-stone-700"
        }`}
      >
        {added
          ? "✓ Added to bag"
          : outOfStock
            ? "Out of stock"
            : hasSizes && !selectedSize
              ? "Select a size"
              : "Add to bag"}
      </button>
    </div>
  );
}
