"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Disable scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling
      document.body.style.overflow = "unset";
    }

    // Cleanup function to ensure scrolling is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    // Close mobile menu after clicking
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed p-2 top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black backdrop-blur-md border-b border-gray-600"
          : "bg-transparent border-b border-transparent"
      }`}
    >
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
            onClick={() => scrollToSection("homesection")}
            className="text-lg group relative w-max text-white transition-colors duration-300 font-medium cursor-pointer"
          >
            <span>Beranda</span>
            <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-white   group-hover:w-3/6"></span>
            <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-white  group-hover:w-3/6"></span>
          </button>
          <button
            onClick={() => scrollToSection("layanan")}
            className="text-lg group relative w-max text-white transition-colors duration-300 font-medium cursor-pointer"
          >
            <span>Layanan</span>
            <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-white   group-hover:w-3/6"></span>
            <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-white  group-hover:w-3/6"></span>
          </button>
          <button
            onClick={() => scrollToSection("tentang-kami")}
            className="text-lg group relative w-max text-white transition-colors duration-300 font-medium cursor-pointer"
          >
            <span>Tentang Kami</span>
            <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-white   group-hover:w-3/6"></span>
            <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-white  group-hover:w-3/6"></span>
          </button>
          <button
            onClick={() => scrollToSection("footer")}
            className="text-lg group relative w-max text-white transition-colors duration-300 font-medium cursor-pointer"
          >
            <span>Kontak</span>
            <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-white   group-hover:w-3/6"></span>
            <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-white  group-hover:w-3/6"></span>
          </button>
        </nav>

        {/* Buttons - Sebelah Kanan */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href={"/login"}>
            {/* <button className="px-4 py-2 text-[#FDFB03] border border-[#FDFB03] hover:bg-[#FDFB03] hover:text-black transition-all duration-300 rounded-md font-medium cursor-pointer">
              Login
            </button> */}
            <Button variant="outlineYellow" >Login</Button>
          </Link>

          <Link href={"/register"}>
            {/* <button className="px-4 py-2 bg-[#FDFB03] text-black hover:bg-yellow-400 transition-all duration-300 rounded-md font-medium cursor-pointer">
              Register
            </button> */}
            <Button variant="yellow">Register</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-[#FDFB03] hover:text-yellow-400 transition-colors duration-300 p-2"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleMobileMenu}
      >
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-black border-l border-[#FDFB03]/50 transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#FDFB03]/30">
            <div className="flex items-center space-x-3">
              <Image
                src="/assets/logo.png"
                alt="Brocode Aceh Barbershop Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <h3 className="text-[#FDFB03] font-semibold text-lg">
                Brocode Aceh
              </h3>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="text-[#FDFB03] hover:text-yellow-400 transition-colors duration-300 p-2"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="px-6 py-6">
            <div className="space-y-6">
              <button
                onClick={() => scrollToSection("section")}
                className="block w-full text-left text-lg text-[#FDFB03] hover:text-yellow-400 transition-colors duration-300 font-medium py-3 border-b border-gray-800 hover:border-[#FDFB03]/30"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("layanan")}
                className="block w-full text-left text-lg text-[#FDFB03] hover:text-yellow-400 transition-colors duration-300 font-medium py-3 border-b border-gray-800 hover:border-[#FDFB03]/30"
              >
                Layanan
              </button>
              <button
                onClick={() => scrollToSection("tentang-kami")}
                className="block w-full text-left text-lg text-[#FDFB03] hover:text-yellow-400 transition-colors duration-300 font-medium py-3 border-b border-gray-800 hover:border-[#FDFB03]/30"
              >
                Tentang Kami
              </button>
              <button
                onClick={() => scrollToSection("footer")}
                className="block w-full text-left text-lg text-[#FDFB03] hover:text-yellow-400 transition-colors duration-300 font-medium py-3 border-b border-gray-800 hover:border-[#FDFB03]/30"
              >
                Kontak
              </button>
            </div>
          </nav>

          {/* Sidebar Action Buttons */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[#FDFB03]/30">
            <div className="flex flex-col">
              <Link
                href={"/login"}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mb-6"
              >
                <button className="w-full px-4 py-3 text-[#FDFB03] border border-[#FDFB03] hover:bg-[#FDFB03] hover:text-black transition-all duration-300 rounded-md font-medium">
                  Login
                </button>
              </Link>
              <Link
                href={"/register"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <button className="w-full px-4 py-3 bg-[#FDFB03] text-black hover:bg-yellow-400 transition-all duration-300 rounded-md font-medium">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
