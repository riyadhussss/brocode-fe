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
import { customerService } from "@/app/lib/services/customer.service";
import { CustomerRowData } from "./CustomerTableColumns";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { getErrorMessage } from "@/app/lib/getErrorMessage";

interface EditCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: CustomerRowData | null;
  onSuccess: () => void;
}

// ✅ Zod schema untuk validasi edit customer - semua field opsional
const editCustomerSchema = z
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
    phone: z
      .string()
      .optional()
      .refine(
        (val) => !val || (val.length >= 10 && /^[0-9]+$/.test(val)),
        "Nomor telepon minimal 10 digit dan hanya berisi angka"
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

type EditCustomerForm = z.infer<typeof editCustomerSchema>;

export function EditCustomerDialog({
  open,
  onOpenChange,
  customer,
  onSuccess,
}: EditCustomerDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<EditCustomerForm>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof EditCustomerForm, string>>
  >({});

  // ✅ Reset form ketika customer berubah atau dialog dibuka
  useEffect(() => {
    if (customer && open) {
      setFormData({
        name: customer.name,
        email: customer.email,
        phone: customer.phone || "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
    }
  }, [customer, open]);

  // ✅ Reset form ketika dialog ditutup
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
    }
    onOpenChange(newOpen);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name as keyof EditCustomerForm]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer) return;

    setErrors({});

    // ✅ Validasi menggunakan Zod
    const validation = editCustomerSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof EditCustomerForm, string>> = {};
      validation.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof EditCustomerForm;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    try {
      // ✅ Prepare data untuk API - hanya kirim field yang diubah dan tidak kosong
      const updateData: {
        name?: string;
        email?: string;
        phone?: string;
        password?: string;
      } = {};

      // Hanya kirim name jika diubah dan tidak kosong
      if (formData.name && formData.name.trim().length > 0) {
        updateData.name = formData.name;
      }

      // Hanya kirim email jika diubah dan tidak kosong
      if (formData.email && formData.email.trim().length > 0) {
        updateData.email = formData.email;
      }

      // Hanya kirim phone jika diubah dan tidak kosong
      if (formData.phone && formData.phone.trim().length > 0) {
        updateData.phone = formData.phone;
      }

      // Hanya kirim password jika diisi
      if (formData.password && formData.password.trim().length > 0) {
        updateData.password = formData.password;
      }

      // ✅ Cek apakah ada perubahan
      if (Object.keys(updateData).length === 0) {
        toast.info("Tidak ada perubahan yang disimpan", {
          description: "Silakan ubah setidaknya satu field",
        });
        setLoading(false);
        return;
      }

      const response = await customerService.editCustomer(
        customer._id,
        updateData
      );

      if (response?.success) {
        toast.success("Customer berhasil diperbarui", {
          description: `Data ${customer.name} telah diperbarui`,
        });

        handleOpenChange(false);
        onSuccess();
      } else {
        throw new Error(response?.message || "Gagal memperbarui customer");
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);

      toast.error("Gagal memperbarui customer", {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!customer) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Customer</DialogTitle>
          <DialogDescription>
            Perbarui informasi customer. Kosongkan field yang tidak ingin
            diubah.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Name Field */}
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Nama Lengkap</Label>
              <Input
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                className={errors.name ? "border-red-500" : ""}
                disabled={loading}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="contoh@email.com"
                className={errors.email ? "border-red-500" : ""}
                disabled={loading}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Phone Field */}
            <div className="grid gap-2">
              <Label htmlFor="edit-phone">Nomor Telepon</Label>
              <Input
                id="edit-phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="08123456789"
                className={errors.phone ? "border-red-500" : ""}
                disabled={loading}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone}</p>
              )}
              <p className="text-xs text-gray-500">
                Opsional - isi jika ingin mengubah nomor telepon
              </p>
            </div>

            {/* Password Field */}
            <div className="grid gap-2">
              <Label htmlFor="edit-password">Password Baru</Label>
              <Input
                id="edit-password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimal 6 karakter"
                className={errors.password ? "border-red-500" : ""}
                disabled={loading}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
              <p className="text-xs text-gray-500">
                Opsional - kosongkan jika tidak ingin mengubah password
              </p>
            </div>

            {/* Confirm Password Field */}
            {formData.password && formData.password.length > 0 && (
              <div className="grid gap-2">
                <Label htmlFor="edit-confirmPassword">
                  Konfirmasi Password Baru
                </Label>
                <Input
                  id="edit-confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Ulangi password baru"
                  className={errors.confirmPassword ? "border-red-500" : ""}
                  disabled={loading}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={loading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
