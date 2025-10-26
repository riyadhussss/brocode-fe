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

export type UserRowData = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  userId: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

type UserActionsCallbacks = {
  onDelete?: (user: UserRowData) => void;
  onView?: (user: UserRowData) => void;
  onEdit?: (user: UserRowData) => void;
};

export const createColumns = (
  callbacks?: UserActionsCallbacks
): ColumnDef<UserRowData>[] => [
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
      const user = row.original;
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
              onClick={() => callbacks?.onView?.(user)}
              className="cursor-pointer"
            >
              <Eye className="mr-2 h-4 w-4" />
              Lihat Detail
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => callbacks?.onEdit?.(user)}
              className="cursor-pointer"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit User
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => callbacks?.onDelete?.(user)}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Hapus User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
