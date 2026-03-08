import type { Metadata } from "next";
import FaqClient from "./faq-client";

export const metadata: Metadata = {
  title: "FAQ — LOOK",
  description: "Answers to frequently asked questions about orders, shipping, returns and more.",
};

export default function FaqPage() {
  return <FaqClient />;
}