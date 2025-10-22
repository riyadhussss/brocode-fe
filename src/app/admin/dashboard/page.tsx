"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { adminService } from "@/app/lib/services/admin.service";
import { Users, Scissors, UserCheck, Wrench, Calendar } from "lucide-react";

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
    } catch (error: any) {
      console.error("❌ Dashboard fetch error:", error);

      // ✅ Set fallback data jika API gagal
      setDashboardData({
        totalAdmin: 0,
        totalCapster: 0,
        totalCustomer: 0,
        totalLayanan: 0,
        totalReservasi: 0,
      });

      toast.error("Gagal memuat data dashboard", {
        description: error.message || "Menggunakan data fallback",
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
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Dashboard Admin
            </h1>
            <p className="text-gray-600 text-sm">
              Selamat datang di panel admin Brocode Barbershop
            </p>
          </div>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8 flex-shrink-0">
        {/* Total Admin */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Admin</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {" "}
              {loading ? "..." : dashboardData.totalAdmin}
            </div>
          </CardContent>
        </Card>

        {/* Total Capster */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Capster</CardTitle>
            <Scissors className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : dashboardData.totalCapster}
            </div>
          </CardContent>
        </Card>

        {/* Total Customer */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customer
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : dashboardData.totalCustomer.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        {/* Total Layanan */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Layanan</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : dashboardData.totalLayanan}
            </div>
          </CardContent>
        </Card>

        {/* Total Reservasi */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Reservasi
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : dashboardData.totalReservasi.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
