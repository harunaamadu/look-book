import Link from "next/link";

const pages = [
  { label: "Terms",         href: "/terms" },
  { label: "Privacy",       href: "/privacy" },
  { label: "Cookies",       href: "/cookies" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Press",         href: "/press" },
  { label: "Careers",       href: "/careers" },
];

export default function LegalLayout({
  children,
  title,
  subtitle,
  eyebrow,
  dark = false,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  dark?: boolean;
}) {
  return (
    <main className={`min-h-screen ${dark ? "bg-[#1a1a18] text-stone-300" : "bg-[#fafaf8] text-stone-700"}`}>

      {/* Header */}
      <div className={`border-b ${dark ? "border-stone-800 bg-[#141412]" : "border-stone-200 bg-white"}`}>
        <div className="max-w-5xl mx-auto px-6 py-16">
          {eyebrow && (
            <p className={`text-xs tracking-[0.55em] uppercase mb-4 ${dark ? "text-stone-400" : "text-stone-400"}`}>
              {eyebrow}
            </p>
          )}
          <h1
            className={`text-5xl font-light leading-none tracking-tight mb-4 ${dark ? "text-white" : "text-stone-900"}`}
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className={`text-sm leading-relaxed max-w-xl ${dark ? "text-stone-300" : "text-stone-400"}`}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-14">

          {/* Sidebar nav */}
          <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 lg:sticky lg:top-24 lg:self-start">
            {pages.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className={`shrink-0 px-3 py-2.5 text-xs tracking-[0.3em] uppercase transition-colors ${
                  dark
                    ? "text-stone-300 hover:text-white"
                    : "text-stone-400 hover:text-stone-900"
                }`}
              >
                {p.label}
              </Link>
            ))}
          </nav>

          {/* Content */}
          <div className="prose-custom">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}