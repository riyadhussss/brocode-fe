import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Step1Props {
  formData: {
    nama: string;
    nomorHP: string;
    email: string;
  };
  isBookingForSelf: boolean;
  isLoadingAuto: boolean;
  isSavingManualData: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBookingForSelfChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onManualInputBlur: () => void;
}

export default function Step1PersonalInfo({
  formData,
  isBookingForSelf,
  isLoadingAuto,
  isSavingManualData,
  onInputChange,
  onBookingForSelfChange,
  onManualInputBlur,
}: Step1Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Isi Data Diri</h2>

      {/* Checkbox Booking untuk diri sendiri */}
      <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
        <input
          type="checkbox"
          id="bookingForSelf"
          checked={isBookingForSelf}
          onChange={onBookingForSelfChange}
          className="w-4 h-4 accent-[#FDFB03]"
          disabled={isLoadingAuto}
        />
        <label htmlFor="bookingForSelf" className="text-sm font-medium">
          Booking untuk diri sendiri
        </label>
      </div>

      {/* Loading State */}
      {isLoadingAuto ? (
        <div className="space-y-4">
          <div>
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ) : (
        <>
          {/* Input Nama */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={onInputChange}
              onBlur={!isBookingForSelf ? onManualInputBlur : undefined}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDFB03]"
              placeholder="Masukkan nama lengkap"
              disabled={isBookingForSelf || isSavingManualData}
            />
          </div>

          {/* Input Nomor HP */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Nomor HP <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="nomorHP"
              value={formData.nomorHP}
              onChange={onInputChange}
              onBlur={!isBookingForSelf ? onManualInputBlur : undefined}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDFB03]"
              placeholder="Masukkan nomor HP"
              disabled={isBookingForSelf || isSavingManualData}
            />
          </div>

          {/* Input Email */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              onBlur={!isBookingForSelf ? onManualInputBlur : undefined}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDFB03]"
              placeholder="Masukkan email"
              disabled={isBookingForSelf || isSavingManualData}
            />
          </div>
        </>
      )}

      {isSavingManualData && (
        <p className="text-sm text-gray-500">Menyimpan data...</p>
      )}
    </div>
  );
}
