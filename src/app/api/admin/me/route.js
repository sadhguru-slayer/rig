// app/api/admin/me/route.js
import { NextResponse } from "next/server";
import { parse } from "cookie";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req) {
  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = parse(cookieHeader || "");
  const token = cookies.core_token;

  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  const admin = await prisma.admin.findUnique({
    where: { username: payload.username },
    select: { id: true, username: true, email: true, createdAt: true },
  });

  if (!admin) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(admin);
}
