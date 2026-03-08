import type { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Us — LOOK",
  description: "Get in touch with the LOOK team. We'd love to hear from you.",
};

export default function ContactPage() {
  return <ContactClient />;
}