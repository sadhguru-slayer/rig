import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, context) {
  try {
    const { id } = await context.params; // ✅ await is required in new Next.js

   const numericId = Number(id);
  if (!numericId || Number.isNaN(numericId)) {
    return NextResponse.json({
      success: false,
      error: "Invalid or missing Project ID",
    });
  }
  
  const gallery = await prisma.galleryImage.findMany({
    where: { projectId : numericId },
  });

    return NextResponse.json({ success: true, data: gallery });
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
