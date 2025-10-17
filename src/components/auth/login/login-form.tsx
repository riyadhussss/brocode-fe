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
import Cookies from "js-cookie";

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

      // Atau menggunakan js-cookie jika sudah diinstall:
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("role", user.role, { expires: 7 });

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
    } catch (error: any) {
      console.error("❌ Login error:", error);
      toast.error("Login gagal", {
        description:
          error.message || "Terjadi kesalahan, periksa koneksi atau data Anda.",
      });
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
          <Input
            id="password"
            type="password"
            placeholder="Masukkan password anda"
            variant="black"
            {...register("password")}
          />
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
      <div className="text-center text-sm text-gray-400">
        Belum memiliki akun?{" "}
        <a href="#" className="underline underline-offset-4 text-yellow-400">
          Daftar Sekarang!
        </a>
      </div>
    </form>
  );
}
