"use client";

import { useState } from "react";
import Link from "next/link";
import StarRating from "./StarRating";
import ReviewForm from "./ReviewForm";

interface Props {
  productId: string;
  productSlug: string;
  isSignedIn: boolean;
  userReview: {
    id: string;
    rating: number;
    title: string | null;
    body: string;
  } | null;
}

export default function ReviewFormWrapper({
  productId,
  productSlug,
  isSignedIn,
  userReview,
}: Props) {
  const [open, setOpen] = useState(false);

  if (!isSignedIn) {
    return (
      <div className="flex items-center gap-4 p-6 border border-stone-200 bg-white">
        <div className="flex-1">
          <p className="text-sm text-stone-600 mb-1">
            Share your thoughts on this piece.
          </p>
          <p className="text-xs text-stone-400">
            You must be signed in to leave a review.
          </p>
        </div>
        <Link
          href="/login"
          className="shrink-0 bg-stone-900 text-white px-6 py-3 text-xs tracking-[0.35em] uppercase hover:bg-stone-700 transition-colors"
        >
          Sign in
        </Link>
      </div>
    );
  }

  if (userReview && !open) {
    return (
      <div className="flex items-start justify-between gap-4 p-6 border border-stone-200 bg-white">
        <div className="flex flex-col gap-2">
          <p className="text-[9px] tracking-[0.4em] uppercase text-stone-400">
            Your review
          </p>
          <StarRating rating={userReview.rating} size="sm" />
          {userReview.title && (
            <p className="text-sm text-stone-900">{userReview.title}</p>
          )}
          <p className="text-sm text-stone-500">{userReview.body}</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="shrink-0 text-xs tracking-[0.3em] uppercase text-stone-400 hover:text-stone-900 transition-colors border border-stone-200 px-4 py-2 hover:border-stone-900"
        >
          Edit
        </button>
      </div>
    );
  }

  return (
    <div className="border border-stone-200 bg-white p-7">
      <div className="flex items-center justify-between mb-6">
        <p
          className="text-lg font-light text-stone-900"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {userReview ? "Edit your review" : "Write a review"}
        </p>
        {open && userReview && (
          <button
            onClick={() => setOpen(false)}
            className="text-xs tracking-[0.3em] uppercase text-stone-400 hover:text-stone-900 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
      <ReviewForm
        productId={productId}
        productSlug={productSlug}
        existingReview={userReview}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}