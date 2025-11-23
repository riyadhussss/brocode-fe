import React from "react";
import { Package } from "@/app/lib/types/package";
import { Skeleton } from "@/components/ui/skeleton";

interface Step2Props {
  packages: Package[];
  selectedPackage: string;
  isLoadingPackages: boolean;
  onPackageSelect: (packageId: string) => void;
}

export default function Step2PackageSelection({
  packages,
  selectedPackage,
  isLoadingPackages,
  onPackageSelect,
}: Step2Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Pilih Layanan</h2>

      {isLoadingPackages ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-5 w-1/4" />
              </div>
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              onClick={() => onPackageSelect(pkg._id)}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg ${
                selectedPackage === pkg._id
                  ? "border-[#FDFB03] bg-[#FDFB03]/10"
                  : "border-gray-200 hover:border-[#FDFB03]/50"
              }`}
            >
              {/* Header: Nama Paket dan Harga */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <h3 className="font-bold text-base leading-tight">
                  {pkg.name}
                </h3>
                <p className="text-base font-bold text-black text-right">
                  Rp {pkg.price.toLocaleString("id-ID")}
                </p>
              </div>

              {/* Deskripsi */}
              <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                {pkg.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {!isLoadingPackages && packages.length === 0 && (
        <p className="text-center text-gray-500">
          Tidak ada paket layanan tersedia
        </p>
      )}
    </div>
  );
}
