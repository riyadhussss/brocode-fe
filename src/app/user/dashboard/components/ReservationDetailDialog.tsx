"use client";

import { UserReservation } from "@/app/lib/types/customer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Phone, Mail, Calendar, Scissors, FileText } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface ReservationDetailDialogProps {
  reservation: UserReservation | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ReservationDetailDialog({
  reservation,
  open,
  onOpenChange,
}: ReservationDetailDialogProps) {
  if (!reservation) return null;

  const getStatusBadge = (
    status: "pending" | "confirmed" | "cancelled"
  ): "default" | "success" | "destructive" => {
    switch (status) {
      case "confirmed":
        return "success";
      case "cancelled":
        return "destructive";
      default:
        return "default";
    }
  };

  const getStatusText = (
    status: "pending" | "confirmed" | "cancelled"
  ): string => {
    switch (status) {
      case "pending":
        return "Menunggu Konfirmasi";
      case "confirmed":
        return "Dikonfirmasi";
      case "cancelled":
        return "Dibatalkan";
      default:
        return status;
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detail Reservasi</DialogTitle>
          <DialogDescription>
            Informasi lengkap tentang reservasi Anda
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Reservation Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Informasi Reservasi
            </h3>
            <div className="grid grid-cols-2 gap-3 p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">ID Reservasi</p>
                <p className="font-semibold">{reservation.reservationId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant={getStatusBadge(reservation.status)}>
                  {getStatusText(reservation.status)}
                </Badge>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">
                  Tanggal Reservasi
                </p>
                <p className="font-medium">
                  {format(
                    new Date(reservation.createdAt),
                    "dd MMMM yyyy, HH:mm",
                    {
                      locale: id,
                    }
                  )}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Customer Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <User className="h-5 w-5" />
              Informasi Customer
            </h3>
            <div className="grid grid-cols-1 gap-3 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Nama</p>
                  <p className="font-medium">{reservation.customerName}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">No. Telepon</p>
                  <p className="font-medium">{reservation.customerPhone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{reservation.customerEmail}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Service & Price */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Scissors className="h-5 w-5" />
              Layanan dan Harga
            </h3>
            <div className="grid grid-cols-1 gap-3 p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Paket Layanan</p>
                <p className="font-semibold text-lg">
                  {reservation.package.name}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {reservation.package.description}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Harga</p>
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(reservation.totalPrice)}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Capster & Schedule */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Capster dan Waktu
            </h3>
            <div className="grid grid-cols-1 gap-3 p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Capster</p>
                <p className="font-semibold text-lg">
                  {reservation.barber.name}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Tanggal & Waktu
                  </p>
                  <p className="font-medium">
                    {format(
                      new Date(reservation.schedule.scheduled_time),
                      "EEEE, dd MMMM yyyy",
                      { locale: id }
                    )}
                  </p>
                  <p className="text-sm font-semibold text-primary">
                    Pukul{" "}
                    {format(
                      new Date(reservation.schedule.scheduled_time),
                      "HH:mm",
                      { locale: id }
                    )}{" "}
                    WIB
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {reservation.notes && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Catatan
                </h3>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm">{reservation.notes}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
