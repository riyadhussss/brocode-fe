import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

export default function ReservationSuccess() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <FaCheckCircle className="text-6xl text-green-500 mx-auto" />
        </div>

        <h2 className="text-2xl font-bold mb-4">Reservasi Berhasil!</h2>

        <p className="text-gray-600 mb-6">
          Reservasi Anda telah berhasil dibuat. Silakan datang sesuai jadwal
          yang telah Anda pilih.
        </p>

        <div className="space-y-3">
          <Link
            href="/user/riwayat-reservasi"
            className="block w-full bg-[#FDFB03] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#FDFB03]/80 transition-colors"
          >
            Lihat Riwayat Reservasi
          </Link>

          <Link
            href="/user/reservasi"
            className="block w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Buat Reservasi Baru
          </Link>
        </div>
      </div>
    </div>
  );
}
