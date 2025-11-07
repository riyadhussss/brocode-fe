"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { packageService } from "@/app/lib/services/package.service";
import { getErrorMessage } from "@/app/lib/getErrorMessage";

interface AddLayananDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface FormData {
  name: string;
  price: string;
  description: string;
}

interface FormErrors {
  name?: string;
  price?: string;
  description?: string;
}

export function AddLayananDialog({
  open,
  onOpenChange,
  onSuccess,
}: AddLayananDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: "",
    description: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama layanan harus diisi";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Nama layanan minimal 3 karakter";
    }

    if (!formData.price) {
      newErrors.price = "Harga harus diisi";
    } else if (Number(formData.price) <= 0) {
      newErrors.price = "Harga harus lebih dari 0";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Deskripsi harus diisi";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Deskripsi minimal 10 karakter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await packageService.addPackage({
        name: formData.name.trim(),
        price: Number(formData.price),
        description: formData.description.trim(),
      });

      toast.success("Layanan berhasil ditambahkan!");

      // Reset form
      setFormData({
        name: "",
        price: "",
        description: "",
      });
      setErrors({});

      onOpenChange(false);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error saat user mulai mengetik
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !loading) {
      // Reset form saat dialog ditutup
      setFormData({
        name: "",
        price: "",
        description: "",
      });
      setErrors({});
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Tambah Layanan Baru</DialogTitle>
            <DialogDescription>
              Isi form di bawah untuk menambahkan layanan baru ke sistem.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Nama Layanan */}
            <div className="grid gap-2">
              <Label htmlFor="name">
                Nama Layanan <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Contoh: Basic Haircut"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Harga */}
            <div className="grid gap-2">
              <Label htmlFor="price">
                Harga (Rp) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="50000"
                value={formData.price}
                onChange={handleChange}
                disabled={loading}
                min="0"
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price}</p>
              )}
            </div>

            {/* Deskripsi */}
            <div className="grid gap-2">
              <Label htmlFor="description">
                Deskripsi <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Deskripsi lengkap tentang layanan..."
                value={formData.description}
                onChange={handleChange}
                disabled={loading}
                rows={4}
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>
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
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
