import Link from "next/link";

export const metadata = { title: "Order Confirmed — LOOK" };

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  return (
    <main className="min-h-screen bg-[#fafaf8] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Checkmark */}
        <div className="relative mx-auto w-20 h-20 mb-8">
          <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M4 12l6 6L20 6" stroke="#1a1a18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="absolute inset-0 rounded-full animate-ping bg-stone-200 opacity-40" />
        </div>

        <p className="text-xs tracking-[0.5em] uppercase text-stone-400 mb-3">
          Order confirmed
        </p>
        <h1
          className="text-3xl font-light text-stone-900 mb-4"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Thank you for your order
        </h1>
        <p className="text-sm text-stone-500 leading-relaxed mb-2">
          We&apos;ve received your order and will be in touch shortly with shipping details.
        </p>
        {orderId && (
          <p className="text-xs text-stone-400 tracking-wide mb-10">
            Order #{orderId.slice(-8).toUpperCase()}
          </p>
        )}

        <div className="flex flex-col gap-3">
          <Link
            href="/products"
            className="w-full bg-stone-900 text-white py-4 text-sm tracking-[0.35em] uppercase hover:bg-stone-700 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/dashboard/orders"
            className="w-full border border-stone-300 text-stone-600 py-4 text-sm tracking-[0.35em] uppercase hover:border-stone-900 hover:text-stone-900 transition-colors"
          >
            View Orders
          </Link>
        </div>
      </div>
    </main>
  );
}