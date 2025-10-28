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
} from "lucide-react";
import { ReservasiRowData } from "./columns";

interface ViewReservasiDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservasi: ReservasiRowData | null;
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Detail Reservasi</DialogTitle>
          <DialogDescription>
            Informasi lengkap tentang reservasi pelanggan
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Status Badge */}
          <div className="flex justify-center">
            <Badge
              className={
                reservasi.status === "selesai"
                  ? "bg-green-500 hover:bg-green-600 text-white text-base px-4 py-2"
                  : "bg-red-500 hover:bg-red-600 text-white text-base px-4 py-2"
              }
            >
              {reservasi.status === "selesai" ? "Selesai" : "Dibatalkan"}
            </Badge>
          </div>

          <Separator />

          {/* Info Section */}
          <div className="space-y-4">
            {/* Kasir */}
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <UserCheck className="h-4 w-4 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">
                  Diterima Oleh (Kasir)
                </p>
                <p className="font-medium text-gray-900">
                  {reservasi.diterimaOleh}
                </p>
              </div>
            </div>

            {/* Nama Pelanggan */}
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <User className="h-4 w-4 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Nama Pelanggan</p>
                <p className="font-medium text-gray-900">{reservasi.nama}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Mail className="h-4 w-4 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="font-medium text-blue-600">{reservasi.email}</p>
              </div>
            </div>

            <Separator />

            {/* Paket Layanan */}
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Package className="h-4 w-4 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Paket Layanan</p>
                <p className="font-medium text-gray-900">{reservasi.paket}</p>
              </div>
            </div>

            {/* Harga */}
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <DollarSign className="h-4 w-4 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Harga</p>
                <p className="font-semibold text-green-600 text-lg">
                  {formatCurrency(reservasi.harga)}
                </p>
              </div>
            </div>

            {/* Tanggal */}
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Calendar className="h-4 w-4 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Tanggal Reservasi</p>
                <p className="text-sm text-gray-900">
                  {formatDate(reservasi.tanggal)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
