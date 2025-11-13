import Image from "next/image";

export default function TentangKami() {
  return (
    <div
      id="tentang-kami"
      className="relative min-h-[90vh] flex items-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-[url('/assets/Homepage/2.png')] bg-cover bg-center bg-no-repeat"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Div Kiri - Tentang Kami */}
          <div className="text-white max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-[#FDFB03] font-montserrat tracking-wide drop-shadow-lg">
              Tentang Kami
            </h1>

            <p className="text-sm sm:text-base md:text-lg leading-relaxed font-montserrat text-gray-100">
              Brocode Aceh Barbershop adalah destinasi terpercaya untuk
              perawatan rambut dan grooming pria di Aceh. Dengan pengalaman
              bertahun-tahun, kami berkomitmen memberikan pelayanan terbaik
              dengan standar profesional. Tim barber berpengalaman kami
              menggunakan teknik terkini dan peralatan berkualitas tinggi untuk
              memastikan setiap pelanggan mendapatkan hasil yang memuaskan. Kami
              tidak hanya memotong rambut, tetapi juga memberikan pengalaman
              yang nyaman dan atmosfer yang bersahabat. Di Brocode, kepuasan
              Anda adalah prioritas utama kami.
            </p>
          </div>

          {/* Div Kanan - Logo */}
          <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
            <Image
              src={"/assets/logo.png"}
              alt="Logo Brocode Aceh"
              width={340}
              height={140}
              className="filter drop-shadow-2xl w-48 sm:w-64 md:w-72 lg:w-[340px] h-auto transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
