import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      include: { seo: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    console.error("🚨 Blog GET error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
