import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping & Returns — LOOK",
  description: "Everything you need to know about delivery and our returns policy.",
};

const shippingOptions = [
  {
    name: "Standard Delivery",
    time: "3–5 business days",
    price: "£4.99",
    free: "Free over £150",
    regions: "UK Mainland",
  },
  {
    name: "Express Delivery",
    time: "1–2 business days",
    price: "£9.99",
    free: "Free over £250",
    regions: "UK Mainland",
  },
  {
    name: "Next Day",
    time: "Next business day",
    price: "£14.99",
    free: null,
    regions: "UK Mainland (order before 1pm)",
  },
  {
    name: "International",
    time: "7–14 business days",
    price: "From £12.99",
    free: "Free over £300",
    regions: "40+ countries",
  },
];

const returnSteps = [
  {
    step: "01",
    title: "Initiate your return",
    body: "Log into your account, navigate to Orders, and select the item you wish to return. Choose your reason and confirm.",
  },
  {
    step: "02",
    title: "Print your label",
    body: "A prepaid Royal Mail returns label will be emailed to you. Print it and attach it securely to your parcel.",
  },
  {
    step: "03",
    title: "Drop off your parcel",
    body: "Take your parcel to any Royal Mail post office or drop-off point. Keep your receipt as proof of postage.",
  },
  {
    step: "04",
    title: "Receive your refund",
    body: "Once received, we process returns within 2–3 business days. Your refund will appear within 5–10 business days.",
  },
];

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-[#fafaf8]">

      {/* Hero */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <p className="text-[10px] tracking-[0.5em] uppercase text-stone-400 mb-4">
            Delivery & Returns
          </p>
          <h1
            className="text-5xl md:text-6xl font-light text-stone-900 leading-none tracking-tight"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Shipping &{" "}
            <em className="not-italic text-stone-400">Returns</em>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col gap-24">

        {/* Shipping options */}
        <section>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[10px] tracking-[0.5em] uppercase text-stone-400 mb-3">
                Delivery
              </p>
              <h2
                className="text-3xl font-light text-stone-900"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Shipping options
              </h2>
            </div>
            <p className="text-xs text-stone-400 tracking-wide hidden md:block">
              All orders dispatched within 1 business day
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-200">
            {shippingOptions.map((opt) => (
              <div key={opt.name} className="bg-[#fafaf8] p-7 flex flex-col gap-4">
                <div>
                  <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-2">
                    {opt.regions}
                  </p>
                  <h3
                    className="text-lg font-light text-stone-900"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {opt.name}
                  </h3>
                </div>
                <div className="h-px bg-stone-200" />
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400">Time</span>
                    <span className="text-xs text-stone-700">{opt.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400">Cost</span>
                    <span className="text-xs text-stone-700">{opt.price}</span>
                  </div>
                  {opt.free && (
                    <div className="mt-2 bg-stone-900 text-white px-3 py-1.5 text-[9px] tracking-[0.3em] uppercase text-center">
                      {opt.free}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              "We ship from London, UK on business days (Mon–Fri, excluding bank holidays).",
              "International customers are responsible for any import duties or taxes levied at customs.",
              "Tracking information is sent by email as soon as your order is dispatched.",
            ].map((note, i) => (
              <p key={i} className="text-xs text-stone-400 leading-relaxed flex gap-2">
                <span className="text-stone-300 shrink-0">—</span>
                {note}
              </p>
            ))}
          </div>
        </section>

        {/* Returns */}
        <section>
          <div className="mb-10">
            <p className="text-[10px] tracking-[0.5em] uppercase text-stone-400 mb-3">
              Returns
            </p>
            <h2
              className="text-3xl font-light text-stone-900 mb-4"
              style={{ fontFamily: "Georgia, serif" }}
            >
              30-day returns policy
            </h2>
            <p className="text-sm text-stone-500 max-w-xl leading-relaxed">
              We want you to love what you receive. If you&apos;re not completely
              satisfied, return any unworn item in its original condition within
              30 days for a full refund.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-stone-200 mb-10">
            {returnSteps.map((s) => (
              <div key={s.step} className="bg-[#fafaf8] p-7 flex flex-col gap-4">
                <span
                  className="text-4xl font-light text-stone-200 leading-none"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {s.step}
                </span>
                <div>
                  <h3 className="text-sm text-stone-900 mb-2">{s.title}</h3>
                  <p className="text-xs text-stone-400 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Policy details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Eligible for return",
                items: [
                  "Unworn and unwashed items",
                  "All original tags attached",
                  "Original packaging intact",
                  "Returned within 30 days of delivery",
                ],
                positive: true,
              },
              {
                title: "Not eligible for return",
                items: [
                  "Sale and final clearance items",
                  "Pierced jewellery and accessories",
                  "Items showing signs of wear",
                  "Items without original tags",
                ],
                positive: false,
              },
            ].map((col) => (
              <div key={col.title} className="bg-white border border-stone-200 p-7">
                <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-5">
                  {col.title}
                </p>
                <ul className="flex flex-col gap-3">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-stone-600">
                      <span className={col.positive ? "text-green-600 mt-0.5" : "text-red-400 mt-0.5"}>
                        {col.positive ? "✓" : "✕"}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-stone-900 p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p
              className="text-xl font-light text-white mb-1"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Need help with an order?
            </p>
            <p className="text-sm text-stone-400">
              Our team is available Mon–Fri, 9am–6pm GMT.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/faq"
              className="border border-stone-600 text-white px-6 py-3 text-[10px] tracking-[0.35em] uppercase hover:bg-stone-800 transition-colors"
            >
              View FAQ
            </Link>
            <Link
              href="/contact"
              className="bg-white text-stone-900 px-6 py-3 text-[10px] tracking-[0.35em] uppercase hover:bg-stone-100 transition-colors"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}