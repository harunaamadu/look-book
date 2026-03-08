"use client";

import { useCartStore } from "@/store/cart.store";
import { Button } from "../ui/button";

export default function CartButton() {
  const { toggleCart, getItemCount } = useCartStore();
  const count = getItemCount();

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      onClick={toggleCart}
      className="relative flex items-center gap-1 hover:opacity-70 transition-opacity"
      aria-label="Open cart"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
      </svg>
      {count > 0 && (
        <span className="absolute top-0 right-0 w-4 h-4 bg-stone-900 text-white text-[9px] rounded-full flex items-center justify-center">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Button>
  );
}
