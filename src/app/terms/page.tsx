import type { Metadata } from "next";
import LegalLayout from "@/components/shared/LegalLayout";

export const metadata: Metadata = { title: "Terms & Conditions — LOOK" };

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Terms & Conditions"
      subtitle="Please read these terms carefully before using LOOK. By accessing our platform you agree to be bound by them."
    >
      <div className="flex flex-col gap-10 text-sm leading-relaxed">

        <Section title="1. Acceptance of terms">
          By accessing or placing an order through look.com, you confirm that you are at least 18 years of age and agree to these Terms & Conditions in full. If you do not agree, please discontinue use of our site immediately.
        </Section>

        <Section title="2. Products & pricing">
          All prices are displayed in your selected currency and are inclusive of applicable taxes unless stated otherwise. We reserve the right to amend pricing at any time without notice. In the event of a pricing error, we will contact you prior to processing your order.
        </Section>

        <Section title="3. Orders & payment">
          Placing an order constitutes an offer to purchase. We reserve the right to decline any order at our sole discretion. Payment must be received in full before an order is dispatched. We currently accept major debit and credit cards via Stripe.
        </Section>

        <Section title="4. Shipping & delivery">
          Delivery times are estimates and are not guaranteed. LOOK is not responsible for delays caused by third-party carriers, customs, or circumstances beyond our control. Risk of loss and title for items pass to you upon delivery.
        </Section>

        <Section title="5. Returns & refunds">
          You may return unworn, unwashed items in original packaging within 30 days of delivery. Sale items are final sale. Refunds are issued to the original payment method within 5–10 business days of receiving your return. Shipping costs are non-refundable.
        </Section>

        <Section title="6. Intellectual property">
          All content on this site — including images, copy, branding, and design — is the exclusive property of LOOK and may not be reproduced, distributed, or used without prior written consent.
        </Section>

        <Section title="7. Limitation of liability">
          To the fullest extent permitted by law, LOOK shall not be liable for any indirect, incidental, or consequential damages arising from your use of our site or products. Our total liability shall not exceed the amount paid for your order.
        </Section>

        <Section title="8. Governing law">
          These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
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
      <h2
        className="text-base font-normal text-stone-900"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {title}
      </h2>
      <p className="text-stone-600 leading-relaxed">{children}</p>
    </div>
  );
}