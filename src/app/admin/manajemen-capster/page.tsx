"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  CapsterPageHeader,
  CapsterTableSkeleton,
  CapsterStats,
  CapsterDataTable,
  createColumns,
  AddCapsterDialog,
  EditCapsterDialog,
  DeleteCapsterDialog,
} from "./components";
import { capsterService } from "@/app/lib/services/capster.service";
import { getErrorMessage } from "@/app/lib/getErrorMessage";
import type { CapsterRowData } from "./components/CapsterTableColumns";

export default function ManajemenCapster() {
  const [capsterData, setCapsterData] = useState<CapsterRowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editDialog, setEditDialog] = useState<{
    open: boolean;
    capster: CapsterRowData | null;
  }>({
    open: false,
    capster: null,
  });
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    capster: CapsterRowData | null;
    loading: boolean;
  }>({
    open: false,
    capster: null,
    loading: false,
  });

  // ✅ Fetch capsters data
  const fetchCapsters = async () => {
    try {
      setLoading(true);
      const response = await capsterService.getCapsters();

      if (response.success && response.data) {
        setCapsterData(response.data);
        toast.success(response.message || "Data capster berhasil dimuat");
      } else {
        toast.error("Gagal memuat data capster");
      }
    } catch (error) {
      console.error("Error fetching capsters:", error);
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load data on mount
  useEffect(() => {
    fetchCapsters();
  }, []);

  const handleAddNew = () => {
    setShowAddDialog(true);
  };

  const handleSuccess = () => {
    fetchCapsters();
  };

  const handleRefresh = () => {
    fetchCapsters();
  };

  const handleEditClick = (capster: CapsterRowData) => {
    setEditDialog({ open: true, capster });
  };

  const handleDeleteClick = (capster: CapsterRowData) => {
    setDeleteDialog({ open: true, capster, loading: false });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.capster) return;

    setDeleteDialog((prev) => ({ ...prev, loading: true }));

    try {
      const response = await capsterService.deleteCapster(
        deleteDialog.capster._id
      );

      if (response?.success) {
        toast.success("Capster berhasil dihapus", {
          description: `${deleteDialog.capster.name} telah dihapus dari sistem`,
        });

        setDeleteDialog({ open: false, capster: null, loading: false });
        fetchCapsters();
      } else {
        throw new Error(response?.message || "Gagal menghapus capster");
      }
    } catch (error) {
      console.error("❌ Error deleting capster:", error);

      toast.error("Gagal menghapus capster", {
        description: getErrorMessage(error),
      });

      setDeleteDialog((prev) => ({ ...prev, loading: false }));
    }
  };

  const columns = useMemo(
    () =>
      createColumns({
        onEdit: handleEditClick,
        onDelete: handleDeleteClick,
      }),
    []
  );

  // ✅ Calculate active capsters
  const activeCapsters = capsterData.filter(
    (capster) => capster.isActive
  ).length;

  if (loading) {
    return (
      <div className="h-full bg-gray-50 p-6 flex flex-col">
        <div className="mb-6">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        </div>
        <Card className="flex-1">
          <CardHeader>
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-4 w-96" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50 p-6 flex flex-col">
      <CapsterPageHeader loading={loading} onRefresh={handleRefresh} />

      <div className="flex-1 flex flex-col min-h-0">
        <CapsterStats
          totalCapsters={capsterData.length}
          activeCapsters={activeCapsters}
        />

        <Card className="flex-1 flex flex-col">
          <CardHeader className="flex-shrink-0">
            <CardTitle>Daftar Capster</CardTitle>
            <CardDescription>
              Berikut adalah daftar semua capster yang terdaftar dalam sistem
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0">
            <CapsterDataTable
              columns={columns}
              data={capsterData}
              onAddNew={handleAddNew}
            />
          </CardContent>
        </Card>
      </div>

      {/* Add Capster Dialog */}
      <AddCapsterDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSuccess={handleSuccess}
      />

      {/* Edit Capster Dialog */}
      <EditCapsterDialog
        open={editDialog.open}
        onOpenChange={(open) => setEditDialog((prev) => ({ ...prev, open }))}
        capster={editDialog.capster}
        onSuccess={handleSuccess}
      />

      {/* Delete Capster Dialog */}
      <DeleteCapsterDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog((prev) => ({ ...prev, open }))}
        onConfirm={handleDeleteConfirm}
        capsterName={deleteDialog.capster?.name || ""}
        loading={deleteDialog.loading}
      />
    </div>
  );
}
