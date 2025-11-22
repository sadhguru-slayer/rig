"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Folder,
  Briefcase,
  FileText,
  PlusCircle,
  Menu,
  X,
  ShoppingCart,
  Users,
} from "lucide-react";
import Divider from "@/components/Divider";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Orders", href: "/admin/order", icon: ShoppingCart, createHref: "/admin/order/create" },
  { label: "Customers", href: "/admin/customer", icon: Users, createHref: "/admin/customer/create" }, // Assuming customer create page exists or will exist
  { label: "Projects", href: "/admin/project", icon: Folder, createHref: "/admin/project/create" },
  { label: "Services", href: "/admin/service", icon: Briefcase, createHref: "/admin/service/create" },
  { label: "Blogs", href: "/admin/blog", icon: FileText, createHref: "/admin/blog/create" },
];

export default function AdminSidebar({ open, toggleSidebar, isSuperUser }) {
  const pathname = usePathname();
  
  return (
    <aside
      className={`flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-300 ${open ? "w-60" : "w-16"
        }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b border-gray-100">
        {open && (
          <h1 className="text-sm font-bold tracking-wide text-gray-700">
            Admin Menu
          </h1>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-md transition"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        {navItems.map(({ label, href, icon: Icon, createHref }) => {
          const isActive = pathname === href;
          return (
            <div key={href} className="mb-1">
              <Link
                href={href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                  ? "bg-teal-100 text-teal-600"
                  : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <Icon size={18} />
                {open && <span>{label}</span>}
              </Link>

              {createHref && open && (
                <Link
                  href={createHref}
                  className="flex items-center gap-2 ml-9 mt-1 text-xs text-gray-500 hover:text-teal-600 hover:bg-gray-50 px-2 py-1 rounded-md transition"
                >
                  <PlusCircle size={14} />
                  Create
                </Link>
              )}
            </div>
          );
        })}

        {
          isSuperUser && (
            <>
              <Divider />
              <div className="mb-1">
                <Link
                  href="/admin/user"
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === "/admin/user"
                    ? "bg-teal-100 text-teal-600"
                    : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  <Folder size={18} />
                  {open && <span>Users</span>}
                </Link>

                {open && (
                  <Link
                    href="/admin/user/create"
                    className="flex items-center gap-2 ml-9 mt-1 text-xs text-gray-500 hover:text-teal-600 hover:bg-gray-50 px-2 py-1 rounded-md transition"
                  >
                    <PlusCircle size={14} />
                    Create User
                  </Link>
                )}
              </div>
            </>
          )
        }

      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-100 text-[11px] text-gray-400 text-center">
        {open && <p>© {new Date().getFullYear()} InvisibleGrills</p>}
      </div>
    </aside>
  );
}
