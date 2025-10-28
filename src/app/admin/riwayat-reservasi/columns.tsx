"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Trash2 } from "lucide-react";

export type ReservasiRowData = {
  id: number;
  diterimaOleh: string;
  email: string;
  nama: string;
  paket: string;
  harga: number;
  tanggal: string;
  status: "selesai" | "dibatalkan";
};

type ReservasiActionsCallbacks = {
  onView?: (reservasi: ReservasiRowData) => void;
  onDelete?: (reservasi: ReservasiRowData) => void;
};

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

export const createColumns = (
  callbacks?: ReservasiActionsCallbacks
): ColumnDef<ReservasiRowData>[] => [
  {
    id: "nomor",
    header: "No",
    cell: ({ row }) => <div className="font-medium">{row.index + 1}</div>,
  },
  {
    accessorKey: "diterimaOleh",
    header: "Kasir",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("diterimaOleh")}</div>
    ),
  },
  {
    accessorKey: "nama",
    header: "Nama Pelanggan",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("nama")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-blue-600">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "paket",
    header: "Paket Layanan",
    cell: ({ row }) => <div>{row.getValue("paket")}</div>,
  },
  {
    accessorKey: "harga",
    header: "Harga",
    cell: ({ row }) => (
      <div className="font-semibold text-green-600">
        {formatCurrency(row.getValue("harga"))}
      </div>
    ),
  },
  {
    accessorKey: "tanggal",
    header: "Tanggal",
    cell: ({ row }) => <div>{formatDate(row.getValue("tanggal"))}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          className={
            status === "selesai"
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-red-500 hover:bg-red-600 text-white"
          }
        >
          {status === "selesai" ? "Selesai" : "Dibatalkan"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const reservasi = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Buka menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => callbacks?.onView?.(reservasi)}
              className="cursor-pointer"
            >
              <Eye className="mr-2 h-4 w-4" />
              Lihat Detail
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => callbacks?.onDelete?.(reservasi)}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
