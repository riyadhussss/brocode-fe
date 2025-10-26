"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "./data-table";
import { createColumns, UserRowData } from "./columns";
import { getErrorMessage } from "@/app/lib/getErrorMessage";
import { customerService } from "@/app/lib/services/customer.service";
import { ViewCustomerDialog } from "./view-customer-dialog";
import { DeleteCustomerDialog } from "./delete-customer-dialog";
import { AddCustomerDialog } from "./add-customer-dialog";
import { EditCustomerDialog } from "./edit-customer-dialog";

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
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Manajemen User
            </h1>
            <p className="text-gray-600 text-sm">Kelola data pengguna sistem</p>
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
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total User</CardTitle>
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
                <div className="text-2xl font-bold">{totalUsers}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Semua pengguna terdaftar
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customer
            </CardTitle>
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
                <div className="text-2xl font-bold">{totalCount}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Data dari server
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
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
                <div className="text-2xl font-bold text-green-600">Aktif</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Sistem berjalan normal
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="flex-1 flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle>Daftar User</CardTitle>
          <CardDescription>
            Kelola informasi user dan lakukan operasi CRUD
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
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
              data={userData}
              onAddNew={handleAddNew}
            />
          )}
        </CardContent>
      </Card>

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
