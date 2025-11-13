// components/RoleBasedFooter.tsx
"use client";  // This part needs to be client-side because of any client-side logic

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import AdminFooter from "./AdminFooter";


export default function RoleBasedFooter() {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return isAdminRoute ? <AdminFooter /> : <Footer />;
}
