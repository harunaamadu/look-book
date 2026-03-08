import type { Metadata } from "next";
import SizeGuideClient from "./size-guide-client";

export const metadata: Metadata = {
  title: "Size Guide — LOOK",
  description: "Find your perfect fit with our detailed size guide and measurement instructions.",
};

export default function SizeGuidePage() {
  return <SizeGuideClient />;
}