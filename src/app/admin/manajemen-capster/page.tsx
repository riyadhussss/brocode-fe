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
import { Users } from "lucide-react";
import { DataTable } from "./data-table";
import { createColumns, CapsterRowData } from "./columns";

const dummyCapsterData: CapsterRowData[] = [
  {
    _id: "1",
    name: "Ahmad Rizki",
    email: "ahmad.rizki@brocode.com",
    specialization: "Classic Cut",
    experience: 5,
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-10T08:00:00Z",
  },
  {
    _id: "2",
    name: "Budi Santoso",
    email: "budi.santoso@brocode.com",
    specialization: "Modern Style",
    experience: 3,
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-10T08:00:00Z",
  },
  {
    _id: "3",
    name: "Chandra Wijaya",
    email: "chandra.wijaya@brocode.com",
    specialization: "Beard Grooming",
    experience: 7,
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-10T08:00:00Z",
  },
];

export default function ManajemenCapster() {
  const [capsterData, setCapsterData] =
    useState<CapsterRowData[]>(dummyCapsterData);
  const [loading, setLoading] = useState(false);

  const handleAddNew = () => console.log("Tambah capster");
  const handleRefresh = () => console.log("Refresh data");
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

  if (loading) {
    return (
      <div className="h-full bg-gray-50 p-6 flex flex-col">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Manajemen Capster
          </h1>
          <p className="text-gray-600 text-sm">Kelola data capster sistem</p>
        </div>
        <Card>
          <CardContent className="p-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className="text-gray-600">Memuat data capster...</p>
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
          <Button onClick={handleRefresh} variant="outline">
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
                {capsterData.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Capster yang aktif
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Rata-rata Pengalaman
              </CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {capsterData.length > 0
                  ? Math.round(
                      capsterData.reduce((sum, c) => sum + c.experience, 0) /
                        capsterData.length
                    )
                  : 0}{" "}
                tahun
              </div>
              <p className="text-xs text-muted-foreground">Pengalaman kerja</p>
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
    </div>
  );
}
