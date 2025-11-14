// lib/adminAuth.js
import { parse } from "cookie";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function verifySuperUser(req) {
  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = parse(cookieHeader);
  const token = cookies.core_token;

  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload) return null;

  const admin = await prisma.admin.findUnique({
    where: { id: payload.sub },
  });

  if (!admin || !admin.isSuperUser) return null;

  return admin.isSuperUser;
}
