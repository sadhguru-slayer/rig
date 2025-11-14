import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { signToken } from "@/lib/auth";
import { serialize } from "cookie";
import nodemailer from "nodemailer";

// Temporary in-memory OTP store
const otpStore = {}; // { username: { otp, expiresAt } }

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // your gmail
    pass: process.env.GMAIL_APP_PASSWORD, // app password
  },
});

// Step 1: password verification + send OTP
export async function POST(req) {
  try {
    const { username, password, otp } = await req.json();

    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    if (!admin.isActive) {
  return NextResponse.json({ error: "You're not allowed to login" }, { status: 401 });
}
    // If OTP is provided, verify it
    if (otp) {
      const record = otpStore[username];
      if (!record || record.otp !== otp || record.expiresAt < Date.now()) {
        return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 401 });
      }

      // OTP verified → issue JWT
      // OTP verified → issue JWT
      const token = await signToken({ sub: admin.id, username: admin.username, isSuperUser :admin.isSuperUser  });


      // Clear OTP
      delete otpStore[username];

      const cookie = serialize("core_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return new NextResponse(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Set-Cookie": cookie, "Content-Type": "application/json" },
      });
    }

    // Step 1: password verification
    if (!password) return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    // Generate OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[username] = {
      otp: generatedOtp,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
    };

    // Send OTP via Gmail
   // After verifying password and generating OTP...

// Determine the recipient email
const recipientEmail =
  process.env.ADMIN_EMAIL || admin.email;

if (!recipientEmail) {
  console.error("No admin email found in DB or ENV");
  return NextResponse.json(
    { error: "No recipient email configured" },
    { status: 500 }
  );
}

// Send OTP via Gmail
await transporter.sendMail({
  from: `"Your App" <${process.env.GMAIL_USER}>`,
  to: recipientEmail,
  subject: "Your OTP for Admin Login",
  text: `Your OTP is: ${generatedOtp}. It expires in 5 minutes.`,
});


    return NextResponse.json({ ok: true, otpSent: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
