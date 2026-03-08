import type { Metadata } from "next";
import LegalLayout from "@/components/shared/LegalLayout";

export const metadata: Metadata = { title: "Careers — LOOK" };

const roles = [
  {
    title: "Senior Full-Stack Engineer",
    team: "Technology",
    location: "London / Remote",
    type: "Full-time",
  },
  {
    title: "Buying & Merchandising Manager",
    team: "Product",
    location: "London",
    type: "Full-time",
  },
  {
    title: "Brand & Content Strategist",
    team: "Marketing",
    location: "London / Hybrid",
    type: "Full-time",
  },
  {
    title: "Customer Experience Lead",
    team: "Operations",
    location: "Remote",
    type: "Full-time",
  },
];

const values = [
  {
    label: "Craft over speed",
    body: "We build things properly the first time. Quality is not negotiable.",
  },
  {
    label: "Radical transparency",
    body: "We share context openly. No politics, no silos.",
  },
  {
    label: "Long-term thinking",
    body: "We optimise for sustainable growth, not vanity metrics.",
  },
  {
    label: "Rest as a feature",
    body: "Burnout is a bug. We work reasonable hours and mean it.",
  },
];

export default function CareersPage() {
  return (
    <LegalLayout
      eyebrow="Company"
      title="Careers"
      subtitle="We're building the future of considered fashion. Join us."
      dark
    >
      <div className="flex flex-col gap-14">
        {/* Values */}
        <div className="flex flex-col gap-6">
          <h2
            className="text-xl font-semibold text-white"
          >
            How we work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v) => (
              <div
                key={v.label}
                className="border border-stone-700 p-5 flex flex-col gap-2"
              >
                <p
                  className="text-sm font-semibold text-white"
                >
                  {v.label}
                </p>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Open roles */}
        <div className="flex flex-col gap-6">
          <h2
            className="text-xl font-semibold text-white"
          >
            Open roles
          </h2>
          <div className="flex flex-col gap-3">
            {roles.map((role) => (
              <div
                key={role.title}
                className="border border-stone-700 hover:border-stone-400 transition-colors p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer"
              >
                <div className="flex flex-col gap-1.5">
                  <p
                    className="text-base font-semibold text-white group-hover:text-stone-200 transition-colors"
                  >
                    {role.title}
                  </p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs tracking-[0.3em] uppercase text-stone-400">
                      {role.team}
                    </span>
                    <span className="text-stone-300">·</span>
                    <span className="text-xs tracking-[0.3em] uppercase text-stone-500">
                      {role.location}
                    </span>
                    <span className="text-stone-300">·</span>
                    <span className="text-xs tracking-[0.3em] uppercase text-stone-400">
                      {role.type}
                    </span>
                  </div>
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="shrink-0 text-stone-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-200"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Speculative */}
        <div className="border border-stone-700 p-8 flex flex-col gap-4">
          <p className="text-sm tracking-[0.5em] uppercase text-stone-400">
            Don't see your role?
          </p>
          <p
            className="text-lg font-semibold text-white"
          >
            We always want to hear from exceptional people.
          </p>
          <p className="text-xs text-stone-300 leading-relaxed max-w-sm">
            Send your CV and a short note about what you'd bring to LOOK to
            careers@look.com. We read every application.
          </p>
          <a
            href="mailto:careers@look.com"
            className="self-start bg-white text-stone-900 px-7 py-3 text-xs tracking-[0.35em] uppercase hover:bg-stone-200 transition-colors mt-2"
          >
            Get in touch
          </a>
        </div>
      </div>
    </LegalLayout>
  );
}
