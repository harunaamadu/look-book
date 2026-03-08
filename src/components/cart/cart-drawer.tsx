"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart.store";
import CartCoupon from "./cart-coupon";

import { formatPrice } from "@/lib/currencies";
import { useCurrencyStore } from "@/store/currency.store";

export default function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    removeItem,
    updateQuantity,
    getSubtotal,
    getDiscountAmount,
    getTotal,
    coupon,
    discount,
  } = useCartStore();

  const { currency } = useCurrencyStore();

  const overlayRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const subtotal = getSubtotal();
  const discountAmount = getDiscountAmount();
  const total = getTotal();

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={closeCart}
        className={`fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-110 bg-background z-50 flex flex-col shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-light tracking-tight text-stone-900">
              Your Bag
            </h2>
            {items.length > 0 && (
              <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400">
                {items.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center hover:bg-stone-100 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 2l12 12M14 2L2 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 px-6">
              <div className="w-44 aspect-square rounded-full bg-stone-100 flex items-center justify-center">
                <Image
                  width={400}
                  height={400}
                  alt="empty cart vector"
                  src="/images/empty-cart.png"
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <p className="text-sm text-stone-600 mb-1">Your bag is empty</p>
                <p className="text-xs text-stone-400 tracking-wide">
                  Add pieces you love to get started
                </p>
              </div>
              <button
                onClick={closeCart}
                className="text-[10px] tracking-[0.35em] uppercase text-stone-500 underline underline-offset-4 hover:text-stone-900 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-stone-100">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 px-6 py-5">
                  {/* Image */}
                  <Link
                    href={`/products/${item.slug}`}
                    onClick={closeCart}
                    className="relative w-20 h-28 shrink-0 overflow-hidden bg-stone-100"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={closeCart}
                      className="text-sm text-stone-900 leading-snug hover:text-stone-600 transition-colors"
                    >
                      {item.name}
                    </Link>

                    {/* Variant info */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.color && (
                        <span className="flex items-center gap-1 text-[9px] tracking-[0.3em] uppercase text-stone-400">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-stone-200"
                            style={{ backgroundColor: item.colorHex ?? "#ccc" }}
                          />
                          {item.color}
                        </span>
                      )}
                      {item.size && (
                        <span className="text-[9px] tracking-[0.3em] uppercase text-stone-400">
                          {item.size}
                        </span>
                      )}
                    </div>

                    {/* Item price */}
                    <p className="text-sm text-stone-900 mt-auto">
                      {formatPrice(item.price * item.quantity, currency)}
                    </p>

                    {/* Quantity + remove */}
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center border border-stone-200">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center text-stone-500 hover:bg-stone-100 transition-colors text-sm"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-xs text-stone-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          disabled={item.quantity >= item.stock}
                          className="w-7 h-7 flex items-center justify-center text-stone-500 hover:bg-stone-100 transition-colors text-sm disabled:opacity-30"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[9px] tracking-[0.3em] uppercase text-stone-400 hover:text-red-500 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer — only show when cart has items */}
        {items.length > 0 && (
          <div className="border-t border-stone-200 px-6 py-6 flex flex-col gap-4 bg-white">
            {/* Coupon */}
            <CartCoupon />

            {/* Totals */}
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-stone-500">
                <span className="text-[10px] tracking-[0.3em] uppercase">
                  Subtotal
                </span>

                {/* Subtotal */}
                <span>{formatPrice(subtotal, currency)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-700">
                  <span className="text-[10px] tracking-[0.3em] uppercase">
                    Discount ({discount}%)
                  </span>

                  {/* Discount */}
                  <span>−{formatPrice(discountAmount, currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-500">
                <span className="text-[10px] tracking-[0.3em] uppercase">
                  Shipping
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-stone-400">
                  Calculated at checkout
                </span>
              </div>
              <div className="flex justify-between font-medium text-stone-900 pt-2 border-t border-stone-100">
                <span className="text-[10px] tracking-[0.3em] uppercase">
                  Total
                </span>
                {/* Total */}
                <span>{formatPrice(total, currency)}</span>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full bg-stone-900 text-white py-4 text-[11px] tracking-[0.35em] uppercase text-center hover:bg-stone-700 transition-colors"
            >
              Proceed to Checkout
            </Link>

            <button
              onClick={closeCart}
              className="text-[10px] tracking-[0.3em] uppercase text-stone-400 hover:text-stone-900 transition-colors text-center"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
