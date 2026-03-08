import { auth } from "@/auth";
import {
  getProductReviews,
  getProductRatingSummary,
} from "@/server/actions/review.actions";
import RatingSummary from "./RatingSummary";
import ReviewList from "./ReviewList";
import ReviewFormWrapper from "./ReviewFormWrapper";

interface ProductReviewsProps {
  productId: string;
  productSlug: string;
}

export default async function ProductReviews({
  productId,
  productSlug,
}: ProductReviewsProps) {
  const session = await auth();

  const [reviews, summary] = await Promise.all([
    getProductReviews(productId),
    getProductRatingSummary(productId),
  ]);

  const userReview = reviews.find((r) => r.user.id === session?.user?.id);

  return (
    <section className="mt-24 border-t border-stone-200 pt-16">

      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <p className="text-[10px] tracking-[0.5em] uppercase text-stone-400 mb-3">
            Reviews
          </p>
          <h2
            className="text-3xl font-light text-stone-900"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Customer reviews
          </h2>
        </div>

        {summary.total > 0 && (
          <RatingSummary
            average={summary.average}
            total={summary.total}
            breakdown={summary.breakdown}
          />
        )}
      </div>

      {/* Write a review */}
      <ReviewFormWrapper
        productId={productId}
        productSlug={productSlug}
        isSignedIn={!!session?.user}
        userReview={userReview ?? null}
      />

      {/* Review list */}
      <div className="mt-12">
        <ReviewList
          reviews={reviews}
          productSlug={productSlug}
          currentUserId={session?.user?.id}
        />
      </div>
    </section>
  );
}