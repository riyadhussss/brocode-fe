"use client";

import { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaCut } from "react-icons/fa";

// Interface untuk layanan
interface Layanan {
  id: number;
  nama: string;
  harga: number;
  deskripsi: string;
}

// Dummy data untuk layanan
const dummyLayanans: Layanan[] = [
  {
    id: 1,
    nama: "Potong Rambut Reguler",
    harga: 25000,
    deskripsi: "Potongan rambut standar dengan styling sederhana",
  },
  {
    id: 2,
    nama: "Potong Rambut + Cuci",
    harga: 35000,
    deskripsi: "Potongan rambut dengan cuci rambut menggunakan shampo",
  },
  {
    id: 3,
    nama: "Potong Rambut Premium",
    harga: 50000,
    deskripsi: "Potongan rambut dengan styling premium dan treatment rambut",
  },
  {
    id: 4,
    nama: "Cukur Jenggot",
    harga: 15000,
    deskripsi: "Cukur jenggot dan kumis dengan pisau cukur tradisional",
  },
];

export default function ManajemenLayanan() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [layanans, setLayanans] = useState<Layanan[]>(dummyLayanans);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleTambah = () => {
    console.log("Tambah layanan");
    // TODO: Implement tambah layanan functionality
  };

  const handleEdit = (id: number) => {
    console.log("Edit layanan dengan ID:", id);
    // TODO: Implement edit layanan functionality
  };

  const handleDelete = (id: number) => {
    console.log("Delete layanan dengan ID:", id);
    // TODO: Implement delete layanan functionality
    if (confirm("Apakah Anda yakin ingin menghapus layanan ini?")) {
      setLayanans(layanans.filter((layanan) => layanan.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">

      <main className="flex-1 p-8 overflow-auto">
        <div className="mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Manajemen Layanan
            </h1>
            <p className="text-gray-600">
              Kelola layanan dan paket Brocode Barbershop
            </p>
          </div>

          {/* Button Tambah */}
          <div className="mb-6">
            <button
              onClick={handleTambah}
              className="bg-[#FDFB03] hover:bg-yellow-400 text-black font-medium px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 shadow-sm"
            >
              <FaPlus size={16} />
              <span>Tambah Layanan</span>
            </button>
          </div>

          {/* Tabel Layanan */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      No
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Nama Layanan
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Harga
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Deskripsi
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {layanans.map((layanan, index) => (
                    <tr
                      key={layanan.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {layanan.nama}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-green-600">
                        {formatCurrency(layanan.harga)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                        <div className="truncate" title={layanan.deskripsi}>
                          {layanan.deskripsi}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center space-x-3">
                          <button
                            onClick={() => handleEdit(layanan.id)}
                            className="text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-lg hover:bg-blue-50"
                            title="Edit Layanan"
                          >
                            <FaEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(layanan.id)}
                            className="text-red-600 hover:text-red-800 transition-colors p-2 rounded-lg hover:bg-red-50"
                            title="Delete Layanan"
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
            {layanans.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">
                  Tidak ada data layanan
                </p>
                <button
                  onClick={handleTambah}
                  className="bg-[#FDFB03] hover:bg-yellow-400 text-black font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center space-x-2"
                >
                  <FaPlus size={16} />
                  <span>Tambah Layanan Pertama</span>
                </button>
              </div>
            )}
          </div>

          {/* Summary Cards */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Layanan */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Layanan</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {layanans.length}
                  </p>
                </div>
                <div className="text-[#FDFB03]">
                  <FaCut size={32} />
                </div>
              </div>
            </div>

            {/* Harga Terendah */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Harga Terendah</p>
                  <p className="text-xl font-bold text-green-600">
                    {layanans.length > 0
                      ? formatCurrency(
                          Math.min(...layanans.map((l) => l.harga))
                        )
                      : "Rp 0"}
                  </p>
                </div>
                <div className="text-green-500">
                  <FaCut size={32} />
                </div>
              </div>
            </div>

            {/* Harga Tertinggi */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Harga Tertinggi</p>
                  <p className="text-xl font-bold text-blue-600">
                    {layanans.length > 0
                      ? formatCurrency(
                          Math.max(...layanans.map((l) => l.harga))
                        )
                      : "Rp 0"}
                  </p>
                </div>
                <div className="text-blue-500">
                  <FaCut size={32} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
