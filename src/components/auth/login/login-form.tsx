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
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";
import { getErrorMessage } from "@/app/lib/getErrorMessage";

// ✅ Validasi input
const loginSchema = z.object({
  emailOrPhone: z
    .string()
    .min(1, "Email atau nomor HP wajib diisi")
    .refine(
      (val) => {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        const isPhone = /^[0-9]{9,15}$/.test(val);
        return isEmail || isPhone;
      },
      { message: "Masukkan email atau nomor HP yang valid" }
    ),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // ✅ Fungsi Login
  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await authService.login({
        emailOrPhone: data.emailOrPhone,
        password: data.password,
      });

      // Cek respon dari server
      if (!response.success) {
        throw new Error(response.message || "Login gagal");
      }

      const { user, token } = response;

      // Simpan data user ke cookies (expires 7 hari)
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("role", user.role, { expires: 7 });

      // Simpan nama dan phone jika ada
      if (user.name) {
        Cookies.set("name", user.name, { expires: 7 });
      }
      if (user.phone) {
        Cookies.set("phone", user.phone, { expires: 7 });
      }

      // Simpan email, userId, dan _id untuk keperluan lain
      Cookies.set("_id", user._id, { expires: 7 });
      Cookies.set("email", user.email, { expires: 7 });
      Cookies.set("userId", user.userId, { expires: 7 });

      // ✅ Pesan sukses
      toast.success("Login berhasil!", {
        description: `Selamat datang, ${user.name}!`,
      });

      reset();

      // ✅ Redirect berdasarkan role
      const redirectMap: Record<string, string> = {
        admin: "/admin/dashboard",
        cashier: "/kasir/dashboard",
        customer: "/user/reservasi",
      };

      router.push(redirectMap[user.role] || "/");
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
              // Response 400 - credential salah (tidak log ke console)
              toast.error("Login gagal", {
                description:
                  "Email/no HP atau password yang anda masukkan salah",
              });
              return; // Return early, tidak log error
            case 401:
              toast.error("Login gagal", {
                description:
                  "Email/no HP atau password yang anda masukkan salah",
              });
              break;
            case 404:
              toast.error("Login gagal", {
                description: "Akun tidak ditemukan",
              });
              break;
            case 422:
              toast.error("Login gagal", {
                description: message || "Data tidak valid",
              });
              break;
            case 500:
              toast.error("Login gagal", {
                description: "Terjadi kesalahan server, coba lagi nanti",
              });
              break;
            default:
              toast.error("Login gagal", {
                description: message || "Terjadi kesalahan, coba lagi",
              });
          }
          // Log error untuk semua case kecuali 400
          console.error("❌ Login error:", error);
          return;
        }
      }

      // Fallback untuk error lain
      toast.error("Login gagal", {
        description: getErrorMessage(error),
      });

      // Log error untuk semua case kecuali 400
      console.error("❌ Login error:", error);
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
        <h1 className="text-2xl font-bold text-white">Masuk ke akun anda</h1>
        <p className="text-sm text-gray-400">
          Masukkan email/nomor HP dan password anda untuk masuk ke akun
        </p>
      </div>

      {/* Form Fields */}
      <div className="grid gap-6">
        {/* Email/Phone */}
        <div className="grid gap-2">
          <Label htmlFor="emailOrPhone" className="text-white">
            Email/No HP
          </Label>
          <Input
            id="emailOrPhone"
            placeholder="Masukkan email atau nomor HP anda"
            variant="black"
            {...register("emailOrPhone")}
          />
          {errors.emailOrPhone && (
            <p className="text-red-500 text-sm">
              {errors.emailOrPhone.message}
            </p>
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

        {/* Tombol Login */}
        <Button
          variant="yellow"
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Memproses..." : "Login"}
        </Button>
      </div>

      {/* Link Register */}
      <div className="flex justify-between items-center w-full text-sm text-gray-400">
        <p>Belum memiliki akun?</p>
        <a
          href="/register"
          className=" text-[#FDFB03] hover:underline hover:underline-offset-4 transition-colors"
        >
          Daftar Sekarang!
        </a>
      </div>
    </form>
  );
}
