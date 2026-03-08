import Link from "next/link";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  variant?: "homepage" | "shop";
  viewAllHref?: string;
  viewAllLabel?: string;
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  variant = "homepage",
  viewAllHref = "/products",
  viewAllLabel = "View All",
}: SectionTitleProps) {
  if (variant === "shop") {
    return (
      <div className="flex items-end justify-between gap-6 mb-10">
        <div>
          {eyebrow && (
            <p className="text-[10px] tracking-[0.45em] uppercase text-stone-400 mb-2">
              {eyebrow}
            </p>
          )}
          <h2
            className="text-3xl font-light text-stone-900 tracking-tight"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1.5 text-sm text-stone-500">{subtitle}</p>
          )}
        </div>

        <Link
          href={viewAllHref}
          className="group shrink-0 inline-flex items-center gap-2.5 text-[11px] tracking-[0.3em] uppercase text-stone-500 hover:text-stone-900 transition-colors"
        >
          {viewAllLabel}
          <span className="w-6 h-px bg-stone-400 group-hover:w-10 group-hover:bg-stone-900 transition-all duration-300" />
        </Link>
      </div>
    );
  }

  // homepage variant — larger, more editorial
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
      <div className="flex-1">
        {eyebrow && (
          <p className="text-[10px] tracking-[0.5em] uppercase text-stone-400 mb-4">
            {eyebrow}
          </p>
        )}
        <h2
          className="text-4xl md:text-5xl font-light text-stone-900 leading-none tracking-tight"
        >
          {title.split(" ").map((word, i) => (
            <span key={i}>
              {i % 2 === 1 ? (
                <em className="not-italic text-stone-400">{word} </em>
              ) : (
                <span>{word} </span>
              )}
            </span>
          ))}
        </h2>
        {subtitle && (
          <p className="mt-4 text-sm text-stone-500 leading-relaxed max-w-md">
            {subtitle}
          </p>
        )}
      </div>

      <Link
        href={viewAllHref}
        className="group inline-flex items-center gap-3 shrink-0 self-start md:self-end"
      >
        <span className="text-[11px] tracking-[0.35em] uppercase text-stone-500 group-hover:text-stone-900 transition-colors">
          {viewAllLabel}
        </span>
        <span className="flex items-center justify-center w-9 h-9 border border-stone-300 group-hover:border-stone-900 group-hover:bg-stone-900 transition-all duration-300">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="text-stone-500 group-hover:text-white transition-colors duration-300"
          >
            <path
              d="M1 6h10M6.5 1.5 11 6l-4.5 4.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </Link>
    </div>
  );
}