"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw, History, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { DataTable } from "./components/DataTable";
import { createColumns, BaseHistoryData } from "./components/Columns";
import { ViewReservasiDialog } from "./components/ViewReservasiDialog";
import { historyService } from "@/app/lib/services/history.service";
import { getErrorMessage } from "@/app/lib/getErrorMessage";

export default function RiwayatReservasiKasir() {
  const [reservasis, setReservasis] = useState<BaseHistoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewDialog, setViewDialog] = useState<{
    open: boolean;
    reservasi: BaseHistoryData | null;
  }>({ open: false, reservasi: null });
  const [summary, setSummary] = useState({
    total: 0,
    completed: 0,
    cancelled: 0,
  });

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await historyService.getCashierHistory();
      if (response.success && response.data) {
        setReservasis(response.data);
        setSummary({
          total: response.summary.total,
          completed: response.summary.completed,
          cancelled: response.summary.cancelled,
        });
        toast.success("Data berhasil dimuat");
      } else {
        toast.error("Gagal memuat data riwayat reservasi");
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchHistory();
  };

  const handleViewClick = (reservasi: BaseHistoryData) => {
    setViewDialog({ open: true, reservasi });
  };

  const columns = useMemo(() => createColumns({ onView: handleViewClick }), []);

  return (
    <div className="h-full bg-gray-50 p-6 flex flex-col">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Riwayat Reservasi
            </h1>
            <p className="text-gray-600 text-sm">
              Lihat riwayat reservasi yang Anda tangani
            </p>
          </div>
          <Button onClick={handleRefresh} variant="outline" disabled={loading}>
            <RefreshCw
              className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 flex-shrink-0">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Reservasi
            </CardTitle>
            <History className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">{summary.total}</div>
            )}
            <p className="text-xs text-muted-foreground">
              Total riwayat reservasi
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Berhasil</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold text-green-600">
                {summary.completed}
              </div>
            )}
            <p className="text-xs text-muted-foreground">Reservasi berhasil</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dibatalkan</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold text-red-600">
                {summary.cancelled}
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Reservasi dibatalkan
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <div className="flex-1 flex flex-col min-h-0">
        <Card className="flex-1 flex flex-col">
          <CardHeader className="flex-shrink-0">
            <CardTitle>Daftar Riwayat Reservasi</CardTitle>
            <CardDescription>
              Berikut adalah daftar semua riwayat reservasi yang Anda tangani
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0">
            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={reservasis}
                filterColumn="customerName"
                filterPlaceholder="Cari berdasarkan nama pelanggan..."
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* View Dialog */}
      <ViewReservasiDialog
        open={viewDialog.open}
        onOpenChange={(open) => setViewDialog((prev) => ({ ...prev, open }))}
        reservasi={viewDialog.reservasi}
      />
    </div>
  );
}
