import Link from "next/link";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata = { title: "Reset Password" };

export default function ForgotPasswordPage() {
  return (
    <div className="max-w-7xl mx-auto min-h-[calc(100vh-4rem)] flex items-center justify-center px-8 py-16 bg-background">
      <div className="w-full max-w-sm">

        {/* Back link */}
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 group"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to sign in
        </Link>

        <div className="mb-10">
          {/* Icon */}
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mb-6">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m2 7 8.586 6.586a2 2 0 0 0 2.828 0L22 7"/>
            </svg>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Reset password
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Enter the email address associated with your account and we&apos;ll
            send you a link to reset your password.
          </p>
        </div>

        <ForgotPasswordForm />

      </div>
    </div>
  );
}