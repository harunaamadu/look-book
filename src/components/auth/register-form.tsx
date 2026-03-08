"use client";

import { register } from "@/server/actions/auth.actions";
import { loginWithGoogle } from "@/server/actions/auth.actions";
import { useState } from "react";
import { showToast } from "@/lib/toast";

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);
    try {
      await register(formData);
      const name = formData.get("name") as string;
      showToast.registered(name);
    } catch (e: any) {
      setError(e.message);
      showToast.error(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <form action={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs tracking-widest uppercase text-muted-foreground">Name</label>
          <input
            name="name"
            type="text"
            placeholder="Jane Smith"
            className="border border-border bg-transparent rounded-none px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs tracking-widest uppercase text-muted-foreground">Email</label>
          <input
            name="email"
            type="email"
            required
            placeholder="jane@example.com"
            className="border border-border bg-transparent rounded-none px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs tracking-widest uppercase text-muted-foreground">Password</label>
          <input
            name="password"
            type="password"
            required
            placeholder="Min. 8 characters"
            className="border border-border bg-transparent rounded-none px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-foreground text-background py-3 text-sm tracking-widest uppercase hover:opacity-80 transition-opacity disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <div className="relative text-center text-xs text-muted-foreground my-1">
        <span className="bg-background px-3 relative z-10">or</span>
        <hr className="absolute inset-x-0 top-1/2 border-border" />
      </div>

      <form action={loginWithGoogle}>
        <button
          type="submit"
          className="w-full border border-border py-3 text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-muted transition-colors"
        >
          <GoogleIcon />
          Continue with Google
        </button>
      </form>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}