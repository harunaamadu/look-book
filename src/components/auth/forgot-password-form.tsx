"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "@/server/actions/auth.actions";

type State = "idle" | "loading" | "sent" | "error";

export function ForgotPasswordForm() {
  const [state, setState] = useState<State>("idle");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setState("loading");
    setError(null);
    try {
      await sendPasswordResetEmail(formData);
      setState("sent");
    } catch (e: any) {
      setError(e.message);
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="text-center py-6">
        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="text-sm font-medium mb-1">
          Reset link sent!
        </p>
        <p className="text-sm text-muted-foreground">
          Check <span className="font-medium">{email}</span> for your reset link.
          It expires in 1 hour.
        </p>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs tracking-widest uppercase text-muted-foreground">
          Email address
        </label>
        <input
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jane@example.com"
          className="border border-border bg-transparent rounded-none px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="mt-2 bg-foreground text-background py-3 text-sm tracking-widest uppercase hover:opacity-80 transition-opacity disabled:opacity-50"
      >
        {state === "loading" ? "Sending..." : "Send reset link"}
      </button>
    </form>
  );
}