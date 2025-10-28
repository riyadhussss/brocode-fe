"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Scissors, RefreshCw } from "lucide-react";
import { DataTable } from "./data-table";
import { createColumns, LayananRowData } from "./columns";
import { packageService } from "@/app/lib/services/package.service";
import { toast } from "sonner";
import { getErrorMessage } from "@/app/lib/getErrorMessage";
import { AddLayananDialog } from "./add-layanan-dialog";
import { EditLayananDialog } from "./edit-layanan-dialog";
import { DeleteLayananDialog } from "./delete-layanan-dialog";
import { ViewLayananDialog } from "./view-layanan-dialog";

export default function ManajemenLayanan() {
  const [layananData, setLayananData] = useState<LayananRowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [viewDialog, setViewDialog] = useState<{
    open: boolean;
    layanan: LayananRowData | null;
  }>({ open: false, layanan: null });
  const [editDialog, setEditDialog] = useState<{
    open: boolean;
    layanan: LayananRowData | null;
  }>({ open: false, layanan: null });
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    layanan: LayananRowData | null;
  }>({ open: false, layanan: null });

  // ✅ Fetch packages data
  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await packageService.getPackages();

      if (response.success && response.data) {
        setLayananData(response.data);
        toast.success(response.message || "Data layanan berhasil dimuat");
      } else {
        toast.error("Gagal memuat data layanan");
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load data on mount
  useEffect(() => {
    fetchPackages();
  }, []);

  const handleAddNew = () => {
    setShowAddDialog(true);
  };

  const handleRefresh = () => {
    fetchPackages();
  };

  // ✅ Handle view layanan
  const handleViewClick = (layanan: LayananRowData) => {
    setViewDialog({ open: true, layanan });
  };

  // ✅ Handle edit layanan
  const handleEditClick = (layanan: LayananRowData) => {
    setEditDialog({ open: true, layanan });
  };

  // ✅ Handle delete layanan
  const handleDeleteClick = (layanan: LayananRowData) => {
    setDeleteDialog({ open: true, layanan });
  };

  const handleSuccess = () => {
    fetchPackages();
  };

  // ✅ Create columns dengan callbacks
  const columns = useMemo(
    () =>
      createColumns({
        onView: handleViewClick,
        onEdit: handleEditClick,
        onDelete: handleDeleteClick,
      }),
    [] // Columns dibuat sekali, tidak pernah berubah
  );

  return (
    <div className="h-full bg-gray-50 p-6 flex flex-col">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Manajemen Layanan
            </h1>
            <p className="text-gray-600 text-sm">Kelola data layanan sistem</p>
          </div>
          <Button onClick={handleRefresh} variant="outline" disabled={loading}>
            <RefreshCw
              className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </div>

      {/* Main Content - Stats Cards dan DataTable dalam satu container */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 flex-shrink-0">
          {/* Total Layanan */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Layanan
              </CardTitle>
              <Scissors className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <>
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-3 w-32" />
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold">{layananData.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Layanan tersedia
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          {/* Harga Terendah */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Harga Terendah
              </CardTitle>
              <Scissors className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <>
                  <Skeleton className="h-8 w-24 mb-2" />
                  <Skeleton className="h-3 w-32" />
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold text-green-600">
                    {layananData.length > 0
                      ? new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(Math.min(...layananData.map((l) => l.price)))
                      : "Rp 0"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Layanan paling murah
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          {/* Harga Tertinggi */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Harga Tertinggi
              </CardTitle>
              <Scissors className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <>
                  <Skeleton className="h-8 w-24 mb-2" />
                  <Skeleton className="h-3 w-32" />
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold text-blue-600">
                    {layananData.length > 0
                      ? new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(Math.max(...layananData.map((l) => l.price)))
                      : "Rp 0"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Layanan premium
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card className="flex-1 flex flex-col">
          <CardHeader className="flex-shrink-0">
            <CardTitle>Daftar Layanan</CardTitle>
            <CardDescription>
              Berikut adalah daftar semua layanan yang tersedia dalam sistem
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0">
            {loading ? (
              <div className="space-y-4">
                {/* Search and buttons skeleton */}
                <div className="flex items-center justify-between">
                  <Skeleton className="h-10 w-96" />
                  <div className="flex gap-2">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-32" />
                  </div>
                </div>
                {/* Table skeleton */}
                <div className="border rounded-md">
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                </div>
                {/* Pagination skeleton */}
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-32" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={layananData}
                onAddNew={handleAddNew}
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <AddLayananDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSuccess={handleSuccess}
      />

      <ViewLayananDialog
        open={viewDialog.open}
        onOpenChange={(open) =>
          setViewDialog({ open, layanan: open ? viewDialog.layanan : null })
        }
        layanan={viewDialog.layanan}
      />

      <EditLayananDialog
        open={editDialog.open}
        onOpenChange={(open) =>
          setEditDialog({ open, layanan: open ? editDialog.layanan : null })
        }
        layanan={editDialog.layanan}
        onSuccess={handleSuccess}
      />

      <DeleteLayananDialog
        open={deleteDialog.open}
        onOpenChange={(open) =>
          setDeleteDialog({ open, layanan: open ? deleteDialog.layanan : null })
        }
        layanan={deleteDialog.layanan}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
