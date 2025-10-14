import Image from "next/image";
import Link from "next/link";
import { FaHome, FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Logo Brocode */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/assets/logo.png"
            alt="Brocode Logo"
            width={250}
            height={250}
            className="object-contain"
          />
        </div>

        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-[#FDFB03] mb-4 animate-pulse">
            404
          </h1>
          <h2 className="text-2xl font-bold text-white mb-2">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman
            telah dipindahkan atau tidak pernah ada.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-8">
          <Link href="/">
            <button className="w-full bg-[#FDFB03] hover:bg-yellow-400 text-black font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-lg">
              <FaHome size={20} />
              <span>Kembali ke Beranda</span>
            </button>
          </Link>
        </div>

        {/* Footer Text */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-gray-500 text-sm">Brocode Aceh Barbershop</p>
          <p className="text-gray-600 text-xs mt-1">
            Jika masalah berlanjut, silakan hubungi administrator
          </p>
        </div>
      </div>
    </div>
  );
}
