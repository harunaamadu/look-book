"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { sendOrderNotificationEmail } from "@/lib/send-email";

async function assertAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN")
    throw new Error("Unauthorised.");
  return session;
}

// ── ANALYTICS ──────────────────────────────────────────────
export async function getAnalytics() {
  const [
    totalOrders, totalUsers, totalProducts, totalRevenue,
    recentOrders, ordersByStatus, topProducts, newUsersThisMonth,
  ] = await Promise.all([
    db.order.count(),
    db.user.count(),
    db.product.count({ where: { isArchived: false } }),
    db.order.aggregate({ _sum: { total: true }, where: { status: { not: "CANCELLED" } } }),
    db.order.findMany({
      take: 5, orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, email: true } }, items: true },
    }),
    db.order.groupBy({ by: ["status"], _count: true }),
    db.orderItem.groupBy({
      by: ["productId"], _sum: { quantity: true },
      orderBy: { _sum: { quantity: "desc" } }, take: 5,
    }),
    db.user.count({
      where: { createdAt: { gte: new Date(new Date().setDate(1)) } },
    }),
  ]);

  const productIds = topProducts.map((p) => p.productId);
  const products = await db.product.findMany({
    where: { id: { in: productIds } },
    include: { images: { take: 1 } },
  });

  return {
    totalOrders, totalUsers, totalProducts,
    totalRevenue: totalRevenue._sum.total ?? 0,
    recentOrders, ordersByStatus, newUsersThisMonth,
    topProducts: topProducts.map((tp) => ({
      ...tp,
      product: products.find((p) => p.id === tp.productId),
    })),
  };
}

// ── ORDERS ─────────────────────────────────────────────────
export async function getAllOrders(page = 1, status?: string) {
  await assertAdmin();
  const where = status ? { status: status as any } : {};
  const [orders, total] = await Promise.all([
    db.order.findMany({
      where, skip: (page - 1) * 20, take: 20,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true } },
        items: { include: { product: { include: { images: { take: 1 } } } } },
      },
    }),
    db.order.count({ where }),
  ]);
  return { orders, total, pages: Math.ceil(total / 20) };
}

export async function updateOrderStatus(orderId: string, status: string) {
  await assertAdmin();
  const order = await db.order.update({
    where: { id: orderId }, data: { status: status as any },
    include: { user: { select: { email: true, name: true } } },
  });
  revalidatePath("/admin/orders");
  return order;
}

// ── PRODUCTS ───────────────────────────────────────────────
export async function adminGetProducts(page = 1, search?: string) {
  await assertAdmin();
  const where = search
    ? { name: { contains: search }, isArchived: false }
    : {};
  const [products, total] = await Promise.all([
    db.product.findMany({
      where, skip: (page - 1) * 20, take: 20,
      orderBy: { createdAt: "desc" },
      include: { category: true, images: { take: 1 }, variants: true },
    }),
    db.product.count({ where }),
  ]);
  return { products, total, pages: Math.ceil(total / 20) };
}

export async function createProduct(data: {
  name: string; slug: string; description: string;
  price: number; compareAt?: number; categoryId: string;
  isFeatured: boolean;
}) {
  await assertAdmin();
  const product = await db.product.create({ data });
  revalidatePath("/admin/products");
  revalidatePath("/products");
  return product;
}

export async function updateProduct(id: string, data: Partial<{
  name: string; slug: string; description: string;
  price: number; compareAt: number | null;
  categoryId: string; isFeatured: boolean; isArchived: boolean;
}>) {
  await assertAdmin();
  const product = await db.product.update({ where: { id }, data });
  revalidatePath("/admin/products");
  revalidatePath("/products");
  return product;
}

export async function deleteProduct(id: string) {
  await assertAdmin();
  await db.product.update({ where: { id }, data: { isArchived: true } });
  revalidatePath("/admin/products");
  revalidatePath("/products");
}

// ── CATEGORIES ─────────────────────────────────────────────
export async function adminGetCategories() {
  await assertAdmin();
  return db.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  });
}

