"use client";

import { saveConsent } from "@/lib/cookies-consent";

export default function CookieSettingsButton() {
  function handleClick() {
    // Clear consent so the dialog reopens on next render
    localStorage.removeItem("look-cookie-consent");
    window.location.reload();
  }

  return (
    <button
      onClick={handleClick}
      className="text-sm text-stone-400 hover:text-white transition-colors"
    >
      Cookie Settings
    </button>
  );
}