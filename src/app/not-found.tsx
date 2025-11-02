"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-3xl w-full text-center">
        {/* Logo Brocode */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <Image
            src="/assets/logo.png"
            alt="Brocode Logo"
            width={150}
            height={150}
            className="object-contain w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
            priority
          />
        </div>

        {/* 404 Text */}
        <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-[#FDFB03] tracking-tight">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white px-4">
            Halaman Tidak Ditemukan
          </h2>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-lg mx-auto px-4 mb-8 sm:mb-10 md:mb-12">
          Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman
          telah dipindahkan, dihapus, atau URL yang Anda masukkan salah.
        </p>

        {/* Action Button */}
        <div className="flex justify-center mb-12 sm:mb-16 md:mb-20 px-4">
          <Button onClick={() => router.back()} size="lg" variant={"yellow"}>
            <ArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Kembali ke Halaman Sebelumnya
          </Button>
        </div>

        {/* Footer */}
        <div className="px-4">
          <div className="space-y-1 sm:space-y-2">
            <p className="text-gray-400 text-xs sm:text-sm font-medium">
              Brocode Aceh Barbershop
            </p>
            <p className="text-gray-500 text-xs">
              Jika masalah berlanjut, silakan hubungi administrator
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
