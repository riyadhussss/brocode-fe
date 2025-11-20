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
import { customerService } from "@/app/lib/services/customer.service";
import {
  CustomerPageHeader,
  CustomerTableSkeleton,
  CustomerDataTable,
  createColumns,
  AddCustomerDialog,
  EditCustomerDialog,
  DeleteCustomerDialog,
} from "./components";
import type { CustomerRowData } from "./components/CustomerTableColumns";

export default function ManajemenCustomer() {
  const [customerData, setCustomerData] = useState<CustomerRowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    customer: CustomerRowData | null;
    loading: boolean;
  }>({
    open: false,
    customer: null,
    loading: false,
  });
  const [editDialog, setEditDialog] = useState<{
    open: boolean;
    customer: CustomerRowData | null;
  }>({
    open: false,
    customer: null,
  });

  // ✅ Fetch data customers
  const fetchCustomersData = async () => {
    try {
      setLoading(true);

      const response = await customerService.getCustomers();

      if (response && response.success && response.data) {
        // Transform data dari API ke format CustomerRowData
        const transformedData: CustomerRowData[] = response.data.map(
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

        setCustomerData(transformedData);
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

      setCustomerData([]);
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

  // ✅ Handle edit customer
  const handleEditClick = (customer: CustomerRowData) => {
    setEditDialog({
      open: true,
      customer: customer,
    });
  };

  const handleEditSuccess = () => {
    fetchCustomersData();
  };

  // ✅ Handle delete customer
  const handleDeleteClick = (customer: CustomerRowData) => {
    setDeleteDialog({
      open: true,
      customer: customer,
      loading: false,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.customer) return;

    setDeleteDialog((prev) => ({ ...prev, loading: true }));

    try {
      const response = await customerService.deleteCustomer(
        deleteDialog.customer._id
      );

      if (response?.success) {
        toast.success("Customer berhasil dihapus", {
          description: `${deleteDialog.customer.name} telah dihapus dari sistem`,
        });

        // Close dialog
        setDeleteDialog({ open: false, customer: null, loading: false });

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
        onEdit: handleEditClick,
        onDelete: handleDeleteClick,
      }),
    []
  );

  // ✅ Stats calculation
  const totalCustomers = customerData.length;

  return (
    <div className="h-full bg-gray-50 p-6 flex flex-col">
      {/* Page Header */}
      <CustomerPageHeader loading={loading} onRefresh={handleRefresh} />

      {/* Data Table */}
      <div className="flex-1 flex flex-col min-h-0">
        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <CardTitle>Daftar Customer</CardTitle>
            <CardDescription>
              Berikut adalah daftar semua customer yang terdaftar dalam sistem
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0">
            {loading ? (
              <CustomerTableSkeleton />
            ) : (
              <CustomerDataTable
                columns={columns}
                data={customerData}
                onAddNew={handleAddNew}
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteCustomerDialog
        open={deleteDialog.open}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteDialog({ open: false, customer: null, loading: false });
          }
        }}
        onConfirm={handleDeleteConfirm}
        customerName={deleteDialog.customer?.name || ""}
        loading={deleteDialog.loading}
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
            setEditDialog({ open: false, customer: null });
          }
        }}
        customer={editDialog.customer}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
}
