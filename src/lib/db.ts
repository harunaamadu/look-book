import "server-only";
import { PrismaClient } from "@/generated/prisma";
import { PrismaLibSql } from "@prisma/adapter-libsql";

declare global {
  var prisma: PrismaClient | undefined;
}

function createPrismaClient() {
  const url = process.env.DATABASE_URL;

  if (!url) throw new Error("DATABASE_URL is not set");

  const adapter = new PrismaLibSql({ url });
  return new PrismaClient({ adapter });
}

export const db = globalThis.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;