import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/currencies";
import { getCurrency } from "@/lib/get-currency";

export default async function Advertisement() {
  const currency = await getCurrency();
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left — large card */}
        <div className="relative overflow-hidden bg-stone-900 group h-130">
          <Image
            src="/images/hero_1.png"
            alt="New collection"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-stone-900/80 via-stone-900/20 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 p-8 flex flex-col gap-4">
            <div>
              <p className="text-[9px] tracking-[0.5em] uppercase text-stone-300 mb-2">
                New season
              </p>
              <h2 className="text-4xl font-bold text-white leading-tight tracking-tight">
                The Summer
                <br />
                Edit
              </h2>
            </div>
            <p className="text-sm text-stone-300 leading-relaxed max-w-xs">
              Effortless pieces for warmer days. Lightweight fabrics, refined
              silhouettes.
            </p>
            <Link
              href="/products?filter=new"
              className="self-start bg-white text-stone-900 px-7 py-3 text-[10px] tracking-[0.35em] uppercase hover:bg-stone-100 transition-colors"
            >
              Shop now
            </Link>
          </div>
        </div>

        {/* Right — stacked cards */}
        <div className="flex flex-col gap-6">
          {/* Top right */}
          <div className="relative overflow-hidden bg-[#e8e0d5] group h-62">
            <Image
              src="/images/beauty-personal-care.jpg"
              alt="Sale"
              fill
              sizes="(max-width: 1024px) 100vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-r from-stone-900/60 to-transparent" />

            <div className="absolute inset-0 p-8 flex flex-col justify-end gap-3">
              <div>
                <p className="text-[9px] tracking-[0.5em] uppercase text-stone-200 mb-1">
                  Up to 40% off
                </p>
                <h3 className="text-2xl font-bold text-white leading-tight">
                  End of Season
                  <br />
                  Sale
                </h3>
              </div>
              <Link
                href="/products?filter=sale"
                className="self-start text-[10px] tracking-[0.35em] uppercase text-white border-b border-white/50 hover:border-white pb-0.5 transition-colors"
              >
                Shop sale →
              </Link>
            </div>
          </div>

          {/* Bottom right */}
          <div className="relative overflow-hidden bg-stone-100 group h-62 flex">
            {/* Text side */}
            <div className="relative z-10 flex flex-col justify-center gap-4 p-8 w-1/2">
              <div>
                <p className="text-[9px] tracking-[0.5em] uppercase text-stone-400 mb-2">
                  Exclusive offer
                </p>
                <h3 className="text-2xl font-bold text-stone-900 leading-tight">
                  Free
                  <br />
                  Shipping
                </h3>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed">
                On all orders over {formatPrice(150, currency)}. No code needed.
              </p>
              <Link
                href="/products"
                className="self-start text-[10px] tracking-[0.35em] uppercase text-stone-900 border-b border-stone-400 hover:border-stone-900 pb-0.5 transition-colors"
              >
                Explore →
              </Link>
            </div>

            {/* Image side */}
            <div className="relative w-1/2 overflow-hidden">
              <Image
                src="/images/woman.png"
                alt="Free shipping"
                fill
                sizes="25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
