import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { uploadToS3 } from "@/lib/uploadToS3";
import { generateUniqueSlug } from "@/lib/slugMaker";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
        orderBy: { createdAt: "desc" }
    });
    return NextResponse.json({ success: true, data: customers });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}