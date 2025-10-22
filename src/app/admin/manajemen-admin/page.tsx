"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { toast } from "sonner";
import { adminService } from "@/app/lib/services/admin.service";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { AddAdminDialog } from "./add-admin-dialog";

// ✅ Menggunakan AdminsResponse langsung tanpa interface Admin tambahan
import { AdminsResponse } from "@/app/lib/types/admin";

export default function ManajemenAdmin() {
  const [adminsData, setAdminsData] = useState<AdminsResponse["data"]>(
    [] as unknown as AdminsResponse["data"]
  );
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [showAddDialog, setShowAddDialog] = useState(false);

  // ✅ Fetch data menggunakan adminService.getAdmins
  const fetchAdminsData = async () => {
    try {
      setLoading(true);

      console.log("🔍 Fetching admins data...");

      // ✅ Panggil adminService.getAdmins
      const response = await adminService.getAdmins();

      console.log("📊 Admins API Response:", response);

      // ✅ Cek apakah response berhasil
      if (response && response.success && response.data) {
        setAdminsData(response.data);
        setTotalCount(response.count || response.data.length);

        toast.success(`Berhasil memuat ${response.data.length} data admin`);
      } else {
        throw new Error(response?.message || "Gagal mengambil data admin");
      }
    } catch (error: any) {
      console.error("❌ Admins fetch error:", error);

      // ✅ Set empty array jika error
      setAdminsData([] as unknown as AdminsResponse["data"]);
      setTotalCount(0);

      toast.error("Gagal memuat data admin", {
        description:
          error.message || "Silakan coba lagi atau hubungi administrator",
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load data saat komponen mount
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
    // Refresh data setelah berhasil tambah admin
    fetchAdminsData();
  };

  // ✅ Convert to array untuk safety
  const adminsList = Array.isArray(adminsData) ? adminsData : [];

  // ✅ Loading state
  if (loading) {
    return (
      <div className="h-full bg-gray-50 p-6 flex flex-col">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Manajemen Admin
              </h1>
              <p className="text-gray-600 text-sm">
                Kelola data administrator sistem
              </p>
            </div>
          </div>
        </div>

        <Card>
          <CardContent className="p-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className="text-gray-600">Memuat data admin...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50 p-6 flex flex-col">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Manajemen Admin
            </h1>
            <p className="text-gray-600 text-sm">
              Kelola data administrator sistem
            </p>
          </div>
          <Button onClick={handleRefresh} variant="outline">
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Main Content - Stats Cards dan DataTable dalam satu container */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 flex-shrink-0">
          {/* Total Admin */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Admin</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminsList.length}</div>
              <p className="text-xs text-muted-foreground">
                Administrator terdaftar
              </p>
            </CardContent>
          </Card>

          {/* Admin Aktif */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Admin Aktif</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {adminsList.filter((admin) => admin.role === "admin").length}
              </div>
              <p className="text-xs text-muted-foreground">Admin yang aktif</p>
            </CardContent>
          </Card>

          {/* Total dari Server */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total (Server)
              </CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {totalCount}
              </div>
              <p className="text-xs text-muted-foreground">
                Total dari database
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card className="flex-1 flex flex-col">
          <CardHeader className="flex-shrink-0">
            <CardTitle>Daftar Administrator</CardTitle>
            <CardDescription>
              Berikut adalah daftar semua administrator yang terdaftar dalam
              sistem
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0">
            <DataTable
              columns={columns}
              data={adminsList}
              onAddNew={handleAddNew}
            />
          </CardContent>
        </Card>
      </div>

      {/* Add Admin Dialog */}
      <AddAdminDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSuccess={handleAddSuccess}
      />
    </div>
  );
}
