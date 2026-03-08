"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function updateProfile(data: {
  name: string;
  phone?: string;
  bio?: string;
}) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorised.");

  await db.user.update({
    where: { id: session.user.id },
    data: {
      name: data.name,
      phone: data.phone,
      bio: data.bio,
    },
  });

  revalidatePath("/settings");
}

export async function updatePreferences(data: {
  language: string;
  currency: string;
  region: string;
}) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorised.");

  await db.user.update({
    where: { id: session.user.id },
    data: {
      language: data.language,
      currency: data.currency,
      region: data.region,
      currencySetByUser: true,
    },
  });

  revalidatePath("/settings");
}

export async function updateNotifications(data: {
  emailMarketing: boolean;
  emailOrders: boolean;
  emailReviews: boolean;
}) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorised.");

  await db.user.update({
    where: { id: session.user.id },
    data,
  });

  revalidatePath("/settings");
}

export async function updatePassword(data: {
  currentPassword: string;
  newPassword: string;
}) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorised.");

  const bcrypt = await import("bcryptjs");
  const user = await db.user.findUnique({ where: { id: session.user.id } });

  if (!user?.password) throw new Error("No password set — sign in with Google instead.");

  const valid = await bcrypt.compare(data.currentPassword, user.password);
  if (!valid) throw new Error("Current password is incorrect.");

  const hashed = await bcrypt.hash(data.newPassword, 12);
  await db.user.update({
    where: { id: session.user.id },
    data: { password: hashed },
  });
}

export async function getFullUser() {
  const session = await auth();
  if (!session?.user?.id) return null;

  return db.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      phone: true,
      bio: true,
      language: true,
      currency: true,
      region: true,
      emailMarketing: true,
      emailOrders: true,
      emailReviews: true,
      password: true,
      createdAt: true,
    },
  });
}