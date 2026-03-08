import { auth } from "@/auth";
import CheckoutForm from "@/components/checkout/checkout-form";

export const metadata = { title: "Checkout — LOOK" };

export default async function CheckoutPage() {
  const session = await auth();

  return (
    <main className="min-h-screen bg-[#fafaf8]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs tracking-[0.5em] uppercase text-stone-400 mb-2">
            Secure Checkout
          </p>
          <h1
            className="text-3xl font-light text-stone-900"
          >
            Complete your order
          </h1>
        </div>

        <CheckoutForm user={session?.user ?? null} />
      </div>
    </main>
  );
}