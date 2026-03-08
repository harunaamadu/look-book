"use client";

import { useState } from "react";
import { resetPassword } from "@/server/actions/auth.actions";
import { useRouter } from "next/navigation";

export function ResetPasswordForm({ token }: { token: string }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const password = formData.get("password") as string;
    const confirm = formData.get("confirm") as string;

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await resetPassword(token, password);
      router.push("/login?reset=success");
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs tracking-widest uppercase text-muted-foreground">
          New Password
        </label>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          placeholder="Min. 8 characters"
          className="border border-border bg-transparent rounded-none px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs tracking-widest uppercase text-muted-foreground">
          Confirm Password
        </label>
        <input
          name="confirm"
          type="password"
          required
          minLength={8}
          placeholder="Repeat your password"
          className="border border-border bg-transparent rounded-none px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 bg-foreground text-background py-3 text-sm tracking-widest uppercase hover:opacity-80 transition-opacity disabled:opacity-50"
      >
        {loading ? "Saving..." : "Set new password"}
      </button>
    </form>
  );
}