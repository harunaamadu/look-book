import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env") });

import { PrismaClient } from "../src/generated/prisma";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const sizes = ["XS", "S", "M", "L", "XL"];

const colors = [
  { color: "Ivory", colorHex: "#FFFFF0" },
  { color: "Stone", colorHex: "#8a7e6e" },
  { color: "Noir", colorHex: "#1a1a18" },
  { color: "Blush", colorHex: "#e8b4a0" },
  { color: "Slate", colorHex: "#6b7280" },
  { color: "Camel", colorHex: "#c8a882" },
];

function generateVariants(colorCount = 2, sizeCount = 5) {
  const selectedColors = colors.slice(0, colorCount);
  return selectedColors.flatMap(({ color, colorHex }) =>
    sizes.slice(0, sizeCount).map((size) => ({
      size,
      color,
      colorHex,
      stock: Math.floor(Math.random() * 20) + 1,
      sku: `${color.toUpperCase().slice(0, 3)}-${size}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    })),
  );
}

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  console.log("🌱 Seeding...");

  // ... rest of your seed code

  // ── Hero slides ──────────────────────────────────────────
  await prisma.heroSlide.deleteMany();
  await prisma.heroSlide.createMany({
    data: [
      { src: "/images/hero_1.png", label: "Look 01", order: 1 },
      { src: "/images/hero_2.png", label: "Look 02", order: 2 },
      { src: "/images/hero_1.png", label: "Look 03", order: 3 },
      { src: "/images/hero_2.png", label: "Look 04", order: 4 },
      { src: "/images/hero_1.png", label: "Look 05", order: 5 },
    ],
  });
  console.log("✅ Hero slides seeded");

  // ── Categories ───────────────────────────────────────────
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Dresses",
        slug: "dresses",
        description: "Effortless silhouettes for every occasion",
        imageUrl: "/images/categories/dresses.jpg",
      },
    }),
    prisma.category.create({
      data: {
        name: "Tops",
        slug: "tops",
        description: "Refined tops and blouses",
        imageUrl: "/images/categories/tops.jpg",
      },
    }),
    prisma.category.create({
      data: {
        name: "Trousers",
        slug: "trousers",
        description: "Tailored trousers and wide-leg cuts",
        imageUrl: "/images/categories/trousers.jpg",
      },
    }),
    prisma.category.create({
      data: {
        name: "Outerwear",
        slug: "outerwear",
        description: "Coats and jackets for every season",
        imageUrl: "/images/categories/outerwear.jpg",
      },
    }),
    prisma.category.create({
      data: {
        name: "Accessories",
        slug: "accessories",
        description: "The finishing touch",
        imageUrl: "/images/categories/accessories.jpg",
      },
    }),
  ]);

  const [dresses, tops, trousers, outerwear, accessories] = categories;
  console.log("✅ Categories seeded");

  // ── Products ─────────────────────────────────────────────
  const products = [
    // DRESSES
    {
      name: "Linen Wrap Dress",
      slug: "linen-wrap-dress",
      description:
        "A relaxed wrap silhouette in breathable European linen. Features a deep V-neckline, adjustable tie waist, and fluid midi length. Perfect for warm evenings.",
      price: 285,
      compareAt: 340,
      categoryId: dresses.id,
      isFeatured: true,
      images: [
        {
          url: "/images/products/dress-1-1.jpg",
          alt: "Linen Wrap Dress front",
          order: 0,
        },
        {
          url: "/images/products/dress-1-2.jpg",
          alt: "Linen Wrap Dress detail",
          order: 1,
        },
        {
          url: "/images/products/dress-1-3.jpg",
          alt: "Linen Wrap Dress back",
          order: 2,
        },
      ],
      variants: generateVariants(3, 5),
    },
    {
      name: "Silk Slip Dress",
      slug: "silk-slip-dress",
      description:
        "Cut from pure silk charmeuse, this minimalist slip dress moves beautifully with the body. Adjustable spaghetti straps and a subtle bias cut.",
      price: 420,
      categoryId: dresses.id,
      isFeatured: true,
      images: [
        {
          url: "/images/products/dress-2-1.jpg",
          alt: "Silk Slip Dress front",
          order: 0,
        },
        {
          url: "/images/products/dress-2-2.jpg",
          alt: "Silk Slip Dress side",
          order: 1,
        },
      ],
      variants: generateVariants(4, 4),
    },
    {
      name: "Cotton Shirt Dress",
      slug: "cotton-shirt-dress",
      description:
        "A structured shirt dress in crisp organic cotton. Features a relaxed fit, button-through front, and patch pockets. Styled with or without the belt.",
      price: 195,
      categoryId: dresses.id,
      images: [
        {
          url: "/images/products/dress-3-1.jpg",
          alt: "Cotton Shirt Dress",
          order: 0,
        },
        {
          url: "/images/products/dress-3-2.jpg",
          alt: "Cotton Shirt Dress belted",
          order: 1,
        },
      ],
      variants: generateVariants(2, 5),
    },

    // TOPS
    {
      name: "Gathered Linen Blouse",
      slug: "gathered-linen-blouse",
      description:
        "A delicate blouse with gathered shoulders and wide sleeves. Made from washed linen for a softly lived-in feel.",
      price: 145,
      categoryId: tops.id,
      isFeatured: true,
      images: [
        {
          url: "/images/products/top-1-1.webp",
          alt: "Gathered Linen Blouse",
          order: 0,
        },
        {
          url: "/images/products/top-1-2.webp",
          alt: "Gathered Linen Blouse detail",
          order: 1,
        },
        {
          url: "/images/products/top-1-3.webp",
          alt: "Gathered Linen Blouse detail",
          order: 2,
        },
        {
          url: "/images/products/top-1-4.webp",
          alt: "Gathered Linen Blouse detail",
          order: 3,
        },
      ],
      variants: generateVariants(3, 5),
    },
    {
      name: "Knit Tank Top",
      slug: "knit-tank-top",
      description:
        "A fine-knit tank in a relaxed fit. Versatile layering piece made from a soft cotton-modal blend.",
      price: 85,
      compareAt: 110,
      categoryId: tops.id,
      images: [
        { url: "/images/products/top-2-1.jpg", alt: "Knit Tank Top", order: 0 },
      ],
      variants: generateVariants(4, 5),
    },
    {
      name: "Oversized Poplin Shirt",
      slug: "oversized-poplin-shirt",
      description:
        "An oversized shirt in crisp poplin cotton. Drop shoulders, a slightly elongated hem, and a relaxed boxy silhouette.",
      price: 165,
      categoryId: tops.id,
      images: [
        {
          url: "/images/products/top-3-1.jpg",
          alt: "Oversized Poplin Shirt",
          order: 0,
        },
        {
          url: "/images/products/top-3-2.jpg",
          alt: "Oversized Poplin Shirt tucked",
          order: 1,
        },
      ],
      variants: generateVariants(2, 5),
    },

    // TROUSERS
    {
      name: "Wide Leg Linen Trousers",
      slug: "wide-leg-linen-trousers",
      description:
        "High-waisted wide-leg trousers in Italian linen. A clean, minimal silhouette with side pockets and a concealed zip.",
      price: 235,
      categoryId: trousers.id,
      isFeatured: true,
      images: [
        {
          url: "/images/products/trouser-1-1.webp",
          alt: "Wide Leg Linen Trousers",
          order: 0,
        },
        {
          url: "/images/products/trouser-1-2.webp",
          alt: "Wide Leg Linen Trousers detail",
          order: 1,
        },
        {
          url: "/images/products/trouser-1-3.webp",
          alt: "Wide Leg Linen Trousers detail",
          order: 2,
        },
        {
          url: "/images/products/trouser-1-4.webp",
          alt: "Wide Leg Linen Trousers detail",
          order: 3,
        },
      ],
      variants: generateVariants(3, 5),
    },
    {
      name: "Tailored Cigarette Pants",
      slug: "tailored-cigarette-pants",
      description:
        "Slim-cut cigarette pants in a stretch wool blend. Sits at the natural waist with a clean front crease.",
      price: 210,
      categoryId: trousers.id,
      images: [
        {
          url: "/images/products/trouser-2-1.jpg",
          alt: "Tailored Cigarette Pants",
          order: 0,
        },
      ],
      variants: generateVariants(2, 5),
    },

    // OUTERWEAR
    {
      name: "Oversized Wool Coat",
      slug: "oversized-wool-coat",
      description:
        "A statement coat in a double-faced wool-cashmere blend. Relaxed oversized fit, notch lapels, and two deep patch pockets.",
      price: 695,
      compareAt: 850,
      categoryId: outerwear.id,
      isFeatured: true,
      images: [
        {
          url: "/images/products/coat-1-1.webp",
          alt: "Oversized Wool Coat front",
          order: 0,
        },
        {
          url: "/images/products/coat-1-2.webp",
          alt: "Oversized Wool Coat back",
          order: 1,
        },
        {
          url: "/images/products/coat-1-3.webp",
          alt: "Oversized Wool Coat detail",
          order: 3,
        },
        {
          url: "/images/products/coat-1-4.webp",
          alt: "Oversized Wool Coat detail",
          order: 4,
        },
      ],
      variants: generateVariants(3, 4),
    },
    {
      name: "Trench Coat",
      slug: "trench-coat",
      description:
        "A classic trench in water-resistant cotton gabardine. Double-breasted front, belted waist, and storm flap detail.",
      price: 545,
      categoryId: outerwear.id,
      images: [
        { url: "/images/products/coat-2-1.webp", alt: "Trench Coat", order: 0 },
        {
          url: "/images/products/coat-2-2.webp",
          alt: "Trench Coat belted",
          order: 1,
        },
        {
          url: "/images/products/coat-2-3.webp",
          alt: "Trench Coat belted",
          order: 2,
        },
        {
          url: "/images/products/coat-2-4.webp",
          alt: "Trench Coat belted",
          order: 3,
        },
      ],
      variants: generateVariants(2, 4),
    },

    // ACCESSORIES
    {
      name: "Leather Tote Bag",
      slug: "leather-tote-bag",
      description:
        'A structured tote in full-grain vegetable-tanned leather. Develops a beautiful patina over time. Fits a 13" laptop.',
      price: 385,
      categoryId: accessories.id,
      isFeatured: true,
      images: [
        {
          url: "/images/products/bag-1-1.jpg",
          alt: "Leather Tote Bag",
          order: 0,
        },
        {
          url: "/images/products/bag-1-2.jpg",
          alt: "Leather Tote Bag interior",
          order: 1,
        },
      ],
      variants: [
        { color: "Noir", colorHex: "#1a1a18", stock: 8, sku: "BAG-NOIR-001" },
        { color: "Camel", colorHex: "#c8a882", stock: 12, sku: "BAG-CAML-001" },
        { color: "Stone", colorHex: "#8a7e6e", stock: 6, sku: "BAG-STON-001" },
      ],
    },
    {
      name: "Silk Scarf",
      slug: "silk-scarf",
      description:
        "A 90x90cm silk twill scarf with an original hand-drawn print. Can be worn as a headscarf, neck tie, or bag accessory.",
      price: 125,
      categoryId: accessories.id,
      images: [
        { url: "/images/products/scarf-1-1.jpg", alt: "Silk Scarf", order: 0 },
        {
          url: "/images/products/scarf-1-2.jpg",
          alt: "Silk Scarf styled",
          order: 1,
        },
      ],
      variants: [
        {
          color: "Ivory",
          colorHex: "#FFFFF0",
          stock: 15,
          sku: "SCARF-IVY-001",
        },
        {
          color: "Blush",
          colorHex: "#e8b4a0",
          stock: 10,
          sku: "SCARF-BLS-001",
        },
        { color: "Slate", colorHex: "#6b7280", stock: 8, sku: "SCARF-SLT-001" },
      ],
    },
  ];

  for (const { images, variants, ...product } of products) {
    await prisma.product.create({
      data: {
        ...product,
        images: { create: images },
        variants: { create: variants },
      },
    });
  }

  try {
    console.log("🌱 Seeding...");

    // ... all your seed code ...

    console.log(`✅ ${products.length} products seeded`);
    console.log("🎉 Seeding complete!");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
