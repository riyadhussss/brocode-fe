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

// ✅ Type untuk kasir
export type KasirRowData = {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

// ✅ Type untuk callback functions
type KasirActionsCallbacks = {
  onDelete?: (kasir: KasirRowData) => void;
  onView?: (kasir: KasirRowData) => void;
  onEdit?: (kasir: KasirRowData) => void;
};

export const createColumns = (
  callbacks?: KasirActionsCallbacks
): ColumnDef<KasirRowData>[] => [
  // ✅ Kolom Nomor
  {
    id: "nomor",
    header: "No",
    cell: ({ row }) => <div className="font-medium">{row.index + 1}</div>,
  },

  // ✅ Kolom Nama
  {
    accessorKey: "name",
    header: "Nama",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },

  // ✅ Kolom Email
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div
        className="text-gray-600 truncate max-w-[200px]"
        title={row.getValue("email")}
      >
        {row.getValue("email")}
      </div>
    ),
  },

  // ✅ Kolom Actions
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const kasir = row.original;

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
                  callbacks.onView(kasir);
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
                  callbacks.onEdit(kasir);
                }
              }}
              className="cursor-pointer"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Kasir
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                if (callbacks?.onDelete) {
                  callbacks.onDelete(kasir);
                }
              }}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Hapus Kasir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
