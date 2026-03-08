"use server";

import { db } from "@/lib/db";
import { signIn } from "@/auth";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import {
  sendPasswordResetEmailMessage,
  sendVerificationEmailMessage,
  sendWelcomeEmailMessage,
} from "@/lib/send-email";

export async function register(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) throw new Error("Email and password are required");

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) throw new Error("Email already in use");

  const hashedPassword = await bcrypt.hash(password, 12);

  await db.user.create({
    data: { name, email, password: hashedPassword },
  });

  // Generate verification token
  const token = crypto.randomUUID();
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours

  await db.verificationToken.create({
    data: { identifier: email, token, expires },
  });

  // Send verification email
  await sendVerificationEmailMessage({ to: email, token, name });

  // Redirect to verify page
  redirect(`/verify-email?email=${encodeURIComponent(email)}`);
}

export async function loginWithCredentials(formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("Invalid email or password");
        default:
          throw new Error("Something went wrong");
      }
    }
    throw error;
  }
}

export async function loginWithGoogle() {
  await signIn("google", { redirectTo: "/dashboard" });
}

export async function sendPasswordResetEmail(formData: FormData) {
  const email = formData.get("email") as string;
  if (!email) throw new Error("Email is required");

  const user = await db.user.findUnique({ where: { email } });

  // Silently succeed — don't reveal if email exists
  if (!user) return;

  const token = crypto.randomUUID();
  const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

  // Delete any existing token for this email first
  await db.verificationToken.deleteMany({
    where: { identifier: email },
  });

  await db.verificationToken.create({
    data: { identifier: email, token, expires },
  });

  await sendPasswordResetEmailMessage({
    to: email,
    token,
    name: user.name ?? undefined,
  });
}

export async function resendVerificationEmail(email: string) {
  if (!email) throw new Error("Email is required");

  const user = await db.user.findUnique({ where: { email } });
  if (!user) throw new Error("No account found with this email");

  const token = crypto.randomUUID();
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours

  await db.verificationToken.deleteMany({ where: { identifier: email } });
  await db.verificationToken.create({
    data: { identifier: email, token, expires },
  });

  await sendVerificationEmailMessage({
    to: email,
    token,
    name: user.name ?? undefined,
  });
}

export async function resetPassword(token: string, newPassword: string) {
  // Find valid token
  const record = await db.verificationToken.findFirst({
    where: { token, expires: { gt: new Date() } },
  });

  if (!record) throw new Error("Invalid or expired reset link");

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  // Update user password
  await db.user.update({
    where: { email: record.identifier },
    data: { password: hashedPassword },
  });

  // Delete the used token
  await db.verificationToken.deleteMany({
    where: { identifier: record.identifier },
  });

  // Send welcome back email (optional)
  const user = await db.user.findUnique({
    where: { email: record.identifier },
  });
}