"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
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

          {/* Container Login */}
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
                <h1 className="text-3xl font-bold">MASUK</h1>
                <p className=" text-white mb-2">
                  Masukkan Email dan Password Anda
                </p>
              </div>

              {/* Form Login */}
              <form className="space-y-6">
                {/* Input No HP */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email/No HP
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
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
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#FDFB03] transition-colors cursor-pointer"
                    >
                      {showPassword ? (
                        <FaEyeSlash size={20} />
                      ) : (
                        <FaEye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Button Login */}
                <button
                  type="submit"
                  className="w-full bg-[#FDFB03] text-black py-3 rounded-md font-semibold hover:bg-yellow-400 transition-colors duration-300 cursor-pointer"
                >
                  Login
                </button>
              </form>

              {/* Link Daftar - Dalam Satu Baris */}
              <div className="flex justify-between items-center mt-6">
                <p className="text-gray-400">Belum memiliki akun?</p>
                <Link href="/register">
                  <button className="text-[#FDFB03] hover:text-yellow-400 font-medium cursor-pointer transition-colors duration-300">
                    Daftar Sekarang
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
