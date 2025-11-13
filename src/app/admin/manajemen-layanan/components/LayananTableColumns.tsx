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
import { MoreHorizontal, Trash2, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// ✅ Type untuk layanan sesuai dengan API response
export type LayananRowData = {
  _id: string;
  name: string;
  price: number;
  description: string;
  isActive: boolean | string; // API might return string or boolean
  createdAt: string;
  updatedAt: string;
  packageId: string;
  __v: number;
};

// ✅ Type untuk callback functions
type LayananActionsCallbacks = {
  onDelete?: (layanan: LayananRowData) => void;
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

  // ✅ Kolom Deskripsi
  {
    accessorKey: "description",
    header: "Deskripsi",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return (
        <div className="max-w-xs truncate text-gray-600" title={description}>
          {description}
        </div>
      );
    },
  },

  // ✅ Kolom Status
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <Badge
          className={
            isActive
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-red-500 hover:bg-red-600 text-white"
          }
        >
          {isActive ? "Aktif" : "Tidak Aktif"}
        </Badge>
      );
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
                if (callbacks?.onEdit) {
                  callbacks.onEdit(layanan);
                }
              }}
              className="cursor-pointer"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Layanan
            </DropdownMenuItem>
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
