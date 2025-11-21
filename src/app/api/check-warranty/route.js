import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const phone = searchParams.get("phone");

        if (!phone) {
            return NextResponse.json(
                { success: false, error: "Phone number is required" },
                { status: 400 }
            );
        }

        // Find customer by phone (using contains or exact match depending on requirement, exact is safer for warranty check)
        // Assuming phone is unique or we want all orders for any customer with that phone
        const customers = await prisma.customer.findMany({
            where: {
                phone: {
                    contains: phone, // Allow partial match or exact? Let's do exact for security/privacy usually, but 'contains' is friendlier if user forgets format. 
                    // Let's stick to 'contains' for now as per typical request, or maybe exact is better? 
                    // User said "Ask for phone number and fetch the orders". 
                    // Let's do exact match for better privacy if possible, but often phone formats vary. 
                    // Let's try to find customers with this phone number.
                },
            },
        });

        if (!customers.length) {
            return NextResponse.json({ success: true, data: [] });
        }

        const customerIds = customers.map((c) => c.id);

        const orders = await prisma.order.findMany({
            where: {
                customerId: {
                    in: customerIds,
                },
            },
            include: {
                customer: true,
                orderItems: {
                    include: {
                        service: true,
                        subService: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({ success: true, data: orders });
    } catch (error) {
        console.error("Error fetching warranty details:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch warranty details" },
            { status: 500 }
        );
    }
}