"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <>
      <div className="min-h-screen bg-black text-white bg-[url('/assets/auth/auth.png')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm">
          {/* Tombol Kembali */}
          <div className="absolute top-6 left-6 z-10">
            <Link href="/">
              <button className="text-white hover:text-[#FDFB03] transition-colors duration-300 cursor-pointer">
                <MdArrowBack size={24} />
              </button>
            </Link>
          </div>

          {/* Container Register */}
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="bg-black border border-gray-700 rounded-lg p-8 w-full max-w-md shadow-xl">
              {/* Logo */}
              <div className="flex justify-center mb-8">
                <Image
                  src="/assets/logo.png"
                  alt="Brocode Aceh Barbershop Logo"
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>

              {/* Judul */}
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-white ">DAFTAR AKUN</h2>
                <p>
                  Lengkapi data berikut untuk menyelesaikan registrasi akun
                  Anda.
                </p>
              </div>

              {/* Form Register */}
              <form className="space-y-6">
                {/* Input Nama */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Nama
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-[#FDFB03] focus:ring-1 focus:ring-[#FDFB03] transition-colors"
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>

                {/* Input Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email/No HP
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-[#FDFB03] focus:ring-1 focus:ring-[#FDFB03] transition-colors"
                    placeholder="Masukkan email/nomor HP"
                    required
                  />
                </div>

                {/* Input Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-[#FDFB03] focus:ring-1 focus:ring-[#FDFB03] transition-colors"
                      placeholder="Masukkan password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#FDFB03] transition-colors"
                    >
                      {showPassword ? (
                        <FaEyeSlash size={20} />
                      ) : (
                        <FaEye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Input Konfirmasi Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Konfirmasi Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-[#FDFB03] focus:ring-1 focus:ring-[#FDFB03] transition-colors"
                      placeholder="Konfirmasi password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#FDFB03] transition-colors"
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash size={20} />
                      ) : (
                        <FaEye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Button Register */}
                <button
                  type="submit"
                  className="w-full bg-[#FDFB03] text-black py-3 rounded-md font-semibold hover:bg-yellow-400 transition-colors duration-300"
                >
                  Daftar
                </button>
              </form>

              {/* Link Login */}
              <div className="text-center mt-6">
                <p className="text-gray-400 mb-2">Sudah memiliki akun?</p>
                <Link href="/login">
                  <button className="text-[#FDFB03] hover:text-yellow-400 font-medium transition-colors duration-300">
                    Login Sekarang
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
