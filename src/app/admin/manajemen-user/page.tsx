"use client";

import { useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaUsers,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

// Interface untuk user
interface User {
  id: number;
  nama: string;
  email: string;
  noHp: string;
  password: string;
}

// Dummy data untuk user
const dummyUsers: User[] = [
  {
    id: 1,
    nama: "John Doe",
    email: "john.doe@gmail.com",
    noHp: "081234567890",
    password: "password123",
  },
  {
    id: 2,
    nama: "Jane Smith",
    email: "jane.smith@yahoo.com",
    noHp: "081298765432",
    password: "mypassword",
  },
  {
    id: 3,
    nama: "Robert Johnson",
    email: "robert.j@outlook.com",
    noHp: "081356789012",
    password: "securepass",
  },
  {
    id: 4,
    nama: "Maria Garcia",
    email: "maria.garcia@gmail.com",
    noHp: "081445678901",
    password: "maria2024",
  },
];

export default function ManajemenUser() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [users, setUsers] = useState<User[]>(dummyUsers);
  const [showPassword, setShowPassword] = useState<{ [key: number]: boolean }>(
    {}
  );

  const togglePasswordVisibility = (userId: number) => {
    setShowPassword((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const handleTambah = () => {
    console.log("Tambah user");
    // TODO: Implement tambah user functionality
  };

  const handleEdit = (id: number) => {
    console.log("Edit user dengan ID:", id);
    // TODO: Implement edit user functionality
  };

  const handleDelete = (id: number) => {
    console.log("Delete user dengan ID:", id);
    // TODO: Implement delete user functionality
    if (confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <main className="flex-1 p-8 overflow-auto">
        <div className="mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Manajemen User
            </h1>
            <p className="text-gray-600">
              Kelola data pengguna Brocode Barbershop
            </p>
          </div>

          {/* Button Tambah */}
          <div className="mb-6">
            <button
              onClick={handleTambah}
              className="bg-[#FDFB03] hover:bg-yellow-400 text-black font-medium px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 shadow-sm"
            >
              <FaPlus size={16} />
              <span>Tambah User</span>
            </button>
          </div>

          {/* Tabel User */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      No
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Nama
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      No HP
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Password
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {user.nama}
                      </td>
                      <td className="px-6 py-4 text-sm text-blue-600">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {user.noHp}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono">
                            {showPassword[user.id] ? user.password : "••••••••"}
                          </span>
                          <button
                            onClick={() => togglePasswordVisibility(user.id)}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                            title={
                              showPassword[user.id]
                                ? "Hide Password"
                                : "Show Password"
                            }
                          >
                            {showPassword[user.id] ? (
                              <FaEyeSlash size={14} />
                            ) : (
                              <FaEye size={14} />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center space-x-3">
                          <button
                            onClick={() => handleEdit(user.id)}
                            className="text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-lg hover:bg-blue-50"
                            title="Edit User"
                          >
                            <FaEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 hover:text-red-800 transition-colors p-2 rounded-lg hover:bg-red-50"
                            title="Delete User"
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
            {users.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">
                  Tidak ada data user
                </p>
                <button
                  onClick={handleTambah}
                  className="bg-[#FDFB03] hover:bg-yellow-400 text-black font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center space-x-2"
                >
                  <FaPlus size={16} />
                  <span>Tambah User Pertama</span>
                </button>
              </div>
            )}
          </div>

          {/* Summary Cards */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total User */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total User</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {users.length}
                  </p>
                </div>
                <div className="text-[#FDFB03]">
                  <FaUsers size={32} />
                </div>
              </div>
            </div>

            {/* User with Gmail */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Email Gmail</p>
                  <p className="text-xl font-bold text-blue-600">
                    {
                      users.filter((user) => user.email.includes("@gmail.com"))
                        .length
                    }
                  </p>
                </div>
                <div className="text-blue-500">
                  <FaUsers size={32} />
                </div>
              </div>
            </div>

            {/* User with Strong Password */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Password 8+ Karakter</p>
                  <p className="text-xl font-bold text-green-600">
                    {users.filter((user) => user.password.length >= 8).length}
                  </p>
                </div>
                <div className="text-green-500">
                  <FaUsers size={32} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
