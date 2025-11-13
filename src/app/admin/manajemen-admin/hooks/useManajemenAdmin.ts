"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { adminService } from "@/app/lib/services/admin.service";
import { getErrorMessage } from "@/app/lib/getErrorMessage";
import { GetAdminsResponse } from "@/app/lib/types/admin";
import { createColumns } from "../components";

export function useManajemenAdmin() {
  const [adminsData, setAdminsData] = useState<GetAdminsResponse["data"]>(
    [] as unknown as GetAdminsResponse["data"]
  );

  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    admin: GetAdminsResponse["data"][number] | null;
    loading: boolean;
  }>({
    open: false,
    admin: null,
    loading: false,
  });
  const [editDialog, setEditDialog] = useState<{
    open: boolean;
    admin: GetAdminsResponse["data"][number] | null;
  }>({
    open: false,
    admin: null,
  });

  // 🔄 Fetch data
  const fetchAdminsData = async () => {
    try {
      setLoading(true);
      const response = await adminService.getAdmins();

      if (response?.success && response.data) {
        setAdminsData(response.data);
        toast.success(`Berhasil memuat ${response.data.length} data admin`);
      } else {
        throw new Error(response?.message || "Gagal mengambil data admin");
      }
    } catch (error) {
      console.error("❌ Admins fetch error:", error);
      const errorMessage = getErrorMessage(error);
      setAdminsData([] as unknown as GetAdminsResponse["data"]);
      toast.error("Gagal memuat data admin", {
        description:
          errorMessage || "Silakan coba lagi atau hubungi administrator",
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Lifecycle
  useEffect(() => {
    fetchAdminsData();
  }, []);

  // ✨ Handler logic
  const handleAddNew = () => setShowAddDialog(true);
  const handleRefresh = async () => {
    toast.info("Memperbarui data...");
    await fetchAdminsData();
  };
  const handleAddSuccess = () => fetchAdminsData();

  const handleEditClick = (admin: GetAdminsResponse["data"][number]) =>
    setEditDialog({ open: true, admin });

  const handleEditSuccess = () => fetchAdminsData();

  const handleDeleteClick = (admin: GetAdminsResponse["data"][number]) =>
    setDeleteDialog({ open: true, admin, loading: false });

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.admin) return;
    setDeleteDialog((prev) => ({ ...prev, loading: true }));

    try {
      const response = await adminService.deleteAdmin(deleteDialog.admin._id);

      if (response?.success) {
        toast.success("Admin berhasil dihapus", {
          description: `${deleteDialog.admin.name} telah dihapus dari sistem`,
        });
        setDeleteDialog({ open: false, admin: null, loading: false });
        fetchAdminsData();
      } else {
        throw new Error(response?.message || "Gagal menghapus admin");
      }
    } catch (error) {
      console.error("❌ Error deleting admin:", error);
      toast.error("Gagal menghapus admin", {
        description: getErrorMessage(error),
      });
      setDeleteDialog((prev) => ({ ...prev, loading: false }));
    }
  };

  // 🧱 Columns
  const columns = useMemo(
    () =>
      createColumns({
        onEdit: handleEditClick,
        onDelete: handleDeleteClick,
      }),
    []
  );

  const adminsList = Array.isArray(adminsData) ? adminsData : [];

  return {
    loading,
    adminsList,
    columns,
    // dialog states
    showAddDialog,
    setShowAddDialog,
    deleteDialog,
    setDeleteDialog,
    editDialog,
    setEditDialog,
    // handlers
    handleRefresh,
    handleAddNew,
    handleAddSuccess,
    handleEditClick,
    handleEditSuccess,
    handleDeleteClick,
    handleDeleteConfirm,
  };
}
