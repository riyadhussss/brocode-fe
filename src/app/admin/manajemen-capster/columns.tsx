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

// ✅ Dummy type untuk capster (nanti akan diganti dengan type dari API)
export type CapsterRowData = {
  _id: string;
  name: string;
  email: string;
  specialization: string;
  experience: number;
  createdAt: string;
  updatedAt: string;
};

// ✅ Type untuk callback functions
type CapsterActionsCallbacks = {
  onDelete?: (capster: CapsterRowData) => void;
  onView?: (capster: CapsterRowData) => void;
  onEdit?: (capster: CapsterRowData) => void;
};

export const createColumns = (
  callbacks?: CapsterActionsCallbacks
): ColumnDef<CapsterRowData>[] => [
  {
    id: "nomor",
    header: "No",
    cell: ({ row }) => <div className="font-medium">{row.index + 1}</div>,
  },
  {
    accessorKey: "name",
    header: "Nama",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
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
  {
    accessorKey: "specialization",
    header: "Spesialisasi",
    cell: ({ row }) => (
      <div className="text-gray-900">{row.getValue("specialization")}</div>
    ),
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const capster = row.original;

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
              onClick={() => callbacks?.onView?.(capster)}
              className="cursor-pointer"
            >
              <Eye className="mr-2 h-4 w-4" />
              Lihat Detail
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => callbacks?.onEdit?.(capster)}
              className="cursor-pointer"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Capster
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => callbacks?.onDelete?.(capster)}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Hapus Capster
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
