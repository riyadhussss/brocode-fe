"use client";

import { useState } from "react";
import SidebarKasir from "@/components/kasir/Sidebar";

export default function KasirLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarKasir sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main
        className={`p-8 transition-all duration-300 ${
          sidebarOpen ? "ml-72" : "ml-20"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
