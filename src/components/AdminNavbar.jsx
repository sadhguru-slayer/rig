"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { FiLogOut } from "react-icons/fi";
import Image from "next/image";

export default function AdminNavbar() {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-12 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
        <span className="text-teal-600">
        <Image
        src="/logo_c.png"
        alt="Reddy Invisible Grills"
        width={400}
        height={400}
        className="w-14"
        />
        </span> Admin
      </div>

      <button
        onClick={logout}
        className="flex items-center gap-1 text-xs bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
      >
        <FiLogOut />
        Logout
      </button>
    </header>
  );
}
