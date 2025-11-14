"use client";

import { usePathname } from "next/navigation";

export default function AdminSideLoading() {
  const pathname = usePathname();
  
  // Extract route name from pathname
  const getRouteName = () => {
    if (!pathname) return "Page";
    
    const pathSegments = pathname.split("/").filter(Boolean);
    
    // Remove 'admin' from segments
    const routeSegments = pathSegments.filter(seg => seg !== "admin");
    
    if (routeSegments.length === 0) return "Dashboard";
    
    // Capitalize first letter and format
    const routeName = routeSegments[routeSegments.length - 1];
    return routeName
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const routeName = getRouteName();

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <p className="text-gray-600 text-lg md:text-xl font-medium">
          Loading {routeName} Page...
        </p>
        <div className="mt-4 flex justify-center">
          <div className="h-1 w-24 bg-teal-200 rounded-full overflow-hidden">
            <div className="h-full w-full bg-teal-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

