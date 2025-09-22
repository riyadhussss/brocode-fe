"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
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
    <header className="fixed top-0 left-0 right-0 w-full bg-black border-b-1 border-[#FDFB03] z-50 ">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo - Sebelah Kiri */}
        <div className="flex items-center">
          <Image
            src="/assets/logo.png"
            alt="Brocode Aceh Barbershop Logo"
            width={75}
            height={75}
            className="object-contain"
          />
        </div>

        {/* Navigation - Bagian Tengah */}
        <nav className="hidden md:flex items-center gap-16">
          <button
            onClick={() => scrollToSection("section")}
            className="text-lg group relative w-max text-[#FDFB03] transition-colors duration-300 font-medium cursor-pointer"
          >
            <span>Home</span>
            <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-[#FDFB03] group-hover:w-3/6"></span>
            <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-[#FDFB03] group-hover:w-3/6"></span>
          </button>
          <button
            onClick={() => scrollToSection("layanan")}
            className="text-lg group relative w-max text-[#FDFB03] transition-colors duration-300 font-medium cursor-pointer"
          >
            <span>Layanan</span>
            <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-[#FDFB03] group-hover:w-3/6"></span>
            <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-[#FDFB03] group-hover:w-3/6"></span>
          </button>
          <button
            onClick={() => scrollToSection("tentang-kami")}
            className="text-lg group relative w-max text-[#FDFB03] transition-colors duration-300 font-medium cursor-pointer"
          >
            <span>Tentang Kami</span>
            <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-[#FDFB03] group-hover:w-3/6"></span>
            <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-[#FDFB03] group-hover:w-3/6"></span>
          </button>
          <button
            onClick={() => scrollToSection("footer")}
            className="text-lg group relative w-max text-[#FDFB03] transition-colors duration-300 font-medium cursor-pointer"
          >
            <span>Kontak</span>
            <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-[#FDFB03] group-hover:w-3/6"></span>
            <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-[#FDFB03] group-hover:w-3/6"></span>
          </button>
        </nav>

        {/* Buttons - Sebelah Kanan */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href={"/login"}>
            <button className="px-4 py-2 text-[#FDFB03] border border-[#FDFB03] hover:bg-[#FDFB03] hover:text-black transition-all duration-300 rounded-md font-medium cursor-pointer">
              Login
            </button>
          </Link>

          <Link href={"/register"}>
            <button className="px-4 py-2 bg-[#FDFB03] text-black hover:bg-yellow-400 transition-all duration-300 rounded-md font-medium cursor-pointer">
              Register
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        {/* <div className="md:hidden">
          <button className="text-white hover:text-[#FDFB03] transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div> */}
      </div>
    </header>
  );
}
