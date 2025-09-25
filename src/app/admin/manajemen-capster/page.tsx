"use client";

import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

// Dummy data untuk capster
const dummyCapsters = [
  { id: 1, nama: "Ahmad Rizki" },
  { id: 2, nama: "Budi Santoso" },
  { id: 3, nama: "Chandra Wijaya" },
  { id: 4, nama: "Doni Prakoso" },
];

export default function ManajemenCapster() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [capsters, setCapsters] = useState(dummyCapsters);

  const handleTambah = () => {
    console.log("Tambah capster");
    // TODO: Implement tambah capster functionality
  };

  const handleEdit = (id: number) => {
    console.log("Edit capster dengan ID:", id);
    // TODO: Implement edit capster functionality
  };

  const handleDelete = (id: number) => {
    console.log("Delete capster dengan ID:", id);
    // TODO: Implement delete capster functionality
    if (confirm("Apakah Anda yakin ingin menghapus capster ini?")) {
      setCapsters(capsters.filter((capster) => capster.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <main className="flex-1 p-8 overflow-auto">
        <div className=" mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Manajemen Capster
            </h1>
            <p className="text-gray-600">
              Kelola data dan informasi capster Brocode Barbershop
            </p>
          </div>

          {/* Button Tambah */}
          <div className="mb-6">
            <button
              onClick={handleTambah}
              className="bg-[#FDFB03] hover:bg-yellow-400 text-black font-medium px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 shadow-sm"
            >
              <FaPlus size={16} />
              <span>Tambah Capster</span>
            </button>
          </div>

          {/* Tabel Capster */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      No
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Nama Capster
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {capsters.map((capster, index) => (
                    <tr
                      key={capster.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {capster.nama}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center space-x-3">
                          <button
                            onClick={() => handleEdit(capster.id)}
                            className="text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-lg hover:bg-blue-50"
                            title="Edit Capster"
                          >
                            <FaEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(capster.id)}
                            className="text-red-600 hover:text-red-800 transition-colors p-2 rounded-lg hover:bg-red-50"
                            title="Delete Capster"
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
            {capsters.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">
                  Tidak ada data capster
                </p>
                <button
                  onClick={handleTambah}
                  className="bg-[#FDFB03] hover:bg-yellow-400 text-black font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center space-x-2"
                >
                  <FaPlus size={16} />
                  <span>Tambah Capster Pertama</span>
                </button>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="mt-6 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Capster</p>
                <p className="text-2xl font-bold text-gray-900">
                  {capsters.length}
                </p>
              </div>
              <div className="text-[#FDFB03]">
                <FaEdit size={32} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
