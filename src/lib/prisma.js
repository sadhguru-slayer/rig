// lib/prisma.js
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

let prisma;

// In serverless environments like Vercel, we should avoid global caching.
// Prisma Accelerate handles connection pooling automatically.
prisma = new PrismaClient().$extends(withAccelerate());

export default prisma;
