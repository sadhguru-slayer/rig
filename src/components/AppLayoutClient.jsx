"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import RoleBasedNavbar from "@/components/RoleBasedNavbar";
import RoleBasedFooter from "@/components/RoleBasedFooter";
import AdminSidebar from "@/components/AdminSidebar";

export default function AppLayoutClient({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      {/* Navbar */}
      <RoleBasedNavbar showUtilityBar />

      <div className="flex min-h-screen overflow-x-hidden">
        {/* Sidebar only for admin (except login) */}
        {isAdminRoute && !pathname.includes("/login") && (
          <div
            className={`${
              sidebarOpen ? "w-60" : "w-16"
            } fixed top-12 left-0 h-[calc(100vh-3rem)] border-r border-gray-200 bg-white transition-all duration-300 hidden md:flex`}
          >
            <AdminSidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
          </div>
        )}

        {/* Main content area */}
        <main
          className={`flex-1 w-full transition-all duration-300 ${
            isAdminRoute && !pathname.includes("/login")
              ? sidebarOpen
                ? "md:ml-60"
                : "md:ml-16"
              : "p-0"
          }`}
        >
          <div className={`
            ${isAdminRoute ? 'p-4':'p-0'}
            min-h-[80vh]  bg-white overflow-hidden transition-all duration-300`}>
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <RoleBasedFooter />
    </>
  );
}
