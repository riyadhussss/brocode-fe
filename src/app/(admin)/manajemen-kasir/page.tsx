"use client";

import { useState } from "react";
import SidebarAdmin from "@/components/admin/Sidebar";

export default function ManajemenKasir() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SidebarAdmin sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Manajemen Kasir
            </h1>
            <p className="text-gray-600">
              Kelola Kasir dan penjadwalan Brocode Barbershop
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-gray-600">
              Halaman manajemen Kasir sedang dalam pengembangan...
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
