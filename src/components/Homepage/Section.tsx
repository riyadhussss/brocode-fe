import Image from "next/image";

export default function Section() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white py-20 relative">
      {/* Overlay untuk meningkatkan kontras teks */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Div pertama - Logo */}
        <div className="mb-8">
          <Image
            src="/assets/logo.png"
            alt="Brocode Aceh Barbershop Logo"
            width={300}
            height={300}
            className="object-contain"
          />
        </div>

        {/* Div kedua - H1 */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-6xl font-bold text-[#FDFB03] text-center">
            #ENAKINKEPALA
          </h1>
        </div>

        {/* Div ketiga - Paragraph */}
        <div className="max-w-2xl text-center">
          <p className="text-lg md:text-xl text-white ">
            Percayakan pangkas kepala Anda kepada kami. Dengan pengalaman
            bertahun-tahun dan tangan terampil, kami siap memberikan pelayanan
            terbaik untuk penampilan yang lebih fresh dan percaya diri.
          </p>
        </div>

        <button className="px-8 py-4  bg-[#FDFB03] text-black rounded-lg hover:border-black hover:border-2 font-semibold cursor-pointer mt-8 transition- duration-100">
          BOOKING SEKARANG
        </button>
      </div>
    </div>
  );
}
