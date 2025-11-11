"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserReservation } from "@/app/lib/types/customer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const createColumns = (
  onViewDetail: (reservation: UserReservation) => void
): ColumnDef<UserReservation>[] => [
  {
    header: "No",
    cell: ({ row }) => <span className="font-medium">{row.index + 1}</span>,
  },
  {
    accessorKey: "customerName",
    header: "Nama Customer",
    cell: ({ row }) => row.original.customerName,
  },
  {
    accessorKey: "package.name",
    header: "Paket Layanan",
    cell: ({ row }) => row.original.package.name,
  },
  {
    accessorKey: "barber.name",
    header: "Capster",
    cell: ({ row }) => row.original.barber.name,
  },
  {
    accessorKey: "schedule.scheduled_time",
    header: "Jadwal",
    cell: ({ row }) => {
      const scheduledTime = row.original.schedule.scheduled_time;
      try {
        return format(new Date(scheduledTime), "dd MMM yyyy, HH:mm", {
          locale: id,
        });
      } catch {
        return scheduledTime;
      }
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={getStatusBadge(status)}>{getStatusText(status)}</Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Aksi</div>,
    cell: ({ row }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewDetail(row.original)}
        >
          <Eye className="h-4 w-4 mr-2" />
          Detail
        </Button>
      </div>
    ),
  },
];

function getStatusBadge(
  status: "pending" | "confirmed" | "cancelled"
): "default" | "success" | "destructive" {
  switch (status) {
    case "confirmed":
      return "success";
    case "cancelled":
      return "destructive";
    default:
      return "default";
  }
}

function getStatusText(status: "pending" | "confirmed" | "cancelled"): string {
  switch (status) {
    case "pending":
      return "Menunggu";
    case "confirmed":
      return "Dikonfirmasi";
    case "cancelled":
      return "Dibatalkan";
    default:
      return status;
  }
}
