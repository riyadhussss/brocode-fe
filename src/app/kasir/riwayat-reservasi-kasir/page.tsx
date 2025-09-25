"use client";

import { useState } from "react";
import {
  FaEye,
  FaTrash,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaCut,
  FaPhone,
  FaEnvelope,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaFilter,
} from "react-icons/fa";

// Interface untuk riwayat reservasi
interface RiwayatReservasi {
  id: string;
  customer: {
    nama: string;
    email: string;
    phone: string;
  };
  capster: string;
  layanan: string[];
  tanggal: string;
  waktu: string;
  totalHarga: number;
  status: "diterima" | "ditolak";
  catatan?: string;
  createdAt: string;
  processedAt: string;
  processedBy: string;
}

// Current kasir (simulasi login kasir)
const currentKasir = "Kasir 1";

// Dummy data riwayat reservasi
const dummyHistory: RiwayatReservasi[] = [
  {
    id: "HST-001",
    customer: {
      nama: "Dedi Kurniawan",
      email: "dedi.kurniawan@email.com",
      phone: "081234567895",
    },
    capster: "Andi Wijaya",
    layanan: ["Haircut Premium", "Hair Wash"],
    tanggal: "2025-09-24",
    waktu: "10:00",
    totalHarga: 60000,
    status: "diterima",
    catatan: "Model rambut fade",
    createdAt: "2025-09-23T08:30:00",
    processedAt: "2025-09-23T09:15:00",
    processedBy: "Kasir 1",
  },
  {
    id: "HST-002",
    customer: {
      nama: "Eko Prasetyo",
      email: "eko.prasetyo@email.com",
      phone: "081234567896",
    },
    capster: "Budi Santoso",
    layanan: ["Haircut Regular"],
    tanggal: "2025-09-24",
    waktu: "14:00",
    totalHarga: 35000,
    status: "diterima",
    catatan: "Customer puas dengan layanan",
    createdAt: "2025-09-23T10:00:00",
    processedAt: "2025-09-23T10:30:00",
    processedBy: "Kasir 1",
  },
  {
    id: "HST-003",
    customer: {
      nama: "Fajar Nugraha",
      email: "fajar.nugraha@email.com",
      phone: "081234567897",
    },
    capster: "Charlie Rahman",
    layanan: ["Haircut Premium", "Beard Trim", "Hair Styling"],
    tanggal: "2025-09-23",
    waktu: "16:00",
    totalHarga: 95000,
    status: "diterima",
    catatan: "Kombinasi model klasik dan modern",
    createdAt: "2025-09-22T14:20:00",
    processedAt: "2025-09-22T15:00:00",
    processedBy: "Kasir 2",
  },
  {
    id: "HST-004",
    customer: {
      nama: "Gilang Ramadhan",
      email: "gilang.ramadhan@email.com",
      phone: "081234567898",
    },
    capster: "David Hakim",
    layanan: ["Hair Wash", "Styling"],
    tanggal: "2025-09-23",
    waktu: "11:00",
    totalHarga: 40000,
    status: "ditolak",
    catatan: "Customer membatalkan",
    createdAt: "2025-09-22T16:30:00",
    processedAt: "2025-09-22T17:00:00",
    processedBy: "Kasir 3",
  },
  {
    id: "HST-005",
    customer: {
      nama: "Hendra Gunawan",
      email: "hendra.gunawan@email.com",
      phone: "081234567899",
    },
    capster: "Andi Wijaya",
    layanan: ["Haircut Premium", "Beard Trim", "Face Treatment"],
    tanggal: "2025-09-22",
    waktu: "15:30",
    totalHarga: 120000,
    status: "diterima",
    catatan: "Paket lengkap grooming",
    createdAt: "2025-09-21T11:45:00",
    processedAt: "2025-09-21T12:30:00",
    processedBy: "Kasir 2",
  },
  {
    id: "HST-006",
    customer: {
      nama: "Indra Pratama",
      email: "indra.pratama@email.com",
      phone: "081234567800",
    },
    capster: "Budi Santoso",
    layanan: ["Haircut Regular", "Hair Wash"],
    tanggal: "2025-09-21",
    waktu: "13:00",
    totalHarga: 50000,
    status: "diterima",
    catatan: "Pelayanan memuaskan",
    createdAt: "2025-09-20T09:15:00",
    processedAt: "2025-09-20T10:00:00",
    processedBy: "Kasir 1",
  },
  {
    id: "HST-007",
    customer: {
      nama: "Joko Widodo",
      email: "joko.widodo@email.com",
      phone: "081234567801",
    },
    capster: "Charlie Rahman",
    layanan: ["Haircut Premium", "Beard Trim"],
    tanggal: "2025-09-20",
    waktu: "09:30",
    totalHarga: 75000,
    status: "diterima",
    catatan: "Customer reguler",
    createdAt: "2025-09-19T14:20:00",
    processedAt: "2025-09-19T15:00:00",
    processedBy: "Kasir 1",
  },
  {
    id: "HST-008",
    customer: {
      nama: "Kevin Sanjaya",
      email: "kevin.sanjaya@email.com",
      phone: "081234567802",
    },
    capster: "David Hakim",
    layanan: ["Hair Wash", "Hair Styling"],
    tanggal: "2025-09-19",
    waktu: "16:00",
    totalHarga: 45000,
    status: "diterima",
    catatan: "Styling untuk acara khusus",
    createdAt: "2025-09-18T11:30:00",
    processedAt: "2025-09-18T12:00:00",
    processedBy: "Kasir 1",
  },
];

