import { getAnalytics } from "@/server/actions/admin.actions";
import { requireAdmin } from "@/lib/admin-guard";
import { statusConfig } from "@/lib/order-status";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { formatPrice } from "@/lib/currencies";
import { getCurrency } from "@/lib/get-currency";

export const metadata: Metadata = { title: "Admin — LOOK" };

export default async function AdminPage() {
  await requireAdmin();
  const data = await getAnalytics();
  const currency = await getCurrency();

  const stats = [
    {
      label: "Total revenue",
      value: formatPrice(data.totalRevenue, currency),
      change: "+12%",
    },
    { label: "Total orders", value: String(data.totalOrders), change: "+8%" },
    { label: "Total users", value: String(data.totalUsers), change: "+23%" },
    { label: "Products live", value: String(data.totalProducts), change: null },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Page title */}
      <div>
        <p className="text-[10px] tracking-[0.5em] uppercase text-stone-600 mb-1">
          Admin
        </p>
        <h1 className="text-3xl font-bold">Overview</h1>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-stone-100 border border-stone-200 p-5 flex flex-col gap-3"
          >
            <p className="text-[10px] tracking-[0.35em] uppercase text-primary">
              {stat.label}
            </p>
            <div className="flex items-end justify-between gap-2">
              <span
                className="text-3xl font-light leading-none"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {stat.value}
              </span>
              {stat.change && (
                <span className="text-xs tracking-wide text-green-600 pb-1">
                  {stat.change}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        {/* Recent orders */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm tracking-[0.3em] uppercase text-stone-400">
              Recent orders
            </h2>
            <Link
              href="/admin/orders"
              className="text-[10px] tracking-[0.3em] uppercase text-stone-600 hover:text-white transition-colors"
            >
              View all →
            </Link>
          </div>

          <div className="bg-stone-100 border border-stone-300 text-stone-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-800">
                  {["Order", "Customer", "Items", "Total", "Status"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-[9px] tracking-[0.4em] uppercase text-stone-600 font-normal"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-300">
                {data.recentOrders.map((order) => {
                  const config =
                    statusConfig[order.status] ?? statusConfig.PENDING;
                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-stone-800/10 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="text-[10px] tracking-widest transition-colors"
                        >
                          #{order.id.slice(-8).toUpperCase()}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-xs">
                        {order.user?.name ?? order.user?.email ?? "Guest"}
                      </td>
                      <td className="px-4 py-3 text-xs">
                        {order.items.length}
                      </td>
                      <td className="px-4 py-3 text-xs font-medium">
                        {formatPrice(order.total, currency)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`flex items-center gap-1.5 text-[9px] tracking-[0.25em] uppercase ${config.color}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${config.dot}`}
                          />
                          {config.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          {/* Order status breakdown */}
          <div className="bg-stone-100 border border-stone-300 p-5 flex flex-col gap-4">
            <h3 className="text-[10px] tracking-[0.4em] uppercase text-stone-500">
              Orders by status
            </h3>
            {data.ordersByStatus.map((s) => {
              const config = statusConfig[s.status] ?? statusConfig.PENDING;
              const pct =
                data.totalOrders > 0
                  ? Math.round((s._count / data.totalOrders) * 100)
                  : 0;
              return (
                <div key={s.status} className="flex flex-col gap-1.5">
                  <div className="flex justify-between">
                    <span
                      className={`text-[10px] tracking-[0.25em] uppercase ${config.color}`}
                    >
                      {config.label}
                    </span>
                    <span className="text-[10px] text-stone-500">
                      {s._count}
                    </span>
                  </div>
                  <div className="h-1 bg-stone-800 overflow-hidden">
                    <div
                      className={`h-full ${config.dot} transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Top products */}
          <div className="bg-stone-100 border border-stone-300 p-5 flex flex-col gap-4">
            <h3 className="text-[10px] tracking-[0.4em] uppercase text-stone-500">
              Top products
            </h3>
            <div className="flex flex-col gap-3">
              {data.topProducts.map((tp, i) => (
                <div key={tp.productId} className="flex items-center gap-3">
                  <span
                    className="text-lg font-light text-stone-700 w-5 shrink-0"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {i + 1}
                  </span>
                  <div className="relative w-8 h-10 shrink-0 bg-stone-800 overflow-hidden">
                    {tp.product?.images[0]?.url && (
                      <Image
                        src={tp.product.images[0].url}
                        alt={tp.product.name}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-stone-300 truncate">
                      {tp.product?.name ?? "Unknown"}
                    </p>
                    <p className="text-[10px] text-stone-600">
                      {tp._sum.quantity} sold
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* New users this month */}
          <div className="bg-stone-100 border border-stone-300 p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-stone-300 flex items-center justify-center shrink-0">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                className="text-stone-700"
              >
                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="23" y1="11" x2="17" y2="11" />
              </svg>
            </div>

            <div>
              <p
                className="text-2xl font-normal"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {data.newUsersThisMonth}
              </p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-stone-600">
                New users this month
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
