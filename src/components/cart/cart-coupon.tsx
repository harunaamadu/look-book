"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart.store";
import { validateCoupon } from "@/server/actions/coupon.actions";
import { showToast } from "@/lib/toast";

export default function CartCoupon() {
  const { coupon, applyCoupon, removeCoupon } = useCartStore();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleApply() {
    if (!code.trim()) return;
    setLoading(true);

    try {
      const result = await validateCoupon(code);

      if (result.success) {
        applyCoupon(code.trim().toUpperCase(), result.discount);
        showToast.couponApplied(code.trim().toUpperCase(), result.discount);
        setCode("");
      } else {
        showToast.couponInvalid();
        showToast.error(result.message);
      }
    } catch {
      showToast.error("Failed to validate coupon.");
    } finally {
      setLoading(false);
    }
  }

  if (coupon) {
    return (
      <div className="flex items-center justify-between bg-green-50 border border-green-200 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-[10px] tracking-[0.3em] uppercase text-green-700 font-medium">
            {coupon} applied
          </span>
        </div>
        <button
          onClick={removeCoupon}
          className="text-[9px] tracking-[0.3em] uppercase text-green-600 hover:text-red-500 transition-colors"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        onKeyDown={(e) => e.key === "Enter" && handleApply()}
        placeholder="Coupon code"
        className="flex-1 border border-stone-200 px-3 py-2 text-xs tracking-wider uppercase placeholder:normal-case placeholder:tracking-normal placeholder:text-stone-400 focus:outline-none focus:border-stone-900 transition-colors bg-transparent"
      />
      <button
        onClick={handleApply}
        disabled={loading || !code.trim()}
        className="px-4 py-2 bg-stone-900 text-white text-[10px] tracking-[0.3em] uppercase hover:bg-stone-700 transition-colors disabled:opacity-50"
      >
        {loading ? "..." : "Apply"}
      </button>
    </div>
  );
}