export default function RiwayatReservasiKasir() {
  // Filter data untuk kasir yang sedang login
  const myHistoryData = dummyHistory.filter(
    (item) => item.processedBy === currentKasir
  );
  const [historyData, setHistoryData] =
    useState<RiwayatReservasi[]>(myHistoryData);
  const [selectedHistory, setSelectedHistory] =
    useState<RiwayatReservasi | null>(null);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "diterima" | "ditolak"
  >("all");

  // Filter data berdasarkan status
  const filteredHistory = historyData.filter((item) => {
    if (statusFilter === "all") return true;
    return item.status === statusFilter;
  });

  // Statistik
  const totalHistory = historyData.length;
  const acceptedCount = historyData.filter(
    (item) => item.status === "diterima"
  ).length;
  const rejectedCount = historyData.filter(
    (item) => item.status === "ditolak"
  ).length;

  // Handle detail view
  const handleViewDetail = (history: RiwayatReservasi) => {
    setSelectedHistory(history);
  };

  // Handle remove history
  const handleRemoveHistory = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus riwayat ini?")) {
      setHistoryData(historyData.filter((item) => item.id !== id));
      if (selectedHistory && selectedHistory.id === id) {
        setSelectedHistory(null);
      }
    }
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

  const getStatusBadge = (status: "diterima" | "ditolak") => {
    if (status === "diterima") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          <FaCheckCircle className="mr-1" />
          Diterima
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
          <FaTimesCircle className="mr-1" />
          Ditolak
        </span>
      );
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
              Kelola riwayat reservasi yang telah saya proses ({currentKasir})
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Diproses Saya
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalHistory}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FaCalendarAlt className="text-blue-600 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Saya Terima
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {acceptedCount}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <FaCheckCircle className="text-green-600 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Saya Tolak
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    {rejectedCount}
                  </p>
                </div>
                <div className="p-3 bg-red-100 rounded-lg">
                  <FaTimesCircle className="text-red-600 text-xl" />
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
                <button
                  onClick={() => setStatusFilter("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    statusFilter === "all"
                      ? "bg-[#FDFB03] text-black"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setStatusFilter("diterima")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    statusFilter === "diterima"
                      ? "bg-[#FDFB03] text-black"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Diterima
                </button>
                <button
                  onClick={() => setStatusFilter("ditolak")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    statusFilter === "ditolak"
                      ? "bg-[#FDFB03] text-black"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Ditolak
                </button>
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
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Capster
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal & Waktu
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Diproses
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
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {history.customer.nama}
                        </div>
                        <div className="text-sm text-gray-500">
                          {history.customer.phone}
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
                          {formatCurrency(history.totalHarga)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(history.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatTime(history.processedAt)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {history.processedBy}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewDetail(history)}
                            className="text-blue-600 hover:text-blue-900 transition-colors"
                            title="Detail"
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={() => handleRemoveHistory(history.id)}
                            className="text-red-600 hover:text-red-900 transition-colors"
                            title="Hapus"
                          >
                            <FaTrash />
                          </button>
                        </div>
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
                  Belum ada riwayat reservasi yang saya proses dengan filter
                  yang dipilih.
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
                      Detail Riwayat Reservasi
                    </h3>
                    <button
                      className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                      onClick={() => setSelectedHistory(null)}
                    >
                      ×
                    </button>
                  </div>

                  {/* Modal Content */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column - Customer & Service Info */}
                    <div className="space-y-6">
                      {/* Customer Information */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <FaUser className="mr-2 text-[#FDFB03]" />
                          Informasi Customer
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <span className="font-medium text-gray-700 w-20">
                              Nama:
                            </span>
                            <span className="text-gray-900">
                              {selectedHistory.customer.nama}
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="font-medium text-gray-700 w-20">
                              Email:
                            </span>
                            <span className="text-gray-900">
                              {selectedHistory.customer.email}
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="font-medium text-gray-700 w-20">
                              Telepon:
                            </span>
                            <span className="text-gray-900">
                              {selectedHistory.customer.phone}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Service Information */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <FaCut className="mr-2 text-[#FDFB03]" />
                          Informasi Layanan
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-start text-sm">
                            <span className="font-medium text-gray-700 w-20">
                              Capster:
                            </span>
                            <span className="text-gray-900">
                              {selectedHistory.capster}
                            </span>
                          </div>
                          <div className="flex items-start text-sm">
                            <span className="font-medium text-gray-700 w-20">
                              Layanan:
                            </span>
                            <div className="flex-1">
                              {selectedHistory.layanan.map((layanan, index) => (
                                <span
                                  key={index}
                                  className="inline-block bg-[#FDFB03] text-black text-xs px-2 py-1 rounded-full mr-1 mb-1"
                                >
                                  {layanan}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="font-medium text-gray-700 w-20">
                              Total:
                            </span>
                            <span className="text-gray-900 font-semibold">
                              {formatCurrency(selectedHistory.totalHarga)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Schedule & Status Info */}
                    <div className="space-y-6">
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
                          <div className="flex items-center text-sm">
                            <span className="font-medium text-gray-700 w-20">
                              Status:
                            </span>
                            {getStatusBadge(selectedHistory.status)}
                          </div>
                        </div>
                      </div>

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
                          <div className="flex items-center text-sm">
                            <span className="font-medium text-gray-700 w-24">
                              Diproses:
                            </span>
                            <span className="text-gray-900">
                              {formatDate(selectedHistory.processedAt)}{" "}
                              {formatTime(selectedHistory.processedAt)}
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="font-medium text-gray-700 w-24">
                              Oleh:
                            </span>
                            <span className="text-gray-900">
                              {selectedHistory.processedBy}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Notes */}
                      {selectedHistory.catatan && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">
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
                  <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between">
                    <button
                      onClick={() => handleRemoveHistory(selectedHistory.id)}
                      className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <FaTrash />
                      <span>Hapus Riwayat</span>
                    </button>
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
