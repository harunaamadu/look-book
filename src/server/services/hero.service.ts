import "server-only";
import { db } from "@/lib/db";

export async function getHeroSlides() {
  return db.heroSlide.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
}