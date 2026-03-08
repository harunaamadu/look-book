import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { db } from "@/lib/db";
import Link from "next/link";

export const metadata = { title: "New Password" };

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const { token } = searchParams;

  // Validate token
  const record = token
    ? await db.verificationToken.findFirst({
        where: { token, expires: { gt: new Date() } },
      })
    : null;

  if (!record) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-sm text-center">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round"/>
            </svg>
          </div>
          <h4 className="text-2xl font-semibold mb-3">
            Link expired
          </h4>
          <p className="text-sm text-muted-foreground mb-8">
            This password reset link is invalid or has expired.
            Reset links are only valid for 1 hour.
          </p>
          <Link
            href="/forgot-password"
            className="inline-block bg-foreground text-background px-8 py-3 text-sm tracking-widest uppercase hover:opacity-80 transition-opacity"
          >
            Request new link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-8 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-10">
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mb-6">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            New password
          </h1>
          <p className="text-sm text-muted-foreground">
            Choose a strong password for your account.
          </p>
        </div>

        <ResetPasswordForm token={token!} />
      </div>
    </div>
  );
}