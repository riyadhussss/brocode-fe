"use client";

import { useEffect, useState } from "react";
import { Package } from "@/app/lib/types/package";
import { packageService } from "@/app/lib/services/package.service";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { getErrorMessage } from "@/app/lib/getErrorMessage";

export default function Layanan() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchActivePackages();
  }, []);

  const fetchActivePackages = async () => {
    setIsLoading(true);
    try {
      const response = await packageService.getActivePackages();
      if (response.success && response.data) {
        setPackages(response.data);
      } else {
        toast.error("Gagal memuat paket layanan");
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="layanan"
      className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#2b2b2b] to-[#1a1a1a] py-16 px-6"
    >
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#FDFB03] to-[#FFD700] mb-4 font-montserrat">
          LAYANAN KAMI
        </h1>
        <p className="text-center text-gray-400 mb-12 font-montserrat">
          Pilih layanan terbaik untuk penampilan sempurna Anda
        </p>

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="bg-[#1f1f1f] border border-[#3a3a3a]">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <Skeleton className="h-7 w-40 bg-[#3a3a3a]" />
                    <Skeleton className="h-8 w-28 bg-[#3a3a3a]" />
                  </div>
                  <Skeleton className="h-5 w-full bg-[#3a3a3a] mb-2" />
                  <Skeleton className="h-5 w-3/4 bg-[#3a3a3a]" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {packages.map((pkg) => (
              <Card
                key={pkg._id}
                className="bg-[#1f1f1f] border-l-4 border-l-[#FDFB03] border-y border-r border-[#3a3a3a] hover:border-[#FDFB03] transition-all duration-300 hover:shadow-lg hover:shadow-[#FDFB03]/10"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-white font-montserrat">
                      {pkg.name}
                    </h3>

                    <div className="bg-[#FDFB03] px-4 py-2 rounded-md">
                      <p className="text-black text-lg font-bold font-montserrat whitespace-nowrap">
                        Rp {pkg.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-400 font-montserrat leading-relaxed">
                    {pkg.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && packages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 font-montserrat text-lg">
              Tidak ada paket layanan tersedia saat ini
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
