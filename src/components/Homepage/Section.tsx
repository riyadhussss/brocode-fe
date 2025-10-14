import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function HomeSection() {
  return (
    <div
      id="homesection"
      className="flex flex-col items-center justify-center min-h-[90vh] bg-[url('/assets/Homepage/1.png')] bg-cover bg-center bg-no-repeat text-white py-20 relative"
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
            className="object-contain w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64"
            priority
          />
        </div>

        {/* Div kedua - H1 */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#FDFB03] text-center tracking-wide drop-shadow-lg">
            <div id="EnakinKepala"></div>
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
          {/* <button className="group relative inline-flex h-12 sm:h-14 w-full items-center justify-center overflow-hidden rounded-md bg-[#FDFB03] px-6 font-medium text-black cursor-pointer">
            <span>BOOKING SEKARANG</span>
            <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
              >
                <path
                  d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </button> */}
          <div className="flex justify-center w-full">
            <Button variant={"yellow"} size={"lg"} className="mx-auto w-full">
              Booking Sekarang <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
