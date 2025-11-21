import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function normalizePhoneNumber(phone) {
  return phone.replace(/[^\d]/g, ''); // Remove all non-numeric characters
}


export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');

    const normalizedPhone = normalizePhoneNumber(phone); // Normalize phone number

    // Check if the phone number already exists
    const existingCustomerWithPhone = await prisma.customer.findUnique({
      where: {
        phone: normalizedPhone, // Use normalized phone for comparison
      },
    });

    if (existingCustomerWithPhone) {
      return NextResponse.json({
        success: false,
        error: "Phone number is already in use.",
      }, { status: 400 });
    }

    // Proceed with creating the new customer
    const customer = await prisma.customer.create({
      data: {
        name,
        phone: normalizedPhone, // Store the normalized phone
        email,
      },
    });

    return NextResponse.json({ success: true, data: customer });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
