"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Phone, Calendar, Image as ImageIcon } from "lucide-react";
import { CapsterRowData } from "./columns";

interface ViewCapsterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  capster: CapsterRowData | null;
}

export function ViewCapsterDialog({
  open,
  onOpenChange,
  capster,
}: ViewCapsterDialogProps) {
  if (!capster) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
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
          <DialogTitle>Detail Capster</DialogTitle>
          <DialogDescription>
            Informasi lengkap tentang capster
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Photo Section */}
          <div className="flex justify-center">
            <div className="relative h-32 w-32">
              {capster.photo ? (
                <Image
                  src={capster.photo}
                  alt={capster.name}
                  fill
                  className="object-cover rounded-lg border-2 border-gray-200"
                />
              ) : (
                <div className="h-32 w-32 flex items-center justify-center bg-gray-100 rounded-lg border-2 border-gray-200">
                  <ImageIcon className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Info Section */}
          <div className="space-y-4">
            {/* Nama */}
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <User className="h-4 w-4 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Nama Capster</p>
                <p className="font-medium text-gray-900">{capster.name}</p>
              </div>
            </div>

            {/* Nomor HP */}
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Phone className="h-4 w-4 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Nomor HP</p>
                <p className="font-medium text-gray-900">{capster.phone}</p>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <div className="h-4 w-4 flex items-center justify-center">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      capster.isActive ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <Badge
                  className={
                    capster.isActive
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }
                >
                  {capster.isActive ? "Aktif" : "Tidak Aktif"}
                </Badge>
              </div>
            </div>

            {/* Barber ID */}
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <div className="h-4 w-4 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-500">#</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Barber ID</p>
                <p className="font-mono text-sm text-gray-900">
                  {capster.barberId}
                </p>
              </div>
            </div>

            <Separator />

            {/* Tanggal Dibuat */}
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Calendar className="h-4 w-4 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Tanggal Dibuat</p>
                <p className="text-sm text-gray-900">
                  {formatDate(capster.createdAt)}
                </p>
              </div>
            </div>

            {/* Tanggal Diperbarui */}
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Calendar className="h-4 w-4 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">
                  Terakhir Diperbarui
                </p>
                <p className="text-sm text-gray-900">
                  {formatDate(capster.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