export async function createCategory(data: {
  name: string; slug: string; description?: string; imageUrl?: string;
}) {
  await assertAdmin();
  const cat = await db.category.create({ data });
  revalidatePath("/admin/categories");
  revalidatePath("/collections");
  return cat;
}

export async function updateCategory(id: string, data: Partial<{
  name: string; slug: string; description: string; imageUrl: string;
}>) {
  await assertAdmin();
  const cat = await db.category.update({ where: { id }, data });
  revalidatePath("/admin/categories");
  return cat;
}

export async function deleteCategory(id: string) {
  await assertAdmin();
  await db.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
}

// ── USERS ──────────────────────────────────────────────────
export async function adminGetUsers(page = 1, search?: string) {
  await assertAdmin();
  const where = search
    ? { OR: [{ name: { contains: search } }, { email: { contains: search } }] }
    : {};
  const [users, total] = await Promise.all([
    db.user.findMany({
      where, skip: (page - 1) * 20, take: 20,
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { orders: true, reviews: true } } },
    }),
    db.user.count({ where }),
  ]);
  return { users, total, pages: Math.ceil(total / 20) };
}

export async function updateUserRole(userId: string, role: "CUSTOMER" | "ADMIN") {
  await assertAdmin();
  await db.user.update({ where: { id: userId }, data: { role } });
  revalidatePath("/admin/users");
}

export async function deleteUser(userId: string) {
  await assertAdmin();
  await db.user.delete({ where: { id: userId } });
  revalidatePath("/admin/users");
}

// ── COUPONS ────────────────────────────────────────────────
export async function adminGetCoupons() {
  await assertAdmin();
  return db.coupon.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createCoupon(data: {
  code: string; discount: number; maxUses?: number; expiresAt?: Date;
}) {
  await assertAdmin();
  const coupon = await db.coupon.create({ data });
  revalidatePath("/admin/coupons");
  return coupon;
}

export async function updateCoupon(id: string, data: Partial<{
  isActive: boolean; maxUses: number; expiresAt: Date;
}>) {
  await assertAdmin();
  await db.coupon.update({ where: { id }, data });
  revalidatePath("/admin/coupons");
}

export async function deleteCoupon(id: string) {
  await assertAdmin();
  await db.coupon.delete({ where: { id } });
  revalidatePath("/admin/coupons");
}

// ── REVIEWS ────────────────────────────────────────────────
export async function adminGetReviews(page = 1) {
  await assertAdmin();
  const [reviews, total] = await Promise.all([
    db.review.findMany({
      skip: (page - 1) * 20, take: 20,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true } },
        product: { select: { name: true, slug: true } },
      },
    }),
    db.review.count(),
  ]);
  return { reviews, total, pages: Math.ceil(total / 20) };
}

export async function adminDeleteReview(id: string) {
  await assertAdmin();
  const review = await db.review.delete({
    where: { id },
    include: { product: { select: { slug: true } } },
  });
  revalidatePath(`/products/${review.product.slug}`);
  revalidatePath("/admin/reviews");
}

// ── NOTIFICATIONS ──────────────────────────────────────────
export async function getAdminNotifications() {
  return db.notification.findMany({
    orderBy: { createdAt: "desc" }, take: 20,
  });
}

export async function markNotificationRead(id: string) {
  await db.notification.update({ where: { id }, data: { read: true } });
  revalidatePath("/admin");
}

export async function markAllNotificationsRead() {
  await db.notification.updateMany({ where: { read: false }, data: { read: true } });
  revalidatePath("/admin");
}

export async function createOrderNotification(order: {
  id: string; total: number; user?: { name?: string | null; email?: string | null };
}) {
  await db.notification.create({
    data: {
      type: "NEW_ORDER",
      title: "New order received",
      body: `${order.user?.name ?? order.user?.email ?? "A customer"} placed an order for $${order.total.toFixed(2)}`,
      link: `/admin/orders/${order.id}`,
    },
  });
}