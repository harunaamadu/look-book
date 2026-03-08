import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const authConfig: NextAuthConfig = {
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize() {
        // Real logic lives in auth.ts
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtected = nextUrl.pathname.startsWith("/dashboard");
      const isAuthRoute = ["/login", "/register"].includes(nextUrl.pathname);

      if (isAuthRoute && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      if (isProtected && !isLoggedIn) {
        return Response.redirect(new URL("/login", nextUrl));
      }
      return true;
    },
  },
};