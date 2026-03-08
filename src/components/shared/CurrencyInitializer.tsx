"use client";

import { useEffect } from "react";
import { useCurrencyStore } from "@/store/currency.store";

const regionCurrencyMap: Record<string, string> = {
  GB: "GBP", US: "USD", GH: "GHS",
  DE: "EUR", FR: "EUR", IT: "EUR", ES: "EUR",
  NL: "EUR", BE: "EUR", PT: "EUR", AT: "EUR",
  JP: "JPY", AU: "AUD", CA: "CAD",
  CH: "CHF", CN: "CNY", AE: "AED",
};

export default function CurrencyInitializer({
  userCurrency,
  currencySetByUser,
}: {
  userCurrency: string;
  currencySetByUser: boolean;
}) {
  const { setCurrency } = useCurrencyStore();

  useEffect(() => {
    if (currencySetByUser) {
      // User explicitly chose — always honour it, never override
      setCurrency(userCurrency);
      return;
    }

    // First time — detect from region, save nothing to DB yet
    async function detectFromRegion() {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        const detected = regionCurrencyMap[data.country_code] ?? "USD";
        setCurrency(detected);
      } catch {
        setCurrency("USD");
      }
    }

    detectFromRegion();
  }, [userCurrency, currencySetByUser]);

  return null;
}