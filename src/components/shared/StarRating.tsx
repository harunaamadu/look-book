"use client";

interface StarRatingProps {
  rating: number;        // 0–5, supports decimals for display
  interactive?: boolean;
  size?: "sm" | "md" | "lg";
  onRate?: (rating: number) => void;
}

const sizes = { sm: 12, md: 16, lg: 22 };

export default function StarRating({
  rating,
  interactive = false,
  size = "md",
  onRate,
}: StarRatingProps) {
  const px = sizes[size];

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const partial = !filled && rating >= star - 0.5;

        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => onRate?.(star)}
            className={`relative transition-transform ${
              interactive ? "hover:scale-110 cursor-pointer" : "cursor-default"
            }`}
            style={{ width: px, height: px }}
          >
            <svg viewBox="0 0 24 24" width={px} height={px}>
              {/* Background star (empty) */}
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill="none"
                stroke="#d6d3d1"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              {/* Filled portion */}
              {(filled || partial) && (
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill={filled ? "#1a1a18" : "url(#half)"}
                  stroke="#1a1a18"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              )}
              {partial && (
                <defs>
                  <linearGradient id="half">
                    <stop offset="50%" stopColor="#1a1a18" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              )}
            </svg>
          </button>
        );
      })}
    </div>
  );
}