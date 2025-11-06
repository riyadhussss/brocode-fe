"use client";

import { useState } from "react";
import {
  FaEye,
  FaCheck,
  FaTimes,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaCut,
  FaPhone,
  FaEnvelope,
  FaMoneyBillWave,
} from "react-icons/fa";

// Interface untuk reservasi
interface Reservasi {
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
  status: "pending";
  catatan?: string;
  createdAt: string;
}

// Dummy data reservasi
const dummyReservations: Reservasi[] = [
  {
    id: "RSV-001",
    customer: {
      nama: "Ahmad Rizki",
      email: "ahmad.rizki@email.com",
      phone: "081234567890",
    },
    capster: "Budi Santoso",
    layanan: ["Haircut Premium", "Beard Trim"],
    tanggal: "2025-09-26",
    waktu: "09:00",
    totalHarga: 75000,
    status: "pending",
    catatan: "Ingin model rambut undercut",
    createdAt: "2025-09-25 08:30",
  },
  {
    id: "RSV-003",
    customer: {
      nama: "Chandra Wijaya",
      email: "chandra.wijaya@email.com",
      phone: "081234567892",
    },
    capster: "Doni Prakoso",
    layanan: ["Haircut Premium", "Hair Wash", "Styling"],
    tanggal: "2025-09-26",
    waktu: "11:00",
    totalHarga: 90000,
    status: "pending",
    catatan: "Mohon dikerjakan dengan hati-hati",
    createdAt: "2025-09-25 10:45",
  },
  {
    id: "RSV-006",
    customer: {
      nama: "Fajar Setiawan",
      email: "fajar.setiawan@email.com",
      phone: "081234567895",
    },
    capster: "Ahmad Rizki",
    layanan: ["Haircut Regular"],
    tanggal: "2025-09-26",
    waktu: "13:00",
    totalHarga: 50000,
    status: "pending",
    createdAt: "2025-09-25 13:15",
  },
  {
    id: "RSV-007",
    customer: {
      nama: "Gunawan Pratama",
      email: "gunawan.pratama@email.com",
      phone: "081234567896",
    },
    capster: "Chandra Wijaya",
    layanan: ["Kids Haircut", "Hair Wash"],
    tanggal: "2025-09-26",
    waktu: "15:00",
    totalHarga: 40000,
    status: "pending",
    catatan: "Anak umur 8 tahun",
    createdAt: "2025-09-25 14:30",
  },
];

export default function ManajemenReservasi() {
  const [reservations, setReservations] =
    useState<Reservasi[]>(dummyReservations);
  const [selectedReservation, setSelectedReservation] =
    useState<Reservasi | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // All reservations are pending, so no filtering needed
  const filteredReservations = reservations;

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

  // Get status color (only pending now)
  const getStatusColor = (status: string) => {
    return "bg-yellow-100 text-yellow-800 border-yellow-200";
  };

  // Handle view detail
  const handleViewDetail = (reservation: Reservasi) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  // Handle accept reservation
  const handleAcceptReservation = (id: string) => {
    // Remove from pending list (accepted reservations are handled elsewhere)
    setReservations((prev) => prev.filter((res) => res.id !== id));
    setIsModalOpen(false);
    alert("Reservasi berhasil diterima!");
  };

  // Handle reject reservation
  const handleRejectReservation = (id: string) => {
    // Remove from pending list (rejected reservations are handled elsewhere)
    setReservations((prev) => prev.filter((res) => res.id !== id));
    setIsModalOpen(false);
    alert("Reservasi berhasil ditolak!");
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReservation(null);
  };

  // Get counts for pending reservations
  const statusCounts = {
    all: reservations.length,
    pending: reservations.filter((r) => r.status === "pending").length,
  };

  return (
    <div className="h-full bg-gray-50 p-6 flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Manajemen Reservasi
        </h1>
        <p className="text-gray-600 text-sm">
          Kelola reservasi pelanggan dan ubah status pesanan
        </p>
      </div>

      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h3 className="text-3xl font-bold text-gray-900">
              {statusCounts.all}
            </h3>
            <p className="text-gray-600">Total Reservasi</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h3 className="text-3xl font-bold text-yellow-600">
              {statusCounts.pending}
            </h3>
            <p className="text-gray-600">Menunggu Konfirmasi</p>
          </div>
        </div>

        {/* Reservations Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Daftar Reservasi ({filteredReservations.length})
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID / Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Capster / Layanan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal / Waktu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Harga
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
                {filteredReservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {reservation.id}
                        </div>
                        <div className="text-sm text-gray-600">
                          {reservation.customer.nama}
                        </div>
                        <div className="text-xs text-gray-500">
                          {reservation.customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {reservation.capster}
                        </div>
                        <div className="text-sm text-gray-600">
                          {reservation.layanan.slice(0, 2).join(", ")}
                          {reservation.layanan.length > 2 && "..."}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm text-gray-900">
                          {formatDate(reservation.tanggal)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {reservation.waktu}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {formatCurrency(reservation.totalHarga)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                          reservation.status
                        )}`}
                      >
                        {reservation.status.charAt(0).toUpperCase() +
                          reservation.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewDetail(reservation)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        <FaEye className="inline mr-1" />
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredReservations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Tidak ada reservasi yang sesuai dengan filter
              </p>
            </div>
          )}
        </div>

        {/* Modal Detail Reservasi */}
        {isModalOpen && selectedReservation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">
                    Detail Reservasi - {selectedReservation.id}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="px-6 py-6 space-y-6">
                {/* Customer Info */}
                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <FaUser className="mr-2 text-[#FDFB03]" />
                    Informasi Pelanggan
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Nama:
                      </label>
                      <p className="text-gray-900">
                        {selectedReservation.customer.nama}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        <FaPhone className="inline mr-1" />
                        Telepon:
                      </label>
                      <p className="text-gray-900">
                        {selectedReservation.customer.phone}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-600">
                        <FaEnvelope className="inline mr-1" />
                        Email:
                      </label>
                      <p className="text-gray-900">
                        {selectedReservation.customer.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Service Info */}
                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <FaCut className="mr-2 text-[#FDFB03]" />
                    Detail Layanan
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Capster:
                      </label>
                      <p className="text-gray-900">
                        {selectedReservation.capster}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        <FaMoneyBillWave className="inline mr-1" />
                        Total Harga:
                      </label>
                      <p className="text-gray-900 font-semibold">
                        {formatCurrency(selectedReservation.totalHarga)}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-600">
                        Layanan:
                      </label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedReservation.layanan.map((layanan, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {layanan}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Schedule Info */}
                <div className="border rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <FaCalendarAlt className="mr-2 text-[#FDFB03]" />
                    Jadwal Reservasi
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Tanggal:
                      </label>
                      <p className="text-gray-900">
                        {formatDate(selectedReservation.tanggal)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        <FaClock className="inline mr-1" />
                        Waktu:
                      </label>
                      <p className="text-gray-900">
                        {selectedReservation.waktu}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-600">
                        Status:
                      </label>
                      <span
                        className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ml-2 ${getStatusColor(
                          selectedReservation.status
                        )}`}
                      >
                        {selectedReservation.status.charAt(0).toUpperCase() +
                          selectedReservation.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {selectedReservation.catatan && (
                  <div className="border rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      Catatan:
                    </h4>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded">
                      {selectedReservation.catatan}
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() =>
                      handleRejectReservation(selectedReservation.id)
                    }
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <FaTimes />
                    <span>Tolak</span>
                  </button>
                  <button
                    onClick={() =>
                      handleAcceptReservation(selectedReservation.id)
                    }
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <FaCheck />
                    <span>Terima</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
