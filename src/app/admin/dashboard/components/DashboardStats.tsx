import React from "react";
import { Users, Scissors, UserCheck, Wrench, Calendar } from "lucide-react";
import { DashboardStatsCard } from "./DashboardStatsCard";

interface DashboardData {
  totalAdmin: number;
  totalCapster: number;
  totalCustomer: number;
  totalLayanan: number;
  totalReservasi: number;
}

interface DashboardStatsProps {
  data: DashboardData;
  loading?: boolean;
}

export function DashboardStats({ data, loading = false }: DashboardStatsProps) {
  const statsConfig = [
    {
      title: "Total Admin",
      value: data.totalAdmin,
      icon: Users,
      formatNumber: false,
    },
    {
      title: "Total Capster",
      value: data.totalCapster,
      icon: Scissors,
      formatNumber: false,
    },
    {
      title: "Total Customer",
      value: data.totalCustomer,
      icon: UserCheck,
      formatNumber: true,
    },
    {
      title: "Total Layanan",
      value: data.totalLayanan,
      icon: Wrench,
      formatNumber: false,
    },
    {
      title: "Total Reservasi",
      value: data.totalReservasi,
      icon: Calendar,
      formatNumber: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8 flex-shrink-0">
      {statsConfig.map((stat) => (
        <DashboardStatsCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          loading={loading}
          formatNumber={stat.formatNumber}
        />
      ))}
    </div>
  );
}
