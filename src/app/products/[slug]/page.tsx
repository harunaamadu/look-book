import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getRelatedProducts,
} from "@/server/services/product.service";
import SectionTitle from "@/components/ui/section-title";
import Link from "next/link";
import ProductCard from "@/components/shared/ProductCard";
import AccordionItem from "@/components/shared/AccordionItem";
import ProductDetails from "@/components/shared/ProductDetails";
import ProductGallery from "@/components/shared/ProductGallery";
import ProductReviews from "@/components/shared/ProductReviews";
import { getProductRatingSummary } from "@/server/actions/review.actions";
import WishlistButton from "@/components/shared/WishlistButton";
import { auth } from "@/auth";
import { isWishlisted } from "@/server/actions/wishlist.actions";
import { formatPrice } from "@/lib/currencies";
  import { getCurrency } from "@/lib/get-currency";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Not Found" };
  return {
    title: `${product.name} — LOOK`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const [product, session] = await Promise.all([
    getProductBySlug(slug),
    auth(),
  ]);
  if (!product) notFound();

  const related = await getRelatedProducts(product.categoryId, product.id);
  const isOnSale = product.compareAt && product.compareAt > product.price;
  const discount = isOnSale
    ? Math.round(
        ((product.compareAt! - product.price) / product.compareAt!) * 100,
      )
    : null;

  const [summary, wishlisted] = await Promise.all([
    getProductRatingSummary(product.id),
    isWishlisted(product.id),
  ]);

  const currency = await getCurrency();

  return (
    <main className="min-h-screen bg-[#fafaf8]">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-0">
        <nav className="flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-stone-400">
          <Link href="/" className="hover:text-stone-900 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/products"
            className="hover:text-stone-900 transition-colors"
          >
            Shop
          </Link>
          <span>/</span>
          <Link
            href={`/products?category=${product.category.slug}`}
            className="hover:text-stone-900 transition-colors"
          >
            {product.category.name}
          </Link>
          <span>/</span>
          <span className="text-stone-600">{product.name}</span>
        </nav>
      </div>

      {/* Product section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Left — Gallery */}
          <ProductGallery images={product.images} name={product.name} />

          {/* Right — Details */}
          <div className="flex flex-col lg:sticky lg:top-24 lg:self-start">
            {/* Category + badges */}
            <div className="flex items-center gap-3 mb-4">
              <Link
                href={`/products?category=${product.category.slug}`}
                className="text-[9px] tracking-[0.4em] uppercase text-stone-400 hover:text-stone-900 transition-colors"
              >
                {product.category.name}
              </Link>
              {discount && (
                <span className="bg-stone-900 text-white text-[9px] tracking-[0.2em] uppercase px-2 py-0.5">
                  −{discount}%
                </span>
              )}
            </div>

            {/* Name */}
            <h2 className="text-2xl xl:text-4xl font-normal text-stone-900 leading-tight tracking-tight mb-6">
              {product.name}
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-xl text-stone-900">
                {formatPrice(product.price, currency)}
              </span>
              {isOnSale && (
                <span className="text-base text-stone-400 line-through">
                  {formatPrice(product.compareAt!, currency)}{" "}
                  {/* ← was raw $.toFixed(2) */}
                </span>
              )}
            </div>

            {/* Variant selector + add to cart */}
            <ProductDetails product={product} summary={summary} />

            <WishlistButton
              productId={product.id}
              productSlug={product.slug}
              initialWishlisted={wishlisted}
              isSignedIn={!!session?.user}
            />

            {/* Description */}
            {product.description && (
              <div className="mt-10 pt-8 border-t border-stone-200">
                <p className="text-xs tracking-[0.4em] uppercase text-stone-400 mb-3">
                  Description
                </p>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Details accordion */}
            <div className="mt-6 space-y-0 border-t border-stone-200">
              {[
                {
                  label: "Materials & Care",
                  content:
                    "100% natural fibres. Hand wash or dry clean recommended. Do not tumble dry.",
                },
                {
                  label: "Shipping & Returns",
                  content:
                    "Free standard shipping on orders over $150. Free returns within 30 days.",
                },
                {
                  label: "Sizing",
                  content:
                    "Model is 5'9\" and wears a size S. See our size guide for full measurements.",
                },
              ].map((item) => (
                <AccordionItem
                  key={item.label}
                  label={item.label}
                  content={item.content}
                />
              ))}
            </div>
          </div>

          <ProductReviews productId={product.id} productSlug={product.slug} />
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16 border-t border-stone-200">
          <SectionTitle
            eyebrow="You may also like"
            title="Related Pieces"
            variant="shop"
            viewAllHref={`/products?category=${product.category.slug}`}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {related.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                slug={p.slug}
                price={p.price}
                compareAt={p.compareAt}
                images={p.images}
                category={p.category}
                variants={p.variants}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
