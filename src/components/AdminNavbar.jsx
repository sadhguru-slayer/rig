"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { FiLogOut, FiUser } from "react-icons/fi";


export default function AdminNavbar() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const pathname = usePathname();

  const isLoginPage = pathname.includes('login');
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
    checkAuth();
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-12 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
        <Image src="/logo_c.png" alt="Logo" width={40} height={40} />
        <span>Admin</span>
      </div>

      {admin && !isLoginPage && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-1 rounded-md hover:bg-gray-200 transition">
              <FiUser />
              <span>{admin.username}</span>
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
      )}
    </header>
  );
}
