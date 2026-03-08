import Category from "@/components/home/Category";
import Hero from "@/components/home/Hero";
import Advertisement from "@/components/shared/Advertisement";
import FeaturedProducts from "@/components/shared/FeaturedProducts";
import Newsletter from "@/components/shared/Newsletter";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <Hero />

      {/* Category strip */}
      <Category />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Advertiement */}
      <Advertisement />

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}
