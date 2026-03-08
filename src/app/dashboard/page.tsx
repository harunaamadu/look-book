import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserOrders } from "@/server/actions/order.actions";
import { getWishlist } from "@/server/actions/wishlist.actions";
import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { statusConfig } from "@/lib/order-status";
import { formatPrice } from "@/lib/currencies";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard — LOOK" };

const quickLinks = [
  {
    label: "Orders",
    href: "/dashboard/orders",
    description: "Track & manage your purchases",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
      </svg>
    ),
  },
  {
    label: "Wishlist",
    href: "/dashboard/wishlist",
    description: "Your saved pieces",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "/settings",
    description: "Preferences & account",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
      </svg>
    ),
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Get help from our team",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
];

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { user } = session;
  const isAdmin = user.role === "ADMIN";

  const [orders, wishlist, reviewCount] = await Promise.all([
    getUserOrders(),
    getWishlist(),
    db.review.count({ where: { userId: user.id! } }),
  ]);

  const recentOrders = orders.slice(0, 3);
  const wishlistPreview = wishlist.slice(0, 4);
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === "PENDING" || o.status === "CONFIRMED" || o.status === "SHIPPED").length;

  const stats = [
    { label: "Total orders",   value: String(orders.length) },
    { label: "Total spent",    value: formatPrice(totalSpent, "USD") },
    { label: "In progress",    value: String(pendingOrders) },
    { label: "Reviews left",   value: String(reviewCount) },
  ];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const firstName = user.name?.split(" ")[0] ?? "there";

  return (
    <main className="min-h-screen bg-[#fafaf8]">

      {/* Hero header */}
      <div className="bg-stone-900 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute right-0 top-1/2 -translate-y-1/2 text-[18vw] font-light text-white/3 leading-none select-none pointer-events-none"
          style={{ fontFamily: "Georgia, serif" }}
        >
          LOOK
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-[10px] tracking-[0.5em] uppercase text-stone-500 mb-3">
                {greeting}
              </p>
              <h1
                className="text-4xl md:text-5xl font-light text-white leading-none tracking-tight"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {firstName}
                {isAdmin && (
                  <span className="ml-4 text-sm tracking-[0.3em] uppercase text-stone-400 align-middle">
                    Admin
                  </span>
                )}
              </h1>
              <p className="text-sm text-stone-500 mt-3">{user.email}</p>
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-stone-700 shrink-0 flex items-center justify-center border-2 border-stone-700">
                {user.image ? (
                  <Image src={user.image} alt={user.name ?? ""} width={56} height={56} className="object-cover" />
                ) : (
                  <span className="text-xl font-light text-stone-300" style={{ fontFamily: "Georgia, serif" }}>
                    {firstName[0]?.toUpperCase()}
                  </span>
                )}
              </div>
              <div className="hidden md:flex flex-col gap-1">
                <Link
                  href="/settings"
                  className="text-[10px] tracking-[0.3em] uppercase text-stone-400 hover:text-white transition-colors"
                >
                  Edit profile →
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="text-[10px] tracking-[0.3em] uppercase text-amber-500 hover:text-amber-300 transition-colors"
                  >
                    Admin panel →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-stone-100">
            {stats.map((stat) => (
              <div key={stat.label} className="px-6 py-6 flex flex-col gap-1">
                <span
                  className="text-2xl font-light text-stone-900"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {stat.value}
                </span>
                <span className="text-[10px] tracking-[0.35em] uppercase text-stone-400">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-10">

        {/* Quick links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="group bg-white border border-stone-200 p-5 flex flex-col gap-4 hover:border-stone-900 hover:shadow-sm transition-all duration-200"
            >
              <div className="w-10 h-10 bg-stone-100 flex items-center justify-center text-stone-500 group-hover:bg-stone-900 group-hover:text-white transition-all duration-200">
                {link.icon}
              </div>
              <div>
                <p className="text-sm text-stone-900 mb-0.5">{link.label}</p>
                <p className="text-[10px] text-stone-400 leading-relaxed">
                  {link.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">

          {/* Recent orders */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2
                className="text-xl font-light text-stone-900"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Recent orders
              </h2>
              <Link
                href="/dashboard/orders"
                className="text-[10px] tracking-[0.35em] uppercase text-stone-400 hover:text-stone-900 transition-colors flex items-center gap-1.5 group"
              >
                View all
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="group-hover:translate-x-0.5 transition-transform">
                  <path d="M1 4h10M7.5 1 11 4l-3.5 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

            {recentOrders.length === 0 ? (
              <div className="bg-white border border-stone-200 p-10 flex flex-col items-center gap-4 text-center">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-stone-600 mb-1" style={{ fontFamily: "Georgia, serif" }}>
                    No orders yet
                  </p>
                  <p className="text-xs text-stone-400">Your orders will appear here.</p>
                </div>
                <Link
                  href="/products"
                  className="text-[10px] tracking-[0.35em] uppercase text-stone-500 underline underline-offset-4 hover:text-stone-900 transition-colors"
                >
                  Start shopping
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {recentOrders.map((order) => {
                  const config = statusConfig[order.status] ?? statusConfig.PENDING;
                  return (
                    <Link
                      key={order.id}
                      href={`/dashboard/orders/${order.id}`}
                      className="group bg-white border border-stone-200 hover:border-stone-400 transition-all duration-200 p-5 flex items-center gap-5"
                    >
                      {/* Image stack */}
                      <div className="flex -space-x-2 shrink-0">
                        {order.items.slice(0, 2).map((item, i) => (
                          <div
                            key={item.id}
                            className="relative w-12 h-16 overflow-hidden bg-stone-100 border-2 border-white"
                            style={{ zIndex: 2 - i }}
                          >
                            {item.product.images[0]?.url ? (
                              <Image
                                src={item.product.images[0].url}
                                alt={item.product.name}
                                fill sizes="48px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-stone-200" />
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400">
                            #{order.id.slice(-8).toUpperCase()}
                          </p>
                          <span className={`flex items-center gap-1 text-[9px] tracking-[0.25em] uppercase ${config.color}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                            {config.label}
                          </span>
                        </div>
                        <p className="text-sm text-stone-700 truncate" style={{ fontFamily: "Georgia, serif" }}>
                          {order.items[0]?.product.name}
                          {order.items.length > 1 && ` +${order.items.length - 1} more`}
                        </p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="text-xs text-stone-400">
                            {new Date(order.createdAt).toLocaleDateString("en-GB", {
                              day: "numeric", month: "short", year: "numeric",
                            })}
                          </span>
                          <span className="text-stone-200">·</span>
                          <span className="text-xs text-stone-700 font-medium">
                            {formatPrice(order.total, "USD")}
                          </span>
                        </div>
                      </div>

                      <svg
                        width="14" height="14" viewBox="0 0 14 14" fill="none"
                        className="shrink-0 text-stone-300 group-hover:text-stone-900 group-hover:translate-x-0.5 transition-all"
                      >
                        <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>

          {/* Right column */}
          <div className="flex flex-col gap-6">

            {/* Wishlist preview */}
            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2
                  className="text-xl font-light text-stone-900"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Wishlist
                </h2>
                <Link
                  href="/dashboard/wishlist"
                  className="text-[10px] tracking-[0.35em] uppercase text-stone-400 hover:text-stone-900 transition-colors"
                >
                  View all
                </Link>
              </div>

              {wishlistPreview.length === 0 ? (
                <div className="bg-white border border-stone-200 p-6 text-center">
                  <p className="text-xs text-stone-400 mb-3">No saved items yet.</p>
                  <Link
                    href="/products"
                    className="text-[10px] tracking-[0.35em] uppercase text-stone-500 underline underline-offset-4 hover:text-stone-900 transition-colors"
                  >
                    Browse collection
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {wishlistPreview.map(({ product }) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      className="group relative aspect-3/4 overflow-hidden bg-stone-100"
                    >
                      {product.images[0]?.url ? (
                        <Image
                          src={product.images[0].url}
                          alt={product.name}
                          fill sizes="160px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-stone-200" />
                      )}
                      <div className="absolute inset-0 bg-linear-to-t from-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-[10px] text-white tracking-wide leading-snug">
                          {product.name}
                        </p>
                        <p className="text-[10px] text-stone-300">
                          {formatPrice(product.price, "USD")}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>

            {/* Admin panel card */}
            {isAdmin && (
              <Link
                href="/admin"
                className="group bg-stone-900 p-6 flex flex-col gap-4 hover:bg-stone-800 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 bg-white/10 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.4">
                      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                    </svg>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-stone-500 group-hover:text-stone-300 group-hover:translate-x-0.5 transition-all">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-white mb-1" style={{ fontFamily: "Georgia, serif" }}>
                    Admin panel
                  </p>
                  <p className="text-xs text-stone-500">
                    Manage products, orders and users.
                  </p>
                </div>
              </Link>
            )}

            {/* Account card */}
            <div className="bg-white border border-stone-200 p-6 flex flex-col gap-4">
              <p className="text-[10px] tracking-[0.45em] uppercase text-stone-400">
                Account
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Name",   value: user.name ?? "—" },
                  { label: "Email",  value: user.email ?? "—" },
                  { label: "Role",   value: user.role ?? "Customer" },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center gap-4">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 shrink-0">
                      {row.label}
                    </span>
                    <span className="text-xs text-stone-700 text-right truncate">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href="/settings"
                className="mt-1 w-full border border-stone-200 text-stone-500 py-2.5 text-[10px] tracking-[0.3em] uppercase text-center hover:border-stone-900 hover:text-stone-900 transition-all"
              >
                Edit profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}