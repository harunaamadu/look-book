"use client";

import { useState } from "react";
import Image from "next/image";
import { deleteReview } from "@/server/actions/review.actions";
import { showToast } from "@/lib/toast";
import StarRating from "./StarRating";
import ReviewForm from "./ReviewForm";

interface Review {
  id: string;
  rating: number;
  title: string | null;
  body: string;
  createdAt: Date;
  user: { id: string; name: string | null; image: string | null };
}

interface ReviewListProps {
  reviews: Review[];
  productSlug: string;
  currentUserId?: string;
}

export default function ReviewList({
  reviews,
  productSlug,
  currentUserId,
}: ReviewListProps) {
  const [editing, setEditing] = useState<string | null>(null);

  if (reviews.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-stone-400 text-sm">No reviews yet — be the first.</p>
      </div>
    );
  }

  async function handleDelete(reviewId: string) {
    try {
      await deleteReview(reviewId, productSlug);
      showToast.removedFromCart("Review deleted");
    } catch (err: any) {
      showToast.error(err.message);
    }
  }

  return (
    <div className="flex flex-col divide-y divide-stone-100">
      {reviews.map((review) => {
        const isOwner = currentUserId === review.user.id;
        const isEditing = editing === review.id;

        return (
          <div key={review.id} className="py-8 flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-stone-200 overflow-hidden shrink-0 flex items-center justify-center">
                  {review.user.image ? (
                    <Image
                      src={review.user.image}
                      alt={review.user.name ?? ""}
                      width={36}
                      height={36}
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-xs text-stone-500 font-medium">
                      {review.user.name?.[0]?.toUpperCase() ?? "?"}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-sm text-stone-900">
                    {review.user.name ?? "Anonymous"}
                  </p>
                  <p className="text-[10px] text-stone-400 tracking-wide">
                    {new Date(review.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <StarRating rating={review.rating} size="sm" />
                {isOwner && !isEditing && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setEditing(review.id)}
                      className="text-[9px] tracking-[0.3em] uppercase text-stone-400 hover:text-stone-900 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="text-[9px] tracking-[0.3em] uppercase text-stone-400 hover:text-red-500 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Content or edit form */}
            {isEditing ? (
              <div className="mt-2">
                <ReviewForm
                  productId={""}
                  productSlug={productSlug}
                  existingReview={{
                    rating: review.rating,
                    title: review.title,
                    body: review.body,
                  }}
                  onClose={() => setEditing(null)}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-2 ml-12">
                {review.title && (
                  <p
                    className="text-sm font-medium text-stone-900"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {review.title}
                  </p>
                )}
                <p className="text-sm text-stone-500 leading-relaxed">
                  {review.body}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}