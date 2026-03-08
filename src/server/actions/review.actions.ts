"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function submitReview(data: {
  productId: string;
  productSlug: string;
  rating: number;
  title?: string;
  body: string;
}) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("You must be signed in to leave a review.");

  if (data.rating < 1 || data.rating > 5) throw new Error("Rating must be between 1 and 5.");
  if (!data.body.trim()) throw new Error("Review body cannot be empty.");

  await db.review.upsert({
    where: { productId_userId: { productId: data.productId, userId: session.user.id } },
    update: { rating: data.rating, title: data.title, body: data.body },
    create: {
      productId: data.productId,
      userId: session.user.id,
      rating: data.rating,
      title: data.title,
      body: data.body,
    },
  });

  revalidatePath(`/products/${data.productSlug}`);
}

export async function deleteReview(reviewId: string, productSlug: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorised.");

  const review = await db.review.findUnique({ where: { id: reviewId } });
  if (!review) throw new Error("Review not found.");
  if (review.userId !== session.user.id) throw new Error("You can only delete your own reviews.");

  await db.review.delete({ where: { id: reviewId } });
  revalidatePath(`/products/${productSlug}`);
}

export async function getProductReviews(productId: string) {
  return db.review.findMany({
    where: { productId },
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { id: true, name: true, image: true } },
    },
  });
}

export async function getProductRatingSummary(productId: string) {
  const reviews = await db.review.findMany({
    where: { productId },
    select: { rating: true },
  });

  if (!reviews.length) return { average: 0, total: 0, breakdown: {} };

  const total = reviews.length;
  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / total;

  const breakdown = reviews.reduce(
    (acc, r) => {
      acc[r.rating] = (acc[r.rating] ?? 0) + 1;
      return acc;
    },
    {} as Record<number, number>
  );

  return { average, total, breakdown };
}