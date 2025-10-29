import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link"; // ✅ import Link for buttons

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900 relative`}
      >
        <Navbar showUtilityBar />
        {children}
        <Footer />

        {/* ✅ Floating Contact Buttons */}
        <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-3">
          {/* 📞 Call Button */}
          <Link
            href="tel:+919000000000" // change to your actual number
            aria-label="Call Us"
            className="bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
          >
          <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-5 h-5"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.88 19.88 0 0 1 3.08 5.18 2 2 0 0 1 5.06 3h3a1 1 0 0 1 1 .75 12.05 12.05 0 0 0 .65 2.27 1 1 0 0 1-.23 1L8.09 8.91a16 16 0 0 0 7 7l1.9-1.39a1 1 0 0 1 1-.12 12.05 12.05 0 0 0 2.27.65 1 1 0 0 1 .74 1v.02z" />
        </svg>
        
          </Link>
        </div>

        <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
          {/* 💬 WhatsApp Button */}
          <Link
            href="https://wa.me/919000000000" // change to your WhatsApp number
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M16.001 3.2C9.372 3.2 4 8.572 4 15.2c0 2.684.72 5.182 2.072 7.388L4 28.8l6.445-2.009A11.9 11.9 0 0016 27.2c6.628 0 12-5.372 12-12s-5.372-12-11.999-12zm0 21.6c-1.902 0-3.753-.502-5.38-1.452l-.385-.225-3.825 1.191 1.243-3.7-.25-.39A9.814 9.814 0 016.2 15.2c0-5.414 4.386-9.8 9.8-9.8 5.414 0 9.8 4.386 9.8 9.8s-4.386 9.8-9.8 9.8zm5.41-7.335c-.295-.148-1.74-.858-2.01-.956-.27-.099-.468-.148-.666.148-.197.296-.764.956-.937 1.153-.173.197-.346.222-.64.074-.295-.148-1.246-.46-2.372-1.468-.878-.782-1.47-1.748-1.642-2.043-.173-.296-.018-.455.13-.603.134-.133.296-.346.444-.519.148-.173.197-.296.296-.494.099-.197.05-.37-.025-.519-.074-.148-.667-1.611-.914-2.205-.24-.577-.484-.5-.666-.51-.173-.009-.37-.011-.568-.011-.198 0-.519.074-.792.37-.273.296-1.042 1.017-1.042 2.479s1.067 2.876 1.216 3.074c.148.197 2.098 3.21 5.086 4.503.711.306 1.265.489 1.696.625.712.227 1.36.195 1.872.118.571-.085 1.74-.711 1.986-1.397.245-.686.245-1.273.172-1.397-.074-.124-.27-.198-.565-.346z" />
            </svg>
          </Link>
        </div>
      </body>
    </html>
  );
}
