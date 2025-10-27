"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { authService } from "@/app/lib/services/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { getErrorMessage } from "@/app/lib/getErrorMessage";

// ✅ Schema validasi
const registerSchema = z
  .object({
    name: z.string().min(3, "Nama minimal 3 karakter"),
    email: z.string().email("Masukkan email yang valid"),
    phone: z
      .string()
      .min(9, "Nomor HP minimal 9 digit")
      .max(15, "Nomor HP maksimal 15 digit")
      .regex(/^[0-9]+$/, "Nomor HP hanya boleh berisi angka"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    confirmPassword: z.string().min(8, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password tidak cocok",
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // ✅ Fungsi submit menggunakan authService
  const onSubmit = async (data: RegisterFormData) => {
    try {
      console.log("📤 Data dikirim:", data);

      // Menggunakan authService.register
      const response = await authService.register({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      // Cek response dari server
      if (!response.success) {
        throw new Error(response.message || "Registrasi gagal");
      }

      // ✅ Pesan sukses
      toast.success("Registrasi berhasil!", {
        description: `Selamat datang, ${response.data.name}! Redirecting to login...`,
        duration: 3000,
      });

      // Reset form
      reset();

      // Redirect ke login setelah 2 detik
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      // Handle different error types
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: {
            status?: number;
            data?: { message?: string; error?: string };
          };
        };

        if (axiosError.response) {
          const status = axiosError.response.status;
          const message =
            axiosError.response.data?.message ||
            axiosError.response.data?.error;

          switch (status) {
            case 400:
              // Response 400 - bad request (tidak log ke console)
              toast.error("Registrasi gagal", {
                description: message || "Data yang dimasukkan tidak valid",
              });
              return; // Return early, tidak log error

            case 409:
              toast.error("Registrasi gagal", {
                description: "Email atau nomor HP sudah terdaftar",
              });
              break;

            case 422:
              toast.error("Registrasi gagal", {
                description: message || "Data tidak sesuai format",
              });
              break;

            case 500:
              toast.error("Registrasi gagal", {
                description: "Terjadi kesalahan server, coba lagi nanti",
              });
              break;

            default:
              toast.error("Registrasi gagal", {
                description: message || "Terjadi kesalahan, coba lagi",
              });
          }
          // Log error untuk semua case kecuali 400
          console.error("❌ Register error:", error);
          return;
        }
      }

      // Fallback untuk error lain
      toast.error("Registrasi gagal", {
        description: getErrorMessage(error),
      });

      // Log error untuk semua case kecuali 400
      console.error("❌ Register error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <button type="button" className="focus:outline-none">
          <Image
            src="/assets/logo.png"
            alt="Logo Brocode"
            width={200}
            height={40}
            className="object-contain mb-5"
          />
        </button>
        <h1 className="text-2xl font-bold text-white">Daftar Akun</h1>
        <p className="text-sm text-gray-400">
          {" "}
          Lengkapi data berikut untuk menyelesaikan pendaftaran akun Anda.
        </p>
      </div>

      {/* Form Fields */}
      <div className="grid gap-6">
        {/* Nama */}
        <div className="grid gap-2">
          <Label htmlFor="name" className="text-white">
            Nama
          </Label>
          <Input
            id="name"
            placeholder="Masukkan nama lengkap anda"
            variant="black"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-white">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Masukkan email anda"
            variant="black"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Nomor HP */}
        <div className="grid gap-2">
          <Label htmlFor="phone" className="text-white">
            Nomor HP
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Masukkan nomor HP anda"
            variant="black"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="grid gap-2">
          <Label htmlFor="password" className="text-white">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan password anda"
              variant="black"
              {...register("password")}
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Konfirmasi Password */}
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword" className="text-white">
            Konfirmasi Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Masukkan kembali password anda"
              variant="black"
              {...register("confirmPassword")}
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Tombol Register */}
        <Button
          variant="yellow"
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Memproses..." : "Daftar"}
        </Button>
      </div>

      {/* Link ke Login */}
      <div className="flex justify-between items-center w-full text-sm text-gray-400">
        <p>Sudah memiliki akun?</p>
        <a
          href="/login"
          className=" text-[#FDFB03] hover:underline hover:underline-offset-4 transition-colors"
        >
          Masuk Sekarang!
        </a>
      </div>
    </form>
  );
}
