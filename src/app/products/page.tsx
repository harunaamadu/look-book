import { Suspense } from "react";
import {
  getProductsByCategory,
  getProductsCount,
  getAllCategories,
} from "@/server/services/product.service";
import SectionTitle from "@/components/ui/section-title";
import CategoryFilter from "@/components/shared/CategoryFilter";
import FilterTabs from "@/components/shared/FilterTabs";
import Link from "next/link";
import ProductCard from "@/components/shared/ProductCard";
import SortSelect from "@/components/shared/SortSelect";
import { Badge } from "@/components/ui/badge";

const PER_PAGE = 12;

type Filter = "all" | "new" | "sale";

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    page?: string;
    filter?: string;
    sort?: string;
  }>;
}

type PageConfig = {
  eyebrow: string;
  title: string;
  subtitle: string;
  badge?: string;
  badgeColor?: string;
};

const PAGE_CONFIG: Record<Filter, PageConfig> = {
  all: {
    eyebrow: "Our Collection",
    title: "All Products",
    subtitle: "Timeless pieces for the modern wardrobe.",
  },
  new: {
    eyebrow: "Just Arrived",
    title: "New In",
    subtitle: "The latest additions to our collection — fresh this season.",
    badge: "New",
    badgeColor: "bg-stone-900 text-white",
  },
  sale: {
    eyebrow: "Limited Time",
    title: "Sale",
    subtitle: "Curated pieces at reduced prices. While stocks last.",
    badge: "Sale",
    badgeColor: "bg-red-600 text-white",
  },
};

export async function generateMetadata({
  searchParams,
}: ShopPageProps) {
  const { filter } = await searchParams;
  const f = (filter as Filter) ?? "all";
  const config = PAGE_CONFIG[f] ?? PAGE_CONFIG.all;
  return { title: `${config.title} — LOOK` };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category, page, filter, sort } = await searchParams;

  const activeFilter = (filter as Filter) ?? "all";
  const activeCategory = category ?? "all";
  const currentPage = Number(page ?? 1);
  const skip = (currentPage - 1) * PER_PAGE;

  const config = PAGE_CONFIG[activeFilter] ?? PAGE_CONFIG.all;

  const [products, total, categories] = await Promise.all([
    getProductsByCategory(
      activeCategory === "all" ? undefined : activeCategory,
      PER_PAGE,
      skip,
      activeFilter === "all" ? undefined : activeFilter
    ),
    getProductsCount(
      activeCategory === "all" ? undefined : activeCategory,
      activeFilter === "all" ? undefined : activeFilter
    ),
    getAllCategories(),
  ]);

  const totalPages = Math.ceil(total / PER_PAGE);
  const activeCategoryObj = categories.find((c) => c.slug === activeCategory);

  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* Page header */}
      <div
        className={`border-b border-stone-200 ${
          activeFilter === "sale"
            ? "bg-stone-500 bg-[url('/images/sale.jpg')] bg-cover bg-bottom"
            : activeFilter === "new"
            ? "bg-[url('/images/deals.jpg')] bg-cover bg-bottom"
            : "bg-[url('/images/all-product.jpg')] bg-cover bg-center"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="absolute left-1/2 -top-14 -translate-x-1/2 w-screen max-w-7xl mx-auto h-screen z-0 bg-linear-to-l from-black/50 via-black/5 to-black/50" />
            <div className="relative z-1">
              <div className="flex items-center gap-3 mb-4">
                <p
                  className={`text-xs tracking-[0.5em] uppercase ${
                    activeFilter === "sale" ? "text-stone-400" : "text-stone-100"
                  }`}
                >
                  {activeCategoryObj
                    ? `${config.eyebrow} — ${activeCategoryObj.name}`
                    : config.eyebrow}
                </p>
                {config.badge && (
                  <Badge
                    className={`${config.badgeColor} text-xs tracking-[0.25em] uppercase px-2 py-0.5 rounded-none`}
                  >
                    {config.badge}
                  </Badge>
                )}
              </div>

              <h1
                className={`text-5xl font-semibold leading-none tracking-tight ${
                  activeFilter === "sale" ? "text-white" : "text-stone-50"
                }`}
              >
                {activeCategoryObj?.name ?? config.title}
              </h1>

              <p
                className={`mt-4 text-sm leading-relaxed max-w-md ${
                  activeFilter === "sale" ? "text-stone-50" : "text-stone-100"
                }`}
              >
                {config.subtitle}
              </p>
            </div>

            {/* Filter tabs — all / new / sale */}
            <Suspense>
              <FilterTabs active={activeFilter} />
            </Suspense>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10 bg-background">

        {/* Category filter */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Suspense>
            <CategoryFilter categories={categories} active={activeCategory} filter={activeFilter} />
          </Suspense>

          {/* Sort */}
          <Suspense>
            <SortSelect sort={sort} filter={activeFilter} category={activeCategory} />
          </Suspense>
        </div>

        {/* Results count */}
        <p className="text-xs text-stone-400 tracking-widest uppercase mb-10">
          {total} {total === 1 ? "piece" : "pieces"}
          {activeCategoryObj ? ` in ${activeCategoryObj.name}` : ""}
          {activeFilter !== "all" ? ` — ${config.title}` : ""}
        </p>

        {/* Grid */}
        {products.length === 0 ? (
          <EmptyState filter={activeFilter} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-14">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                slug={product.slug}
                price={product.price}
                compareAt={product.compareAt}
                images={product.images}
                category={product.category}
                variants={product.variants}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-20">
            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              const params = new URLSearchParams({
                ...(activeCategory !== "all" && { category: activeCategory }),
                ...(activeFilter !== "all" && { filter: activeFilter }),
                page: String(p),
              });
              return (
                <Link
                  key={p}
                  href={`/products?${params}`}
                  className={`w-9 h-9 flex items-center justify-center text-xs tracking-widest transition-all ${
                    currentPage === p
                      ? "bg-stone-900 text-white"
                      : "border border-stone-300 text-stone-500 hover:border-stone-900 hover:text-stone-900"
                  }`}
                >
                  {p}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

// ── Empty state ────────────────────────────────────────────
function EmptyState({ filter }: { filter: Filter }) {
  return (
    <div className="py-32 text-center">
      <p className="text-stone-400 text-sm tracking-wide mb-4">
        {filter === "new"
          ? "No new arrivals at the moment."
          : filter === "sale"
          ? "No sale items available right now."
          : "No products found."}
      </p>
      <Link
        href="/products"
        className="text-xs tracking-[0.35em] uppercase text-stone-500 underline underline-offset-4 hover:text-stone-900 transition-colors"
      >
        View all products
      </Link>
    </div>
  );
}