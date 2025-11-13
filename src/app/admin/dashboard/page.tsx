"use client";

import { DashboardHeader, DashboardStats } from "./components";
import { useDashboardAdminData } from "./hooks/useDashboardAdminData";

export default function AdminDashboard() {
  const { dashboardAdminData, loading } = useDashboardAdminData();

  return (
    <div className="h-full bg-gray-50 p-6 flex flex-col">
      <DashboardHeader
        title="Dashboard Admin"
        description="Selamat datang di panel admin Brocode Barbershop"
      />
      <DashboardStats data={dashboardAdminData} loading={loading} />
    </div>
  );
}
