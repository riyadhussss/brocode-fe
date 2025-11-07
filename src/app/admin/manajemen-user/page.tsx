"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { getErrorMessage } from "@/app/lib/getErrorMessage";
import { customerService } from "@/app/lib/services/customer.service";
import {
  CustomerPageHeader,
  CustomerTableSkeleton,
  CustomerDataTable,
  createColumns,
  AddCustomerDialog,
  ViewCustomerDialog,
  EditCustomerDialog,
  DeleteCustomerDialog,
} from "./components";
import type { UserRowData } from "./components/CustomerTableColumns";

export default function ManajemenUser() {
  const [userData, setUserData] = useState<UserRowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    user: UserRowData | null;
    loading: boolean;
  }>({
    open: false,
    user: null,
    loading: false,
  });
  const [viewDialog, setViewDialog] = useState<{
    open: boolean;
    user: UserRowData | null;
  }>({
    open: false,
    user: null,
  });
  const [editDialog, setEditDialog] = useState<{
    open: boolean;
    user: UserRowData | null;
  }>({
    open: false,
    user: null,
  });

  // ✅ Fetch data customers
  const fetchCustomersData = async () => {
    try {
      setLoading(true);

      const response = await customerService.getCustomers();

      if (response && response.success && response.data) {
        // Transform data dari API ke format UserRowData
        const transformedData: UserRowData[] = response.data.map(
          (customer) => ({
            _id: customer._id,
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            userId: customer.userId,
            role: customer.role,
            createdAt: customer.createdAt,
            updatedAt: customer.updatedAt,
          })
        );

        setUserData(transformedData);
        setTotalCount(response.count || transformedData.length);

        toast.success(
          `Berhasil memuat ${transformedData.length} data customer`
        );
      } else {
        throw new Error(response?.message || "Gagal mengambil data customer");
      }
    } catch (error) {
      console.error("❌ Customers fetch error:", error);
      const errorMessage = getErrorMessage(error);

      setUserData([]);
      setTotalCount(0);

      toast.error("Gagal memuat data customer", {
        description:
          errorMessage || "Silakan coba lagi atau hubungi administrator",
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load data saat komponen mount
  useEffect(() => {
    fetchCustomersData();
  }, []);

  const handleAddNew = () => {
    setShowAddDialog(true);
  };

  const handleAddSuccess = () => {
    fetchCustomersData();
  };

  const handleRefresh = async () => {
    toast.info("Memperbarui data...");
    await fetchCustomersData();
  };

  // ✅ Handle view user
  const handleViewClick = async (user: UserRowData) => {
    try {
      const response = await customerService.getCustomerById(user._id);

      if (response && response.success && response.data) {
        setViewDialog({
          open: true,
          user: {
            _id: response.data._id,
            name: response.data.name,
            email: response.data.email,
            phone: response.data.phone,
            userId: response.data.userId,
            role: response.data.role,
            createdAt: response.data.createdAt,
            updatedAt: response.data.updatedAt,
          },
        });
      } else {
        throw new Error(response?.message || "Gagal mengambil detail customer");
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error("Gagal memuat detail customer", {
        description: errorMessage,
      });
    }
  };

  // ✅ Handle edit user
  const handleEditClick = (user: UserRowData) => {
    setEditDialog({
      open: true,
      user: user,
    });
  };

  const handleEditSuccess = () => {
    fetchCustomersData();
  };

  // ✅ Handle delete user
  const handleDeleteClick = (user: UserRowData) => {
    setDeleteDialog({
      open: true,
      user: user,
      loading: false,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.user) return;

    setDeleteDialog((prev) => ({ ...prev, loading: true }));

    try {
      const response = await customerService.deleteCustomer(
        deleteDialog.user._id
      );

      if (response?.success) {
        toast.success("Customer berhasil dihapus", {
          description: `${deleteDialog.user.name} telah dihapus dari sistem`,
        });

        // Close dialog
        setDeleteDialog({ open: false, user: null, loading: false });

        // Refresh data
        fetchCustomersData();
      } else {
        throw new Error(response?.message || "Gagal menghapus customer");
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);

      toast.error("Gagal menghapus customer", {
        description: errorMessage,
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

  // ✅ Stats calculation
  const totalUsers = userData.length;

  return (
    <div className="h-full bg-gray-50 p-6 flex flex-col">
      <CustomerPageHeader loading={loading} onRefresh={handleRefresh} />

      {loading ? (
        <CustomerTableSkeleton />
      ) : (
        <CustomerDataTable
          columns={columns}
          data={userData}
          onAddNew={handleAddNew}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteCustomerDialog
        open={deleteDialog.open}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteDialog({ open: false, user: null, loading: false });
          }
        }}
        onConfirm={handleDeleteConfirm}
        customerName={deleteDialog.user?.name || ""}
        loading={deleteDialog.loading}
      />

      {/* View Dialog */}
      <ViewCustomerDialog
        open={viewDialog.open}
        onOpenChange={(open) => {
          if (!open) {
            setViewDialog({ open: false, user: null });
          }
        }}
        customer={viewDialog.user}
      />

      {/* Add Customer Dialog */}
      <AddCustomerDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSuccess={handleAddSuccess}
      />

      {/* Edit Customer Dialog */}
      <EditCustomerDialog
        open={editDialog.open}
        onOpenChange={(open) => {
          if (!open) {
            setEditDialog({ open: false, user: null });
          }
        }}
        customer={editDialog.user}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
}
