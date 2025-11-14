import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifySuperUser } from "@/lib/adminAuth";

export async function GET(req, { params }) {
  const superUser = await verifySuperUser(req);
  if (!superUser)
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  const {id} = await params
  const admin = await prisma.admin.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      username: true,
      email: true,
      isActive: true,
      password:true,
      isSuperUser: true,
      createdAt: true,
    },
  });

  if (!admin) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(admin);
}


import bcrypt from "bcryptjs";

export async function PATCH(req, { params }) {
  const superUser = await verifySuperUser(req);
  if (!superUser) {
    return NextResponse.json(
      { success: false, error: "Access denied" },
      { status: 403 }
    );
  }

  // ✅ Wait for params to resolve, then access 'id'
  const { id } = await params;

  const NumId = Number(id);

  if (!NumId || isNaN(NumId)) {
    return NextResponse.json(
      { success: false, error: "Invalid or missing ID" },
      { status: 400 }
    );
  }

  const body = await req.json();
  const updateData = {};

  if (body.email) updateData.email = body.email;
  if (typeof body.isActive === "boolean") updateData.isActive = body.isActive;
  if (typeof body.isSuperUser === "boolean")
    updateData.isSuperUser = body.isSuperUser;

  if (body.password) {
    updateData.password = await bcrypt.hash(body.password, 10);
  }

  try {
    const updated = await prisma.admin.update({
      where: { id: NumId },
      data: updateData,
      select: {
        id: true,
        email: true,
        isActive: true,
        isSuperUser: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    console.error("Error updating admin:", err);

    return NextResponse.json(
      { success: false, error: "Failed to update admin" },
      { status: 500 }
    );
  }
}


export async function DELETE(req, { params }) {
  const superUser = await verifySuperUser(req);
  if (!superUser)
    return NextResponse.json({ error: "Access denied" }, { status: 403 });

  const { id } = await params;

  const NumId = Number(id);

  await prisma.admin.delete({ where: { id:NumId } });

  return NextResponse.json({ success: true });
}
