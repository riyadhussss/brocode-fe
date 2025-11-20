"use client";

import { useEffect, useState } from "react";
import { Package } from "@/app/lib/types/package";
import { packageService } from "@/app/lib/services/package.service";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { getErrorMessage } from "@/app/lib/getErrorMessage";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Layanan() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % packages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + packages.length) % packages.length);
  };

  return (
    <div
      id="layanan"
      className="min-h-[50vh] sm:min-h-[70vh] lg:min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#2b2b2b] to-[#1a1a1a] py-6 sm:py-10 md:py-16 px-4 sm:px-6 flex items-center"
    >
      <div className="container mx-auto w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#FDFB03] to-[#FFD700] mb-2 sm:mb-3 md:mb-4 font-montserrat">
          LAYANAN KAMI
        </h1>
        <p className="text-center text-white mb-6 sm:mb-10 md:mb-12 font-montserrat text-sm sm:text-base">
          Pilih layanan terbaik untuk penampilan sempurna Anda
        </p>

        {isLoading ? (
          <>
            {/* Skeleton untuk mobile/tablet */}
            <div className="lg:hidden max-w-md mx-auto">
              <Card className="bg-[#1f1f1f] border border-[#3a3a3a]">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-2 sm:gap-3">
                    <Skeleton className="h-6 sm:h-7 w-32 sm:w-40 bg-[#3a3a3a]" />
                    <Skeleton className="h-7 sm:h-8 w-24 sm:w-28 bg-[#3a3a3a]" />
                  </div>
                  <Skeleton className="h-4 sm:h-5 w-full bg-[#3a3a3a] mb-2" />
                  <Skeleton className="h-4 sm:h-5 w-3/4 bg-[#3a3a3a]" />
                </CardContent>
              </Card>
              <div className="flex justify-center gap-2 mt-4 sm:mt-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full ${
                      i === 1 ? "w-8 bg-[#FDFB03]" : "w-2 bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>
            {/* Skeleton untuk desktop */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
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
          </>
        ) : (
          <>
            {/* Slider untuk mobile/tablet (sm dan md) */}
            <div className="lg:hidden relative max-w-md mx-auto px-8 sm:px-10">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {packages.map((pkg) => (
                    <div key={pkg._id} className="w-full flex-shrink-0 px-2">
                      <Card className="bg-[#1f1f1f] border-l-4 border-l-[#FDFB03] border-y border-r border-[#3a3a3a] hover:border-[#FDFB03] transition-all duration-300 hover:shadow-lg hover:shadow-[#FDFB03]/10">
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-2 sm:gap-3">
                            <h3 className="text-xl sm:text-2xl font-bold text-white font-montserrat">
                              {pkg.name}
                            </h3>
                            <div className="bg-[#FDFB03] px-3 py-1.5 sm:px-4 sm:py-2 rounded-md">
                              <p className="text-black text-base sm:text-lg font-bold font-montserrat whitespace-nowrap">
                                Rp {pkg.price.toLocaleString("id-ID")}
                              </p>
                            </div>
                          </div>
                          <p className="text-white font-montserrat leading-relaxed text-sm sm:text-base">
                            {pkg.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation buttons */}
              <Button
                onClick={prevSlide}
                variant="ghost"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#FDFB03] hover:bg-[#FFD700] text-black rounded-full"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                onClick={nextSlide}
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#FDFB03] hover:bg-[#FFD700] text-black rounded-full"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Dots indicator */}
              <div className="flex justify-center gap-2 mt-4 sm:mt-6">
                {packages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "w-8 bg-[#FDFB03]"
                        : "w-2 bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Grid untuk desktop (lg ke atas) */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
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
          </>
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
