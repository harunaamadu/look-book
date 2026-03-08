"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart.store";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { placeOrder } from "@/server/actions/order.actions";
import { useCurrencyStore } from "@/store/currency.store";
import { formatPrice } from "@/lib/currencies";

interface User {
  name?: string | null;
  email?: string | null;
}

export default function CheckoutForm({ user }: { user: User | null }) {
  // ── ALL hooks first, no exceptions ──────────────────────
  const { items, getSubtotal, getDiscountAmount, getTotal, coupon, discount, clearCart } = useCartStore();
  const { currency } = useCurrencyStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [country, setCountry] = useState("");

  useEffect(() => {
    async function detectCountry() {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        if (data.country_name) setCountry(data.country_name);
      } catch {
        setCountry("United Kingdom");
      }
    }
    detectCountry();
  }, []);

  const subtotal = getSubtotal();
  const discountAmount = getDiscountAmount();
  const total = getTotal();

  // ── Early return AFTER all hooks ─────────────────────────
  if (!items.length) {
    return (
      <div className="text-center py-20">
        <p className="text-stone-400 text-sm">Your bag is empty.</p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const order = await placeOrder({
        items,
        total,
        coupon,
        shippingAddress: {
          name: data.get("name") as string,
          email: data.get("email") as string,
          address: data.get("address") as string,
          city: data.get("city") as string,
          postcode: data.get("postcode") as string,
          country: data.get("country") as string,
        },
      });

      clearCart();
      router.push(`/checkout/success?orderId=${order.id}`);
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12">

      {/* Left — form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">

        {/* Contact */}
        <fieldset className="flex flex-col gap-4">
          <legend className="text-[10px] tracking-[0.45em] uppercase text-stone-400 mb-2">
            Contact
          </legend>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Full name" name="name" defaultValue={user?.name ?? ""} required />
            <Field label="Email" name="email" type="email" defaultValue={user?.email ?? ""} required />
          </div>
        </fieldset>

        {/* Shipping */}
        <fieldset className="flex flex-col gap-4">
          <legend className="text-[10px] tracking-[0.45em] uppercase text-stone-400 mb-2">
            Shipping address
          </legend>
          <Field label="Street address" name="address" required />
          <div className="grid grid-cols-2 gap-4">
            <Field label="City" name="city" required />
            <Field label="Postcode" name="postcode" required />
          </div>

          {/* Country — auto-detected */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] tracking-[0.4em] uppercase text-stone-400">
              Country
            </label>
            <div className="relative">
              <input
                type="text"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                className="w-full border border-stone-200 bg-transparent px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-stone-900 transition-colors"
              />
              {!country && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg className="w-3 h-3 animate-spin text-stone-300" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="32" strokeDashoffset="12"/>
                  </svg>
                </span>
              )}
            </div>
          </div>
        </fieldset>

        {/* Payment */}
        <fieldset className="flex flex-col gap-4">
          <legend className="text-[10px] tracking-[0.45em] uppercase text-stone-400 mb-2">
            Payment
          </legend>
          <div className="border border-stone-200 p-4 bg-stone-50 flex items-center gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="1" y="4" width="22" height="16" rx="2"/>
              <path d="M1 10h22"/>
            </svg>
            <span className="text-xs text-stone-500 tracking-wide">
              Stripe payment coming soon — orders will be saved as pending
            </span>
          </div>
        </fieldset>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-stone-900 text-white py-4 text-[11px] tracking-[0.35em] uppercase hover:bg-stone-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Placing order..." : `Place order — ${formatPrice(total, currency)}`}
        </button>

        <p className="text-[10px] text-stone-400 text-center tracking-wide">
          By placing your order you agree to our Terms & Conditions and Privacy Policy.
        </p>
      </form>

      {/* Right — order summary */}
      <div className="lg:sticky lg:top-8 lg:self-start flex flex-col gap-6">
        <h2 className="text-[10px] tracking-[0.45em] uppercase text-stone-400">
          Order summary
        </h2>

        <ul className="flex flex-col gap-4">
          {items.map((item) => (
            <li key={item.id} className="flex gap-3">
              <div className="relative w-16 h-20 shrink-0 bg-stone-100">
                <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-stone-900 text-white text-[9px] rounded-full flex items-center justify-center">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 flex flex-col gap-0.5">
                <p className="text-sm text-stone-900" style={{ fontFamily: "Georgia, serif" }}>
                  {item.name}
                </p>
                <div className="flex gap-2 text-[9px] tracking-[0.3em] uppercase text-stone-400">
                  {item.color && <span>{item.color}</span>}
                  {item.size && <span>{item.size}</span>}
                </div>
                <p className="text-sm text-stone-900 mt-auto">
                  {formatPrice(item.price * item.quantity, currency)}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="border-t border-stone-200 pt-4 flex flex-col gap-2 text-sm">
          <div className="flex justify-between text-stone-500">
            <span className="text-[10px] tracking-[0.3em] uppercase">Subtotal</span>
            <span>{formatPrice(subtotal, currency)}</span>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between text-green-700">
              <span className="text-[10px] tracking-[0.3em] uppercase">Discount ({discount}%)</span>
              <span>−{formatPrice(discountAmount, currency)}</span>
            </div>
          )}
          <div className="flex justify-between text-stone-500">
            <span className="text-[10px] tracking-[0.3em] uppercase">Shipping</span>
            <span className="text-[10px] uppercase text-stone-400">Free</span>
          </div>
          <div className="flex justify-between font-medium text-stone-900 pt-2 border-t border-stone-100">
            <span className="text-[10px] tracking-[0.3em] uppercase">Total</span>
            <span>{formatPrice(total, currency)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label, name, type = "text", defaultValue = "", required,
}: {
  label: string; name: string; type?: string; defaultValue?: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[9px] tracking-[0.4em] uppercase text-stone-400">{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="border border-stone-200 bg-transparent px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-stone-900 transition-colors"
      />
    </div>
  );
}