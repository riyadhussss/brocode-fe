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
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

export interface PaymentMethodRowData {
  _id: string;
  bankName: string;
  type: "bank" | "e-wallet";
  accountNumber: string;
  accountHolder: string;
  isActive: boolean;
}

interface CreateColumnsProps {
  onEdit: (payment: PaymentMethodRowData) => void;
  onDelete: (payment: PaymentMethodRowData) => void;
}

export const createColumns = (
  callbacks?: CreateColumnsProps
): ColumnDef<PaymentMethodRowData>[] => [
  {
    id: "number",
    header: "No",
    cell: ({ row }) => {
      return <div className="font-medium">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "bankName",
    header: "Nama Bank/E-Wallet",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("bankName")}</div>;
    },
  },
  {
    accessorKey: "type",
    header: "Tipe",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return (
        <Badge variant={type === "bank" ? "default" : "secondary"}>
          {type === "bank" ? "Bank" : "E-Wallet"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "accountNumber",
    header: "Nomor Rekening",
    cell: ({ row }) => {
      return (
        <div className="font-mono text-sm">{row.getValue("accountNumber")}</div>
      );
    },
  },
  {
    accessorKey: "accountHolder",
    header: "Nama Pemilik",
    cell: ({ row }) => {
      return <div>{row.getValue("accountHolder")}</div>;
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <Badge variant={isActive ? "default" : "secondary"}>
          {isActive ? "Aktif" : "Tidak Aktif"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const payment = row.original;

      if (!callbacks) return null;

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
              onClick={() => callbacks.onEdit(payment)}
              className="cursor-pointer"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => callbacks.onDelete(payment)}
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
