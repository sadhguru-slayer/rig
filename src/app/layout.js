// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import RoleBasedNavbar from "@/components/RoleBasedNavbar";
import RoleBasedFooter from "@/components/RoleBasedFooter";
import PhoneButton from "@/components/PhoneButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import AppLayoutClient from "@/components/AppLayoutClient";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Invisible Grills | Safety with Uncompromised Views",
  description:
    "Premium invisible grills for balconies, windows, and facades—engineered for safety, durability, and elegant aesthetics.",
  icons: {
    icon: "../../public/logo_c.png",
    shortcut: "../../public/logo_c.png",
    apple: "../../public/logo_c.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        <Toaster />
        {/* Client-side layout logic */}
        <AppLayoutClient>{children}</AppLayoutClient>

        {/* Floating buttons stay globally */}
        <PhoneButton />
        <WhatsAppButton />
      </body>
    </html>
  );
}
