"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Package,
  Calendar,
  DollarSign,
  UserCheck,
  Phone,
  Scissors,
  Clock,
  CreditCard,
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { BaseHistoryData } from "./Columns";

interface ViewReservasiDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservasi: BaseHistoryData | null;
}

export function ViewReservasiDialog({
  open,
  onOpenChange,
  reservasi,
}: ViewReservasiDialogProps) {
  if (!reservasi) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return (
          <Badge className="bg-green-500 hover:bg-green-600 text-white text-base px-4 py-2">
            Selesai
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-500 hover:bg-red-600 text-white text-base px-4 py-2">
            Dibatalkan
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="text-base px-4 py-2">
            {status}
          </Badge>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detail Riwayat Reservasi</DialogTitle>
          <DialogDescription>
            Informasi lengkap tentang riwayat reservasi pelanggan
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Status Badge */}
          <div className="flex justify-center">
            {getStatusBadge(reservasi.status)}
          </div>

          <Separator />

          {/* Informasi Kasir */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Informasi Kasir</h3>
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <UserCheck className="h-4 w-4 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Diterima Oleh</p>
                <p className="font-medium text-gray-900">
                  {reservasi.createdBy.name}
                </p>
                {reservasi.createdBy.email && (
                  <p className="text-sm text-gray-500">
                    {reservasi.createdBy.email}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Informasi Pelanggan */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Informasi Pelanggan</h3>
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <User className="h-4 w-4 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Nama</p>
                <p className="font-medium text-gray-900">
                  {reservasi.customerName}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Phone className="h-4 w-4 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">No. Telepon</p>
                <p className="font-medium text-gray-900">
                  {reservasi.customerPhone}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Mail className="h-4 w-4 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="font-medium text-blue-600">
                  {reservasi.customerEmail}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Informasi Layanan */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Layanan</h3>
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Package className="h-4 w-4 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Paket Layanan</p>
                <p className="font-medium text-gray-900">
                  {reservasi.package.name}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {reservasi.package.description}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Scissors className="h-4 w-4 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Capster</p>
                <p className="font-medium text-gray-900">
                  {reservasi.barber.name}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Jadwal */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Jadwal</h3>
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Calendar className="h-4 w-4 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Tanggal & Waktu</p>
                <p className="font-medium text-gray-900">
                  {format(
                    new Date(reservasi.schedule.scheduled_time),
                    "EEEE, dd MMMM yyyy",
                    { locale: id }
                  )}
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(
                    new Date(reservasi.schedule.scheduled_time),
                    "HH:mm",
                    { locale: id }
                  )}{" "}
                  WIB
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Pembayaran */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Pembayaran</h3>
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <DollarSign className="h-4 w-4 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Total Pembayaran</p>
                <p className="font-bold text-2xl text-green-600">
                  {formatCurrency(reservasi.totalPrice)}
                </p>
              </div>
            </div>

            {reservasi.payment && (
              <>
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <CreditCard className="h-4 w-4 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-1">
                      Metode Pembayaran
                    </p>
                    <p className="font-medium text-gray-900 capitalize">
                      {reservasi.payment.paymentMethod.replace("_", " ")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-1">
                      Waktu Verifikasi
                    </p>
                    <p className="text-sm text-gray-900">
                      {format(
                        new Date(reservasi.payment.verifiedAt),
                        "dd MMMM yyyy, HH:mm",
                        { locale: id }
                      )}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Catatan */}
          {reservasi.notes && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Catatan</h3>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm">{reservasi.notes}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
