"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/lib/api/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// Interface untuk form data
interface RegisterData {
  name: string;
  email: string;
  phone: string;
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
    phone: "",
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

    if (!formData.phone.trim()) {
      setErrorMessage("Nomor HP tidak boleh kosong");
      return false;
    }

    // Validasi format nomor HP: harus dimulai dari 08 dan berjumlah 10-14 digit
    if (!/^08\d{8,12}$/.test(formData.phone)) {
      setErrorMessage(
        "Nomor HP harus dimulai dari 08 dan berjumlah 10-14 digit"
      );
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
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      console.log("✅ Registration successful:", response.data);

      setSuccessMessage("Registrasi berhasil! Redirecting to login...");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
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
        const message =
          error.response.data?.message || error.response.data?.error;

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
        setErrorMessage(
          "Tidak dapat terhubung ke server. Periksa koneksi internet Anda."
        );
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
              <button className="text-white p-4 rounded-2xl hover:bg-[#FDFB03]/10 transition-colors duration-300 cursor-pointer">
                <MdArrowBack size={24} />
              </button>
            </Link>
          </div>

          {/* Container Register */}
          <div className="flex items-center justify-center min-h-screen px-4">
            <Card className="w-full max-w-md bg-black border border-gray-700 shadow-xl">
              <CardHeader>
                {/* Logo */}
                <div className="flex justify-center mb-8 mt-8">
                  <Image
                    src="/assets/logo.png"
                    alt="Brocode Aceh Barbershop Logo"
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>
                <CardTitle className="text-white ">Daftar Akun</CardTitle>
                <CardDescription className="font-semibold">
                  Lengkapi data berikut untuk menyelesaikan registrasi akun
                  Anda.
                </CardDescription>
              </CardHeader>

              <CardContent>
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
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-6">
                    {/* Input Nama */}
                    <div className="grid gap-2">
                      <Label htmlFor="name" className="text-white">
                        Nama
                      </Label>
                      <Input
                        variant="black"
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Masukkan nama lengkap"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    {/* Input Email */}
                    <div className="grid gap-2">
                      <Label htmlFor="email" className="text-white">
                        Email
                      </Label>
                      <Input
                        variant="black"
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Masukkan email"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    {/* Input Nomor HP */}
                    <div className="grid gap-2">
                      <Label htmlFor="phone" className="text-white">
                        Nomor HP
                      </Label>
                      <Input
                        variant="black"
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Masukkan nomor HP anda"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    {/* Input Password */}
                    <div className="grid gap-2">
                      <Label htmlFor="password" className="text-white">
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          variant="black"
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleInputChange}
                          className="pr-12"
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
                    <div className="grid gap-2">
                      <Label htmlFor="confirmPassword" className="text-white">
                        Konfirmasi Password
                      </Label>
                      <div className="relative">
                        <Input
                          variant="black"
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="pr-12"
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
                  </div>
                </form>
              </CardContent>

              <CardFooter className="flex-col gap-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  variant="yellow"
                  className="w-full"
                  onClick={handleSubmit}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                      Mendaftar...
                    </div>
                  ) : (
                    "Daftar"
                  )}
                </Button>

                {/* Login Link */}
                <div className="flex items-center justify-between w-full">
                  <CardDescription>Sudah memiliki akun?</CardDescription>
                  <Link href="/login">
                    <Button variant="linkYellow" disabled={isLoading}>
                      Login Sekarang
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
