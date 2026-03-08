import type { Metadata } from "next";
import { Lato, Montserrat } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { auth } from "@/auth";
import CookieConsent from "@/components/shared/CookieConsent";
import CurrencyInitializer from "@/components/shared/CurrencyInitializer";

import { db } from "@/lib/db";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fashio.vercel.app"),
  title: {
    default: "LOOK — Modern Fashion",
    template: "%s | LOOK",
  },
  description: "Curated apparel for the modern wardrobe.",
  keywords: [
    "fashion store",
    "online clothing shop",
    "streetwear",
    "modern fashion",
    "buy clothes online",
    "men fashion",
    "women fashion",
    "trendy outfits",
    "fashion ecommerce",
    "LOOK",
  ],
  authors: [{ name: "LOOK Team" }],
  creator: "LOOK",
  publisher: "LOOK",
  openGraph: {
    title: "Fashio – Premium Online Fashion Store",
    description:
      "Explore the latest fashion trends, premium outfits, and exclusive collections at Fashio.",
    url: "https://fashio.vercel.app",
    siteName: "Fashio",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fashio Fashion Store",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  category: "ecommerce",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  let userCurrency = "USD";
  let currencySetByUser = false;

  if (session?.user?.id) {
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { currency: true, currencySetByUser: true },
    });
    userCurrency = user?.currency ?? "USD";
    currencySetByUser = user?.currencySetByUser ?? false;
  }

  return (
    <html
      lang="en"
      className={`${lato.variable} ${montserrat.variable} antialiased scroll-smooth transition-all duration-300 ease-in-out`}
      suppressHydrationWarning
    >
      <body className="font-sans min-h-screen flex flex-col">
        <SessionProvider session={session}>
          <TooltipProvider>
            <CurrencyInitializer
              userCurrency={userCurrency}
              currencySetByUser={currencySetByUser}
            />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CookieConsent />
          </TooltipProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              classNames: {
                toast:
                  "font-sans border border-stone-200 bg-white text-stone-900 shadow-lg rounded-none",
                title: "text-xs tracking-[0.2em] uppercase font-medium",
                description: "text-xs text-stone-500 tracking-wide",
                success: "border-l-2 border-l-green-600",
                error: "border-l-2 border-l-red-500",
                info: "border-l-2 border-l-stone-900",
              },
            }}
          />
        </SessionProvider>
      </body>
    </html>
  );
}
