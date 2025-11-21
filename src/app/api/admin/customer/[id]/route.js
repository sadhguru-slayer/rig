import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { id } = await params;
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: parseInt(id) },
    });

    if (!customer) {
      return NextResponse.json({ success: false, error: "Customer not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: customer });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}


function normalizePhoneNumber(phone) {
  return phone.replace(/[^\d]/g, ''); // Remove all non-numeric characters
}

export async function PATCH(request, { params }) {
  const { id } = await params;

  try {
    const body = await request.json();
    const normalizedPhone = normalizePhoneNumber(body.phone);

    // Check if the phone number already exists (excluding the current customer)
    const existingCustomerWithPhone = await prisma.customer.findUnique({
      where: {
        phone: normalizedPhone, // Use the normalized phone
      },
    });

    if (existingCustomerWithPhone && existingCustomerWithPhone.id !== parseInt(id)) {
      return NextResponse.json({
        success: false,
        error: "Phone number is already in use by another customer.",
      }, { status: 400 });
    }

    // Proceed with updating the customer
    const updatedCustomer = await prisma.customer.update({
      where: { id: parseInt(id) },
      data: {
        name: body.name,
        phone: normalizedPhone, // Store the normalized phone
        email: body.email,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedCustomer,
    });
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const customerId = parseInt(id);

  try {
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      
    });

    if (!customer) {
      return NextResponse.json(
        { success: false, error: "Customer not found" },
        { status: 404 }
      );
    }

    
    // Delete the customer itself
    await prisma.customer.delete({ where: { id: customerId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}