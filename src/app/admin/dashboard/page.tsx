"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { adminService } from "@/app/lib/services/admin.service";
import { getErrorMessage } from "@/app/lib/getErrorMessage";
import { DashboardHeader, DashboardStats } from "./components";

export default function AdminDashboard() {
  // ✅ State untuk menyimpan data dashboard sesuai dengan DashboardResponse
  const [dashboardData, setDashboardData] = useState({
    totalAdmin: 0,
    totalCapster: 0,
    totalCustomer: 0, // ✅ Sesuai dengan API response
    totalLayanan: 0,
    totalReservasi: 0,
  });

  const [loading, setLoading] = useState(true);

  // ✅ Fungsi fetch data menggunakan adminService
  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // ✅ Panggil adminService.getDashboardAdmin
      const response = await adminService.getDashboardAdmin();

      console.log("🔍 Dashboard API Response:", response);

      // ✅ Cek apakah response berhasil
      if (response.success && response.data) {
        setDashboardData({
          totalAdmin: response.data.totalAdmin,
          totalCapster: response.data.totalCapster,
          totalCustomer: response.data.totalCustomer,
          totalLayanan: response.data.totalLayanan,
          totalReservasi: response.data.totalReservasi,
        });

        // toast.success("Data dashboard berhasil dimuat");
      } else {
        throw new Error(response.message || "Gagal mengambil data dashboard");
      }
    } catch (error) {
      console.error("❌ Dashboard fetch error:", error);
      const errorMessage = getErrorMessage(error);

      // ✅ Set fallback data jika API gagal
      setDashboardData({
        totalAdmin: 0,
        totalCapster: 0,
        totalCustomer: 0,
        totalLayanan: 0,
        totalReservasi: 0,
      });

      toast.error("Gagal memuat data dashboard", {
        description: errorMessage || "Menggunakan data fallback",
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load data saat komponen mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="h-full bg-gray-50 p-6 flex flex-col">
      {/* Page Header */}
      <DashboardHeader
        title="Dashboard Admin"
        description="Selamat datang di panel admin Brocode Barbershop"
      />

      {/* Dashboard Cards */}
      <DashboardStats data={dashboardData} loading={loading} />
    </div>
  );
}
