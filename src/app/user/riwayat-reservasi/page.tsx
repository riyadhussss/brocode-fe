"use client";

import { useState } from "react";
import {
  FaEye,
  FaCalendarAlt,
  FaClock,
  FaCut,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaFilter,
  FaStickyNote,
} from "react-icons/fa";

// Interface untuk riwayat reservasi user
interface RiwayatReservasi {
  id: string;
  customer: {
    nama: string;
    email: string;
    phone: string;
  };
  capster: string;
  layanan: string;
  layananHarga: number;
  tanggal: string;
  waktu: string;
  status: "pending" | "diterima" | "ditolak" | "selesai";
  catatan?: string;
  createdAt: string;
  processedAt?: string;
  processedBy?: string;
}

// Dummy data riwayat reservasi user
const dummyHistory: RiwayatReservasi[] = [
  {
    id: "RSV-001",
    customer: {
      nama: "John Doe",
      email: "john.doe@email.com",
      phone: "081234567890",
    },
    capster: "Andi Wijaya",
    layanan: "Haircut Premium",
    layananHarga: 50000,
    tanggal: "2025-09-28",
    waktu: "10:00",
    status: "pending",
    catatan: "Ingin model rambut fade",
    createdAt: "2025-09-25T08:30:00",
  },
  {
    id: "RSV-002",
    customer: {
      nama: "John Doe",
      email: "john.doe@email.com",
      phone: "081234567890",
    },
    capster: "Budi Santoso",
    layanan: "Haircut Regular",
    layananHarga: 25000,
    tanggal: "2025-09-24",
    waktu: "14:00",
    status: "diterima",
    catatan: "Model rambut undercut",
    createdAt: "2025-09-23T10:00:00",
    processedAt: "2025-09-23T10:30:00",
    processedBy: "Kasir 1",
  },
  {
    id: "RSV-003",
    customer: {
      nama: "John Doe",
      email: "john.doe@email.com",
      phone: "081234567890",
    },
    capster: "Charlie Rahman",
    layanan: "Hair Styling",
    layananHarga: 30000,
    tanggal: "2025-09-22",
    waktu: "16:00",
    status: "selesai",
    catatan: "Styling untuk acara formal",
    createdAt: "2025-09-20T14:20:00",
    processedAt: "2025-09-20T15:00:00",
    processedBy: "Kasir 2",
  },
  {
    id: "RSV-004",
    customer: {
      nama: "John Doe",
      email: "john.doe@email.com",
      phone: "081234567890",
    },
    capster: "David Hakim",
    layanan: "Beard Trim",
    layananHarga: 20000,
    tanggal: "2025-09-20",
    waktu: "11:00",
    status: "ditolak",
    catatan: "Minta potong pendek",
    createdAt: "2025-09-18T16:30:00",
    processedAt: "2025-09-18T17:00:00",
    processedBy: "Kasir 1",
  },
  {
    id: "RSV-005",
    customer: {
      nama: "John Doe",
      email: "john.doe@email.com",
      phone: "081234567890",
    },
    capster: "Andi Wijaya",
    layanan: "Face Treatment",
    layananHarga: 45000,
    tanggal: "2025-09-18",
    waktu: "15:30",
    status: "selesai",
    catatan: "Treatment wajah lengkap",
    createdAt: "2025-09-16T11:45:00",
    processedAt: "2025-09-16T12:30:00",
    processedBy: "Kasir 3",
  },
];

