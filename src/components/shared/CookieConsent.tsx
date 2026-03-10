"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  getConsent,
  saveConsent,
  hasConsented,
  defaultPreferences,
  type CookiePreferences,
} from "@/lib/cookies-consent";

const cookieTypes = [
  {
    key: "necessary" as const,
    label: "Strictly Necessary",
    description:
      "Essential for the website to function. Includes session management, cart, and security. Cannot be disabled.",
    required: true,
  },
  {
    key: "analytics" as const,
    label: "Analytics",
    description:
      "Help us understand how visitors interact with our site so we can improve your experience.",
    required: false,
  },
  {
    key: "marketing" as const,
    label: "Marketing",
    description:
      "Used to deliver personalised ads and measure their effectiveness across platforms.",
    required: false,
  },
  {
    key: "preferences" as const,
    label: "Preferences",
    description:
      "Remember your settings such as language, region, and display preferences.",
    required: false,
  },
];

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    // Small delay so it doesn't flash immediately on load
    const timer = setTimeout(() => {
      if (!hasConsented()) setOpen(true);
      else setPrefs(getConsent()!);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  function handleAcceptAll() {
    const all: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    saveConsent(all);
    setOpen(false);
  }

  function handleRejectAll() {
    saveConsent(defaultPreferences);
    setOpen(false);
  }

  function handleSavePreferences() {
    saveConsent(prefs);
    setOpen(false);
  }

  function toggle(key: keyof Omit<CookiePreferences, "necessary">) {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="
          max-w-lg w-full rounded-none border border-stone-200 bg-[#fafaf8] p-0
          shadow-2xl gap-0
          data-[state=open]:animate-in data-[state=open]:fade-in-0
          data-[state=open]:slide-in-from-bottom-4
        "
        // Prevent closing by clicking outside — user must make a choice
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        {/* Header */}
        <DialogHeader className="px-7 pt-7 pb-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-stone-900 flex items-center justify-center shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                <path d="M12 8v4M12 16h.01"/>
              </svg>
            </div>
            <DialogTitle
              className="text-base font-light text-stone-900"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Your Privacy
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-stone-500 leading-relaxed">
            We use cookies to enhance your browsing experience, personalise content,
            and analyse our traffic. You can choose which cookies you allow below.{" "}
            <a href="/cookies" className="underline underline-offset-2 hover:text-stone-900 transition-colors">
              Cookie Policy
            </a>
          </DialogDescription>
        </DialogHeader>

        <Separator className="bg-stone-200" />

        {/* Cookie toggles — expandable */}
        {showDetails && (
          <div className="px-7 py-5 flex flex-col gap-5 max-h-70 overflow-y-auto">
            {cookieTypes.map((type) => (
              <div key={type.key} className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm tracking-[0.3em] uppercase font-medium text-stone-700">
                      {type.label}
                    </p>
                    {type.required && (
                      <span className="text-[9px] tracking-[0.2em] uppercase text-stone-400 border border-stone-300 px-1.5 py-0.5">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed pr-4">
                    {type.description}
                  </p>
                </div>
                <Switch
                  checked={prefs[type.key]}
                  onCheckedChange={
                    type.required ? undefined : () => toggle(type.key as any)
                  }
                  disabled={type.required}
                  className="
                    shrink-0 mt-0.5
                    data-[state=checked]:bg-stone-900
                    data-[state=unchecked]:bg-stone-200
                    disabled:opacity-100 disabled:cursor-not-allowed
                  "
                />
              </div>
            ))}
          </div>
        )}

        {!showDetails && <div className="h-2" />}

        <Separator className="bg-stone-200" />

        {/* Actions */}
        <div className="px-7 py-5 flex flex-col gap-3">
          {/* Primary actions */}
          <div className="flex flex-col md:flex-row gap-3">
            <button
              onClick={handleAcceptAll}
              className="flex-1 bg-stone-900 text-white py-3 text-sm tracking-[0.3em] uppercase hover:bg-stone-700 transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={handleRejectAll}
              className="flex-1 border border-stone-300 text-stone-600 py-3 text-sm tracking-[0.3em] uppercase hover:border-stone-900 hover:text-stone-900 transition-colors"
            >
              Reject All
            </button>
          </div>

          {/* Secondary actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowDetails((s) => !s)}
              className="text-xs tracking-[0.3em] uppercase text-stone-400 hover:text-stone-900 transition-colors flex items-center gap-1.5"
            >
              <svg
                width="10" height="10" viewBox="0 0 10 10" fill="none"
                className={`transition-transform duration-200 ${showDetails ? "rotate-180" : ""}`}
              >
                <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              {showDetails ? "Hide options" : "Manage preferences"}
            </button>

            {showDetails && (
              <button
                onClick={handleSavePreferences}
                className="text-xs tracking-[0.3em] uppercase text-stone-700 underline underline-offset-2 hover:text-stone-900 transition-colors"
              >
                Save preferences
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}