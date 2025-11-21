export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
    try {
        const body = await request.json();
        const { customerId, installDate, issueDate, address, orderItems } = body;

        if (!customerId || !installDate || !issueDate || !address || !orderItems || !orderItems.length) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Generate a unique order number
        const orderNo = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        // Use a transaction to create order and items
        const newOrder = await prisma.$transaction(async (tx) => {
            // 1. Create the Order
            const order = await tx.order.create({
                data: {
                    orderNo,
                    customerId,
                    installDate: new Date(installDate),
                    issueDate: new Date(issueDate),
                    address,
                },
            });

            // 2. Create Order Items
            for (const item of orderItems) {
                await tx.orderItem.create({
                    data: {
                        orderId: order.id,
                        serviceId: item.serviceId,
                        subServiceId: item.subServiceId || null,
                        quantity: item.quantity || 1,
                        warranty: item.warranty || {},
                    },
                });
            }

            return order;
        });

        return NextResponse.json({ success: true, data: newOrder });
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to create order" },
            { status: 500 }
        );
    }
}
