"use client";

import { useEffect, useState } from "react";
import {
  FaUsers,
  FaCut,
  FaCashRegister,
  FaUserShield,
  FaHistory,
} from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { adminService } from "@/app/lib/services/admin.service";

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
        <Card className="border-0 border-l-4 border-blue-500 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              Total Admin
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-900">
              {loading ? "..." : dashboardData.totalAdmin}
            </p>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaUserShield className="text-blue-600" size={20} />
            </div>
          </CardContent>
        </Card>

        {/* Total Capster */}
        <Card className="border-0 border-l-4 border-green-600 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              Total Capster
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-900">
              {loading ? "..." : dashboardData.totalCapster}
            </p>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <FaCut className="text-green-600" size={20} />
            </div>
          </CardContent>
        </Card>

        {/* Total Customer (bukan User) */}
        <Card className="border-0 border-l-4 border-purple-500 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              Total Customer
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-900">
              {loading ? "..." : dashboardData.totalCustomer.toLocaleString()}
            </p>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FaUsers className="text-purple-600" size={20} />
            </div>
          </CardContent>
        </Card>

        {/* Total Layanan */}
        <Card className="border-0 border-l-4 border-orange-600 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              Total Layanan
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-900">
              {loading ? "..." : dashboardData.totalLayanan}
            </p>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <FaCashRegister className="text-orange-600" size={20} />
            </div>
          </CardContent>
        </Card>

        {/* Total Reservasi */}
        <Card className="border-0 border-l-4 border-yellow-600 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              Total Reservasi
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-900">
              {loading ? "..." : dashboardData.totalReservasi.toLocaleString()}
            </p>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FaHistory className="text-yellow-600" size={20} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
