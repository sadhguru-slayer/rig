// app/api/admin/user/create/route.js
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifySuperUser } from "@/lib/adminAuth";

export async function POST(req) {
  const superUser = await verifySuperUser(req);
  if (!superUser)
    return NextResponse.json({ error: "Access denied" }, { status: 403 });

  const { username, email, password, isSuperUser, isActive } = await req.json();

  if (!username || !password)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const hashed = await bcrypt.hash(password, 10);

  const newAdmin = await prisma.admin.create({
    data: {
      username,
      email,
      password: hashed,
      isSuperUser: !!isSuperUser,
      isActive: isActive ?? true,
    },
    select: {
      id: true,
      username: true,
      email: true,
      isActive: true,
      isSuperUser: true,
      createdAt: true,
    },
  });

  return NextResponse.json(newAdmin, { status: 201 });
}
