// components/RoleBasedNavbar.tsx
"use client";  // This part needs to be client-side because of usePathname

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import AdminNavbar from "@/components/AdminNavbar";

export default function RoleBasedNavbar() {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return isAdminRoute ? <AdminNavbar /> : <Navbar />;
}
