"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/lib/api/api";   //Import your axios instance

// Interface untuk form data
interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  // State untuk form data
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear messages when user starts typing
    if (errorMessage) setErrorMessage("");
    if (successMessage) setSuccessMessage("");
  };

  // Validation function
  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage("Nama tidak boleh kosong");
      return false;
    }

    if (!formData.email.trim()) {
      setErrorMessage("Email tidak boleh kosong");
      return false;
    }

    if (!formData.email.includes("@")) {
      setErrorMessage("Format email tidak valid");
      return false;
    }

    if (!formData.password) {
      setErrorMessage("Password tidak boleh kosong");
      return false;
    }

    if (formData.password.length < 8) {
      setErrorMessage("Password minimal 8 karakter");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Konfirmasi password tidak cocok");
      return false;
    }

    return true;
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Using your axios instance with interceptor
      const response = await api.post("/api/users/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      console.log("✅ Registration successful:", response.data);

      setSuccessMessage("Registrasi berhasil! Redirecting to login...");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect ke login setelah 2 detik
      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } catch (error: any) {
      console.error("❌ Registration failed:", error);
      
      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const message = error.response.data?.message || error.response.data?.error;
        
        switch (status) {
          case 400:
            setErrorMessage(message || "Data tidak valid");
            break;
          case 409:
            setErrorMessage("Email sudah terdaftar");
            break;
          case 422:
            setErrorMessage(message || "Data tidak sesuai format");
            break;
          case 500:
            setErrorMessage("Terjadi kesalahan server");
            break;
          default:
            setErrorMessage(message || "Registrasi gagal");
        }
      } else if (error.request) {
        // Network error
        setErrorMessage("Tidak dapat terhubung ke server. Periksa koneksi internet Anda.");
      } else {
        // Other error
        setErrorMessage("Terjadi kesalahan yang tidak terduga");
      }
    } finally {
      setIsLoading(false);
    }
  };

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
                <h2 className="text-3xl font-bold text-white">DAFTAR AKUN</h2>
                <p className="text-gray-300 mt-2">
                  Lengkapi data berikut untuk menyelesaikan registrasi akun
                  Anda.
                </p>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-4">
                  <div className="flex items-center">
                    <span className="text-red-500 mr-2">⚠️</span>
                    {errorMessage}
                  </div>
                </div>
              )}

              {/* Success Message */}
              {successMessage && (
                <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg mb-4">
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✅</span>
                    {successMessage}
                  </div>
                </div>
              )}

              {/* Form Register */}
              <form className="space-y-6" onSubmit={handleSubmit}>
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
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-[#FDFB03] focus:ring-1 focus:ring-[#FDFB03] transition-colors"
                    placeholder="Masukkan nama lengkap"
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* Input Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-[#FDFB03] focus:ring-1 focus:ring-[#FDFB03] transition-colors"
                    placeholder="Masukkan email"
                    required
                    disabled={isLoading}
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
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-[#FDFB03] focus:ring-1 focus:ring-[#FDFB03] transition-colors"
                      placeholder="Masukkan password (minimal 8 karakter)"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#FDFB03] transition-colors"
                      disabled={isLoading}
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
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-[#FDFB03] focus:ring-1 focus:ring-[#FDFB03] transition-colors"
                      placeholder="Konfirmasi password"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#FDFB03] transition-colors"
                      disabled={isLoading}
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
                  disabled={isLoading}
                  className={`w-full py-3 rounded-md font-semibold transition-colors duration-300 ${
                    isLoading
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-[#FDFB03] text-black hover:bg-yellow-400"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                      Mendaftar...
                    </div>
                  ) : (
                    "Daftar"
                  )}
                </button>
              </form>

              {/* Link Login */}
              <div className="text-center mt-6">
                <p className="text-gray-400 mb-2">Sudah memiliki akun?</p>
                <Link href="/login">
                  <button 
                    className="text-[#FDFB03] hover:text-yellow-400 font-medium transition-colors duration-300"
                    disabled={isLoading}
                  >
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