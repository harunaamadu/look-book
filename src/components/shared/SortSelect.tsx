"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortSelect({
  sort,
  filter,
  category,
}: {
  sort?: string;
  filter: string;
  category: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    params.delete("page");
    router.push(`/products?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2">
      <label className="text-[9px] tracking-[0.35em] uppercase text-stone-400">
        Sort
      </label>
      <select
        defaultValue={sort ?? "newest"}
        onChange={handleChange}
        className="text-[10px] tracking-[0.2em] uppercase border border-stone-200 bg-transparent px-3 py-1.5 text-stone-600 focus:outline-none focus:border-stone-900 transition-colors"
      >
        <option value="newest">Newest</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
}