"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/animations/reveal";

interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
}

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <Reveal>
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.slug}`}
            data-reveal
            className="group relative aspect-3/4 bg-muted flex items-end p-8 overflow-hidden rounded-xl"
          >
            <Image
              src={cat.imageUrl ?? `/images/${cat.slug}_img.jpg`}
              alt={cat.name}
              width={400}
              height={500}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-linear-to-t from-stone-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <span className="relative text-2xl font-light text-white tracking-wide capitalize">
              {cat.name}
            </span>
          </Link>
        ))}
      </section>
    </Reveal>
  );
}