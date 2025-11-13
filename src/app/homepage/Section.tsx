import Image from "next/image";
import { Button } from "../../components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomeSection() {
  return (
    <div
      id="homesection"
      className="flex flex-col items-center justify-center min-h-screen bg-[url('/assets/Homepage/1.png')] bg-cover bg-center bg-no-repeat text-white py-20 relative"
    >
      {/* Backdrop blur overlay */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 lg:px-8">
        {/* Div pertama - Logo */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <Image
            src="/assets/logo.png"
            alt="Brocode Aceh Barbershop Logo"
            width={200}
            height={200}
            className="object-contain w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 xl:w-64 xl:h-64"
            priority
          />
        </div>

        {/* Div kedua - H1 */}
        <div className="mb-6 sm:mb-8">
          <h1
            id="EnakinKepala"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#FDFB03] text-center tracking-wide drop-shadow-lg"
          >
            {" "}
            #ENAKINKEPALA
          </h1>
        </div>

        {/* Div ketiga - Paragraph */}
        <div className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl text-center mb-8 sm:mb-10">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white leading-relaxed drop-shadow-md font-normal">
            Percayakan pangkas kepala Anda kepada kami. Dengan pengalaman
            bertahun-tahun dan tangan terampil, kami siap memberikan pelayanan
            terbaik untuk penampilan yang lebih fresh dan percaya diri.
          </p>
        </div>

        {/* Button */}
        <div className="w-full max-w-xs sm:max-w-sm">
          <div className="flex justify-center w-full">
            <Button
              asChild
              variant="yellow"
              size="lg"
              className="mx-auto w-full"
            >
              <Link href="/login">
                Booking Sekarang <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
