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
import { adminService } from "@/app/lib/services/admin.service";
import {
  AdminPageHeader,
  AdminTableSkeleton,
  AdminDataTable,
  createColumns,
  AddAdminDialog,
  ViewAdminDialog,
  EditAdminDialog,
  DeleteAdminDialog,
} from "./components";
import { getErrorMessage } from "@/app/lib/getErrorMessage";
import { GetAdminsResponse } from "@/app/lib/types/admin";

export default function ManajemenAdmin() {
  const [adminsData, setAdminsData] = useState<GetAdminsResponse["data"]>(
    [] as unknown as GetAdminsResponse["data"]
  );
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
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
  const [viewDialog, setViewDialog] = useState<{
    open: boolean;
    admin: GetAdminsResponse["data"][number] | null;
  }>({
    open: false,
    admin: null,
  });
  const [editDialog, setEditDialog] = useState<{
    open: boolean;
    admin: GetAdminsResponse["data"][number] | null;
  }>({
    open: false,
    admin: null,
  });

  const fetchAdminsData = async () => {
    try {
      setLoading(true);

      const response = await adminService.getAdmins();

      if (response && response.success && response.data) {
        setAdminsData(response.data);
        setTotalCount(response.count || response.data.length);

        toast.success(`Berhasil memuat ${response.data.length} data admin`);
      } else {
        throw new Error(response?.message || "Gagal mengambil data admin");
      }
    } catch (error) {
      console.error("❌ Admins fetch error:", error);
      const errorMessage = getErrorMessage(error);

      setAdminsData([] as unknown as GetAdminsResponse["data"]);
      setTotalCount(0);

      toast.error("Gagal memuat data admin", {
        description:
          errorMessage || "Silakan coba lagi atau hubungi administrator",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminsData();
  }, []);

  const handleAddNew = () => {
    setShowAddDialog(true);
  };

  const handleRefresh = async () => {
    toast.info("Memperbarui data...");
    await fetchAdminsData();
  };

  const handleAddSuccess = () => {
    fetchAdminsData();
  };

  const handleViewClick = (admin: GetAdminsResponse["data"][number]) => {
    setViewDialog({
      open: true,
      admin: admin,
    });
  };

  const handleEditClick = (admin: GetAdminsResponse["data"][number]) => {
    setEditDialog({
      open: true,
      admin: admin,
    });
  };

  const handleEditSuccess = () => {
    fetchAdminsData();
  };

  const handleDeleteClick = (admin: GetAdminsResponse["data"][number]) => {
    setDeleteDialog({
      open: true,
      admin: admin,
      loading: false,
    });
  };

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

  const columns = useMemo(
    () =>
      createColumns({
        onView: handleViewClick,
        onEdit: handleEditClick,
        onDelete: handleDeleteClick,
      }),
    []
  );

  const adminsList = Array.isArray(adminsData) ? adminsData : [];

  return (
    <div className="h-full bg-gray-50 p-6 flex flex-col">
      {/* Page Header */}
      <AdminPageHeader loading={loading} onRefresh={handleRefresh} />

      {/* Main Content - Data Table */}
      <div className="flex-1 flex flex-col min-h-0">
        <Card className="flex-1 flex flex-col">
          <CardHeader className="flex-shrink-0">
            <CardTitle>Daftar Administrator</CardTitle>
            <CardDescription>
              Berikut adalah daftar semua administrator yang terdaftar dalam
              sistem
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0">
            {loading ? (
              <AdminTableSkeleton />
            ) : (
              <AdminDataTable
                columns={columns}
                data={adminsList}
                onAddNew={handleAddNew}
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Admin Dialog */}
      <AddAdminDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSuccess={handleAddSuccess}
      />

      {/* View Admin Dialog */}
      <ViewAdminDialog
        open={viewDialog.open}
        onOpenChange={(open) => setViewDialog((prev) => ({ ...prev, open }))}
        admin={viewDialog.admin}
      />

      {/* Edit Admin Dialog */}
      <EditAdminDialog
        open={editDialog.open}
        onOpenChange={(open) => setEditDialog((prev) => ({ ...prev, open }))}
        admin={editDialog.admin}
        onSuccess={handleEditSuccess}
      />

      {/* Delete Admin Dialog */}
      <DeleteAdminDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog((prev) => ({ ...prev, open }))}
        onConfirm={handleDeleteConfirm}
        adminName={deleteDialog.admin?.name || ""}
        loading={deleteDialog.loading}
      />
    </div>
  );
}
