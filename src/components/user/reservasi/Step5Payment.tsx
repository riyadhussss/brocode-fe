import React from "react";
import { Package } from "@/app/lib/types/package";

interface Step5Props {
  selectedPackage: Package | undefined;
  onSubmit: () => void;
}

export default function Step5Payment({
  selectedPackage,
  onSubmit,
}: Step5Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Pembayaran</h2>

      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg">Total Pembayaran:</span>
          <span className="text-2xl font-bold text-[#FDFB03]">
            Rp {selectedPackage?.price.toLocaleString("id-ID") || "0"}
          </span>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Silakan lakukan pembayaran di kasir pada saat kedatangan Anda.
          </p>

          <button
            onClick={onSubmit}
            className="w-full bg-[#FDFB03] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#FDFB03]/80 transition-colors"
          >
            Konfirmasi Reservasi
          </button>
        </div>
      </div>
    </div>
  );
}
