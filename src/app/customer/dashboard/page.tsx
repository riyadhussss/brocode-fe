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
import { Button } from "@/components/ui/button";

interface ReservationStats {
  total: number;
  pending: number;
  accepted: number;
  rejected: number;
  completed: number;
}

export default function UserDashboard() {
  const [stats, setStats] = useState<ReservationStats>({
    total: 0,
    pending: 0,
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

        // Use summary if available, otherwise calculate from data
        if (response.summary) {
          setStats({
            total: response.summary.total,
            pending: response.summary.paymentStatus.pending,
            accepted: response.summary.paymentStatus.verified,
            rejected: response.summary.paymentStatus.rejected,
            completed: response.summary.reservationStatus.confirmed,
          });
        } else {
          // Fallback: Calculate stats from actual data
          const total = response.count;
          const pendingPayment = response.data.filter(
            (r) => r.paymentStatus === "pending"
          ).length;
          const verifiedPayment = response.data.filter(
            (r) => r.paymentStatus === "verified"
          ).length;
          const rejectedPayment = response.data.filter(
            (r) => r.paymentStatus === "rejected"
          ).length;
          const completedReservation = response.data.filter(
            (r) => r.status === "completed"
          ).length;

          setStats({
            total,
            pending: pendingPayment,
            accepted: verifiedPayment,
            rejected: rejectedPayment,
            completed: completedReservation,
          });
        }
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
      title: "Pesanan Pending",
      value: stats.pending,
      icon: Package,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
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
      icon: CheckCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="h-full bg-gray-50 p-6 flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600 text-sm">
          Selamat datang! Lihat ringkasan pesanan Anda di sini
        </p>
      </div>

      <div className="space-y-6">
        {/* Reservation CTA */}
        <Card className="bg-black text-white border-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">
                  Ingin membuat reservasi?
                </h2>
                <p className="text-blue-50">
                  Pilih paket layanan, pilih capster favorit, dan tentukan
                  jadwal Anda
                </p>
              </div>
              <Button variant={"yellow"} size={"lg"}>
                <a href="/customer/reservasi">Buat Reservasi</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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
