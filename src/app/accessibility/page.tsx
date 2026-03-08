import type { Metadata } from "next";
import LegalLayout from "@/components/shared/LegalLayout";

export const metadata: Metadata = { title: "Accessibility — LOOK" };

const commitments = [
  {
    title: "Keyboard navigation",
    body: "All interactive elements are fully accessible via keyboard. Tab order follows a logical reading flow and focus states are clearly visible.",
  },
  {
    title: "Screen reader support",
    body: "We use semantic HTML, ARIA labels, and descriptive alt text throughout to ensure compatibility with assistive technologies including NVDA, JAWS, and VoiceOver.",
  },
  {
    title: "Colour contrast",
    body: "Text and interactive elements meet or exceed WCAG 2.1 AA contrast ratio requirements. We test across multiple display conditions.",
  },
  {
    title: "Resizable text",
    body: "Our layout adapts gracefully to increased text sizes. Content remains readable and functional at up to 200% zoom.",
  },
  {
    title: "Reduced motion",
    body: "We respect the prefers-reduced-motion media query. Animations are suppressed for users who have enabled this setting in their OS.",
  },
];

export default function AccessibilityPage() {
  return (
    <LegalLayout
      eyebrow="Accessibility"
      title="Accessibility statement"
      subtitle="LOOK is committed to making our platform usable by everyone, regardless of ability or technology."
    >
      <div className="flex flex-col gap-10 text-sm leading-relaxed">

        <p className="text-stone-600">
          We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. This is an ongoing effort and we continually review and improve our platform with accessibility in mind.
        </p>

        <div className="flex flex-col gap-4">
          {commitments.map((item) => (
            <div key={item.title} className="flex gap-5 py-5 border-b border-stone-100 last:border-0">
              <div className="w-1.5 h-1.5 rounded-full bg-stone-900 shrink-0 mt-2" />
              <div className="flex flex-col gap-1.5">
                <h3
                  className="text-sm font-semibold text-stone-900"
                >
                  {item.title}
                </h3>
                <p className="text-stone-500 text-xs leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        <Section title="Known issues">
          While we strive for full accessibility, some third-party components — such as payment widgets — may not fully conform to WCAG standards. We are actively working with our providers to address these gaps.
        </Section>

        <Section title="Feedback & contact">
          If you encounter any accessibility barriers on our site, please contact us at accessibility@look.com. We aim to respond within 2 business days and will work to resolve any issues promptly.
        </Section>

        <div className="pt-4 border-t border-stone-200">
          <p className="text-xs tracking-[0.3em] uppercase text-stone-400">
            Last reviewed — January 2025
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