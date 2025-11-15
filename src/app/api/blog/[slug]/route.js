import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request,{params}) {
    const {slug} = await params; 
  try {
    const blog = await prisma.blog.findUniqueOrThrow({
        where : {slug:slug},
      include: { seo: true },
    });
    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error("🚨 Blog GET error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
