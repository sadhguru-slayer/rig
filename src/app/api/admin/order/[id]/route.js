export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        const orderId = parseInt(id);

        if (isNaN(orderId)) {
            return NextResponse.json(
                { success: false, error: "Invalid order ID" },
                { status: 400 }
            );
        }

        // Delete order items first (cascade delete might handle this, but explicit is safer if not configured)
        // Prisma schema doesn't show explicit cascade delete in the snippet provided (it usually requires @relation(onDelete: Cascade))
        // Let's check schema again or just use a transaction to be safe.

        await prisma.$transaction(async (tx) => {
            await tx.orderItem.deleteMany({
                where: { orderId },
            });

            await tx.order.delete({
                where: { id: orderId },
            });
        });

        return NextResponse.json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        console.error("Error deleting order:", error);
        return NextResponse.json(
            { success: false, error: "Failed to delete order" },
            { status: 500 }
        );
    }
}

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const orderId = parseInt(id);

        if (isNaN(orderId)) {
            return NextResponse.json(
                { success: false, error: "Invalid order ID" },
                { status: 400 }
            );
        }

        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                customer: true,
                orderItems: {
                    include: {
                        service: true,
                        subService: true
                    }
                }
            }
        });

        if (!order) {
            return NextResponse.json(
                { success: false, error: "Order not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: order });
    } catch (error) {
        console.error("Error fetching order:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch order" },
            { status: 500 }
        );
    }
}

export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        const orderId = parseInt(id);

        if (isNaN(orderId)) {
            return NextResponse.json(
                { success: false, error: "Invalid order ID" },
                { status: 400 }
            );
        }

        const body = await request.json();
        const { customerId, installDate, issueDate, address, orderItems } = body;

        if (!customerId || !installDate || !issueDate || !address || !orderItems || !orderItems.length) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Transaction to update order and replace items
        const updatedOrder = await prisma.$transaction(async (tx) => {
            // 1. Update Order details
            const order = await tx.order.update({
                where: { id: orderId },
                data: {
                    customerId: parseInt(customerId),
                    installDate: new Date(installDate),
                    issueDate: new Date(issueDate),
                    address,
                },
            });

            // 2. Delete existing items
            await tx.orderItem.deleteMany({
                where: { orderId },
            });

            // 3. Create new items
            for (const item of orderItems) {
                await tx.orderItem.create({
                    data: {
                        orderId: order.id,
                        serviceId: parseInt(item.serviceId),
                        subServiceId: item.subServiceId ? parseInt(item.subServiceId) : null,
                        quantity: parseInt(item.quantity) || 1,
                        warranty: item.warranty || {},
                    },
                });
            }

            return order;
        });

        return NextResponse.json({ success: true, data: updatedOrder });
    } catch (error) {
        console.error("Error updating order:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to update order" },
            { status: 500 }
        );
    }
}
