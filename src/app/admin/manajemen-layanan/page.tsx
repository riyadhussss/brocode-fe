"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scissors } from "lucide-react";
import { DataTable } from "./data-table";
import { createColumns, LayananRowData } from "./columns";

// ✅ Dummy data layanan untuk tampilan
const dummyLayananData: LayananRowData[] = [
  {
    _id: "1",
    name: "Potong Rambut Reguler",
    price: 25000,
    duration: 30,
    description: "Potongan rambut standar dengan styling sederhana",
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-10T08:00:00Z",
  },
  {
    _id: "2",
    name: "Potong Rambut + Cuci",
    price: 35000,
    duration: 45,
    description: "Potongan rambut dengan cuci rambut menggunakan shampo",
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-10T08:00:00Z",
  },
  {
    _id: "3",
    name: "Potong Rambut Premium",
    price: 50000,
    duration: 60,
    description: "Potongan rambut dengan styling premium dan treatment rambut",
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-10T08:00:00Z",
  },
  {
    _id: "4",
    name: "Cukur Jenggot",
    price: 15000,
    duration: 20,
    description: "Cukur jenggot dan kumis dengan pisau cukur tradisional",
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-10T08:00:00Z",
  },
  {
    _id: "5",
    name: "Smoothing Rambut",
    price: 150000,
    duration: 120,
    description: "Treatment smoothing untuk rambut lebih lurus dan berkilau",
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-10T08:00:00Z",
  },
];

export default function ManajemenLayanan() {
  const [layananData, setLayananData] =
    useState<LayananRowData[]>(dummyLayananData);
  const [loading, setLoading] = useState(false);

  const handleAddNew = () => {
    console.log("Tambah layanan clicked");
    // TODO: Implement tambah layanan dialog
  };

  const handleRefresh = () => {
    console.log("Refresh data clicked");
    // TODO: Implement refresh data
  };

  // ✅ Handle view layanan
  const handleViewClick = (layanan: LayananRowData) => {
    console.log("View layanan:", layanan);
    // TODO: Implement view dialog
  };

  // ✅ Handle edit layanan
  const handleEditClick = (layanan: LayananRowData) => {
    console.log("Edit layanan:", layanan);
    // TODO: Implement edit dialog
  };

  // ✅ Handle delete layanan
  const handleDeleteClick = (layanan: LayananRowData) => {
    console.log("Delete layanan:", layanan);
    // TODO: Implement delete confirmation dialog
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

  // ✅ Loading state
  if (loading) {
    return (
      <div className="h-full bg-gray-50 p-6 flex flex-col">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Manajemen Layanan
              </h1>
              <p className="text-gray-600 text-sm">
                Kelola data layanan sistem
              </p>
            </div>
          </div>
        </div>

        <Card>
          <CardContent className="p-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className="text-gray-600">Memuat data layanan...</p>
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
              Manajemen Layanan
            </h1>
            <p className="text-gray-600 text-sm">Kelola data layanan sistem</p>
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
          {/* Total Layanan */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Layanan
              </CardTitle>
              <Scissors className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{layananData.length}</div>
              <p className="text-xs text-muted-foreground">Layanan tersedia</p>
            </CardContent>
          </Card>

          {/* Harga Terendah */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Harga Terendah
              </CardTitle>
              <Scissors className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {layananData.length > 0
                  ? new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(Math.min(...layananData.map((l) => l.price)))
                  : "Rp 0"}
              </div>
              <p className="text-xs text-muted-foreground">
                Layanan paling murah
              </p>
            </CardContent>
          </Card>

          {/* Harga Tertinggi */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Harga Tertinggi
              </CardTitle>
              <Scissors className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {layananData.length > 0
                  ? new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(Math.max(...layananData.map((l) => l.price)))
                  : "Rp 0"}
              </div>
              <p className="text-xs text-muted-foreground">Layanan premium</p>
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card className="flex-1 flex flex-col">
          <CardHeader className="flex-shrink-0">
            <CardTitle>Daftar Layanan</CardTitle>
            <CardDescription>
              Berikut adalah daftar semua layanan yang tersedia dalam sistem
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0">
            <DataTable
              columns={columns}
              data={layananData}
              onAddNew={handleAddNew}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
