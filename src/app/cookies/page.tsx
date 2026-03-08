import Link from "next/link";
import type { Metadata } from "next";
import LegalLayout from "@/components/shared/LegalLayout";

export const metadata: Metadata = { title: "Cookie Policy — LOOK" };

const cookieTypes = [
  {
    name: "Strictly necessary",
    required: true,
    description: "Essential for the site to function. These cannot be disabled.",
    examples: "Session ID, authentication token, cart contents.",
  },
  {
    name: "Analytics",
    required: false,
    description: "Help us understand how visitors interact with our site so we can improve it.",
    examples: "Pages visited, time on site, referral source.",
  },
  {
    name: "Marketing",
    required: false,
    description: "Used to deliver relevant advertisements and track campaign performance.",
    examples: "Ad click-through, retargeting identifiers.",
  },
  {
    name: "Preferences",
    required: false,
    description: "Remember your settings and personalisation choices.",
    examples: "Currency, language, region.",
  },
];

export default function CookiesPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Cookie Policy"
      subtitle="We use cookies to give you the best experience. Here's exactly what we use and why."
    >
      <div className="flex flex-col gap-10 text-sm leading-relaxed">

        <p className="text-stone-600">
          Cookies are small text files stored on your device when you visit a website. They help us remember your preferences, analyse traffic, and improve your experience. You can manage your cookie preferences at any time via our{" "}
          <Link href="#" className="text-stone-900 underline underline-offset-2 hover:text-stone-500 transition-colors">
            Cookie Settings
          </Link>.
        </p>

        {/* Cookie type table */}
        <div className="flex flex-col gap-4">
          {cookieTypes.map((type) => (
            <div key={type.name} className="border border-stone-200 p-6 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-4">
                <h3
                  className="text-sm font-semibold text-stone-900"
                >
                  {type.name}
                </h3>
                <span className={`text-[9px] tracking-[0.3em] uppercase px-2 py-1 border ${
                  type.required
                    ? "border-stone-900 text-stone-900"
                    : "border-stone-300 text-stone-400"
                }`}>
                  {type.required ? "Required" : "Optional"}
                </span>
              </div>
              <p className="text-stone-500 text-xs leading-relaxed">{type.description}</p>
              <p className="text-[10px] tracking-wide text-stone-400">
                <span className="uppercase tracking-[0.3em]">Examples: </span>
                {type.examples}
              </p>
            </div>
          ))}
        </div>

        <Section title="Third-party cookies">
          Some cookies are set by third-party services we use — including Google Analytics, Stripe, and Meta Pixel. These are governed by those providers' own privacy policies. We have no direct control over third-party cookies.
        </Section>

        <Section title="Managing cookies">
          You can update your preferences at any time using our Cookie Settings panel accessible from the footer. You can also configure your browser to block or delete cookies, though this may affect site functionality.
        </Section>

        <div className="pt-4 border-t border-stone-200">
          <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400">
            Last updated — January 2025
          </p>
        </div>
      </div>
    </LegalLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-base font-semibold text-stone-900">
        {title}
      </h2>
      <p className="text-stone-600 leading-relaxed">{children}</p>
    </div>
  );
}