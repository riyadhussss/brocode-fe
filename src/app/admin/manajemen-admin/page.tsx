"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  AdminPageHeader,
  AdminTableSkeleton,
  AdminDataTable,
  AddAdminDialog,
  EditAdminDialog,
  DeleteAdminDialog,
} from "./components";
import { useManajemenAdmin } from "./hooks/useManajemenAdmin";

export default function ManajemenAdmin() {
  const {
    loading,
    adminsList,
    columns,
    showAddDialog,
    setShowAddDialog,
    deleteDialog,
    setDeleteDialog,
    editDialog,
    setEditDialog,
    handleRefresh,
    handleAddNew,
    handleAddSuccess,
    handleEditSuccess,
    handleDeleteConfirm,
  } = useManajemenAdmin();

  return (
    <div className="h-full bg-gray-50 p-6 flex flex-col">
      {/* Header */}
      <AdminPageHeader loading={loading} onRefresh={handleRefresh} />

      {/* Table */}
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

      {/* Dialogs */}
      <AddAdminDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSuccess={handleAddSuccess}
      />
      <EditAdminDialog
        open={editDialog.open}
        onOpenChange={(open) => setEditDialog((prev) => ({ ...prev, open }))}
        admin={editDialog.admin}
        onSuccess={handleEditSuccess}
      />
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
