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
import { Users, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { cashierService } from "@/app/lib/services/cashier.service";
import { DataTable } from "./data-table";
import { createColumns, KasirRowData } from "./columns";
import { AddKasirDialog } from "./add-kasir-dialog";
import { ViewKasirDialog } from "./view-kasir-dialog";
import { EditKasirDialog } from "./edit-kasir-dialog";
import { DeleteKasirDialog } from "./delete-kasir-dialog";
import { getErrorMessage } from "@/app/lib/getErrorMessage";

export default function ManajemenKasir() {
  const [kasirData, setKasirData] = useState<KasirRowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [viewDialog, setViewDialog] = useState<{
    open: boolean;
    kasir: KasirRowData | null;
  }>({
    open: false,
    kasir: null,
  });
  const [editDialog, setEditDialog] = useState<{
    open: boolean;
    kasir: KasirRowData | null;
  }>({
    open: false,
    kasir: null,
  });
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    kasir: KasirRowData | null;
    loading: boolean;
  }>({
    open: false,
    kasir: null,
    loading: false,
  });

  // ✅ Fetch data menggunakan cashierService.getCashiers
  const fetchKasirData = async () => {
    try {
      setLoading(true);

      const response = await cashierService.getCashiers();

      if (response && response.success && response.data) {
        setKasirData(response.data);
        setTotalCount(response.count || response.data.length);

        toast.success(`Berhasil memuat ${response.data.length} data kasir`);
      } else {
        throw new Error(response?.message || "Gagal mengambil data kasir");
      }
    } catch (error) {
      console.error("❌ Kasir fetch error:", error);

      setKasirData([]);
      setTotalCount(0);

      toast.error("Gagal memuat data kasir", {
        description: getErrorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load data saat komponen mount
  useEffect(() => {
    fetchKasirData();
  }, []);

  const handleAddNew = () => {
    setShowAddDialog(true);
  };

  const handleAddSuccess = () => {
    setShowAddDialog(false);
    fetchKasirData();
  };

  const handleRefresh = async () => {
    toast.info("Memperbarui data...");
    await fetchKasirData();
  };

  // ✅ Handle view kasir
  const handleViewClick = (kasir: KasirRowData) => {
    setViewDialog({ open: true, kasir });
  };

  // ✅ Handle edit kasir
  const handleEditClick = (kasir: KasirRowData) => {
    setEditDialog({ open: true, kasir });
  };

  const handleEditSuccess = () => {
    setEditDialog({ open: false, kasir: null });
    fetchKasirData();
  };

  // ✅ Handle delete kasir
  const handleDeleteClick = (kasir: KasirRowData) => {
    setDeleteDialog({ open: true, kasir, loading: false });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.kasir) return;

    setDeleteDialog((prev) => ({ ...prev, loading: true }));

    try {
      const response = await cashierService.deleteCashier(
        deleteDialog.kasir._id
      );

      if (response.success) {
        toast.success("Kasir berhasil dihapus!", {
          description: `${deleteDialog.kasir.name} telah dihapus dari sistem`,
        });

        setDeleteDialog({ open: false, kasir: null, loading: false });
        fetchKasirData();
      } else {
        throw new Error(response.message || "Gagal menghapus kasir");
      }
    } catch (error) {
      console.error("❌ Error deleting kasir:", error);

      toast.error("Gagal menghapus kasir", {
        description: getErrorMessage(error),
      });

      setDeleteDialog((prev) => ({ ...prev, loading: false }));
    }
  };

  // ✅ Create columns dengan callbacks
  const columns = useMemo(
    () =>
      createColumns({
        onView: handleViewClick,
        onEdit: handleEditClick,
        onDelete: handleDeleteClick,
      }),
    []
  );

  return (
    <div className="bg-gray-50 p-6">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Manajemen Kasir
            </h1>
            <p className="text-gray-600 text-sm">Kelola data kasir sistem</p>
          </div>
          <Button onClick={handleRefresh} variant="outline" disabled={loading}>
            <RefreshCw
              className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Total Kasir */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Kasir</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-32" />
              </>
            ) : (
              <>
                <div className="text-2xl font-bold">{kasirData.length}</div>
                <p className="text-xs text-muted-foreground">Kasir terdaftar</p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Kasir Aktif */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kasir Aktif</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-32" />
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-green-600">
                  {kasirData.filter((kasir) => kasir.role === "kasir").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Kasir yang aktif
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Total dari Server */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total (Server)
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-32" />
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-blue-600">
                  {totalCount}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total dari database
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Kasir</CardTitle>
          <CardDescription>
            Berikut adalah daftar semua kasir yang terdaftar dalam sistem
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              data={kasirData}
              onAddNew={handleAddNew}
            />
          )}
        </CardContent>
      </Card>

      {/* Add Kasir Dialog */}
      <AddKasirDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSuccess={handleAddSuccess}
      />

      {/* View Kasir Dialog */}
      <ViewKasirDialog
        open={viewDialog.open}
        onOpenChange={(open) => setViewDialog({ open, kasir: null })}
        kasir={viewDialog.kasir}
      />

      {/* Edit Kasir Dialog */}
      <EditKasirDialog
        open={editDialog.open}
        onOpenChange={(open) => setEditDialog({ open, kasir: null })}
        kasir={editDialog.kasir}
        onSuccess={handleEditSuccess}
      />

      {/* Delete Kasir Dialog */}
      <DeleteKasirDialog
        open={deleteDialog.open}
        onOpenChange={(open) =>
          setDeleteDialog({ open, kasir: null, loading: false })
        }
        onConfirm={handleDeleteConfirm}
        kasirName={deleteDialog.kasir?.name || ""}
        loading={deleteDialog.loading}
      />
    </div>
  );
}
