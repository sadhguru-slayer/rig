import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // 1️⃣ Counts
    const [projects, services, blogs, customers, orders] = await Promise.all([
      prisma.project.count(),
      prisma.service.count(),
      prisma.blog.count(),
      prisma.customer.count(),
      prisma.order.count(),
    ]);

    // 2️⃣ Group by month for charts
    const groupByMonth = async (model) => {
      const records = await prisma[model].findMany({
        select: { createdAt: true },
      });

      const months = Array(12).fill(0);

      records.forEach((rec) => {
        const m = new Date(rec.createdAt).getMonth();
        months[m] += 1;
      });

      return months;
    };

    const [projectMonthly, blogMonthly, serviceMonthly, customerMonthly] =
      await Promise.all([
        groupByMonth("project"),
        groupByMonth("blog"),
        groupByMonth("service"),
        groupByMonth("customer"),
      ]);

    return NextResponse.json({
      success: true,
      data: {
        counts: {
          projects,
          services,
          blogs,
          customers,
          orders,
        },
        monthly: {
          projects: projectMonthly,
          blogs: blogMonthly,
          services: serviceMonthly,
          customers: customerMonthly,
        },
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
