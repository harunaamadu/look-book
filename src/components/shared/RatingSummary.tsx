import StarRating from "./StarRating";

interface RatingSummaryProps {
  average: number;
  total: number;
  breakdown: Record<number, number>;
}

export default function RatingSummary({ average, total, breakdown }: RatingSummaryProps) {
  if (total === 0) return null;

  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center">

      {/* Big average */}
      <div className="flex flex-col items-center gap-2 shrink-0">
        <span
          className="text-6xl font-light text-stone-900 leading-none"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {average.toFixed(1)}
        </span>
        <StarRating rating={average} size="sm" />
        <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400">
          {total} {total === 1 ? "review" : "reviews"}
        </p>
      </div>

      {/* Breakdown bars */}
      <div className="hidden flex-1 w-full md:flex flex-col gap-1">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = breakdown[star] ?? 0;
          const pct = total > 0 ? (count / total) * 100 : 0;
          return (
            <div key={star} className="flex items-center gap-1">
              <span className="text-[10px] tracking-wide text-stone-500 w-4 text-right shrink-0">
                {star}
              </span>
              <svg width="10" height="10" viewBox="0 0 24 24" className="shrink-0">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill="#1a1a18"
                />
              </svg>
              <div className="flex-1 h-1.5 bg-stone-100 overflow-hidden">
                <div
                  className="h-full bg-stone-900 transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-[10px] text-stone-400 w-6 shrink-0">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}