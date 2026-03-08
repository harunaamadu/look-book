"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Filter = "all" | "new" | "sale";

const tabs: { label: string; value: Filter }[] = [
  { label: "All",     value: "all" },
  { label: "New In",  value: "new" },
  { label: "Sale",    value: "sale" },
];

export default function FilterTabs({ active }: { active: Filter }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function navigate(filter: Filter) {
    const params = new URLSearchParams(searchParams.toString());
    if (filter === "all") {
      params.delete("filter");
    } else {
      params.set("filter", filter);
    }
    params.delete("page");
    router.push(`/products?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-1 border border-stone-200 p-1 bg-white/50 backdrop-blur-sm">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => navigate(tab.value)}
          className={`px-5 py-2 text-[10px] tracking-[0.3em] uppercase transition-all duration-200 ${
            active === tab.value
              ? "bg-stone-900 text-white"
              : "text-stone-500 hover:text-stone-900 hover:bg-stone-100"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}