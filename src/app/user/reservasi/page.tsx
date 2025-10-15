  "use client";

import { useState } from "react";
import {
  FaUser,
  FaCut,
  FaStickyNote,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";

// Interface untuk form reservasi
interface ReservationForm {
  nama: string;
  nomorHP: string;
  capster: string;
  layanan: string;
  tanggal: string;
  waktu: string;
  catatan: string;
}

// Data capster
const capsterList = [
  { id: "1", nama: "Andi Wijaya", spesialisasi: "Hair Cut & Styling" },
  { id: "2", nama: "Budi Santoso", spesialisasi: "Hair Cut & Beard" },
  { id: "3", nama: "Charlie Rahman", spesialisasi: "Premium Styling" },
  { id: "4", nama: "David Hakim", spesialisasi: "Hair Treatment" },
];

// Data layanan
const layananList = [
  { id: "1", nama: "Haircut Regular", harga: 25000 },
  { id: "2", nama: "Haircut Premium", harga: 50000 },
  { id: "3", nama: "Hair Wash", harga: 15000 },
  { id: "4", nama: "Beard Trim", harga: 20000 },
  { id: "5", nama: "Hair Styling", harga: 30000 },
  { id: "6", nama: "Face Treatment", harga: 45000 },
];

// Data waktu tersedia
const waktuList = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
];

export default function User() {
  const [formData, setFormData] = useState<ReservationForm>({
    nama: "",
    nomorHP: "",
    capster: "",
    layanan: "",
    tanggal: "",
    waktu: "",
    catatan: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Calculate total price
  const calculateTotal = () => {
    if (!formData.layanan) return 0;
    const layanan = layananList.find((l) => l.id === formData.layanan);
    return layanan?.harga || 0;
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.nama ||
      !formData.nomorHP ||
      !formData.capster ||
      !formData.layanan ||
      !formData.tanggal ||
      !formData.waktu
    ) {
      alert("Mohon lengkapi semua field yang wajib diisi!");
      return;
    }

    // Simulate API call
    console.log("Form submitted:", formData);
    setShowSuccess(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        nama: "",
        nomorHP: "",
        capster: "",
        layanan: "",
        tanggal: "",
        waktu: "",
        catatan: "",
      });
    }, 3000);
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <main className="flex-1 p-8 overflow-auto">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Buat Reservasi
            </h1>
            <p className="text-gray-600">
              Lengkapi form di bawah untuk membuat reservasi baru
            </p>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <FaCheckCircle className="text-green-600 mr-3" />
                <div>
                  <h3 className="text-green-800 font-semibold">
                    Reservasi Berhasil!
                  </h3>
                  <p className="text-green-700">
                    Reservasi Anda telah dikirim dan menunggu konfirmasi.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Reservation Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FaUser className="mr-2 text-[#FDFB03]" />
                  Informasi Pribadi
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nama */}
                  <div>
                    <label
                      htmlFor="nama"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      id="nama"
                      name="nama"
                      value={formData.nama}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDFB03] focus:border-transparent transition-colors"
                      placeholder="Masukkan nama lengkap"
                      required
                    />
                  </div>

                  {/* Nomor HP */}
                  <div>
                    <label
                      htmlFor="nomorHP"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Nomor HP *
                    </label>
                    <input
                      type="tel"
                      id="nomorHP"
                      name="nomorHP"
                      value={formData.nomorHP}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDFB03] focus:border-transparent transition-colors"
                      placeholder="Contoh: 081234567890"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Service Selection Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FaCut className="mr-2 text-[#FDFB03]" />
                  Pilihan Layanan
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pilih Capster */}
                  <div>
                    <label
                      htmlFor="capster"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Pilih Capster *
                    </label>
                    <select
                      id="capster"
                      name="capster"
                      value={formData.capster}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDFB03] focus:border-transparent transition-colors"
                      required
                    >
                      <option value="">Pilih Capster</option>
                      {capsterList.map((capster) => (
                        <option key={capster.id} value={capster.id}>
                          {capster.nama} - {capster.spesialisasi}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Pilih Layanan */}
                  <div>
                    <label
                      htmlFor="layanan"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Pilih Layanan *
                    </label>
                    <select
                      id="layanan"
                      name="layanan"
                      value={formData.layanan}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDFB03] focus:border-transparent transition-colors"
                      required
                    >
                      <option value="">Pilih Layanan</option>
                      {layananList.map((layanan) => (
                        <option key={layanan.id} value={layanan.id}>
                          {layanan.nama} - {formatCurrency(layanan.harga)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Total Harga */}
                {formData.layanan && (
                  <div className="mt-4 p-4 bg-[#FDFB03] bg-opacity-20 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">
                        Harga Layanan:
                      </span>
                      <span className="text-xl font-bold text-gray-900">
                        {formatCurrency(calculateTotal())}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Schedule Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FaCalendarAlt className="mr-2 text-[#FDFB03]" />
                  Jadwal Reservasi
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pilih Tanggal */}
                  <div>
                    <label
                      htmlFor="tanggal"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Pilih Tanggal *
                    </label>
                    <input
                      type="date"
                      id="tanggal"
                      name="tanggal"
                      value={formData.tanggal}
                      onChange={handleInputChange}
                      min={getMinDate()}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDFB03] focus:border-transparent transition-colors"
                      required
                    />
                  </div>

                  {/* Pilih Waktu */}
                  <div>
                    <label
                      htmlFor="waktu"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Pilih Waktu *
                    </label>
                    <select
                      id="waktu"
                      name="waktu"
                      value={formData.waktu}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDFB03] focus:border-transparent transition-colors"
                      required
                    >
                      <option value="">Pilih Waktu</option>
                      {waktuList.map((waktu) => (
                        <option key={waktu} value={waktu}>
                          {waktu}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FaStickyNote className="mr-2 text-[#FDFB03]" />
                  Catatan Tambahan
                </h2>

                <div>
                  <label
                    htmlFor="catatan"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Catatan (Opsional)
                  </label>
                  <textarea
                    id="catatan"
                    name="catatan"
                    value={formData.catatan}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDFB03] focus:border-transparent transition-colors resize-none"
                    placeholder="Tambahkan catatan khusus atau preferensi gaya rambut..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="w-full bg-[#FDFB03] hover:bg-yellow-400 text-black font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <FaCheckCircle />
                  <span>Buat Reservasi</span>
                </button>

                <p className="text-sm text-gray-500 text-center mt-3">
                  Dengan membuat reservasi, Anda menyetujui untuk datang tepat
                  waktu sesuai jadwal yang dipilih.
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
