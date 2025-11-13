import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="mt-12 p-2 md:p-4 min-h-screen shadow-lg rounded-lg border">
        {children}
    </div>
  );
}
