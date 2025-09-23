export default function Layanan() {
  return (
    <div id="layanan" className="min-h-screen bg-[#2b2b2b] py-16 px-6  ">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#FDFB03] mb-12 font-montserrat">
          LAYANAN KAMI
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Kolom Kiri */}
          <div className="space-y-6">
            <div className="bg-black p-6 rounded-lg shadow-md border-l-4 border-[#FDFB03]">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-2xl font-semibold text-[#FDFB03] font-montserrat">
                  Haircut
                </h3>
                <p className="text-[#FDFB03] text-2xl font-bold">Rp 50.000</p>
              </div>
              <p className="text-white font-montserrat">
                Potong rambut saja dengan styling sederhana
              </p>
            </div>

            <div className="bg-black p-6 rounded-lg shadow-md border-l-4 border-[#FDFB03]">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-2xl font-semibold text-[#FDFB03] font-montserrat">
                  Paket Gentleman
                </h3>
                <p className="text-[#FDFB03] text-2xl font-bold">Rp 65.000</p>
              </div>
              <p className="text-white font-montserrat">
                Potong rambut + styling + cuci + scrub wajah
              </p>
            </div>

            <div className="bg-black p-6 rounded-lg shadow-md border-l-4 border-[#FDFB03]">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-2xl font-semibold text-[#FDFB03] font-montserrat">
                  Paket Wash & Cut
                </h3>
                <p className="text-[#FDFB03] text-2xl font-bold">Rp 40.000</p>
              </div>
              <p className="text-white font-montserrat">
                Keramas + potong rambut + styling
              </p>
            </div>

            <div className="bg-black p-6 rounded-lg shadow-md border-l-4 border-[#FDFB03]">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-2xl font-semibold text-[#FDFB03] font-montserrat">
                  Paket Beard Trim
                </h3>
                <p className="text-[#FDFB03] text-2xl font-bold">Rp 20.000</p>
              </div>
              <p className="text-white font-montserrat">
                Perawatan dan rapikan jenggot profesional
              </p>
            </div>

            <div className="bg-black p-6 rounded-lg shadow-md border-l-4 border-[#FDFB03]">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-2xl font-semibold text-[#FDFB03] font-montserrat">
                  Paket Hair Treatment
                </h3>
                <p className="text-[#FDFB03] text-2xl font-bold">Rp 50.000</p>
              </div>
              <p className="text-white font-montserrat">
                Perawatan rambut dengan vitamin dan masker
              </p>
            </div>
          </div>

          {/* Kolom Kanan */}
          <div className="space-y-6">
            <div className="bg-black p-6 rounded-lg shadow-md border-l-4 border-[#FDFB03]">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-2xl font-semibold text-[#FDFB03] font-montserrat">
                  Paket Classic
                </h3>
                <p className="text-[#FDFB03] text-2xl font-bold">Rp 60.000</p>
              </div>
              <p className="text-white font-montserrat">
                Potong rambut + keramas + styling
              </p>
            </div>

            <div className="bg-black p-6 rounded-lg shadow-md border-l-4 border-[#FDFB03]">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-2xl font-semibold text-[#FDFB03] font-montserrat">
                  Kids Haircut
                </h3>
                <p className="text-[#FDFB03] text-2xl font-bold">Rp 45.000</p>
              </div>
              <p className="text-white font-montserrat">
                Pangkas rambut saja untuk anak-anak
              </p>
            </div>

            <div className="bg-black p-6 rounded-lg shadow-md border-l-4 border-[#FDFB03]">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-2xl font-semibold text-[#FDFB03] font-montserrat">
                  Paket Wedding Package
                </h3>
                <p className="text-[#FDFB03] text-2xl font-bold">Rp 150.000</p>
              </div>
              <p className="text-white font-montserrat">
                Paket khusus pengantin dengan styling premium
              </p>
            </div>

            <div className="bg-black p-6 rounded-lg shadow-md border-l-4 border-[#FDFB03]">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-2xl font-semibold text-[#FDFB03] font-montserrat">
                  Paket Kids Cut
                </h3>
                <p className="text-[#FDFB03] text-2xl font-bold">Rp 20.000</p>
              </div>
              <p className="text-white font-montserrat">
                Potong rambut khusus anak-anak dengan sabar dan telaten
              </p>
            </div>

            <div className="bg-black p-6 rounded-lg shadow-md border-l-4 border-[#FDFB03]">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-2xl font-semibold text-[#FDFB03] font-montserrat">
                  Paket VIP Experience
                </h3>
                <p className="text-[#FDFB03] text-2xl font-bold">Rp 200.000</p>
              </div>
              <p className="text-white font-montserrat">
                Pengalaman premium dengan layanan eksklusif dan privat
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
