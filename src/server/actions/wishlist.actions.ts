"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function toggleWishlist(productId: string, productSlug: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("You must be signed in.");

  const existing = await db.wishlist.findUnique({
    where: { userId_productId: { userId: session.user.id, productId } },
  });

  if (existing) {
    await db.wishlist.delete({ where: { id: existing.id } });
    revalidatePath(`/products/${productSlug}`);
    revalidatePath("/dashboard/wishlist");
    return { wishlisted: false };
  }

  await db.wishlist.create({
    data: { userId: session.user.id, productId },
  });

  revalidatePath(`/products/${productSlug}`);
  revalidatePath("/dashboard/wishlist");
  return { wishlisted: true };
}

export async function getWishlist() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return db.wishlist.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      product: {
        include: {
          images: { orderBy: { order: "asc" }, take: 2 },
          category: true,
          variants: true,
        },
      },
    },
  });
}

export async function isWishlisted(productId: string): Promise<boolean> {
  const session = await auth();
  if (!session?.user?.id) return false;

  const item = await db.wishlist.findUnique({
    where: { userId_productId: { userId: session.user.id, productId } },
  });

  return !!item;
}