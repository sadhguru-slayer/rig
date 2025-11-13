import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch counts for each table
    const [projectsCount, servicesCount, blogsCount, clientsCount] = await Promise.all([
      prisma.project.count(),
      prisma.service.count(),
      prisma.blog.count(),
      prisma.client ? prisma.client.count() : Promise.resolve(0), // optional if client model exists
    ]);

    return NextResponse.json({
      success: true,
      data: {
        projects: projectsCount,
        services: servicesCount,
        blogs: blogsCount,
        clients: clientsCount,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard overview:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch overview data" },
      { status: 500 }
    );
  }
}
