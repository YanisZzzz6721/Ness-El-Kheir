import type { ReactNode } from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F6F6F6] flex">
      <AdminSidebar />
      {/* pt-14 sur mobile pour compenser la top bar fixe */}
      <main className="flex-1 overflow-auto pt-14 md:pt-0 p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
