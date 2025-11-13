"use client";

export default function AdminFooter() {
  return (
    <footer className="w-full bg-gray-50 text-gray-400 text-xs text-center py-3 border-t border-gray-200 mt-auto">
      Admin Panel © {new Date().getFullYear()} InvisibleGrills
    </footer>
  );
}
