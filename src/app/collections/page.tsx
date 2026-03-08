import { getAllCategories } from "@/server/services/product.service";
import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "Collections — LOOK" };

export default async function CollectionsPage() {
  const categories = await getAllCategories();

  // Get product count per category
  const counts = await Promise.all(
    categories.map((cat) =>
      db.product.count({
        where: { categoryId: cat.id, isArchived: false },
      })
    )
  );

  return (
    <main className="min-h-screen bg-[#fafaf8]">
      {/* Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <p className="text-xs tracking-[0.5em] uppercase text-stone-400 mb-4">
            Browse by category
          </p>
          <h1
            className="text-5xl font-light text-stone-900 leading-none tracking-tight"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Collections
          </h1>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group relative overflow-hidden bg-stone-100"
              style={{ aspectRatio: i === 0 ? "16/9" : "4/3" }}
            >
              {cat.imageUrl ? (
                <Image
                  src={cat.imageUrl}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-linear-to-br from-stone-200 to-stone-300" />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-stone-900/80 via-stone-900/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <p className="text-[9px] tracking-[0.4em] uppercase text-stone-400 mb-2">
                  {counts[i]} pieces
                </p>
                <h2
                  className="text-3xl font-light text-white leading-none mb-3"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {cat.name}
                </h2>
                {cat.description && (
                  <p className="text-sm text-stone-300 leading-relaxed max-w-xs mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {cat.description}
                  </p>
                )}
                <span className="inline-flex items-center gap-2 text-xs tracking-[0.35em] uppercase text-white/80 group-hover:text-white transition-colors">
                  Shop now
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      d="M1 4h10M7.5 1 11 4l-3.5 3"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>

              {/* Corner index */}
              <div className="absolute top-6 right-6">
                <span
                  className="text-4xl font-light text-white/20"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}