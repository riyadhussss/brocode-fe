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
import { AdminsResponse } from "@/app/lib/types/admin";

// ✅ Type untuk data row - mengambil tipe dari elemen array data
type AdminRowData = AdminsResponse["data"][number];

// ✅ Type untuk callback functions
type AdminActionsCallbacks = {
  onDelete?: (admin: AdminRowData) => void;
  onView?: (admin: AdminRowData) => void;
  onEdit?: (admin: AdminRowData) => void;
};

export const createColumns = (
  callbacks?: AdminActionsCallbacks
): ColumnDef<AdminRowData>[] => [
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
      const admin = row.original;

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
                  callbacks.onView(admin);
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
                  callbacks.onEdit(admin);
                }
              }}
              className="cursor-pointer"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Admin
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                if (callbacks?.onDelete) {
                  callbacks.onDelete(admin);
                }
              }}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Hapus Admin
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
