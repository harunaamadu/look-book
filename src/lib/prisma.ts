import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

// Use a global singleton to prevent too many connections in Next.js dev
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({ 
  adapter, // Prisma 7 requires this non-empty configuration
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
