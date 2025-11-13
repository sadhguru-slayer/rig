// app/api/admin/change-password/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { parse } from "cookie";
import { verifyToken } from "@/lib/auth";

export async function POST(req) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const cookies = parse(cookieHeader || "");
    const token = cookies.core_token;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { oldPassword, newPassword } = await req.json();

    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { error: "Both old and new passwords are required." },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { username: payload.username },
    });

    if (!admin) {
      return NextResponse.json({ error: "Admin not found." }, { status: 404 });
    }

    const valid = await bcrypt.compare(oldPassword, admin.password);
    if (!valid) {
      return NextResponse.json({ error: "Old password is incorrect." }, { status: 400 });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.admin.update({
      where: { id: admin.id },
      data: { password: hashed },
    });

    return NextResponse.json({ success: true, message: "Password updated successfully!" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
