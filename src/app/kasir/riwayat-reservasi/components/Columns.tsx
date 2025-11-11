"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

// Type from API response
type BaseHistoryData = {
  _id: string;
  reservationId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  package: {
    _id: string;
    name: string;
    price: number;
    description: string;
  };
  barber: {
    _id: string;
    name: string;
  };
  schedule: {
    _id: string;
    scheduled_time: string;
  };
  totalPrice: number;
  status: string;
  notes: string;
  payment: {
    paymentId: string;
    amount: number;
    paymentMethod: string;
    status: string;
    verifiedAt: string;
  };
  createdBy: {
    name: string;
    email?: string;
    role?: string;
  };
  confirmedBy?: {
    name: string;
  } | null;
  createdAt: string;
  confirmedAt?: string;
  cancelledAt?: string;
};

type ReservasiActionsCallbacks = {
  onView?: (reservasi: BaseHistoryData) => void;
};

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
        <Badge className="bg-green-500 hover:bg-green-600 text-white">
          Berhasil
        </Badge>
      );
    case "cancelled":
      return (
        <Badge className="bg-red-500 hover:bg-red-600 text-white">
          Dibatalkan
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export const createColumns = (
  callbacks?: ReservasiActionsCallbacks
): ColumnDef<BaseHistoryData>[] => [
  {
    id: "nomor",
    header: "No",
    cell: ({ row }) => <div className="font-medium">{row.index + 1}</div>,
    size: 60,
  },
  {
    accessorKey: "reservationId",
    header: "ID Reservasi",
    cell: ({ row }) => (
      <div className="font-medium text-blue-600">
        {row.getValue("reservationId")}
      </div>
    ),
    size: 130,
  },
  {
    accessorKey: "customerName",
    header: "Nama Pelanggan",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("customerName")}</div>
    ),
    size: 180,
  },
  {
    accessorKey: "customerEmail",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-blue-600">{row.getValue("customerEmail")}</div>
    ),
    size: 200,
  },
  {
    accessorKey: "package.name",
    header: "Paket Layanan",
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
    accessorKey: "totalPrice",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => (
      <div className="font-semibold text-green-600 text-right">
        {formatCurrency(row.getValue("totalPrice"))}
      </div>
    ),
    size: 130,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => getStatusBadge(row.getValue("status")),
    size: 120,
  },
  {
    id: "actions",
    header: () => <div className="text-center">Aksi</div>,
    cell: ({ row }) => {
      const reservasi = row.original;

      return (
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => callbacks?.onView?.(reservasi)}
            className="gap-2"
          >
            <Eye className="h-4 w-4" />
            Detail
          </Button>
        </div>
      );
    },
    size: 120,
  },
];

export type { BaseHistoryData };
