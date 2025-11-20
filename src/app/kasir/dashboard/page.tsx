"use client";

import { useState, useEffect } from "react";
import {
  FaShoppingCart,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createColumns } from "./components/Columns";
import { createConfirmedColumns } from "./components/ConfirmedColumns";
import { DataTable } from "./components/DataTable";
import ReservationDetailDialog from "./components/ReservationDetailDialog";
import CompleteReservationDialog from "./components/CompleteReservationDialog";
import { reservationService } from "@/app/lib/services/reservation.service";
import { PaymentRecord, Reservation } from "@/app/lib/types/reservation";
import { toast } from "sonner";
import { getErrorMessage } from "@/app/lib/getErrorMessage";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardKasir() {
  const [reservations, setReservations] = useState<PaymentRecord[]>([]);
  const [confirmedReservations, setConfirmedReservations] = useState<
    Reservation[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingConfirmed, setIsLoadingConfirmed] = useState(true);
  const [selectedReservation, setSelectedReservation] =
    useState<PaymentRecord | null>(null);
  const [selectedConfirmedReservation, setSelectedConfirmedReservation] =
    useState<Reservation | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);
  const [summary, setSummary] = useState({
    pending: 0,
    verified: 0,
    rejected: 0,
    total: 0,
  });

  const statCards = [
    {
      title: "Total Pesanan",
      value: summary.total,
      icon: FaShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Pembayaran Pending",
      value: summary.pending,
      icon: FaClock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Terverifikasi",
      value: summary.verified,
      icon: FaCheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Ditolak",
      value: summary.rejected,
      icon: FaTimesCircle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ];

  useEffect(() => {
    fetchReservations();
    fetchConfirmedReservations();
  }, []);

  const fetchReservations = async () => {
    setIsLoading(true);
    try {
      const response = await reservationService.checkReservations();
      if (response.success && response.data) {
        setReservations(response.data);
        setSummary({
          pending: response.summary.pending,
          verified: response.summary.verified,
          rejected: response.summary.rejected,
          total: response.count,
        });
      } else {
        toast.error("Gagal memuat data reservasi");
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchConfirmedReservations = async () => {
    setIsLoadingConfirmed(true);
    try {
      const response = await reservationService.checkConfirmedReservations();
      if (response.success && response.data) {
        setConfirmedReservations(response.data);
      } else {
        toast.error("Gagal memuat data reservasi terkonfirmasi");
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsLoadingConfirmed(false);
    }
  };

  const handleViewDetail = (reservation: PaymentRecord) => {
    setSelectedReservation(reservation);
    setIsDialogOpen(true);
  };

  const handleOpenCompleteDialog = (reservation: Reservation) => {
    setSelectedConfirmedReservation(reservation);
    setIsCompleteDialogOpen(true);
  };

  const handleCompleteReservation = async (reservationId: string) => {
    try {
      console.log("🔄 Completing reservation:", reservationId);

      const response = await reservationService.setReservationStatus(
        reservationId,
        {
          status: "completed",
          notes: "Reservasi selesai",
        }
      );

      console.log("✅ Complete response:", response);

      if (response.success) {
        toast.success("Reservasi berhasil ditandai sebagai selesai");
        fetchConfirmedReservations(); // Refresh data
      } else {
        toast.error(
          response.message || "Gagal menandai reservasi sebagai selesai"
        );
      }
    } catch (error) {
      console.error("❌ Complete reservation error:", error);
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }
  };

  const columns = createColumns(handleViewDetail);
  const confirmedColumns = createConfirmedColumns(handleOpenCompleteDialog);
  return (
    <div className="h-full bg-gray-50 p-6 flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Dashboard Kasir
        </h1>
        <p className="text-gray-600 text-sm">
          Selamat datang di panel kasir Brocode Aceh Barbershop
        </p>
      </div>

      <div className="space-y-6">
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

        {/* Recent Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Reservasi & Pembayaran</CardTitle>
            <CardDescription>
              Daftar reservasi dengan status pembayaran pending
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : (
              <DataTable columns={columns} data={reservations} />
            )}
          </CardContent>
        </Card>

        {/* Confirmed Reservations Table */}
        <Card>
          <CardHeader>
            <CardTitle>Konfirmasi Reservasi</CardTitle>
            <CardDescription>
              Daftar reservasi yang sudah terkonfirmasi
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingConfirmed ? (
              <div className="space-y-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : (
              <DataTable
                columns={confirmedColumns}
                data={confirmedReservations}
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Reservation Detail Dialog */}
      <ReservationDetailDialog
        reservation={selectedReservation}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onVerificationSuccess={fetchReservations}
      />

      {/* Complete Reservation Dialog */}
      <CompleteReservationDialog
        reservation={selectedConfirmedReservation}
        open={isCompleteDialogOpen}
        onOpenChange={setIsCompleteDialogOpen}
        onConfirm={handleCompleteReservation}
      />
    </div>
  );
}
