"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  updateProfile,
  updatePreferences,
  updateNotifications,
  updatePassword,
} from "@/server/actions/settings.actions";
import { showToast } from "@/lib/toast";
import { Switch } from "@/components/ui/switch";

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "es", label: "Español" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "ar", label: "العربية" },
];

const currencies = [
  { code: "USD", label: "$ US Dollar" },
  { code: "GBP", label: "£ British Pound" },
  { code: "EUR", label: "€ Euro" },
  { code: "GHS", label: "₵ Ghana Cedis" },
  { code: "JPY", label: "¥ Japanese Yen" },
  { code: "AUD", label: "A$ Australian Dollar" },
  { code: "CAD", label: "C$ Canadian Dollar" },
  { code: "CHF", label: "Fr Swiss Franc" },
  { code: "CNY", label: "¥ Chinese Yuan" },
  { code: "AED", label: "د.إ UAE Dirham" },
];

type Section =
  | "profile"
  | "preferences"
  | "notifications"
  | "security"
  | "danger";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  phone: string | null;
  bio: string | null;
  language: string;
  currency: string;
  region: string | null;
  emailMarketing: boolean;
  emailOrders: boolean;
  emailReviews: boolean;
  password: string | null;
  createdAt: Date;
}

const navItems: { key: Section; label: string }[] = [
  { key: "profile", label: "Profile" },
  { key: "preferences", label: "Preferences" },
  { key: "notifications", label: "Notifications" },
  { key: "security", label: "Security" },
  { key: "danger", label: "Danger zone" },
];

