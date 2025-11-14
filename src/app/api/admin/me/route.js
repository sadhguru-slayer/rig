import { NextResponse } from "next/server";
import { parse } from "cookie";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const cookies = parse(cookieHeader);
    const token = cookies.core_token;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);

    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const admin = await prisma.admin.findUnique({
      where: { id: payload.sub }, // use id from JWT
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        isSuperUser: true, // IMPORTANT
      },
    });

    if (!admin) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(admin);
  } catch (err) {
    console.error("ME API Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
