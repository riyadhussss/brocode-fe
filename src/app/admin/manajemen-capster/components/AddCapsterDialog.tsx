"use client";

import { useState } from "react";
import Image from "next/image";
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
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { capsterService } from "@/app/lib/services/capster.service";
import { getErrorMessage } from "@/app/lib/getErrorMessage";

interface AddCapsterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

type CapsterFormData = {
  name: string;
  phone: string;
  photo: File | null;
};

interface FormErrors {
  name?: string;
  phone?: string;
  photo?: string;
}

export function AddCapsterDialog({
  open,
  onOpenChange,
  onSuccess,
}: AddCapsterDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CapsterFormData>({
    name: "",
    phone: "",
    photo: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validasi nama
    if (!formData.name.trim()) {
      newErrors.name = "Nama capster harus diisi";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Nama capster minimal 3 karakter";
    }

    // Validasi nomor HP
    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor HP harus diisi";
    } else if (!/^[0-9]{10,13}$/.test(formData.phone.trim())) {
      newErrors.phone = "Nomor HP harus 10-13 digit angka";
    }

    // Validasi foto
    if (!formData.photo) {
      newErrors.photo = "Foto harus diupload";
    } else {
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!validTypes.includes(formData.photo.type)) {
        newErrors.photo = "Format foto harus jpg, jpeg, png, gif, atau webp";
      } else if (formData.photo.size > 5 * 1024 * 1024) {
        // Max 5MB
        newErrors.photo = "Ukuran foto maksimal 5MB";
      }
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
      // Create FormData untuk mengirim file ke backend
      const formDataToSend = new globalThis.FormData();
      formDataToSend.append("name", formData.name.trim());
      formDataToSend.append("phone", formData.phone.trim());

      if (formData.photo) {
        formDataToSend.append("photo", formData.photo);
      }

      await capsterService.addCapster(formDataToSend);

      toast.success("Capster berhasil ditambahkan!");

      // Reset form
      setFormData({
        name: "",
        phone: "",
        photo: null,
      });
      setPreviewUrl("");
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Only handle text inputs (name and phone), not file input
    if (name === "name" || name === "phone") {
      setFormData(
        (prev: CapsterFormData): CapsterFormData => ({
          ...prev,
          [name]: value,
        })
      );

      // Clear error saat user mulai mengetik
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Validasi file type
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];

      if (!validTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          photo: "Format foto harus jpg, jpeg, png, gif, atau webp",
        }));
        return;
      }

      // Validasi file size
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          photo: "Ukuran foto maksimal 5MB",
        }));
        return;
      }

      // Set file ke form data
      setFormData((prev) => ({ ...prev, photo: file }));

      // Create preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Clear error
      setErrors((prev) => ({ ...prev, photo: undefined }));
    }
  };

  const handleClearPhoto = () => {
    setFormData((prev) => ({ ...prev, photo: null }));
    setPreviewUrl("");
    setErrors((prev) => ({ ...prev, photo: undefined }));

    // Reset file input
    const fileInput = document.getElementById("photo") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !loading) {
      // Reset form saat dialog ditutup
      setFormData({
        name: "",
        phone: "",
        photo: null,
      });
      setPreviewUrl("");
      setErrors({});

      // Reset file input
      const fileInput = document.getElementById("photo") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Tambah Capster Baru</DialogTitle>
            <DialogDescription>
              Isi formulir di bawah ini untuk menambahkan capster baru.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Nama Capster */}
            <div className="grid gap-2">
              <Label htmlFor="name">
                Nama Capster <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Contoh: Ahmad Rizki"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Nomor HP */}
            <div className="grid gap-2">
              <Label htmlFor="phone">
                Nomor HP <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="08123456789"
                value={formData.phone}
                onChange={handleChange}
                disabled={loading}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            {/* Upload Foto */}
            <div className="grid gap-2">
              <Label htmlFor="photo">
                Foto Capster <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    id="photo"
                    name="photo"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    onChange={handleFileChange}
                    disabled={loading}
                    className={errors.photo ? "border-red-500" : ""}
                  />
                </div>
                {formData.photo && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleClearPhoto}
                    disabled={loading}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {errors.photo && (
                <p className="text-sm text-red-500">{errors.photo}</p>
              )}
              {formData.photo && !errors.photo && (
                <p className="text-sm text-gray-500">
                  File: {formData.photo.name} (
                  {(formData.photo.size / 1024).toFixed(2)} KB)
                </p>
              )}

              {/* Preview Foto */}
              {previewUrl && !errors.photo && (
                <div className="mt-2 p-4 border rounded-lg bg-gray-50">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Preview Foto:
                  </p>
                  <div className="flex justify-center">
                    <div className="relative h-32 w-32">
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
                        className="object-cover rounded-lg border-2 border-gray-200"
                      />
                    </div>
                  </div>
                </div>
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
              {loading ? "Menambahkan..." : "Tambah Capster"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
