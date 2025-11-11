"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reservation } from "@/app/lib/types/reservation";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { CheckCircle2 } from "lucide-react";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export const createConfirmedColumns = (
  onViewDetail: (reservation: Reservation) => void
): ColumnDef<Reservation>[] => [
  {
    id: "number",
    header: "No",
    cell: ({ row }) => <div className="font-medium">{row.index + 1}</div>,
    size: 60,
  },
  {
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => <div>{row.original.customerName}</div>,
    size: 150,
  },
  {
    accessorKey: "package.name",
    header: "Layanan",
    cell: ({ row }) => <div>{row.original.package.name}</div>,
    size: 180,
  },
  {
    accessorKey: "barber.name",
    header: "Capster",
    cell: ({ row }) => <div>{row.original.barber.name}</div>,
    size: 130,
  },
  {
    accessorKey: "schedule.scheduled_time",
    header: "Jadwal",
    cell: ({ row }) => {
      const scheduledTime = row.original.schedule.scheduled_time;
      return (
        <div>
          <div className="font-medium">
            {format(new Date(scheduledTime), "dd MMM yyyy", { locale: id })}
          </div>
          <div className="text-sm text-muted-foreground">
            {format(new Date(scheduledTime), "HH:mm", { locale: id })}
          </div>
        </div>
      );
    },
    size: 150,
  },
  {
    accessorKey: "status",
    header: "Status Pembayaran",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant="success">
          {status === "confirmed" ? "Terverifikasi" : status}
        </Badge>
      );
    },
    size: 160,
  },
  {
    accessorKey: "totalPrice",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => {
      const amount = row.getValue("totalPrice") as number;
      return (
        <div className="text-right font-medium">{formatCurrency(amount)}</div>
      );
    },
    size: 130,
  },
  {
    id: "actions",
    header: () => <div className="text-center">Aksi</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="default"
            size="sm"
            onClick={() => onViewDetail(row.original)}
            className="gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            Konfirmasi Pesanan
          </Button>
        </div>
      );
    },
    size: 180,
  },
];
