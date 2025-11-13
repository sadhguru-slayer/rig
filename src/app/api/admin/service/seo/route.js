import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const seo = await prisma.seo.findMany();
    return NextResponse.json({ success: true, data: seo });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
