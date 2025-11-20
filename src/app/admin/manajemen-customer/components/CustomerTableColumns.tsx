"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash2, Edit } from "lucide-react";

export type CustomerRowData = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  userId: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

type CustomerActionsCallbacks = {
  onDelete?: (customer: CustomerRowData) => void;
  onEdit?: (customer: CustomerRowData) => void;
};

export const createColumns = (
  callbacks?: CustomerActionsCallbacks
): ColumnDef<CustomerRowData>[] => [
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
    accessorKey: "phone",
    header: "No. Telepon",
    cell: ({ row }) => (
      <div className="text-gray-600">{row.getValue("phone") || "-"}</div>
    ),
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const customer = row.original;
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
            <DropdownMenuItem
              onClick={() => callbacks?.onEdit?.(customer)}
              className="cursor-pointer"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Customer
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => callbacks?.onDelete?.(customer)}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Hapus Customer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
