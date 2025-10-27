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
import { Skeleton } from "@/components/ui/skeleton";
import { Users, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { DataTable } from "./data-table";
import { createColumns, CapsterRowData } from "./columns";
import { capsterService } from "@/app/lib/services/capster.service";
import { getErrorMessage } from "@/app/lib/getErrorMessage";
import { AddCapsterDialog } from "./add-capster-dialog";

export default function ManajemenCapster() {
  const [capsterData, setCapsterData] = useState<CapsterRowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);

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

  const handleViewClick = (capster: CapsterRowData) =>
    console.log("View:", capster);
  const handleEditClick = (capster: CapsterRowData) =>
    console.log("Edit:", capster);
  const handleDeleteClick = (capster: CapsterRowData) =>
    console.log("Delete:", capster);

  const columns = useMemo(
    () =>
      createColumns({
        onView: handleViewClick,
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
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Manajemen Capster
            </h1>
            <p className="text-gray-600 text-sm">Kelola data capster sistem</p>
          </div>
          <Button onClick={handleRefresh} variant="outline" disabled={loading}>
            <RefreshCw
              className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
            />
            Refresh Data
          </Button>
        </div>
      </div>
      <div className="flex-1 flex flex-col min-h-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 flex-shrink-0">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Capster
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{capsterData.length}</div>
              <p className="text-xs text-muted-foreground">Capster terdaftar</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Capster Aktif
              </CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {activeCapsters}
              </div>
              <p className="text-xs text-muted-foreground">
                Capster yang aktif
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Capster Tidak Aktif
              </CardTitle>
              <Users className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {capsterData.length - activeCapsters}
              </div>
              <p className="text-xs text-muted-foreground">
                Capster tidak aktif
              </p>
            </CardContent>
          </Card>
        </div>
        <Card className="flex-1 flex flex-col">
          <CardHeader className="flex-shrink-0">
            <CardTitle>Daftar Capster</CardTitle>
            <CardDescription>
              Berikut adalah daftar semua capster yang terdaftar dalam sistem
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0">
            <DataTable
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
    </div>
  );
}
