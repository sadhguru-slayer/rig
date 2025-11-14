"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import RoleBasedNavbar from "@/components/RoleBasedNavbar";
import RoleBasedFooter from "@/components/RoleBasedFooter";
import AdminSidebar from "@/components/AdminSidebar";
import PhoneButton from "@/components/PhoneButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import ClientSideLoading from "@/components/ClientSideLoading";
import AdminSideLoading from "@/components/AdminSideLoading";


export default function AppLayoutClient({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isAdminLoading, setIsAdminLoading] = useState(false);
  const [isRouteTransitioning, setIsRouteTransitioning] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const [admin, setAdmin] = useState(null);
  
  useEffect(() => {
    async function fetchAdmin() {
      setIsAdminLoading(true);
      try {
        const res = await fetch("/api/admin/me", { credentials: "include" });
        if (!res.ok) return setAdmin(null);
        const data = await res.json();
        setAdmin(data);
      } catch (error) {
        setAdmin(null);
      } finally {
        setIsAdminLoading(false);
      }
    }

    if (isAdminRoute && !pathname.includes("/login")) {
      fetchAdmin();
    } else {
      setAdmin(null);
      setIsAdminLoading(false);
    }
  }, [pathname, isAdminRoute]);

  // Handle route transitions and initial load
  useEffect(() => {
    // Handle initial load
    if (isInitialLoad && !isAdminRoute) {
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
      }, 3500); // Match ClientSideLoading animation duration (~3.5s)
      return () => clearTimeout(timer);
    } else if (isInitialLoad && isAdminRoute) {
      // For admin routes, skip the initial loading screen
      setIsInitialLoad(false);
    }
  }, [pathname, isInitialLoad, isAdminRoute]);

  // Handle route transitions for admin pages
  useEffect(() => {
    if (isAdminRoute && !pathname.includes("/login")) {
      setIsRouteTransitioning(true);
      const timer = setTimeout(() => {
        setIsRouteTransitioning(false);
      }, 300); // Brief transition delay
      return () => clearTimeout(timer);
    }
  }, [pathname, isAdminRoute]);

  // Show ClientSideLoading on initial load for non-admin routes
  if (isInitialLoad && !isAdminRoute) {
    return <ClientSideLoading />;
  }


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
          <AdminSidebar 
  open={sidebarOpen} 
  toggleSidebar={toggleSidebar} 
  isSuperUser={admin?.isSuperUser}
/>
 
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
            {/* Show AdminSideLoading for admin routes during loading or transitions */}
            {isAdminRoute && !pathname.includes("/login") && (isAdminLoading || isRouteTransitioning) ? (
              <AdminSideLoading />
            ) : (
              children
            )}
          </div>
        </main>
      </div>

      {/* Footer */}
      <RoleBasedFooter />
{!isAdminRoute && !pathname.includes("/login") &&(
<>
<PhoneButton />
<WhatsAppButton />
</>
)
}

    </>
  );
}
