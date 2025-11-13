"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";

import { getErrorMessage } from "@/app/lib/getErrorMessage";
import { packageService } from "@/app/lib/services/package.service";
import {
  LayananPageHeader,
  LayananTableSkeleton,
  LayananDataTable,
  createColumns,
  AddLayananDialog,
  EditLayananDialog,
  DeleteLayananDialog,
} from "./components";
import type { LayananRowData } from "./components/LayananTableColumns";

export default function ManajemenLayanan() {
  const [layananData, setLayananData] = useState<LayananRowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
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
        onEdit: handleEditClick,
        onDelete: handleDeleteClick,
      }),
    [] // Columns dibuat sekali, tidak pernah berubah
  );

  return (
    <div className="h-full bg-gray-50 p-6 flex flex-col">
      {/* Page Header */}
      <LayananPageHeader loading={loading} onRefresh={handleRefresh} />

      {/* Data Table */}
      <div className="flex-1 flex flex-col min-h-0">
        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <CardTitle>Daftar Layanan</CardTitle>
            <CardDescription>
              Berikut adalah daftar semua layanan yang terdaftar dalam sistem
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0">
            {loading ? (
              <LayananTableSkeleton />
            ) : (
              <LayananDataTable
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

      <EditLayananDialog
        open={editDialog.open}
        onOpenChange={(open: boolean) =>
          setEditDialog({ open, layanan: open ? editDialog.layanan : null })
        }
        layanan={editDialog.layanan}
        onSuccess={handleSuccess}
      />

      <DeleteLayananDialog
        open={deleteDialog.open}
        onOpenChange={(open: boolean) =>
          setDeleteDialog({ open, layanan: open ? deleteDialog.layanan : null })
        }
        layanan={deleteDialog.layanan}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
