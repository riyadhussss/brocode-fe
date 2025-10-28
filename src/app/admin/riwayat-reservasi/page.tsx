"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  RefreshCw,
  History,
  CheckCircle,
  XCircle,
  DollarSign,
} from "lucide-react";
import { toast } from "sonner";
import { DataTable } from "./data-table";
import { createColumns, ReservasiRowData } from "./columns";
import { ViewReservasiDialog } from "./view-reservasi-dialog";
import { DeleteReservasiDialog } from "./delete-reservasi-dialog";

const dummyReservasis: ReservasiRowData[] = [
  {
    id: 1,
    diterimaOleh: "Siti Nurhaliza",
    email: "john.doe@gmail.com",
    nama: "John Doe",
    paket: "Potong Rambut Premium",
    harga: 50000,
    tanggal: "2024-01-15",
    status: "selesai",
  },
  {
    id: 2,
    diterimaOleh: "Maya Sari",
    email: "jane.smith@yahoo.com",
    nama: "Jane Smith",
    paket: "Potong Rambut + Cuci",
    harga: 35000,
    tanggal: "2024-01-16",
    status: "selesai",
  },
  {
    id: 3,
    diterimaOleh: "Ahmad Yani",
    email: "mike.johnson@gmail.com",
    nama: "Mike Johnson",
    paket: "Cukur Jenggot",
    harga: 25000,
    tanggal: "2024-01-17",
    status: "dibatalkan",
  },
  {
    id: 4,
    diterimaOleh: "Rina Wati",
    email: "sarah.connor@outlook.com",
    nama: "Sarah Connor",
    paket: "Hair Treatment",
    harga: 75000,
    tanggal: "2024-01-18",
    status: "selesai",
  },
  {
    id: 5,
    diterimaOleh: "Budi Santoso",
    email: "david.lee@yahoo.com",
    nama: "David Lee",
    paket: "Potong Rambut Regular",
    harga: 30000,
    tanggal: "2024-01-19",
    status: "selesai",
  },
  {
    id: 6,
    diterimaOleh: "Dewi Kusuma",
    email: "emma.watson@gmail.com",
    nama: "Emma Watson",
    paket: "Cuci + Creambath",
    harga: 45000,
    tanggal: "2024-01-20",
    status: "dibatalkan",
  },
];

export default function RiwayatReservasi() {
  const [reservasis, setReservasis] =
    useState<ReservasiRowData[]>(dummyReservasis);
  const [loading, setLoading] = useState(false);
  const [viewDialog, setViewDialog] = useState<{
    open: boolean;
    reservasi: ReservasiRowData | null;
  }>({ open: false, reservasi: null });
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    reservasi: ReservasiRowData | null;
    loading: boolean;
  }>({ open: false, reservasi: null, loading: false });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success("Data berhasil diperbarui");
      setLoading(false);
    }, 1000);
  };

  const handleViewClick = (reservasi: ReservasiRowData) => {
    setViewDialog({ open: true, reservasi });
  };

  const handleDeleteClick = (reservasi: ReservasiRowData) => {
    setDeleteDialog({ open: true, reservasi, loading: false });
  };

  const handleDeleteConfirm = () => {
    if (!deleteDialog.reservasi) return;
    setDeleteDialog((prev) => ({ ...prev, loading: true }));
    setTimeout(() => {
      const deletedName = deleteDialog.reservasi?.nama || "";
      setReservasis(
        reservasis.filter((r) => r.id !== deleteDialog.reservasi?.id)
      );
      toast.success("Reservasi berhasil dihapus");
      setDeleteDialog({ open: false, reservasi: null, loading: false });
    }, 1000);
  };

  const columns = useMemo(
    () =>
      createColumns({ onView: handleViewClick, onDelete: handleDeleteClick }),
    []
  );
  const totalReservasi = reservasis.length;
  const reservasiSelesai = reservasis.filter(
    (r) => r.status === "selesai"
  ).length;
  const reservasiDibatalkan = reservasis.filter(
    (r) => r.status === "dibatalkan"
  ).length;
  const totalPendapatan = reservasis
    .filter((r) => r.status === "selesai")
    .reduce((total, r) => total + r.harga, 0);

  return (
    <div className="h-full bg-gray-50 p-6 flex flex-col">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Riwayat Reservasi
            </h1>
            <p className="text-gray-600 text-sm">
              Lihat dan kelola riwayat reservasi pelanggan
            </p>
          </div>
          <Button onClick={handleRefresh} variant="outline" disabled={loading}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 flex-shrink-0">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Reservasi
            </CardTitle>
            <History className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReservasi}</div>
            <p className="text-xs text-muted-foreground">
              Total riwayat reservasi
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Selesai</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {reservasiSelesai}
            </div>
            <p className="text-xs text-muted-foreground">Reservasi selesai</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dibatalkan</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {reservasiDibatalkan}
            </div>
            <p className="text-xs text-muted-foreground">
              Reservasi dibatalkan
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Pendapatan
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(totalPendapatan)}
            </div>
            <p className="text-xs text-muted-foreground">
              Dari reservasi selesai
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="flex-1 flex flex-col min-h-0">
        <Card className="flex-1 flex flex-col">
          <CardHeader className="flex-shrink-0">
            <CardTitle>Daftar Riwayat Reservasi</CardTitle>
            <CardDescription>
              Berikut adalah daftar semua riwayat reservasi pelanggan
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0">
            <DataTable
              columns={columns}
              data={reservasis}
              filterColumn="nama"
              filterPlaceholder="Cari berdasarkan nama pelanggan..."
            />
          </CardContent>
        </Card>
      </div>
      <ViewReservasiDialog
        open={viewDialog.open}
        onOpenChange={(open) => setViewDialog((prev) => ({ ...prev, open }))}
        reservasi={viewDialog.reservasi}
      />
      <DeleteReservasiDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog((prev) => ({ ...prev, open }))}
        onConfirm={handleDeleteConfirm}
        reservasiNama={deleteDialog.reservasi?.nama || ""}
        loading={deleteDialog.loading}
      />
    </div>
  );
}
