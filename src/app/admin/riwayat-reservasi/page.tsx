"use client";

import { useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaHistory,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";

// Interface untuk reservasi
interface Reservasi {
  id: number;
  diterimaOleh: string;
  email: string;
  nama: string;
  paket: string;
  harga: number;
  tanggal: string;
  status: "selesai" | "dibatalkan";
}

// Dummy data untuk reservasi
const dummyReservasis: Reservasi[] = [
  {
    id: 1,
    diterimaOleh: "Siti Nurhaliza",
    email: "john.doe@gmail.com",
    nama: "John Doe",
    paket: "Potong Rambut Premium",
    harga: 50000,
    tanggal: "2024-01-15",
    status: "selesai",
  },
  {
    id: 2,
    diterimaOleh: "Maya Sari",
    email: "jane.smith@yahoo.com",
    nama: "Jane Smith",
    paket: "Potong Rambut + Cuci",
    harga: 35000,
    tanggal: "2024-01-16",
    status: "selesai",
  },
  {
    id: 3,
    diterimaOleh: "Rina Wijayanti",
    email: "robert.j@outlook.com",
    nama: "Robert Johnson",
    paket: "Potong Rambut Reguler",
    harga: 25000,
    tanggal: "2024-01-17",
    status: "selesai",
  },
  {
    id: 4,
    diterimaOleh: "Dewi Anggraini",
    email: "maria.garcia@gmail.com",
    nama: "Maria Garcia",
    paket: "Cukur Jenggot",
    harga: 15000,
    tanggal: "2024-01-18",
    status: "dibatalkan",
  },
  {
    id: 5,
    diterimaOleh: "Siti Nurhaliza",
    email: "alex.brown@gmail.com",
    nama: "Alex Brown",
    paket: "Potong Rambut Premium",
    harga: 50000,
    tanggal: "2024-01-19",
    status: "selesai",
  },
];

export default function RiwayatReservasi() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [reservasis, setReservasis] = useState<Reservasi[]>(dummyReservasis);
  const [filter, setFilter] = useState<"semua" | "selesai" | "dibatalkan">(
    "semua"
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "selesai":
        return "bg-green-100 text-green-800";
      case "dibatalkan":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredReservasis =
    filter === "semua"
      ? reservasis
      : reservasis.filter((reservasi) => reservasi.status === filter);

  const handleTambah = () => {
    console.log("Tambah reservasi");
    // TODO: Implement tambah reservasi functionality
  };

  const handleEdit = (id: number) => {
    console.log("Edit reservasi dengan ID:", id);
    // TODO: Implement edit reservasi functionality
  };

  const handleDelete = (id: number) => {
    console.log("Delete reservasi dengan ID:", id);
    // TODO: Implement delete reservasi functionality
    if (confirm("Apakah Anda yakin ingin menghapus reservasi ini?")) {
      setReservasis(reservasis.filter((reservasi) => reservasi.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <main className="flex-1 p-8 overflow-auto">
        <div className="mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Riwayat Reservasi
            </h1>
            <p className="text-gray-600">
              Lihat dan kelola riwayat reservasi pelanggan
            </p>
          </div>

          {/* Filter dan Button Tambah */}
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Filter Status */}
            <div className="flex space-x-2">
              {["semua", "selesai", "dibatalkan"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === status
                      ? "bg-[#FDFB03] text-black"
                      : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>

            {/* Button Tambah */}
            <button
              onClick={handleTambah}
              className="bg-[#FDFB03] hover:bg-yellow-400 text-black font-medium px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 shadow-sm"
            >
              <FaPlus size={16} />
              <span>Tambah Reservasi</span>
            </button>
          </div>

          {/* Tabel Reservasi */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      No
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Diterima Oleh (Kasir)
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Nama
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Paket
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Harga
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredReservasis.map((reservasi, index) => (
                    <tr
                      key={reservasi.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {reservasi.diterimaOleh}
                      </td>
                      <td className="px-6 py-4 text-sm text-blue-600">
                        {reservasi.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {reservasi.nama}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {reservasi.paket}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-green-600">
                        {formatCurrency(reservasi.harga)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            reservasi.status
                          )}`}
                        >
                          {reservasi.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center space-x-3">
                          <button
                            onClick={() => handleEdit(reservasi.id)}
                            className="text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-lg hover:bg-blue-50"
                            title="Edit Reservasi"
                          >
                            <FaEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(reservasi.id)}
                            className="text-red-600 hover:text-red-800 transition-colors p-2 rounded-lg hover:bg-red-50"
                            title="Delete Reservasi"
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredReservasis.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">
                  {filter === "semua"
                    ? "Tidak ada data reservasi"
                    : `Tidak ada reservasi dengan status "${filter}"`}
                </p>
                <button
                  onClick={handleTambah}
                  className="bg-[#FDFB03] hover:bg-yellow-400 text-black font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center space-x-2"
                >
                  <FaPlus size={16} />
                  <span>Tambah Reservasi Pertama</span>
                </button>
              </div>
            )}
          </div>

          {/* Summary Cards */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Reservasi */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Reservasi</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {reservasis.length}
                  </p>
                </div>
                <div className="text-[#FDFB03]">
                  <FaHistory size={32} />
                </div>
              </div>
            </div>

            {/* Reservasi Selesai */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Selesai</p>
                  <p className="text-2xl font-bold text-green-600">
                    {reservasis.filter((r) => r.status === "selesai").length}
                  </p>
                </div>
                <div className="text-green-500">
                  <FaUser size={32} />
                </div>
              </div>
            </div>

            {/* Reservasi Dibatalkan */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Dibatalkan</p>
                  <p className="text-2xl font-bold text-red-600">
                    {reservasis.filter((r) => r.status === "dibatalkan").length}
                  </p>
                </div>
                <div className="text-red-500">
                  <FaTrash size={32} />
                </div>
              </div>
            </div>

            {/* Total Pendapatan */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Pendapatan</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(
                      reservasis
                        .filter((r) => r.status === "selesai")
                        .reduce((total, r) => total + r.harga, 0)
                    )}
                  </p>
                </div>
                <div className="text-blue-500">
                  <FaCalendarAlt size={32} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
