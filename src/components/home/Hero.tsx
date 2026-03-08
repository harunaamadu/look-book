import { getHeroSlides } from "@/server/services/hero.service";
import HeroCarousel from "./hero-carousel";

export default async function Hero() {
  const slides = await getHeroSlides();
  return <HeroCarousel slides={slides} />;
}