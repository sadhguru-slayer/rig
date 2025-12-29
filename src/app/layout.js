// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import RoleBasedNavbar from "@/components/RoleBasedNavbar";
import RoleBasedFooter from "@/components/RoleBasedFooter";
import AppLayoutClient from "@/components/AppLayoutClient";
import "./globals.css";
import Script from "next/script";

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
      <head>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></Script>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
        >{`
          (function(w,d,s,l,i){w[l]=w[l]||[];
          w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
          var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
          j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
          f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-K294VQLX');
        `}</Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
      <noscript>
  <iframe
    src="https://www.googletagmanager.com/ns.html?id=GTM-K294VQLX"
    height="0"
    width="0"
    style={{ display: "none", visibility: "hidden" }}
  />
</noscript>

        <Toaster />
        {/* Client-side layout logic */}
        <AppLayoutClient>{children}</AppLayoutClient>

        {/* Floating buttons stay globally */}

      </body>
    </html>
  );
}
