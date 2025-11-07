"use client";

import { useMemo } from "react";
import {
  PaymentPageHeader,
  PaymentStatsCards,
  PaymentDataTable,
  PaymentTableSkeleton,
  PaymentDialogs,
  usePaymentMethods,
  usePaymentDialogs,
  createColumns,
} from "./components";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function MetodePembayaran() {
  // Custom hooks for data and dialogs
  const { paymentData, loading, totalBank, totalEWallet, refetch } =
    usePaymentMethods();
  const {
    showAddDialog,
    setShowAddDialog,
    handleAddNew,
    editDialog,
    setEditDialog,
    handleEdit,
    deleteDialog,
    setDeleteDialog,
    handleDelete,
  } = usePaymentDialogs();

  // Create columns with callbacks
  const columns = useMemo(
    () =>
      createColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
      }),
    [handleEdit, handleDelete]
  );

  // Success handlers
  const handleSuccess = () => {
    refetch();
  };

  return (
    <div className="h-full bg-gray-50 p-6 flex flex-col">
      {/* Page Header */}
      <PaymentPageHeader onRefresh={refetch} loading={loading} />

      {/* Main Content - Stats Cards dan DataTable dalam satu container */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Stats Cards */}
        <PaymentStatsCards
          loading={loading}
          totalMethods={paymentData.length}
          totalBank={totalBank}
          totalEWallet={totalEWallet}
        />

        {/* Data Table Card */}
        <Card className="flex-1 flex flex-col">
          <CardHeader className="flex-shrink-0">
            <CardTitle>Daftar Metode Pembayaran</CardTitle>
            <CardDescription>
              Berikut adalah daftar semua metode pembayaran yang tersedia dalam
              sistem
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0">
            {loading ? (
              <PaymentTableSkeleton />
            ) : (
              <PaymentDataTable
                columns={columns}
                data={paymentData}
                onAddNew={handleAddNew}
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* All Dialogs */}
      <PaymentDialogs
        showAddDialog={showAddDialog}
        onAddDialogChange={setShowAddDialog}
        onAddSuccess={handleSuccess}
        editDialog={editDialog}
        onEditDialogChange={(open) =>
          setEditDialog((prev) => ({ ...prev, open }))
        }
        onEditSuccess={handleSuccess}
        deleteDialog={deleteDialog}
        onDeleteDialogChange={(open) =>
          setDeleteDialog((prev) => ({ ...prev, open }))
        }
        onDeleteSuccess={handleSuccess}
      />
    </div>
  );
}
