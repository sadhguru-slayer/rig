import { NextResponse } from "next/server";
import prisma from "@prisma/client";

export async function GET(req, { params }) {
  try {
    const gallery = await prisma.gallery.findMany({
      where: { serviceId: Number(params.id) },
    });
    return NextResponse.json({ success: true, data: gallery });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
