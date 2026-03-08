import type { Metadata } from "next";
import LegalLayout from "@/components/shared/LegalLayout";

export const metadata: Metadata = { title: "Privacy Policy — LOOK" };

export default function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your personal information."
    >
      <div className="flex flex-col gap-10 text-sm leading-relaxed">

        <Section title="Information we collect">
          We collect information you provide directly — such as your name, email address, shipping address, and payment details — when you create an account or place an order. We also automatically collect certain technical data including your IP address, browser type, and pages visited.
        </Section>

        <Section title="How we use your data">
          Your data is used to process orders, personalise your experience, send order updates and marketing communications (where consented), improve our services, and comply with legal obligations. We never sell your personal data to third parties.
        </Section>

        <Section title="Cookies">
          We use essential, analytics, and marketing cookies. You can manage your preferences at any time via our Cookie Settings panel. For full details see our Cookie Policy.
        </Section>

        <Section title="Data sharing">
          We share your data only with trusted partners necessary to operate our business — including payment processors (Stripe), shipping carriers, and analytics providers. All partners are bound by data processing agreements compliant with UK GDPR.
        </Section>

        <Section title="Data retention">
          We retain your personal data for as long as your account is active or as required by law. You may request deletion of your data at any time by contacting us at privacy@look.com.
        </Section>

        <Section title="Your rights">
          Under UK GDPR, you have the right to access, rectify, erase, restrict, or port your personal data. You also have the right to object to processing and to withdraw consent at any time. To exercise these rights, contact privacy@look.com.
        </Section>

        <Section title="Security">
          We implement industry-standard security measures including TLS encryption, access controls, and regular security audits. However, no method of transmission over the internet is 100% secure.
        </Section>

        <Section title="Contact">
          For any privacy-related queries, contact our Data Protection Officer at privacy@look.com or write to LOOK, 12 Savile Row, London, W1S 3PL.
        </Section>

        <div className="pt-4 border-t border-stone-200">
          <p className="text-xs tracking-[0.3em] uppercase text-stone-400">
            Last updated — January {" "} {new Date().getFullYear()}
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