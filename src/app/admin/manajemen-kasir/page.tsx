"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";
import { cashierService } from "@/app/lib/services/cashier.service";
import {
  KasirPageHeader,
  KasirTableSkeleton,
  KasirDataTable,
  createColumns,
  AddKasirDialog,
  EditKasirDialog,
  DeleteKasirDialog,
} from "./components";
import { getErrorMessage } from "@/app/lib/getErrorMessage";
import type { KasirRowData } from "./components/KasirTableColumns";

export default function ManajemenKasir() {
  const [kasirData, setKasirData] = useState<KasirRowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [showAddDialog, setShowAddDialog] = useState(false);
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
        onEdit: handleEditClick,
        onDelete: handleDeleteClick,
      }),
    []
  );

  return (
    <div className="h-full bg-gray-50 p-6 flex flex-col">
      {/* Page Header */}
      <KasirPageHeader loading={loading} onRefresh={handleRefresh} />

      {/* Data Table */}
      <div className="flex-1 flex flex-col min-h-0">
        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <CardTitle>Daftar Kasir</CardTitle>
            <CardDescription>
              Berikut adalah daftar semua kasir yang terdaftar dalam sistem
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0">
            {loading ? (
              <KasirTableSkeleton />
            ) : (
              <KasirDataTable
                columns={columns}
                data={kasirData}
                onAddNew={handleAddNew}
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Kasir Dialog */}
      <AddKasirDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSuccess={handleAddSuccess}
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
