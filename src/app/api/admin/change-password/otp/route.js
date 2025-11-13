import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { parse } from "cookie";
import { verifyToken } from "@/lib/auth"; // same as your other admin routes

// Helper: generate a 6-digit OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req) {
  try {
    const { step, otp, newPassword } = await req.json();

    // 🔐 Verify Admin Session
    const cookieHeader = req.headers.get("cookie") || "";
    const cookies = parse(cookieHeader || "");
    const token = cookies.core_token;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const admin = await prisma.admin.findUnique({
      where: { username: payload.username },
    });

    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    // --- STEP 1: SEND OTP ---
    if (step === "request") {
      if (!admin.email) {
        return NextResponse.json(
          { error: "No email associated with this admin account" },
          { status: 400 }
        );
      }

      const otpCode = generateOtp();
      const expiry = new Date(Date.now() + 10 * 60 * 1000); // valid for 10 mins

      await prisma.admin.update({
        where: { id: admin.id },
        data: { otpCode, otpExpiresAt: expiry },
      });

      // Configure mailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: `"Support" <${process.env.GMAIL_USER}>`,
        to: admin.email,
        subject: "Admin Password Change OTP",
        text: `Your OTP for password change is ${otpCode}. It expires in 10 minutes.`,
      });

      return NextResponse.json({ message: "OTP sent to your email" });
    }

    // --- STEP 2: VERIFY OTP + CHANGE PASSWORD ---
    if (step === "verify") {
      if (!otp || !newPassword)
        return NextResponse.json(
          { error: "OTP and new password are required" },
          { status: 400 }
        );

      if (!admin.otpCode || !admin.otpExpiresAt)
        return NextResponse.json(
          { error: "No OTP was requested" },
          { status: 400 }
        );

      const now = new Date();
      if (now > admin.otpExpiresAt) {
        return NextResponse.json({ error: "OTP expired" }, { status: 400 });
      }

      if (otp !== admin.otpCode) {
        return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await prisma.admin.update({
        where: { id: admin.id },
        data: {
          password: hashedPassword,
          otpCode: null,
          otpExpiresAt: null,
        },
      });

      return NextResponse.json({ message: "Password updated successfully" });
    }

    return NextResponse.json({ error: "Invalid step" }, { status: 400 });
  } catch (err) {
    console.error("Error in change-password/otp route:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
