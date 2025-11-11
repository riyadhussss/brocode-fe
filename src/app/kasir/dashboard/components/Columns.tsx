"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PaymentRecord } from "@/app/lib/types/reservation";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Eye } from "lucide-react";

const getStatusBadge = (
  status: string
): "default" | "success" | "destructive" | "secondary" => {
  switch (status) {
    case "pending":
      return "default";
    case "verified":
      return "success";
    case "rejected":
      return "destructive";
    default:
      return "secondary";
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export const createColumns = (
  onViewDetail: (reservation: PaymentRecord) => void
): ColumnDef<PaymentRecord>[] => [
  {
    id: "number",
    header: "No",
    cell: ({ row }) => <div className="font-medium">{row.index + 1}</div>,
    size: 60,
  },
  {
    accessorKey: "customer.name",
    header: "Customer",
    cell: ({ row }) => <div>{row.original.customer.name}</div>,
    size: 150,
  },
  {
    accessorKey: "reservation.package.name",
    header: "Layanan",
    cell: ({ row }) => <div>{row.original.reservation.package.name}</div>,
    size: 180,
  },
  {
    accessorKey: "reservation.barber.name",
    header: "Capster",
    cell: ({ row }) => <div>{row.original.reservation.barber.name}</div>,
    size: 130,
  },
  {
    accessorKey: "reservation.schedule.scheduled_time",
    header: "Jadwal",
    cell: ({ row }) => {
      const scheduledTime = row.original.reservation.schedule.scheduled_time;
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
        <Badge variant={getStatusBadge(status)}>
          {status === "pending"
            ? "Pending"
            : status === "verified"
            ? "Terverifikasi"
            : "Ditolak"}
        </Badge>
      );
    },
    size: 160,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
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
            variant="outline"
            size="sm"
            onClick={() => onViewDetail(row.original)}
            className="gap-2"
          >
            <Eye className="h-4 w-4" />
            Detail
          </Button>
        </div>
      );
    },
    size: 180,
  },
];
