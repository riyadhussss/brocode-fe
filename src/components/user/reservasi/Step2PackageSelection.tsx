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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border rounded-lg p-6">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-8 w-1/2 mb-3" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              onClick={() => onPackageSelect(pkg._id)}
              className={`border-2 rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg ${
                selectedPackage === pkg._id
                  ? "border-[#FDFB03] bg-[#FDFB03]/10"
                  : "border-gray-200 hover:border-[#FDFB03]/50"
              }`}
            >
              {/* Nama Paket */}
              <h3 className="font-bold text-xl mb-3">{pkg.name}</h3>

              {/* Harga dengan warna hitam dan lebih besar */}
              <p className="text-3xl font-bold text-black mb-4">
                Rp {pkg.price.toLocaleString("id-ID")}
              </p>

              {/* Deskripsi */}
              <p className="text-sm text-gray-600 leading-relaxed">
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