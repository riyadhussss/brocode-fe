"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export interface PaymentMethodRowData {
  _id: string;
  bankName: string;
  type: "bank" | "e-wallet";
  accountNumber: string;
  accountHolder: string;
}

export const createColumns = (): ColumnDef<PaymentMethodRowData>[] => [
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
];
