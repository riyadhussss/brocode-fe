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
import { adminService } from "@/app/lib/services/admin.service";
import { GetAdminsResponse, EditAdminRequest } from "@/app/lib/types/admin";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { getErrorMessage } from "@/app/lib/getErrorMessage";

type AdminRowData = GetAdminsResponse["data"][number];

interface EditAdminDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  admin: AdminRowData | null;
  onSuccess: () => void;
}

// ✅ Zod schema untuk validasi edit admin - semua field opsional
const editAdminSchema = z
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

type EditAdminForm = z.infer<typeof editAdminSchema>;

export function EditAdminDialog({
  open,
  onOpenChange,
  admin,
  onSuccess,
}: EditAdminDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<EditAdminForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof EditAdminForm, string>>
  >({});

  // ✅ Reset form ketika admin berubah atau dialog dibuka
  useEffect(() => {
    if (admin && open) {
      setFormData({
        name: admin.name,
        email: admin.email,
        password: "",
        confirmPassword: "",
      });
      setErrors({});
    }
  }, [admin, open]);

  // ✅ Reset form ketika dialog ditutup
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
    }
    onOpenChange(newOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!admin) return;

    setErrors({});

    // ✅ Validasi menggunakan Zod
    const validation = editAdminSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof EditAdminForm, string>> = {};
      validation.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof EditAdminForm;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    try {
      // ✅ Prepare data untuk API - hanya kirim field yang diubah dan tidak kosong
      const updateData: Partial<EditAdminRequest> = {};

      // Hanya kirim name jika diubah dan tidak kosong
      if (formData.name && formData.name.trim().length > 0) {
        updateData.name = formData.name;
      }

      // Hanya kirim email jika diubah dan tidak kosong
      if (formData.email && formData.email.trim().length > 0) {
        updateData.email = formData.email;
      }

      // Hanya kirim password jika diisi
      if (formData.password && formData.password.length > 0) {
        updateData.password = formData.password;
      }

      // Pastikan ada minimal 1 field yang diupdate
      if (Object.keys(updateData).length === 0) {
        toast.error("Tidak ada perubahan", {
          description: "Silakan ubah minimal satu field untuk update",
        });
        setLoading(false);
        return;
      }

      const response = await adminService.editAdmin(admin._id, updateData);

      if (response?.success) {
        toast.success("Admin berhasil diupdate", {
          description: `Data admin telah diperbarui`,
        });
        handleOpenChange(false);
        onSuccess();
      } else {
        throw new Error(response?.message || "Gagal mengupdate admin");
      }
    } catch (error) {
      console.error("❌ Error updating admin:", error);

      // Handle field-specific errors dari backend
      if (error && typeof error === "object" && "response" in error) {
        const responseError = error as {
          response?: { data?: { errors?: Record<string, string> } };
        };
        if (responseError.response?.data?.errors) {
          const backendErrors: Partial<Record<keyof EditAdminForm, string>> =
            {};
          Object.entries(responseError.response.data.errors).forEach(
            ([key, value]) => {
              backendErrors[key as keyof EditAdminForm] = value as string;
            }
          );
          setErrors(backendErrors);
        }
      }

      toast.error("Gagal mengupdate admin", {
        description: getErrorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  };

  if (!admin) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Administrator</DialogTitle>
          <DialogDescription>
            Perbarui informasi administrator. Kosongkan password jika tidak
            ingin mengubahnya.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama */}
          <div className="space-y-2">
            <Label htmlFor="edit-name">Nama Lengkap</Label>
            <Input
              id="edit-name"
              placeholder="Masukkan nama lengkap"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              disabled={loading}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="edit-email">Email</Label>
            <Input
              id="edit-email"
              type="email"
              placeholder="admin@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={loading}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="edit-password">Password Baru</Label>
            <Input
              id="edit-password"
              type="password"
              placeholder="Kosongkan jika tidak ingin mengubah"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              disabled={loading}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password - hanya tampil jika password diisi */}
          {formData.password && formData.password.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="edit-confirmPassword">Konfirmasi Password</Label>
              <Input
                id="edit-confirmPassword"
                type="password"
                placeholder="Masukkan ulang password baru"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                disabled={loading}
                className={errors.confirmPassword ? "border-red-500" : ""}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={loading}
              className="w-full sm:w-auto"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
