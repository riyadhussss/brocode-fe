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
      const response = await reservationService.setReservationStatus(
        reservationId,
        {
          status: "completed",
          notes: "Reservasi selesai",
        }
      );

      if (response.success) {
        toast.success("Reservasi berhasil ditandai sebagai selesai");
        fetchConfirmedReservations(); // Refresh data
      } else {
        toast.error("Gagal menandai reservasi sebagai selesai");
      }
    } catch (error) {
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
          {/* Total Pesanan */}
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wide">
                    Total Pesanan
                  </p>
                  {isLoading ? (
                    <Skeleton className="h-9 w-16" />
                  ) : (
                    <p className="text-3xl font-bold">{summary.total}</p>
                  )}
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <FaShoppingCart className="text-blue-600 text-xl" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pesanan Pending */}
          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wide">
                    Pembayaran Pending
                  </p>
                  {isLoading ? (
                    <Skeleton className="h-9 w-16" />
                  ) : (
                    <p className="text-3xl font-bold">{summary.pending}</p>
                  )}
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <FaClock className="text-yellow-600 text-xl" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pesanan Terverifikasi */}
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wide">
                    Terverifikasi
                  </p>
                  {isLoading ? (
                    <Skeleton className="h-9 w-16" />
                  ) : (
                    <p className="text-3xl font-bold">{summary.verified}</p>
                  )}
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <FaCheckCircle className="text-green-600 text-xl" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pembayaran Ditolak */}
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wide">
                    Ditolak
                  </p>
                  {isLoading ? (
                    <Skeleton className="h-9 w-16" />
                  ) : (
                    <p className="text-3xl font-bold">{summary.rejected}</p>
                  )}
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <FaTimesCircle className="text-red-600 text-xl" />
                </div>
              </div>
            </CardContent>
          </Card>
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
