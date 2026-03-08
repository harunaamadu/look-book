import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getFullUser } from "@/server/actions/settings.actions";
import SettingsClient from "./settings-client";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Settings — LOOK" };

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const user = await getFullUser();
  if (!user) redirect("/login");

  return <SettingsClient user={user} />;
}