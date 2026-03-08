"use server";

import { db } from "@/lib/db";

export async function validateCoupon(code: string): Promise<{
  success: boolean;
  discount: number;
  message: string;
}> {
  const coupon = await db.coupon.findUnique({
    where: { code: code.trim().toUpperCase() },
  });

  if (!coupon) {
    return { success: false, discount: 0, message: "Invalid coupon code." };
  }

  if (!coupon.isActive) {
    return { success: false, discount: 0, message: "This coupon is no longer active." };
  }

  if (coupon.expiresAt && coupon.expiresAt < new Date()) {
    return { success: false, discount: 0, message: "This coupon has expired." };
  }

  if (coupon.maxUses !== null && coupon.uses >= coupon.maxUses) {
    return { success: false, discount: 0, message: "This coupon has reached its usage limit." };
  }

  // Increment usage count
  await db.coupon.update({
    where: { code: coupon.code },
    data: { uses: { increment: 1 } },
  });

  return {
    success: true,
    discount: coupon.discount,
    message: `${coupon.discount}% discount applied.`,
  };
}