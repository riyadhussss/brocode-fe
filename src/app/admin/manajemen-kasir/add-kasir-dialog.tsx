"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";
import { cashierService } from "@/app/lib/services/cashier.service";

// ✅ Zod Schema untuk validasi
const addKasirSchema = z
  .object({
    name: z
      .string()
      .min(1, "Nama wajib diisi")
      .min(3, "Nama minimal 3 karakter"),
    email: z
      .string()
      .min(1, "Email wajib diisi")
      .email("Format email tidak valid"),
    password: z
      .string()
      .min(1, "Password wajib diisi")
      .min(6, "Password minimal 6 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

type AddKasirFormData = z.infer<typeof addKasirSchema>;

interface AddKasirDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function AddKasirDialog({
  open,
  onOpenChange,
  onSuccess,
}: AddKasirDialogProps) {
  const [formData, setFormData] = useState<AddKasirFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<AddKasirFormData>>({});
  const [loading, setLoading] = useState(false);

  // Reset form ketika dialog dibuka/ditutup
  useEffect(() => {
    if (!open) {
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
    }
  }, [open]);

  const handleChange = (field: keyof AddKasirFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error untuk field yang sedang diubah
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    try {
      addKasirSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Partial<AddKasirFormData> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as keyof AddKasirFormData] =
              err.message;
          }
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Mohon periksa kembali form Anda");
      return;
    }

    setLoading(true);

    try {
      const response = await cashierService.addCashier({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.success) {
        toast.success("Kasir berhasil ditambahkan!", {
          description: `${formData.name} telah ditambahkan sebagai kasir`,
        });
        onOpenChange(false);
        if (onSuccess) {
          onSuccess();
        }
      } else {
        throw new Error(response.message || "Gagal menambahkan kasir");
      }
    } catch (error: any) {
      console.error("❌ Error adding kasir:", error);
      toast.error("Gagal menambahkan kasir", {
        description:
          error.response?.data?.message || error.message || "Terjadi kesalahan",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Tambah Kasir Baru</DialogTitle>
            <DialogDescription>
              Masukkan informasi kasir yang akan ditambahkan
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Nama */}
            <div className="grid gap-2">
              <Label htmlFor="name">
                Nama Lengkap <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Masukkan nama lengkap"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={errors.name ? "border-red-500" : ""}
                disabled={loading}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@example.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={errors.email ? "border-red-500" : ""}
                disabled={loading}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password">
                Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Minimal 6 karakter"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className={errors.password ? "border-red-500" : ""}
                disabled={loading}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">
                Konfirmasi Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Ulangi password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                className={errors.confirmPassword ? "border-red-500" : ""}
                disabled={loading}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan Kasir"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
