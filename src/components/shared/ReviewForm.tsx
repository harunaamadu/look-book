"use client";

import { useState } from "react";
import { submitReview } from "@/server/actions/review.actions";
// import StarRating from "./StarRating";
import { showToast } from "@/lib/toast";

interface ReviewFormProps {
  productId: string;
  productSlug: string;
  existingReview?: {
    rating: number;
    title?: string | null;
    body: string;
  } | null;
  onClose?: () => void;
}

export default function ReviewForm({
  productId,
  productSlug,
  existingReview,
  onClose,
}: ReviewFormProps) {
  const [rating, setRating] = useState(existingReview?.rating ?? 0);
  const [title, setTitle] = useState(existingReview?.title ?? "");
  const [body, setBody] = useState(existingReview?.body ?? "");
  const [loading, setLoading] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const ratingLabels: Record<number, string> = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very good",
    5: "Excellent",
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rating) return showToast.error("Please select a rating.");
    if (!body.trim()) return showToast.error("Please write a review.");

    setLoading(true);
    try {
      await submitReview({ productId, productSlug, rating, title, body });
      showToast.subscribed("review submitted");
      onClose?.();
    } catch (err: any) {
      showToast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

      {/* Star picker */}
      <div className="flex flex-col gap-2">
        <p className="text-[9px] tracking-[0.4em] uppercase text-stone-400">
          Your rating
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-transform hover:scale-110"
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    fill={(hoverRating || rating) >= star ? "#1a1a18" : "none"}
                    stroke={(hoverRating || rating) >= star ? "#1a1a18" : "#d6d3d1"}
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ))}
          </div>
          {(hoverRating || rating) > 0 && (
            <span className="text-xs text-stone-500 tracking-wide">
              {ratingLabels[hoverRating || rating]}
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[9px] tracking-[0.4em] uppercase text-stone-400">
          Title <span className="text-stone-300">(optional)</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Summarise your experience"
          maxLength={100}
          className="border border-stone-200 bg-transparent px-4 py-3 text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-900 transition-colors"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[9px] tracking-[0.4em] uppercase text-stone-400">
          Review
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Tell others about your experience with this product..."
          required
          rows={4}
          maxLength={1000}
          className="border border-stone-200 bg-transparent px-4 py-3 text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-900 transition-colors resize-none"
        />
        <p className="text-[10px] text-stone-300 text-right">
          {body.length}/1000
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading || !rating}
          className="flex-1 bg-stone-900 text-white py-3 text-[11px] tracking-[0.35em] uppercase hover:bg-stone-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Submitting..." : existingReview ? "Update review" : "Submit review"}
        </button>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-6 border border-stone-200 text-stone-500 text-[11px] tracking-[0.3em] uppercase hover:border-stone-900 hover:text-stone-900 transition-all"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}