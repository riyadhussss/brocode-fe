"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Trash2, Edit } from "lucide-react";

// ✅ Dummy type untuk layanan (nanti akan diganti dengan type dari API)
export type LayananRowData = {
  _id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
  createdAt: string;
  updatedAt: string;
};

// ✅ Type untuk callback functions
type LayananActionsCallbacks = {
  onDelete?: (layanan: LayananRowData) => void;
  onView?: (layanan: LayananRowData) => void;
  onEdit?: (layanan: LayananRowData) => void;
};

export const createColumns = (
  callbacks?: LayananActionsCallbacks
): ColumnDef<LayananRowData>[] => [
  // ✅ Kolom Nomor
  {
    id: "nomor",
    header: "No",
    cell: ({ row }) => <div className="font-medium">{row.index + 1}</div>,
  },

  // ✅ Kolom Nama Layanan
  {
    accessorKey: "name",
    header: "Nama Layanan",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },

  // ✅ Kolom Harga
  {
    accessorKey: "price",
    header: "Harga",
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(price);
      return <div className="font-medium text-green-600">{formatted}</div>;
    },
  },

  // ✅ Kolom Durasi
  {
    accessorKey: "duration",
    header: "Durasi",
    cell: ({ row }) => {
      const duration = row.getValue("duration") as number;
      return <div className="text-gray-600">{duration} menit</div>;
    },
  },

  // ✅ Kolom Actions
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const layanan = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                if (callbacks?.onView) {
                  callbacks.onView(layanan);
                }
              }}
              className="cursor-pointer"
            >
              <Eye className="mr-2 h-4 w-4" />
              Lihat Detail
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                if (callbacks?.onEdit) {
                  callbacks.onEdit(layanan);
                }
              }}
              className="cursor-pointer"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Layanan
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                if (callbacks?.onDelete) {
                  callbacks.onDelete(layanan);
                }
              }}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Hapus Layanan
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
