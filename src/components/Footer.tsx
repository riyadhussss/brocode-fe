"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  // Function untuk smooth scroll ke section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <footer className="bg-black text-white border-t border-gray-700">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo & Company Info */}
          <div className="sm:col-span-2 lg:col-span-2 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start mb-6">
              <Image
                src="/assets/logo.png"
                alt="Brocode Logo"
                width={60}
                height={60}
                className="mb-3 sm:mb-0 sm:mr-4"
              />
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-[#FDFB03]">
                  Brocode Aceh
                </h2>
                <p className="text-gray-400 text-sm">Barbershop</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md text-center sm:text-left text-sm sm:text-base">
              Tempat terbaik untuk mendapatkan potongan rambut dan perawatan
              grooming berkualitas tinggi. Dengan barber profesional dan
              pelayanan terdepan.
            </p>

            {/* Social Media */}
            <div className="flex justify-center sm:justify-start space-x-3 sm:space-x-4 mb-6 sm:mb-0">
              <Link
                href="https://www.instagram.com/brocodeaceh/"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="Instagram"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:shadow-lg bg-transparent group-hover:bg-gradient-to-tr group-hover:from-pink-500 group-hover:to-purple-600 active:scale-95">
                  <FaInstagram className="text-gray-300 group-hover:text-white w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </Link>

              <Link
                href="https://www.tiktok.com/@brocodeaceh"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="TikTok"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:shadow-lg bg-transparent group-hover:bg-gray-700 active:scale-95">
                  <FaTiktok className="text-gray-300 group-hover:text-white w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </Link>

              <Link
                href="https://wa.me/6282272764880"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="WhatsApp"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:shadow-lg bg-transparent group-hover:bg-[#25D366] active:scale-95">
                  <FaWhatsapp className="text-gray-300 group-hover:text-white w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-[#FDFB03]">
              Kontak
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start sm:space-x-3">
                <FaMapMarkerAlt className="text-[#FDFB03] mb-2 sm:mb-0 sm:mt-1 flex-shrink-0" />
                <div className="text-center sm:text-left">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://maps.app.goo.gl/rogA3WkZeLpyXXYe9"
                    className="text-gray-300 leading-relaxed text-sm sm:text-base hover:text-[#FDFB03] transition-colors duration-300"
                  >
                    Jl. Dr. Mr. Mohd Hasan,
                    <br />
                    Sukadamai, Kec. Lueng Bata,
                    <br />
                    Kota Banda Aceh, Aceh 23127
                  </a>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start sm:space-x-3">
                <FaPhone className="text-[#FDFB03] mb-2 sm:mb-0" />
                <p className="text-gray-300 text-sm sm:text-base">
                  +62 822-7276-4880
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start sm:space-x-3">
                <FaEnvelope className="text-[#FDFB03] mb-2 sm:mb-0" />
                <p className="text-gray-300 text-sm sm:text-base">
                  info@brocode.com
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-[#FDFB03]">
              Menu
            </h3>
            <ul className="space-y-2 sm:space-y-3 flex flex-col items-center sm:items-start">
              <li>
                <button
                  onClick={() => scrollToSection("homesection")}
                  className="text-gray-300 hover:text-[#FDFB03] transition-colors duration-300 hover:underline cursor-pointer text-center sm:text-left bg-transparent border-none p-0 text-sm sm:text-base"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("layanan")}
                  className="text-gray-300 hover:text-[#FDFB03] transition-colors duration-300 hover:underline cursor-pointer text-center sm:text-left bg-transparent border-none p-0 text-sm sm:text-base"
                >
                  Layanan
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("tentang-kami")}
                  className="text-gray-300 hover:text-[#FDFB03] transition-colors duration-300 hover:underline cursor-pointer text-center sm:text-left bg-transparent border-none p-0 text-sm sm:text-base"
                >
                  Tentang Kami
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("footer")}
                  className="text-gray-300 hover:text-[#FDFB03] transition-colors duration-300 hover:underline cursor-pointer text-center sm:text-left bg-transparent border-none p-0 text-sm sm:text-base"
                >
                  Kontak
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 py-4 sm:py-6">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              © 2025 Brocode Aceh Barbershop. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
