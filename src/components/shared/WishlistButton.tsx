"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleWishlist } from "@/server/actions/wishlist.actions";
import { showToast } from "@/lib/toast";

interface WishlistButtonProps {
  productId: string;
  productSlug: string;
  initialWishlisted: boolean;
  isSignedIn: boolean;
  variant?: "full" | "icon"; // full = button with text, icon = just heart
}

export default function WishlistButton({
  productId,
  productSlug,
  initialWishlisted,
  isSignedIn,
  variant = "full",
}: WishlistButtonProps) {
  const [wishlisted, setWishlisted] = useState(initialWishlisted);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleClick() {
    if (!isSignedIn) {
      showToast.error("Sign in to save items to your wishlist.");
      router.push("/login");
      return;
    }

    startTransition(async () => {
      try {
        const result = await toggleWishlist(productId, productSlug);
        setWishlisted(result.wishlisted);
        if (result.wishlisted) {
          showToast.addedToCart("Saved to wishlist", undefined, undefined);
        } else {
          showToast.removedFromCart("Removed from wishlist");
        }
      } catch (err: any) {
        showToast.error(err.message);
      }
    });
  }

  if (variant === "icon") {
    return (
      <button
        onClick={handleClick}
        disabled={isPending}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        className="group relative w-9 h-9 flex items-center justify-center bg-white/90 backdrop-blur-sm hover:bg-white transition-colors disabled:opacity-50"
      >
        <HeartIcon filled={wishlisted} pending={isPending} />
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`flex items-center justify-center gap-2 py-3 border text-xs tracking-[0.3em] uppercase transition-all disabled:opacity-50 ${
        wishlisted
          ? "border-stone-900 text-stone-900 bg-stone-50"
          : "border-stone-300 text-stone-500 hover:border-stone-900 hover:text-stone-900"
      }`}
    >
      <HeartIcon filled={wishlisted} pending={isPending} />
      {isPending
        ? "Saving..."
        : wishlisted
        ? "Saved to wishlist"
        : "Save to wishlist"}
    </button>
  );
}

function HeartIcon({
  filled,
  pending,
}: {
  filled: boolean;
  pending: boolean;
}) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      className={`transition-all duration-300 ${
        pending ? "animate-pulse" : filled ? "scale-110 text-red-500" : ""
      }`}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}