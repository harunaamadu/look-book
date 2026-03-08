import { db } from "@/lib/db";
import SectionTitle from "@/components/ui/section-title";
import ProductCard from "./ProductCard";
import Reveal from "../animations/reveal";

export default async function FeaturedProducts() {
  const products = await db.product.findMany({
    where: { isFeatured: true, isArchived: false },
    orderBy: { createdAt: "desc" },
    take: 4,
    include: {
      images: { orderBy: { order: "asc" } },
      category: true,
      variants: true,
    },
  });

  if (!products.length) return null;

  return (
    <Reveal>
      <section className="max-w-7xl mx-auto px-6 py-20" data-reveal>
        <SectionTitle
          eyebrow="Hand-picked for you"
          title="Featured Pieces"
          subtitle="Timeless silhouettes and refined details, curated from this season's collection."
          variant="homepage"
          viewAllHref="/products"
          viewAllLabel="View All"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
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
      </section>
    </Reveal>
  );
}
