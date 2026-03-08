"use client";

import { useState } from "react";
import Link from "next/link";

const faqCategories = [
  {
    label: "Orders",
    icon: "✦",
    questions: [
      {
        q: "How do I track my order?",
        a: "Once your order ships, you'll receive a confirmation email with a tracking link. You can also view your order status in your account dashboard under Orders.",
      },
      {
        q: "Can I modify or cancel my order?",
        a: "Orders can be modified or cancelled within 1 hour of placement. After that, we begin processing and cannot make changes. Please contact our team immediately at hello@look.com.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept Visa, Mastercard, American Express, PayPal, Apple Pay, and Stripe. All transactions are encrypted and secure.",
      },
      {
        q: "Do you offer gift wrapping?",
        a: "Yes — select gift wrapping at checkout for £5. Your order will arrive in our signature LOOK box with tissue paper and a handwritten note option.",
      },
    ],
  },
  {
    label: "Shipping",
    icon: "✦",
    questions: [
      {
        q: "How long does delivery take?",
        a: "Standard UK delivery takes 3–5 business days. Express delivery (1–2 business days) is available at checkout. International orders typically arrive within 7–14 business days.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship to over 40 countries. International shipping rates and delivery times vary by destination. Duties and taxes may apply and are the responsibility of the recipient.",
      },
      {
        q: "Is shipping free?",
        a: "We offer free standard shipping on all UK orders over £150. For orders below this threshold, shipping is £4.99. International shipping starts from £12.99.",
      },
      {
        q: "What if my order arrives damaged?",
        a: "We're sorry to hear that. Please contact us within 48 hours with photos of the damaged item and packaging. We'll arrange a replacement or full refund immediately.",
      },
    ],
  },
  {
    label: "Returns",
    icon: "✦",
    questions: [
      {
        q: "What is your returns policy?",
        a: "We accept returns within 30 days of delivery for unworn, unwashed items with all tags attached. Sale items are final sale and cannot be returned unless faulty.",
      },
      {
        q: "How do I start a return?",
        a: "Log into your account, go to Orders, and select the item you'd like to return. You'll receive a prepaid returns label by email. Drop the parcel at any Royal Mail location.",
      },
      {
        q: "How long do refunds take?",
        a: "Once we receive your return, we'll process it within 2–3 business days. Refunds appear on your original payment method within 5–10 business days depending on your bank.",
      },
      {
        q: "Can I exchange an item?",
        a: "Currently, we don't offer direct exchanges. Please return your item for a refund and place a new order for the size or colour you need.",
      },
    ],
  },
  {
    label: "Products",
    icon: "✦",
    questions: [
      {
        q: "How do I find my size?",
        a: "Each product page includes a detailed size guide with measurements in both UK and EU sizing. If you're between sizes, we generally recommend sizing up for a relaxed fit.",
      },
      {
        q: "Are your products sustainably made?",
        a: "Sustainability is core to LOOK. We work exclusively with certified suppliers, use natural and recycled fibres where possible, and are committed to full supply chain transparency.",
      },
      {
        q: "How should I care for my garments?",
        a: "Each product includes a care label with specific washing instructions. In general, we recommend cold washing on a gentle cycle and air drying to preserve the quality and shape of your pieces.",
      },
      {
        q: "Will sold-out items be restocked?",
        a: "Some styles are restocked seasonally. Use the 'Notify me' option on the product page to receive an email when your size becomes available again.",
      },
    ],
  },
];

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState(faqCategories[0].label);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const activeQuestions = faqCategories.find((c) => c.label === activeCategory)?.questions ?? [];

  return (
    <main className="min-h-screen bg-[#fafaf8]">

      {/* Hero */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <p className="text-xs tracking-[0.5em] uppercase text-stone-400 mb-4">
            Support
          </p>
          <h1
            className="text-5xl md:text-6xl font-normal text-stone-900 leading-none tracking-tight mb-6"
          >
            Frequently asked
            <br />
            <em className="not-italic text-stone-400">questions.</em>
          </h1>
          <p className="text-sm text-stone-500 max-w-lg leading-relaxed">
            Find answers to common questions about orders, shipping, returns, and more.
            Can&apos;t find what you need?{" "}
            <Link
              href="/contact"
              className="text-stone-900 underline underline-offset-2 hover:text-stone-600 transition-colors"
            >
              Contact us
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12">

          {/* LEFT — category nav */}
          <nav className="flex flex-row lg:flex-col gap-2 lg:gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 lg:sticky lg:top-24 lg:self-start">
            {faqCategories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => {
                  setActiveCategory(cat.label);
                  setOpenQuestion(null);
                }}
                className={`shrink-0 flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 ${
                  activeCategory === cat.label
                    ? "bg-stone-900 text-white"
                    : "text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                }`}
              >
                <span className={`text-xs transition-colors ${activeCategory === cat.label ? "text-stone-400" : "text-stone-300"}`}>
                  {cat.icon}
                </span>
                <span className="text-sm tracking-[0.3em] uppercase">
                  {cat.label}
                </span>
              </button>
            ))}

            {/* Contact CTA */}
            <div className="hidden lg:block mt-8 pt-8 border-t border-stone-200">
              <p className="text-xs text-stone-400 leading-relaxed mb-4">
                Still have questions? Our team is here to help.
              </p>
              <Link
                href="/contact"
                className="flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-stone-600 hover:text-stone-900 transition-colors group"
              >
                Contact us
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="transition-transform group-hover:translate-x-1">
                  <path d="M1 4h10M7.5 1 11 4l-3.5 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </nav>

          {/* RIGHT — questions */}
          <div className="flex flex-col">

            {/* Category header */}
            <div className="mb-8 pb-6 border-b border-stone-200">
              <p className="text-[9px] tracking-[0.5em] uppercase text-stone-400 mb-2">
                {activeCategory}
              </p>
              <p className="text-sm text-stone-500">
                {activeQuestions.length} questions
              </p>
            </div>

            {/* Accordion */}
            <div className="flex flex-col divide-y divide-stone-100">
              {activeQuestions.map((item, i) => {
                const isOpen = openQuestion === `${activeCategory}-${i}`;
                return (
                  <div key={i} className="group">
                    <button
                      onClick={() =>
                        setOpenQuestion(
                          isOpen ? null : `${activeCategory}-${i}`
                        )
                      }
                      className="w-full flex items-start justify-between gap-6 py-6 text-left"
                    >
                      <span
                        className={`text-sm leading-snug transition-colors ${
                          isOpen ? "text-stone-900" : "text-stone-700 group-hover:text-stone-900"
                        }`}
                      >
                        {item.q}
                      </span>
                      <span
                        className={`shrink-0 w-6 h-6 flex items-center justify-center border transition-all duration-300 mt-0.5 ${
                          isOpen
                            ? "border-stone-900 bg-stone-900 text-white rotate-45"
                            : "border-stone-300 text-stone-400 group-hover:border-stone-900 group-hover:text-stone-900"
                        }`}
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                        </svg>
                      </span>
                    </button>

                    {/* Answer */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-64 pb-6" : "max-h-0"
                      }`}
                    >
                      <p className="text-sm text-stone-500 leading-relaxed max-w-2xl border-l-2 border-stone-200 pl-5">
                        {item.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 p-8 bg-stone-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p
                  className="text-lg font-light text-white mb-1"
                >
                  Still need help?
                </p>
                <p className="text-sm text-stone-400">
                  Our customer care team replies within 24 hours.
                </p>
              </div>
              <Link
                href="/contact"
                className="shrink-0 border border-stone-600 text-white px-6 py-3 text-xs tracking-[0.35em] uppercase hover:bg-white hover:text-stone-900 hover:border-white transition-all"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}