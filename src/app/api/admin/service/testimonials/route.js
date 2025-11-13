import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany();
    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
