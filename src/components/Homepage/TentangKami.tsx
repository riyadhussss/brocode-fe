import Image from "next/image";

export default function TentangKami() {
  return (
    <div
      id="tentang-kami"
      className="relative min-h-[90vh] flex items-center px-6 bg-[url('/assets/Homepage/2.png')] bg-cover bg-center bg-no-repeat "
    >
      <div className="absolute inset-0 bg-black/76 backdrop-blur-sm"></div>
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Div Kiri - Tentang Kami */}
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-6 text-[#FDFB03] font-montserrat">
              Tentang Kami
            </h1>
            <p className="text-lg leading-relaxed font-montserrat">
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
          <div className="flex justify-center lg:justify-end">
            <Image
              src={"/assets/logo.png"}
              alt="Logo Brocode Aceh"
              width={300}
              height={120}
              className="filter drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
