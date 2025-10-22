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
import { cashierService } from "@/app/lib/services/cashier.service";
import {
  GetCashiersResponse,
  EditCashierRequest,
} from "@/app/lib/types/cashier";
import { z } from "zod";
import { Loader2 } from "lucide-react";

type CashierRowData = NonNullable<GetCashiersResponse["data"]>[number];

interface EditKasirDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  kasir: CashierRowData | null;
  onSuccess: () => void;
}

// ✅ Zod schema untuk validasi edit kasir - semua field opsional
const editKasirSchema = z
  .object({
    name: z
      .string()
      .optional()
      .refine(
        (val) => !val || val.length >= 3,
        "Nama minimal 3 karakter jika diisi"
      ),
    email: z
      .string()
      .optional()
      .refine(
        (val) => !val || z.string().email().safeParse(val).success,
        "Email tidak valid jika diisi"
      ),
    password: z
      .string()
      .optional()
      .refine(
        (val) => !val || val.length >= 6,
        "Password minimal 6 karakter jika diisi"
      ),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      // Jika password diisi, confirmPassword harus sama
      if (data.password && data.password.length > 0) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Password tidak cocok",
      path: ["confirmPassword"],
    }
  );

type EditKasirForm = z.infer<typeof editKasirSchema>;

export function EditKasirDialog({
  open,
  onOpenChange,
  kasir,
  onSuccess,
}: EditKasirDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<EditKasirForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<EditKasirForm>>({});

  // ✅ Reset form ketika dialog dibuka dengan data kasir
  useEffect(() => {
    if (open && kasir) {
      setFormData({
        name: kasir.name || "",
        email: kasir.email || "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
    } else if (!open) {
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
    }
  }, [open, kasir]);

  const handleChange = (field: keyof EditKasirForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error untuk field yang sedang diubah
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    try {
      editKasirSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Partial<EditKasirForm> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as keyof EditKasirForm] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!kasir) {
      toast.error("Data kasir tidak ditemukan");
      return;
    }

    if (!validateForm()) {
      toast.error("Mohon periksa kembali form Anda");
      return;
    }

    setLoading(true);

    try {
      // ✅ Hanya kirim field yang diubah dan tidak kosong
      const updateData: Partial<EditCashierRequest> = {};

      if (formData.name && formData.name.trim() !== kasir.name) {
        updateData.name = formData.name.trim();
      }

      if (formData.email && formData.email.trim() !== kasir.email) {
        updateData.email = formData.email.trim();
      }

      if (formData.password && formData.password.trim() !== "") {
        updateData.password = formData.password;
      }

      // ✅ Cek apakah ada perubahan
      if (Object.keys(updateData).length === 0) {
        toast.info("Tidak ada perubahan yang dilakukan");
        onOpenChange(false);
        return;
      }

      const response = await cashierService.editCashier(kasir._id, updateData);

      if (response.success) {
        toast.success("Kasir berhasil diperbarui!", {
          description: `Data ${kasir.name} telah diperbarui`,
        });
        onOpenChange(false);
        onSuccess();
      } else {
        throw new Error(response.message || "Gagal memperbarui kasir");
      }
    } catch (error: any) {
      console.error("❌ Error updating kasir:", error);
      toast.error("Gagal memperbarui kasir", {
        description:
          error.response?.data?.message || error.message || "Terjadi kesalahan",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!kasir) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Kasir</DialogTitle>
            <DialogDescription>
              Perbarui informasi kasir. Kosongkan field yang tidak ingin diubah.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Nama */}
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Nama Lengkap</Label>
              <Input
                id="edit-name"
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
              <p className="text-xs text-gray-500">
                Kosongkan jika tidak ingin mengubah
              </p>
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
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
              <p className="text-xs text-gray-500">
                Kosongkan jika tidak ingin mengubah
              </p>
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="edit-password">Password Baru</Label>
              <Input
                id="edit-password"
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
              <p className="text-xs text-gray-500">
                Kosongkan jika tidak ingin mengubah password
              </p>
            </div>

            {/* Confirm Password */}
            <div className="grid gap-2">
              <Label htmlFor="edit-confirmPassword">
                Konfirmasi Password Baru
              </Label>
              <Input
                id="edit-confirmPassword"
                type="password"
                placeholder="Ulangi password baru"
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
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Simpan Perubahan"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
