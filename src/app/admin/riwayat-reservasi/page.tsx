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
import { capsterService } from "@/app/lib/services/capster.service";
import { getErrorMessage } from "@/app/lib/getErrorMessage";

export interface Barber {
  _id: string;
  name: string;
}

export default function RiwayatReservasi() {
  const [reservasis, setReservasis] = useState<BaseHistoryData[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingBarbers, setLoadingBarbers] = useState(true);
  const [viewDialog, setViewDialog] = useState<{
    open: boolean;
    reservasi: BaseHistoryData | null;
  }>({ open: false, reservasi: null });

  useEffect(() => {
    fetchHistory();
    fetchBarbers();
  }, []);

  const fetchBarbers = async () => {
    setLoadingBarbers(true);
    try {
      const response = await capsterService.getCapsters();
      if (response.success && response.data) {
        setBarbers(response.data);
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error("Error fetching barbers:", errorMessage);
    } finally {
      setLoadingBarbers(false);
    }
  };

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await historyService.getAdminHistory();
      if (response.success && response.data) {
        setReservasis(response.data);
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

  // Calculate summary from all data
  const summary = useMemo(() => {
    const total = reservasis.length;
    const completed = reservasis.filter(
      (r) => r.status.toLowerCase() === "completed"
    ).length;
    const cancelled = reservasis.filter(
      (r) => r.status.toLowerCase() === "cancelled"
    ).length;

    return { total, completed, cancelled };
  }, [reservasis]);

  const handleRefresh = () => {
    fetchHistory();
    fetchBarbers();
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
              Lihat dan kelola riwayat reservasi pelanggan
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
              Berikut adalah daftar semua riwayat reservasi pelanggan
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
                barbers={barbers}
                loadingBarbers={loadingBarbers}
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
