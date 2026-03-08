import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata = { title: "Create Account" };

export default function RegisterPage() {
  return (
    <div className="max-w-7xl mx-auto min-h-[calc(100vh-4rem)] grid md:grid-cols-2">
      {/* Left panel */}
      <div className="hidden md:flex flex-col justify-between p-14 bg-stone-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/auth-bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative z-10">
          <span className="text-xs tracking-[0.4em] uppercase text-stone-400">
            LOOK — Est. 2025
          </span>
        </div>
        <div className="relative z-10">
          <h2 className="text-5xl font-light leading-tight text-stone-800">
            Join a world<br />where fashion<br />meets intention.
          </h2>
          <ul className="mt-8 space-y-3 text-sm text-stone-500">
            {[
              "Early access to new collections",
              "Members-only pricing",
              "Free express shipping on first order",
              "Curated style recommendations",
            ].map((perk) => (
              <li key={perk} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-stone-400" />
                {perk}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative z-10 text-xs text-stone-400 tracking-wide">
          Join 50,000+ members already shopping with LOOK.
        </div>
      </div>

      {/* Right panel */}
      <div className="flex items-center justify-center px-8 py-16 bg-background">
        <div className="w-full max-w-sm">
          <div className="mb-10">
            <h3 className="text-3xl font-semibold tracking-tight mb-2">
              Create account
            </h3>
            <p className="text-sm text-muted-foreground">
              Join LOOK and start shopping today
            </p>
          </div>

          <RegisterForm />

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium underline underline-offset-4 hover:text-primary transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}