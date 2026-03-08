import type { Metadata } from "next";
import LegalLayout from "@/components/shared/LegalLayout";

export const metadata: Metadata = { title: "Press — LOOK" };

const coverage = [
  { outlet: "Vogue UK",      headline: "The quiet luxury brands redefining British fashion",  date: "March 2025" },
  { outlet: "Wallpaper*",    headline: "10 emerging labels with serious staying power",        date: "January 2025" },
  { outlet: "Business of Fashion", headline: "How LOOK built a loyal community from zero",   date: "November 2024" },
  { outlet: "The Times",     headline: "The new names in British fashion worth knowing",       date: "October 2024" },
];

export default function PressPage() {
  return (
    <LegalLayout
      eyebrow="Company"
      title="Press"
      subtitle="Media resources, brand assets, and contact information for press enquiries."
    >
      <div className="flex flex-col gap-12 text-sm leading-relaxed">

        {/* Press contact */}
        <div className="bg-stone-900 text-white p-8 flex flex-col gap-4">
          <p className="text-[10px] tracking-[0.5em] uppercase text-stone-400">
            Press contact
          </p>
          <div>
            <p
              className="text-2xl font-light mb-1"
            >
              press@look.com
            </p>
            <p className="text-xs text-stone-400">
              We aim to respond to all press enquiries within 48 hours.
            </p>
          </div>
        </div>

        {/* Recent coverage */}
        <div className="flex flex-col gap-4">
          <h2
            className="text-base font-semibold text-stone-900"
          >
            Recent coverage
          </h2>
          <div className="flex flex-col gap-0">
            {coverage.map((item) => (
              <div key={item.headline} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-5 border-b border-stone-100">
                <div className="flex flex-col gap-1">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400">
                    {item.outlet}
                  </p>
                  <p className="text-stone-700 text-sm">
                    "{item.headline}"
                  </p>
                </div>
                <span className="text-[10px] tracking-widest text-stone-400 shrink-0">
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Brand assets */}
        <div className="flex flex-col gap-5">
          <h2
            className="text-base font-semibold text-stone-900"
          >
            Brand assets
          </h2>
          <p className="text-stone-600 text-xs leading-relaxed">
            Official logos, brand guidelines, and product imagery are available to accredited press upon request. Please contact press@look.com with your publication details.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {["Logo pack", "Brand guidelines", "Product imagery", "Founder portraits"].map((asset) => (
              <div
                key={asset}
                className="border border-stone-200 px-5 py-4 flex items-center justify-between hover:border-stone-900 transition-colors cursor-pointer group"
              >
                <span className="text-xs text-stone-600 group-hover:text-stone-900 transition-colors">
                  {asset}
                </span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-stone-300 group-hover:text-stone-900 transition-colors">
                  <path d="M6 1v7M3 5l3 3 3-3M1 10h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            ))}
          </div>
        </div>

      </div>
    </LegalLayout>
  );
}