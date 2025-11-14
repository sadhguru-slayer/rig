// app/api/admin/user/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifySuperUser } from "@/lib/adminAuth";

export async function GET(req) {
  const superUser = await verifySuperUser(req);

  if (!superUser) {
    return NextResponse.json(
      { success: false, error: "Access denied" },
      { status: 403 }
    );
  }

  try {
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        isActive: true,
        isSuperUser: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: admins,
    });
  } catch (error) {
    console.error("Error fetching admins:", error);

    return NextResponse.json(
      { success: false, error: "Failed to fetch admins" },
      { status: 500 }
    );
  }
}
