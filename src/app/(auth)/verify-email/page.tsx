import Link from "next/link";

export const metadata = { title: "Verify Email" };

export default function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  const email = searchParams.email ?? "your email";

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-8 py-16 bg-background">
      <div className="w-full max-w-sm text-center">

        {/* Animated envelope */}
        <div className="relative mx-auto w-20 h-20 mb-8">
          <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m2 7 8.586 6.586a2 2 0 0 0 2.828 0L22 7"/>
            </svg>
          </div>
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full animate-ping bg-stone-200 opacity-50" />
        </div>

        <h3 className="text-3xl font-semibold tracking-tight mb-3">
          Check your inbox
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-2">
          We sent a verification link to
        </p>
        <p className="text-sm font-medium mb-8">
          {email}
        </p>

        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
          Click the link in that email to verify your account. If you don&apos;t
          see it, check your spam folder.
        </p>

        {/* Divider */}
        <div className="border-t border-border pt-8 space-y-4">
          <p className="text-xs text-muted-foregrond hover:text-primary tracking-wide uppercase">
            Didn&apos;t receive it?
          </p>
          <ResendButton email={email} />
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Wrong email?{" "}
          <Link
            href="/register"
            className="text-muted-foreground underline underline-offset-4 hover:text-primary transition-colors"
          >
            Go back
          </Link>
        </p>
      </div>
    </div>
  );
}

// Resend button — client component
import { ResendButton } from "@/components/auth/resend-button";