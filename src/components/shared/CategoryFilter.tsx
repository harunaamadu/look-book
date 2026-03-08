"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function CategoryFilter({
  categories,
  active,
  filter,
}: {
  categories: Category[];
  active: string;
  filter?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function navigate(slug: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", slug);
    params.delete("page");
    router.push(`/products?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={() => navigate("all")}
        className={`px-4 py-2 text-[10px] tracking-[0.3em] uppercase transition-all border ${
          active === "all"
            ? "bg-stone-900 text-white border-stone-900"
            : "border-stone-300 text-stone-500 hover:border-stone-900 hover:text-stone-900"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => navigate(cat.slug)}
          className={`px-4 py-2 text-[10px] tracking-[0.3em] uppercase transition-all border ${
            active === cat.slug
              ? "bg-stone-900 text-white border-stone-900"
              : "border-stone-300 text-stone-500 hover:border-stone-900 hover:text-stone-900"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}