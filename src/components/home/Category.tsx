import { db } from "@/lib/db";
import CategoryGrid from "./category-grid";

export default async function Category() {
  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
  });

  return <CategoryGrid categories={categories} />;
}