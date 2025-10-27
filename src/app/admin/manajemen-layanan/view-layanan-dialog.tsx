"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  DollarSign,
  FileText,
  Calendar,
  Clock,
  Hash,
} from "lucide-react";
import type { LayananRowData } from "./columns";

interface ViewLayananDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  layanan: LayananRowData | null;
}

export function ViewLayananDialog({
  open,
  onOpenChange,
  layanan,
}: ViewLayananDialogProps) {
  if (!layanan) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Detail Layanan</DialogTitle>
          <DialogDescription>
            Informasi lengkap tentang layanan
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Nama Layanan */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium text-gray-500">Nama Layanan</p>
              <p className="text-base font-semibold text-gray-900">
                {layanan.name}
              </p>
            </div>
          </div>

          {/* Harga */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium text-gray-500">Harga</p>
              <p className="text-base font-semibold text-green-600">
                {formatCurrency(layanan.price)}
              </p>
            </div>
          </div>

          {/* Deskripsi */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-50">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium text-gray-500">Deskripsi</p>
              <p className="text-sm text-gray-900 leading-relaxed">
                {layanan.description}
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
              <Hash className="h-5 w-5 text-amber-600" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium text-gray-500">Status</p>
              <Badge 
                className={
                  layanan.isActive 
                    ? "bg-green-500 hover:bg-green-600 text-white" 
                    : "bg-red-500 hover:bg-red-600 text-white"
                }
              >
                {layanan.isActive ? "Aktif" : "Tidak Aktif"}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Dibuat Pada */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
              <Calendar className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium text-gray-500">Dibuat Pada</p>
              <p className="text-sm text-gray-900">
                {formatDate(layanan.createdAt)}
              </p>
            </div>
          </div>

          {/* Diupdate Pada */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
              <Clock className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium text-gray-500">Diupdate Pada</p>
              <p className="text-sm text-gray-900">
                {formatDate(layanan.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
