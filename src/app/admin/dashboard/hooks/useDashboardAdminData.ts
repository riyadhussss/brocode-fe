"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { adminService } from "@/app/lib/services/admin.service";
import { getErrorMessage } from "@/app/lib/getErrorMessage";

export function useDashboardAdminData() {
  const [dashboardAdminData, setDashboardAdminData] = useState({
    totalAdmin: 0,
    totalCapster: 0,
    totalCustomer: 0,
    totalLayanan: 0,
    totalReservasi: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboardAdminData = async () => {
    try {
      setLoading(true);
      const response = await adminService.getDashboardAdmin();

      if (response.success && response.data) {
        setDashboardAdminData({
          totalAdmin: response.data.totalAdmin,
          totalCapster: response.data.totalCapster,
          totalCustomer: response.data.totalCustomer,
          totalLayanan: response.data.totalLayanan,
          totalReservasi: response.data.totalReservasi,
        });
      } else {
        throw new Error(response.message || "Gagal mengambil data dashboard");
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error("❌ Dashboard fetch error:", error);

      setDashboardAdminData({
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

  useEffect(() => {
    fetchDashboardAdminData();
  }, []);

  return { dashboardAdminData, loading, fetchDashboardAdminData };
}
