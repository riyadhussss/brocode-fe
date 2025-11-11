"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, CheckCircle, XCircle, Package } from "lucide-react";
import { toast } from "sonner";
import { getErrorMessage } from "@/app/lib/getErrorMessage";
import { customerService } from "@/app/lib/services/customer.service";
import { UserReservation } from "@/app/lib/types/customer";
import { DataTable } from "./components/data-table";
import { createColumns } from "./components/columns";
import ReservationDetailDialog from "./components/ReservationDetailDialog";

interface ReservationStats {
  total: number;
  accepted: number;
  rejected: number;
  completed: number;
}

export default function UserDashboard() {
  const [stats, setStats] = useState<ReservationStats>({
    total: 0,
    accepted: 0,
    rejected: 0,
    completed: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [reservations, setReservations] = useState<UserReservation[]>([]);
  const [selectedReservation, setSelectedReservation] =
    useState<UserReservation | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    setIsLoading(true);
    try {
      const response = await customerService.getCustomerReservations();

      if (response.success && response.data) {
        setReservations(response.data);

        // Calculate stats from actual data
        const total = response.count;
        const accepted = response.data.filter(
          (r) => r.status === "confirmed"
        ).length;
        const rejected = response.data.filter(
          (r) => r.status === "cancelled"
        ).length;
        const pending = response.data.filter(
          (r) => r.status === "pending"
        ).length;

        setStats({
          total,
          accepted,
          rejected,
          completed: accepted, // Assuming confirmed = completed
        });
      } else {
        toast.error("Gagal memuat data dashboard");
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error("Gagal memuat data dashboard", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetail = (reservation: UserReservation) => {
    setSelectedReservation(reservation);
    setIsDialogOpen(true);
  };

  const statCards = [
    {
      title: "Total Pesanan",
      value: stats.total,
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Pesanan Diterima",
      value: stats.accepted,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Pesanan Ditolak",
      value: stats.rejected,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Pesanan Selesai",
      value: stats.completed,
      icon: Package,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Selamat datang! Lihat ringkasan pesanan Anda di sini
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {card.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${card.bgColor}`}>
                    <Icon className={`h-5 w-5 ${card.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <Skeleton className="h-10 w-20" />
                  ) : (
                    <div className="text-3xl font-bold text-gray-900">
                      {card.value}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Reservations Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Reservasi</CardTitle>
            <CardDescription>
              Riwayat semua reservasi yang pernah Anda buat
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-64 w-full" />
              </div>
            ) : (
              <DataTable
                columns={createColumns(handleViewDetail)}
                data={reservations}
              />
            )}
          </CardContent>
        </Card>

        {/* Reservation Detail Dialog */}
        <ReservationDetailDialog
          reservation={selectedReservation}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      </div>
    </div>
  );
}
