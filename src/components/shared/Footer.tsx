"use client";

import Link from "next/link";
import { WEBSITE_NAME } from "@/lib/constants";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const paymentMethods = [
  {
    label: "Visa",
    bg: "#1A1F71",
    icon: "/images/icons/Visa.svg",
  },
  {
    label: "MasterCard",
    icon: "/images/icons/mastercard.svg",
  },
  {
    label: "Paypal",
    bg: "#1A1F71",
    icon: "/images/icons/PayPal.svg",
  },
  {
    label: "Stripe",
    icon: "/images/icons/stripe.svg",
  },
  {
    label: "Apple Pay",
    bg: "#1A1F71",
    icon: "/images/icons/ApplePay.svg",
  },
  {
    label: "Google Pay",
    bg: "#1A1F71",
    icon: "/images/icons/GooglePay.svg",
  },
  {
    label: "Bitcoin",
    bg: "#1A1F71",
    icon: "/images/icons/Bitcoin.svg",
  },
];

const footerLinks = {
  Shop: [
    { label: "All Products", href: "/products" },
    { label: "New In", href: "/products?filter=new" },
    { label: "Sale", href: "/products?filter=sale" },
    { label: "Collections", href: "/collections" },
  ],
  Help: [
    { label: "Size Guide", href: "/size-guide" },
    { label: "Shipping & Returns", href: "/shipping" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
  ],
  Company: [
    { label: "About LOOK", href: "/about" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Accessibility", href: "/accessibility" },
  ],
};

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "https://pinterest.com",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.23-5.22 1.23-5.22s-.31-.63-.31-1.56c0-1.46.85-2.55 1.9-2.55.9 0 1.33.67 1.33 1.48 0 .9-.58 2.26-.87 3.51-.25 1.05.52 1.9 1.54 1.9 1.85 0 3.09-2.37 3.09-5.18 0-2.14-1.44-3.75-4.04-3.75-2.94 0-4.77 2.2-4.77 4.65 0 .84.24 1.44.62 1.9.17.2.19.28.13.51-.04.17-.14.57-.18.73-.06.23-.24.32-.44.23-1.24-.51-1.82-1.87-1.82-3.4 0-2.52 2.12-5.53 6.33-5.53 3.38 0 5.61 2.44 5.61 5.06 0 3.46-1.92 6.06-4.73 6.06-.95 0-1.84-.51-2.14-1.09l-.59 2.27c-.21.8-.77 1.8-1.15 2.41.87.27 1.79.41 2.75.41 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed bottom-8 right-8 z-50 w-11 h-11 bg-stone-900 text-white flex items-center justify-center shadow-lg hover:bg-stone-700 transition-all duration-300 overflow-hidden group ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="group-hover:animate-bounce"
        >
          <path
            d="M7 12V2M2 7l5-5 5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <footer className="bg-stone-900 text-stone-300 border-t border-accent/20">
        {/* Main footer */}
        <div className="max-w-7xl mx-auto p-6 pt-16">
          <div className="grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-10">
            {/* Brand column */}
            <div className="col-span-2 md:col-span-1 flex flex-col gap-6">
              <Link
                href="/"
                className="text-2xl font-normal tracking-[0.3em] uppercase text-white"
              >
                {WEBSITE_NAME}
              </Link>
              <p className="text-sm text-stone-200 leading-relaxed max-w-xs">
                Curated fashion for the considered wardrobe. Timeless pieces,
                responsibly made.
              </p>

              {/* Socials */}
              <div className="flex items-center gap-4">
                {socialLinks.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="text-stone-400 hover:text-primary transition-colors"
                  >
                    {s.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group} className="flex flex-col gap-4">
                <p className="text-base font-semibold tracking-[0.45em] uppercase text-stone-300">
                  {group}
                </p>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-stone-400 hover:text-secondary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Payment gateways */}
        <div className="max-w-7xl mx-auto px-6 py-5 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs tracking-[0.4em] uppercase text-stone-400">
            Secure Payments
          </p>
          <div className="flex items-center gap-4">
            {paymentMethods.map((method) => (
              <Tooltip key={method.label}>
                <TooltipTrigger
                  asChild
                  title={method.label}
                  className={`opacity-50 hover:opacity-100 transition-opacity p-2 ${!method.bg || "bg-white"}`}
                >
                  <Image
                    src={method.icon}
                    alt={method.label}
                    width={60}
                    height={30}
                    className="object-cover"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{method.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stone-800">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm tracking-wide text-stone-400">
              © {new Date().getFullYear()}{" "}
              <span className="uppercase">{WEBSITE_NAME}</span>. All rights
              reserved.
            </p>

            <p className="text-xs">
              Developed &amp; Designed by{" "}
              <a
                href="https://facebook.com/harunaamadu95"
                target="_blank"
                className=""
              >
                Haruna Amadu ⚡
              </a>
            </p>

            <div className="flex items-center gap-5">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (label) => (
                  <Link
                    key={label}
                    href="#"
                    className="text-sm tracking-wide text-stone-400 hover:text-stone-300 transition-colors"
                  >
                    {label}
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
