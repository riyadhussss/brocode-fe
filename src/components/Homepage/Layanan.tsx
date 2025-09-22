export default function Layanan() {
  return (
    <div className="min-h-screen bg-gray-100 py-16 px-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-black mb-12 font-montserrat">
          Layanan Kami
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Kolom Kiri */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FDFB03]">
              <h3 className="text-xl font-semibold text-black mb-2 font-montserrat">
                Paket Basic Cut
              </h3>
              <p className="text-[#FDFB03] text-2xl font-bold mb-3">
                Rp 25.000
              </p>
              <p className="text-gray-600 font-montserrat">
                Potong rambut dasar dengan styling sederhana
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FDFB03]">
              <h3 className="text-xl font-semibold text-black mb-2 font-montserrat">
                Paket Premium Cut
              </h3>
              <p className="text-[#FDFB03] text-2xl font-bold mb-3">
                Rp 35.000
              </p>
              <p className="text-gray-600 font-montserrat">
                Potong rambut dengan konsultasi styling dan finishing
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FDFB03]">
              <h3 className="text-xl font-semibold text-black mb-2 font-montserrat">
                Paket Wash & Cut
              </h3>
              <p className="text-[#FDFB03] text-2xl font-bold mb-3">
                Rp 40.000
              </p>
              <p className="text-gray-600 font-montserrat">
                Keramas + potong rambut + styling
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FDFB03]">
              <h3 className="text-xl font-semibold text-black mb-2 font-montserrat">
                Paket Beard Trim
              </h3>
              <p className="text-[#FDFB03] text-2xl font-bold mb-3">
                Rp 20.000
              </p>
              <p className="text-gray-600 font-montserrat">
                Perawatan dan rapikan jenggot profesional
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FDFB03]">
              <h3 className="text-xl font-semibold text-black mb-2 font-montserrat">
                Paket Hair Treatment
              </h3>
              <p className="text-[#FDFB03] text-2xl font-bold mb-3">
                Rp 50.000
              </p>
              <p className="text-gray-600 font-montserrat">
                Perawatan rambut dengan vitamin dan masker
              </p>
            </div>
          </div>

          {/* Kolom Kanan */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FDFB03]">
              <h3 className="text-xl font-semibold text-black mb-2 font-montserrat">
                Paket Deluxe Package
              </h3>
              <p className="text-[#FDFB03] text-2xl font-bold mb-3">
                Rp 75.000
              </p>
              <p className="text-gray-600 font-montserrat">
                Paket lengkap: potong + keramas + styling + beard trim
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FDFB03]">
              <h3 className="text-xl font-semibold text-black mb-2 font-montserrat">
                Paket Hair Coloring
              </h3>
              <p className="text-[#FDFB03] text-2xl font-bold mb-3">
                Rp 100.000
              </p>
              <p className="text-gray-600 font-montserrat">
                Pewarnaan rambut dengan cat berkualitas tinggi
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FDFB03]">
              <h3 className="text-xl font-semibold text-black mb-2 font-montserrat">
                Paket Wedding Package
              </h3>
              <p className="text-[#FDFB03] text-2xl font-bold mb-3">
                Rp 150.000
              </p>
              <p className="text-gray-600 font-montserrat">
                Paket khusus pengantin dengan styling premium
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FDFB03]">
              <h3 className="text-xl font-semibold text-black mb-2 font-montserrat">
                Paket Kids Cut
              </h3>
              <p className="text-[#FDFB03] text-2xl font-bold mb-3">
                Rp 20.000
              </p>
              <p className="text-gray-600 font-montserrat">
                Potong rambut khusus anak-anak dengan sabar dan telaten
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FDFB03]">
              <h3 className="text-xl font-semibold text-black mb-2 font-montserrat">
                Paket VIP Experience
              </h3>
              <p className="text-[#FDFB03] text-2xl font-bold mb-3">
                Rp 200.000
              </p>
              <p className="text-gray-600 font-montserrat">
                Pengalaman premium dengan layanan eksklusif dan privat
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
