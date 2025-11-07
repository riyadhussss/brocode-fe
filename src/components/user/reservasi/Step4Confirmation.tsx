import React from "react";
import { Package } from "@/app/lib/types/package";
import { Barber } from "@/app/lib/types/capster";

interface Step4Props {
  formData: {
    nama: string;
    nomorHP: string;
    email: string;
    capster: string;
    layanan: string;
    tanggal: string;
    waktu: string;
    catatan: string;
  };
  packages: Package[];
  capsters: Barber[];
  onCatatanChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Step4Confirmation({
  formData,
  packages,
  capsters,
  onCatatanChange,
}: Step4Props) {
  const selectedPackage = packages.find((pkg) => pkg._id === formData.layanan);
  const selectedCapster = capsters.find((cap) => cap._id === formData.capster);

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Konfirmasi Reservasi</h2>

      {/* Summary Box */}
      <div className="bg-gray-50 p-6 rounded-lg space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Nama</p>
            <p className="font-semibold">{formData.nama || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Nomor HP</p>
            <p className="font-semibold">{formData.nomorHP || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-semibold">{formData.email || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Layanan</p>
            <p className="font-semibold">{selectedPackage?.name || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Capster</p>
            <p className="font-semibold">{selectedCapster?.name || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Tanggal</p>
            <p className="font-semibold">{formatDate(formData.tanggal)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Waktu</p>
            <p className="font-semibold">{formData.waktu || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Harga</p>
            <p className="font-semibold text-[#FDFB03] text-xl">
              Rp {selectedPackage?.price.toLocaleString("id-ID") || "0"}
            </p>
          </div>
        </div>
      </div>

      {/* Catatan */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Catatan (Opsional)
        </label>
        <textarea
          name="catatan"
          value={formData.catatan}
          onChange={onCatatanChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDFB03]"
          placeholder="Tambahkan catatan jika ada"
          rows={4}
        />
      </div>
    </div>
  );
}