export default function SettingsClient({ user }: { user: User }) {
  const [active, setActive] = useState<Section>("profile");

  return (
    <main className="min-h-screen bg-[#fafaf8]">
      {/* Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <p className="text-[10px] tracking-[0.5em] uppercase text-stone-400 mb-4">
            Your account
          </p>
          <h1
            className="text-5xl font-light text-stone-900 leading-none tracking-tight"
          >
            Settings
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10">
          {/* Sidebar nav */}
          <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 lg:sticky lg:top-8 lg:self-start">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActive(item.key)}
                className={`shrink-0 px-4 py-3 text-left text-[11px] tracking-[0.3em] uppercase transition-all duration-200 ${
                  active === item.key
                    ? item.key === "danger"
                      ? "bg-red-600 text-white"
                      : "bg-stone-900 text-white"
                    : item.key === "danger"
                      ? "text-red-500 hover:bg-red-50"
                      : "text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Content */}
          <div className="min-w-0">
            {active === "profile" && <ProfileSection user={user} />}
            {active === "preferences" && <PreferencesSection user={user} />}
            {active === "notifications" && <NotificationsSection user={user} />}
            {active === "security" && (
              <SecuritySection hasPassword={!!user.password} />
            )}
            {active === "danger" && <DangerSection email={user.email ?? ""} />}
          </div>
        </div>
      </div>
    </main>
  );
}

/* ── PROFILE ──────────────────────────────────────────────── */
function ProfileSection({ user }: { user: User }) {
  const [name, setName] = useState(user.name ?? "");
  const [phone, setPhone] = useState(user.phone ?? "");
  const [bio, setBio] = useState(user.bio ?? "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile({ name, phone, bio });
      showToast.signedIn(name);
    } catch (err: any) {
      showToast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <SectionHeader
        title="Profile information"
        subtitle="Update your name, contact details and bio."
      />

      {/* Avatar */}
      <div className="flex items-center gap-5 p-6 bg-white border border-stone-200">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-stone-200 shrink-0 flex items-center justify-center">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name ?? ""}
              width={64}
              height={64}
              className="object-cover"
            />
          ) : (
            <span
              className="text-xl text-stone-500 font-light"
            >
              {user.name?.[0]?.toUpperCase() ?? "?"}
            </span>
          )}
        </div>
        <div>
          <p className="text-sm text-stone-900 mb-0.5">{user.name ?? "—"}</p>
          <p className="text-xs text-stone-400">{user.email}</p>
          <p className="text-[10px] tracking-widest uppercase text-stone-300 mt-1">
            Member since{" "}
            {new Date(user.createdAt).toLocaleDateString("en-GB", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 bg-white border border-stone-200 p-7"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <SettingsField
            label="Full name"
            value={name}
            onChange={setName}
            required
          />
          <SettingsField
            label="Email address"
            value={user.email ?? ""}
            disabled
            hint="Email cannot be changed"
          />
        </div>
        <SettingsField
          label="Phone number"
          value={phone}
          onChange={setPhone}
          placeholder="+44 7700 000000"
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] tracking-[0.4em] uppercase text-stone-400">
            Bio <span className="text-stone-300">(optional)</span>
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            maxLength={200}
            placeholder="A short bio about yourself..."
            className="border border-stone-200 bg-transparent px-4 py-3 text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-900 transition-colors resize-none"
          />
          <p className="text-[10px] text-stone-300 text-right">
            {bio.length}/200
          </p>
        </div>
        <SaveButton loading={loading} />
      </form>
    </div>
  );
}

/* ── PREFERENCES ─────────────────────────────────────────── */
function PreferencesSection({ user }: { user: User }) {
  const [language, setLanguage] = useState(user.language);
  const [currency, setCurrency] = useState(user.currency);
  const [region, setRegion] = useState(user.region ?? "");
  const [detecting, setDetecting] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user.region) detectRegion();
  }, []);

  async function detectRegion() {
    setDetecting(true);
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      const detected = `${data.city ?? ""}, ${data.country_name ?? ""}`.replace(
        /^, /,
        "",
      );
      setRegion(detected);

      // Auto-set currency based on country
      const currencyMap: Record<string, string> = {
        GB: "GBP",
        US: "USD",
        GH: "GHS",
        DE: "EUR",
        FR: "EUR",
        IT: "EUR",
        ES: "EUR",
        JP: "JPY",
        AU: "AUD",
        CA: "CAD",
        CH: "CHF",
        CN: "CNY",
        AE: "AED",
      };
      if (data.country_code && currencyMap[data.country_code]) {
        setCurrency(currencyMap[data.country_code]);
      }
    } catch {
      // silently fail — user can set manually
    } finally {
      setDetecting(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await updatePreferences({ language, currency, region });
      showToast.addedToCart("Preferences saved", undefined, undefined);
    } catch (err: any) {
      showToast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <SectionHeader
        title="Preferences"
        subtitle="Manage your language, currency and region settings."
      />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 bg-white border border-stone-200 p-7"
      >
        {/* Language */}
        <SelectField
          label="Language"
          value={language}
          onChange={setLanguage}
          options={languages.map((l) => ({ value: l.code, label: l.label }))}
        />

        {/* Currency */}
        <SelectField
          label="Currency"
          value={currency}
          onChange={setCurrency}
          options={currencies.map((c) => ({ value: c.code, label: c.label }))}
        />

        {/* Region */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[9px] tracking-[0.4em] uppercase text-stone-400">
              Region
            </label>
            <button
              type="button"
              onClick={detectRegion}
              disabled={detecting}
              className="text-[9px] tracking-[0.3em] uppercase text-stone-400 hover:text-stone-900 transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              {detecting ? (
                <svg
                  className="w-3 h-3 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="32"
                    strokeDashoffset="12"
                  />
                </svg>
              ) : (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zM2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
                </svg>
              )}
              {detecting ? "Detecting..." : "Auto-detect"}
            </button>
          </div>
          <input
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="e.g. London, United Kingdom"
            className="border border-stone-200 bg-transparent px-4 py-3 text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-900 transition-colors"
          />
          <p className="text-[10px] text-stone-400">
            Used to show relevant shipping options and estimated delivery times.
          </p>
        </div>

        <SaveButton loading={loading} />
      </form>
    </div>
  );
}

/* ── NOTIFICATIONS ───────────────────────────────────────── */
function NotificationsSection({ user }: { user: User }) {
  const [marketing, setMarketing] = useState(user.emailMarketing);
  const [orders, setOrders] = useState(user.emailOrders);
  const [reviews, setReviews] = useState(user.emailReviews);
  const [loading, setLoading] = useState(false);

  const notifItems = [
    {
      key: "orders",
      label: "Order updates",
      description: "Confirmation, shipping and delivery notifications.",
      value: orders,
      onChange: setOrders,
      locked: true,
    },
    {
      key: "marketing",
      label: "The Edit newsletter",
      description: "Weekly style notes, new arrivals and exclusive offers.",
      value: marketing,
      onChange: setMarketing,
      locked: false,
    },
    {
      key: "reviews",
      label: "Review reminders",
      description: "Prompts to review items after delivery.",
      value: reviews,
      onChange: setReviews,
      locked: false,
    },
  ];

  async function handleSave() {
    setLoading(true);
    try {
      await updateNotifications({
        emailMarketing: marketing,
        emailOrders: orders,
        emailReviews: reviews,
      });
      showToast.addedToCart(
        "Notification preferences saved",
        undefined,
        undefined,
      );
    } catch (err: any) {
      showToast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <SectionHeader
        title="Notifications"
        subtitle="Choose which emails you'd like to receive from LOOK."
      />

      <div className="bg-white border border-stone-200 divide-y divide-stone-100">
        {notifItems.map((item) => (
          <div
            key={item.key}
            className="flex items-start justify-between gap-6 px-7 py-6"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <p className="text-sm text-stone-900">{item.label}</p>
                {item.locked && (
                  <span className="text-[9px] tracking-[0.2em] uppercase border border-stone-200 text-stone-400 px-1.5 py-0.5">
                    Required
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
                {item.description}
              </p>
            </div>
            <Switch
              checked={item.value}
              onCheckedChange={item.locked ? undefined : item.onChange}
              disabled={item.locked}
              className="shrink-0 mt-0.5 data-[state=checked]:bg-stone-900 data-[state=unchecked]:bg-stone-200 disabled:opacity-100 disabled:cursor-not-allowed"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <SaveButton loading={loading} onClick={handleSave} type="button" />
      </div>
    </div>
  );
}

/* ── SECURITY ────────────────────────────────────────────── */
function SecuritySection({ hasPassword }: { hasPassword: boolean }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (next !== confirm) return showToast.error("Passwords do not match.");
    if (next.length < 8)
      return showToast.error("Password must be at least 8 characters.");

    setLoading(true);
    try {
      await updatePassword({ currentPassword: current, newPassword: next });
      showToast.addedToCart("Password updated", undefined, undefined);
      setCurrent("");
      setNext("");
      setConfirm("");
    } catch (err: any) {
      showToast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <SectionHeader
        title="Security"
        subtitle="Manage your password and account security."
      />

      {!hasPassword ? (
        <div className="bg-white border border-stone-200 p-7">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-stone-100 flex items-center justify-center shrink-0">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-stone-900 mb-1">
                Google sign-in account
              </p>
              <p className="text-xs text-stone-400 leading-relaxed">
                Your account uses Google for authentication. Password management
                is handled through your Google account.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 bg-white border border-stone-200 p-7"
        >
          <SettingsField
            label="Current password"
            type="password"
            value={current}
            onChange={setCurrent}
            required
          />
          <div className="h-px bg-stone-100" />
          <SettingsField
            label="New password"
            type="password"
            value={next}
            onChange={setNext}
            hint="Minimum 8 characters"
            required
          />
          <SettingsField
            label="Confirm new password"
            type="password"
            value={confirm}
            onChange={setConfirm}
            required
          />
          <SaveButton loading={loading} label="Update password" />
        </form>
      )}

      {/* Sessions info */}
      <div className="bg-white border border-stone-200 p-7 flex flex-col gap-4">
        <p className="text-[10px] tracking-[0.45em] uppercase text-stone-400">
          Active sessions
        </p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-stone-900 mb-0.5">Current session</p>
            <p className="text-xs text-stone-400">Signed in now</p>
          </div>
          <span className="flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase text-green-600">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Active
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── DANGER ZONE ─────────────────────────────────────────── */
function DangerSection({ email }: { email: string }) {
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      <SectionHeader
        title="Danger zone"
        subtitle="Irreversible actions. Please proceed with caution."
      />

      {/* Export data */}
      <div className="bg-white border border-stone-200 p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm text-stone-900 mb-1">Export your data</p>
          <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
            Download a copy of all data associated with your account including
            orders, reviews and preferences.
          </p>
        </div>
        <button className="shrink-0 border border-stone-300 text-stone-600 px-6 py-3 text-[10px] tracking-[0.3em] uppercase hover:border-stone-900 hover:text-stone-900 transition-all">
          Request export
        </button>
      </div>

      {/* Delete account */}
      <div className="bg-white border border-red-200 p-7 flex flex-col gap-5">
        <div>
          <p className="text-sm text-red-700 mb-1 font-medium">
            Delete account
          </p>
          <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
            Permanently delete your account and all associated data. This action
            cannot be undone. Type your email address to confirm.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="email"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder={email}
            className="border border-stone-200 bg-transparent px-4 py-3 text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-red-400 transition-colors max-w-sm"
          />
          <button
            disabled={confirm !== email || loading}
            className="self-start bg-red-600 text-white px-6 py-3 text-[10px] tracking-[0.3em] uppercase hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Deleting..." : "Delete my account"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── SHARED COMPONENTS ───────────────────────────────────── */
function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="border-b border-stone-200 pb-6">
      <h2
        className="text-2xl font-light text-stone-900 mb-2"
      >
        {title}
      </h2>
      <p className="text-sm text-stone-400">{subtitle}</p>
    </div>
  );
}

function SettingsField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  hint,
  required,
  disabled,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  type?: string;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[9px] tracking-[0.4em] uppercase text-stone-400">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="border border-stone-200 bg-transparent px-4 py-3 text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-900 transition-colors disabled:bg-stone-50 disabled:text-stone-400 disabled:cursor-not-allowed"
      />
      {hint && <p className="text-[10px] text-stone-400">{hint}</p>}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[9px] tracking-[0.4em] uppercase text-stone-400">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-stone-200 bg-transparent px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-stone-900 transition-colors appearance-none"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function SaveButton({
  loading,
  label = "Save changes",
  onClick,
  type = "submit",
}: {
  loading: boolean;
  label?: string;
  onClick?: () => void;
  type?: "submit" | "button";
}) {
  return (
    <div className="flex justify-end pt-2">
      <button
        type={type}
        onClick={onClick}
        disabled={loading}
        className="bg-stone-900 text-white px-8 py-3 text-[11px] tracking-[0.35em] uppercase hover:bg-stone-700 transition-colors disabled:opacity-50"
      >
        {loading ? "Saving..." : label}
      </button>
    </div>
  );
}
