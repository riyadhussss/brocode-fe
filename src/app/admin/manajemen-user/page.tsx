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
import { Users, UserCheck, Mail } from "lucide-react";
import { DataTable } from "./data-table";
import { createColumns, UserRowData } from "./columns";

// ✅ Dummy data user untuk tampilan
const dummyUserData: UserRowData[] = [
  {
    _id: "1",
    name: "John Doe",
    email: "john.doe@gmail.com",
    phone: "081234567890",
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-10T08:00:00Z",
  },
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane.smith@yahoo.com",
    phone: "081298765432",
    createdAt: "2024-02-15T09:30:00Z",
    updatedAt: "2024-02-15T09:30:00Z",
  },
  {
    _id: "3",
    name: "Robert Johnson",
    email: "robert.j@outlook.com",
    phone: "081356789012",
    createdAt: "2024-03-20T14:15:00Z",
    updatedAt: "2024-03-20T14:15:00Z",
  },
  {
    _id: "4",
    name: "Maria Garcia",
    email: "maria.garcia@gmail.com",
    phone: "081445678901",
    createdAt: "2024-04-05T10:45:00Z",
    updatedAt: "2024-04-05T10:45:00Z",
  },
  {
    _id: "5",
    name: "David Brown",
    email: "david.brown@gmail.com",
    phone: "081523456789",
    createdAt: "2024-05-12T16:20:00Z",
    updatedAt: "2024-05-12T16:20:00Z",
  },
];

export default function ManajemenUser() {
  const [userData, setUserData] = useState<UserRowData[]>(dummyUserData);
  const [loading, setLoading] = useState(false);

  const handleAddNew = () => {
    console.log("Tambah user clicked");
    // TODO: Implement tambah user dialog
  };

  const handleRefresh = () => {
    console.log("Refresh data clicked");
    // TODO: Implement refresh data
  };

  // ✅ Handle view user
  const handleViewClick = (user: UserRowData) => {
    console.log("View user:", user);
    // TODO: Implement view dialog
  };

  // ✅ Handle edit user
  const handleEditClick = (user: UserRowData) => {
    console.log("Edit user:", user);
    // TODO: Implement edit dialog
  };

  // ✅ Handle delete user
  const handleDeleteClick = (user: UserRowData) => {
    console.log("Delete user:", user);
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

  // ✅ Stats calculation
  const totalUsers = userData.length;
  const activeUsers = userData.length; // TODO: Add status field to determine active users
  const gmailUsers = userData.filter((user) =>
    user.email.toLowerCase().includes("@gmail.com")
  ).length;

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
        </div>
      </div>

      {/* Stats Cards */}
      {/* <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total User</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Semua pengguna terdaftar
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Aktif</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Pengguna aktif saat ini
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email Gmail</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gmailUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Menggunakan email Gmail
            </p>
          </CardContent>
        </Card>
      </div> */}

      {/* Data Table */}
      <Card className="flex-1 flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle>Daftar User</CardTitle>
          <CardDescription>
            Kelola informasi user dan lakukan operasi CRUD
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={userData}
            onAddNew={handleAddNew}
          />
        </CardContent>
      </Card>
    </div>
  );
}
