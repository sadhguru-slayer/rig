
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { FiLogOut, FiUser } from "react-icons/fi";
import {
  LayoutDashboard,
  Folder,
  Briefcase,
  FileText,
  PlusCircle,
  Menu,
  X,
} from "lucide-react";

// Share navItems with AdminSidebar for consistency
const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/project", icon: Folder, createHref: "/admin/project/create" },
  { label: "Services", href: "/admin/service", icon: Briefcase, createHref: "/admin/service/create" },
  { label: "Blogs", href: "/admin/blog", icon: FileText, createHref: "/admin/blog/create" },
];

export default function AdminNavbar() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isLoginPage = pathname.includes('login');
  const isSuperUser = admin?.isSuperUser || false;

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/me");
        if (res.ok) {
          const data = await res.json();
          setAdmin(data);
        }
      } catch {
        setAdmin(null);
      }
    }
    if (!isLoginPage) {
      checkAuth();
    }
  }, [isLoginPage]);

  // Close mobile menu when route changes
  useEffect(() => {
    if (pathname.includes('admin')) {
      setMobileMenuOpen(false);
    }
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          {/* Hamburger menu button - visible only on mobile (< md) */}
          {admin && !isLoginPage && (
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 -ml-2 hover:bg-gray-100 rounded-md transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
          <Image src="/logo_c.png" alt="Logo" width={40} height={40} className="h-8 w-8 md:h-10 md:w-10" />
          <span className="hidden sm:inline">Admin</span>
        </div>

        {admin && !isLoginPage && (
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-1 rounded-md hover:bg-gray-200 transition">
                  <FiUser className="w-4 h-4" />
                  <span className="hidden sm:inline">{admin.username}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => router.push("/admin/change-password")}>
                  Change Password
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <FiLogOut className="mr-2" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Menu Drawer - Slide out from left, visible only on mobile (< md) */}
      <aside
        className={`fixed top-12 left-0 h-[calc(100vh-3rem)] w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-40 md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="flex flex-col h-full px-2 py-4 overflow-y-auto">
          {/* Navigation Items */}
          {navItems.map(({ label, href, icon: Icon, createHref }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/');
            return (
              <div key={href} className="mb-1">
                <Link
                  href={href}
                  onClick={toggleMobileMenu}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-teal-100 text-teal-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </Link>

                {createHref && (
                  <Link
                    href={createHref}
                    onClick={toggleMobileMenu}
                    className="flex items-center gap-2 ml-9 mt-1 text-xs text-gray-500 hover:text-teal-600 hover:bg-gray-50 px-2 py-1 rounded-md transition"
                  >
                    <PlusCircle size={14} />
                    Create
                  </Link>
                )}
              </div>
            );
          })}

          {/* Users Menu - Only for Superusers */}
          {isSuperUser && (
            <div className="mb-1">
              <Link
                href="/admin/user"
                onClick={toggleMobileMenu}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === "/admin/user" || pathname.startsWith("/admin/user/")
                    ? "bg-teal-100 text-teal-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Folder size={18} />
                <span>Users</span>
              </Link>

              <Link
                href="/admin/user/create"
                onClick={toggleMobileMenu}
                className="flex items-center gap-2 ml-9 mt-1 text-xs text-gray-500 hover:text-teal-600 hover:bg-gray-50 px-2 py-1 rounded-md transition"
              >
                <PlusCircle size={14} />
                Create User
              </Link>
            </div>
          )}

          {/* Footer */}
          <div className="mt-auto p-3 border-t border-gray-100 text-[11px] text-gray-400 text-center">
            <p>© {new Date().getFullYear()} InvisibleGrills</p>
          </div>
        </nav>
      </aside>
    </>
  );
}