"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import type { CartItem } from "@/store/cart.store";
import { createOrderNotification } from "./admin.actions";
import { sendOrderNotificationEmail } from "@/lib/send-email";

interface PlaceOrderInput {
  items: CartItem[];
  total: number;
  coupon: string | null;
  shippingAddress: {
    name: string;
    email: string;
    address: string;
    city: string;
    postcode: string;
    country: string;
  };
}

export async function placeOrder(input: PlaceOrderInput) {
  const session = await auth();

  let userId: string;

  if (session?.user?.id) {
    userId = session.user.id;
  } else {
    let user = await db.user.findUnique({
      where: { email: input.shippingAddress.email },
    });

    if (!user) {
      user = await db.user.create({
        data: {
          email: input.shippingAddress.email,
          name: input.shippingAddress.name,
        },
      });
    }

    userId = user.id;
  }

  const order = await db.order.create({
    data: {
      userId,
      total: input.total,
      status: "PENDING",
      items: {
        create: input.items.map((item) => ({
          productId: item.productId,
          variantId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
  });

  // ── Notifications (inside placeOrder) ──────────────────
  const orderUser = await db.user.findUnique({
    where: { id: userId },
    select: { name: true, email: true },
  });

  await createOrderNotification({
    id: order.id,
    total: input.total,
    user: orderUser ?? undefined,
  });

  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail) {
    await sendOrderNotificationEmail({
      to: adminEmail,
      orderId: order.id,
      customerName: orderUser?.name ?? orderUser?.email ?? "Guest",
      total: input.total,
      itemCount: input.items.length,
    });
  }
  // ───────────────────────────────────────────────────────

  return order;
}

export async function getUserOrders() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return db.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: { orderBy: { order: "asc" }, take: 1 },
            },
          },
        },
      },
    },
  });
}

export async function getOrderById(orderId: string) {
  const session = await auth();
  if (!session?.user?.id) return null;

  return db.order.findFirst({
    where: { id: orderId, userId: session.user.id },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: { orderBy: { order: "asc" }, take: 1 },
              category: true,
            },
          },
        },
      },
    },
  });
}