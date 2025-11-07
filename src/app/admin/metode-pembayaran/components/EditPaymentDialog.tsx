"use client";

import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { paymentService } from "@/app/lib/services/payment.service";
import { getErrorMessage } from "@/app/lib/getErrorMessage";
import type { PaymentOption } from "@/app/lib/types/payment";

interface EditPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  paymentId: string;
}

export function EditPaymentDialog({
  open,
  onOpenChange,
  onSuccess,
  paymentId,
}: EditPaymentDialogProps) {
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentOption | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    type: "bank_transfer" as "bank_transfer" | "e_wallet",
    name: "",
    accountNumber: "",
    accountName: "",
    phoneNumber: "",
    walletName: "",
    isActive: true,
  });

  // Fetch payment method data by ID
  const fetchPaymentData = async () => {
    if (!paymentId) return;

    try {
      setFetchingData(true);
      const response = await paymentService.getPaymentMethodById(paymentId);

      if (response.success && response.data) {
        setPaymentData(response.data);

        // Populate form based on payment type
        if (response.data.type === "bank_transfer") {
          setFormData({
            type: "bank_transfer",
            name: response.data.name,
            accountNumber: response.data.accountNumber,
            accountName: response.data.accountName,
            phoneNumber: "",
            walletName: "",
            isActive: response.data.isActive,
          });
        } else {
          setFormData({
            type: "e_wallet",
            name: response.data.name,
            accountNumber: "",
            accountName: "",
            phoneNumber: response.data.phoneNumber,
            walletName: response.data.walletName,
            isActive: response.data.isActive,
          });
        }
      }
    } catch (error) {
      console.error("❌ Error fetching payment data:", error);
      const errorMessage = getErrorMessage(error);
      toast.error("Gagal memuat data metode pembayaran", {
        description: errorMessage || "Silakan coba lagi",
      });
      onOpenChange(false);
    } finally {
      setFetchingData(false);
    }
  };

  // Fetch data when dialog opens
  useEffect(() => {
    if (open && paymentId) {
      fetchPaymentData();
    }
  }, [open, paymentId]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setFormData({
        type: "bank_transfer",
        name: "",
        accountNumber: "",
        accountName: "",
        phoneNumber: "",
        walletName: "",
        isActive: true,
      });
      setPaymentData(null);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error("Nama harus diisi");
      return;
    }

    if (formData.type === "bank_transfer") {
      if (!formData.accountNumber.trim()) {
        toast.error("Nomor rekening harus diisi");
        return;
      }
      if (!formData.accountName.trim()) {
        toast.error("Nama pemilik rekening harus diisi");
        return;
      }
    } else {
      if (!formData.phoneNumber.trim()) {
        toast.error("Nomor telepon/wallet harus diisi");
        return;
      }
      if (!formData.walletName.trim()) {
        toast.error("Nama pemilik wallet harus diisi");
        return;
      }
    }

    try {
      setLoading(true);

      // Prepare request payload based on type
      const payload =
        formData.type === "bank_transfer"
          ? {
              type: "bank_transfer" as const,
              name: formData.name.trim(),
              accountNumber: formData.accountNumber.trim(),
              accountName: formData.accountName.trim(),
              isActive: formData.isActive,
            }
          : {
              type: "e_wallet" as const,
              name: formData.name.trim(),
              walletNumber: formData.phoneNumber.trim(),
              walletName: formData.walletName.trim(),
              isActive: formData.isActive,
            };

      const response = await paymentService.editPaymentMethod(
        paymentId,
        payload
      );

      if (response.success) {
        toast.success("Metode pembayaran berhasil diperbarui", {
          description: `${formData.name} telah diperbarui`,
        });
        onSuccess();
        onOpenChange(false);
      }
    } catch (error) {
      console.error("❌ Edit payment error:", error);
      const errorMessage = getErrorMessage(error);

      toast.error("Gagal memperbarui metode pembayaran", {
        description: errorMessage || "Silakan coba lagi atau hubungi admin",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Metode Pembayaran</DialogTitle>
          <DialogDescription>
            Perbarui informasi metode pembayaran. Klik simpan untuk menyimpan
            perubahan.
          </DialogDescription>
        </DialogHeader>

        {fetchingData ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              {/* Tipe Metode - Disabled (cannot change type) */}
              <div className="grid gap-2">
                <Label htmlFor="type">Tipe Metode Pembayaran</Label>
                <Select
                  value={formData.type}
                  disabled
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      type: value as "bank_transfer" | "e_wallet",
                    }))
                  }
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Pilih tipe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="e_wallet">E-Wallet</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Tipe tidak dapat diubah setelah dibuat
                </p>
              </div>

              {/* Nama Bank/E-Wallet */}
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Nama {formData.type === "bank_transfer" ? "Bank" : "E-Wallet"}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder={
                    formData.type === "bank_transfer"
                      ? "Contoh: BCA, Mandiri, BNI"
                      : "Contoh: GoPay, OVO, DANA"
                  }
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  disabled={loading}
                  required
                />
              </div>

              {/* Conditional Fields - Bank Transfer */}
              {formData.type === "bank_transfer" && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="accountNumber">
                      Nomor Rekening<span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="accountNumber"
                      placeholder="Contoh: 1234567890"
                      value={formData.accountNumber}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          accountNumber: e.target.value,
                        }))
                      }
                      disabled={loading}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="accountName">
                      Nama Pemilik Rekening
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="accountName"
                      placeholder="Contoh: PT Barbershop Indonesia"
                      value={formData.accountName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          accountName: e.target.value,
                        }))
                      }
                      disabled={loading}
                      required
                    />
                  </div>
                </>
              )}

              {/* Conditional Fields - E-Wallet */}
              {formData.type === "e_wallet" && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="phoneNumber">
                      Nomor Telepon/Wallet
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phoneNumber"
                      placeholder="Contoh: 081234567890"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          phoneNumber: e.target.value,
                        }))
                      }
                      disabled={loading}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="walletName">
                      Nama Pemilik Wallet<span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="walletName"
                      placeholder="Contoh: PT Barbershop Indonesia"
                      value={formData.walletName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          walletName: e.target.value,
                        }))
                      }
                      disabled={loading}
                      required
                    />
                  </div>
                </>
              )}

              {/* Status */}
              <div className="grid gap-2">
                <Label htmlFor="isActive">Status</Label>
                <Select
                  value={formData.isActive.toString()}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      isActive: value === "true",
                    }))
                  }
                  disabled={loading}
                >
                  <SelectTrigger id="isActive">
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Aktif</SelectItem>
                    <SelectItem value="false">Tidak Aktif</SelectItem>
                  </SelectContent>
                </Select>
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
        )}
      </DialogContent>
    </Dialog>
  );
}