export default function RiwayatReservasiUser() {
  const [historyData] = useState<RiwayatReservasi[]>(dummyHistory);
  const [selectedHistory, setSelectedHistory] =
    useState<RiwayatReservasi | null>(null);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "diterima" | "ditolak" | "selesai"
  >("all");

  // Filter data berdasarkan status
  const filteredHistory = historyData.filter((item) => {
    if (statusFilter === "all") return true;
    return item.status === statusFilter;
  });

  // Statistik
  const totalHistory = historyData.length;
  const pendingCount = historyData.filter(
    (item) => item.status === "pending"
  ).length;
  const acceptedCount = historyData.filter(
    (item) => item.status === "diterima"
  ).length;
  const completedCount = historyData.filter(
    (item) => item.status === "selesai"
  ).length;
  const rejectedCount = historyData.filter(
    (item) => item.status === "ditolak"
  ).length;

  // Handle detail view
  const handleViewDetail = (history: RiwayatReservasi) => {
    setSelectedHistory(history);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (
    status: "pending" | "diterima" | "ditolak" | "selesai"
  ) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            <FaSpinner className="mr-1" />
            Menunggu
          </span>
        );
      case "diterima":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            <FaCheckCircle className="mr-1" />
            Diterima
          </span>
        );
      case "selesai":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <FaCheckCircle className="mr-1" />
            Selesai
          </span>
        );
      case "ditolak":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <FaTimesCircle className="mr-1" />
            Ditolak
          </span>
        );
      default:
        return null;
    }
  };

  const getStatusMessage = (
    status: "pending" | "diterima" | "ditolak" | "selesai"
  ) => {
    switch (status) {
      case "pending":
        return "Reservasi Anda sedang menunggu konfirmasi dari kasir.";
      case "diterima":
        return "Reservasi Anda telah diterima. Silakan datang sesuai jadwal.";
      case "selesai":
        return "Layanan telah selesai. Terima kasih telah menggunakan layanan kami!";
      case "ditolak":
        return "Maaf, reservasi Anda ditolak. Silakan buat reservasi baru dengan waktu lain.";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <main className="flex-1 p-8 overflow-auto">
        <div className="mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Riwayat Reservasi Saya
            </h1>
            <p className="text-gray-600">
              Lihat semua riwayat reservasi dan status terkini
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total</p>
                  <p className="text-xl font-bold text-gray-900">
                    {totalHistory}
                  </p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FaCalendarAlt className="text-blue-600 text-lg" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Menunggu</p>
                  <p className="text-xl font-bold text-yellow-600">
                    {pendingCount}
                  </p>
                </div>
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <FaSpinner className="text-yellow-600 text-lg" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Diterima</p>
                  <p className="text-xl font-bold text-blue-600">
                    {acceptedCount}
                  </p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FaCheckCircle className="text-blue-600 text-lg" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Selesai</p>
                  <p className="text-xl font-bold text-green-600">
                    {completedCount}
                  </p>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <FaCheckCircle className="text-green-600 text-lg" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Ditolak</p>
                  <p className="text-xl font-bold text-red-600">
                    {rejectedCount}
                  </p>
                </div>
                <div className="p-2 bg-red-100 rounded-lg">
                  <FaTimesCircle className="text-red-600 text-lg" />
                </div>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center space-x-4">
              <FaFilter className="text-gray-400" />
              <span className="text-sm font-medium text-gray-700">
                Filter Status:
              </span>
              <div className="flex space-x-2">
                {[
                  { key: "all", label: "Semua" },
                  { key: "pending", label: "Menunggu" },
                  { key: "diterima", label: "Diterima" },
                  { key: "selesai", label: "Selesai" },
                  { key: "ditolak", label: "Ditolak" },
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() =>
                      setStatusFilter(filter.key as typeof statusFilter)
                    }
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      statusFilter === filter.key
                        ? "bg-[#FDFB03] text-black"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* History Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID Reservasi
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Layanan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Capster
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal & Waktu
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Harga
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredHistory.map((history) => (
                    <tr key={history.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {history.id}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatTime(history.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {history.layanan}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {history.capster}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(history.tanggal)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {history.waktu}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(history.layananHarga)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(history.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewDetail(history)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="Lihat Detail"
                        >
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredHistory.length === 0 && (
              <div className="text-center py-12">
                <FaCalendarAlt className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  Tidak ada riwayat
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Belum ada riwayat reservasi dengan filter yang dipilih.
                </p>
              </div>
            )}
          </div>

          {/* Detail Modal */}
          {selectedHistory && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-lg bg-white">
                <div className="mt-3">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Detail Reservasi #{selectedHistory.id}
                    </h3>
                    <button
                      className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                      onClick={() => setSelectedHistory(null)}
                    >
                      ×
                    </button>
                  </div>

                  {/* Status Info */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        Status Saat Ini:
                      </span>
                      {getStatusBadge(selectedHistory.status)}
                    </div>
                    <p className="text-sm text-gray-700">
                      {getStatusMessage(selectedHistory.status)}
                    </p>
                  </div>

                  {/* Modal Content */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column - Service & Schedule Info */}
                    <div className="space-y-6">
                      {/* Service Information */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <FaCut className="mr-2 text-[#FDFB03]" />
                          Informasi Layanan
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-start text-sm">
                            <span className="font-medium text-gray-700 w-20">
                              Layanan:
                            </span>
                            <span className="text-gray-900">
                              {selectedHistory.layanan}
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="font-medium text-gray-700 w-20">
                              Capster:
                            </span>
                            <span className="text-gray-900">
                              {selectedHistory.capster}
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="font-medium text-gray-700 w-20">
                              Harga:
                            </span>
                            <span className="text-gray-900 font-semibold">
                              {formatCurrency(selectedHistory.layananHarga)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Schedule Information */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <FaCalendarAlt className="mr-2 text-[#FDFB03]" />
                          Jadwal Reservasi
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <span className="font-medium text-gray-700 w-20">
                              Tanggal:
                            </span>
                            <span className="text-gray-900">
                              {formatDate(selectedHistory.tanggal)}
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="font-medium text-gray-700 w-20">
                              Waktu:
                            </span>
                            <span className="text-gray-900">
                              {selectedHistory.waktu}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Processing Info */}
                    <div className="space-y-6">
                      {/* Processing Information */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <FaClock className="mr-2 text-[#FDFB03]" />
                          Informasi Pemrosesan
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <span className="font-medium text-gray-700 w-24">
                              Dibuat:
                            </span>
                            <span className="text-gray-900">
                              {formatDate(selectedHistory.createdAt)}{" "}
                              {formatTime(selectedHistory.createdAt)}
                            </span>
                          </div>
                          {selectedHistory.processedAt && (
                            <div className="flex items-center text-sm">
                              <span className="font-medium text-gray-700 w-24">
                                Diproses:
                              </span>
                              <span className="text-gray-900">
                                {formatDate(selectedHistory.processedAt)}{" "}
                                {formatTime(selectedHistory.processedAt)}
                              </span>
                            </div>
                          )}
                          {selectedHistory.processedBy && (
                            <div className="flex items-center text-sm">
                              <span className="font-medium text-gray-700 w-24">
                                Oleh:
                              </span>
                              <span className="text-gray-900">
                                {selectedHistory.processedBy}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Notes */}
                      {selectedHistory.catatan && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                            <FaStickyNote className="mr-2 text-[#FDFB03]" />
                            Catatan
                          </h4>
                          <p className="text-gray-700 text-sm">
                            {selectedHistory.catatan}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
                    <button
                      onClick={() => setSelectedHistory(null)}
                      className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
