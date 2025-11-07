"use client";

import { useState } from "react";
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
import type { AddPaymentMethodRequest } from "@/app/lib/types/payment";

interface AddPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

type PaymentType = "bank_transfer" | "e_wallet";

export function AddPaymentDialog({
  open,
  onOpenChange,
  onSuccess,
}: AddPaymentDialogProps) {
  const [loading, setLoading] = useState(false);
  const [paymentType, setPaymentType] = useState<PaymentType>("bank_transfer");

  // Form state untuk Bank Transfer
  const [bankForm, setBankForm] = useState({
    name: "",
    accountNumber: "",
    accountName: "",
  });

  // Form state untuk E-Wallet
  const [ewalletForm, setEwalletForm] = useState({
    name: "",
    phoneNumber: "",
    walletName: "",
  });

  const resetForm = () => {
    setBankForm({
      name: "",
      accountNumber: "",
      accountName: "",
    });
    setEwalletForm({
      name: "",
      phoneNumber: "",
      walletName: "",
    });
    setPaymentType("bank_transfer");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      let requestData: AddPaymentMethodRequest;

      if (paymentType === "bank_transfer") {
        // Validasi Bank Transfer
        if (!bankForm.name.trim()) {
          toast.error("Nama bank harus diisi");
          return;
        }
        if (!bankForm.accountNumber.trim()) {
          toast.error("Nomor rekening harus diisi");
          return;
        }
        if (!bankForm.accountName.trim()) {
          toast.error("Nama pemegang rekening harus diisi");
          return;
        }

        requestData = {
          type: "bank_transfer",
          name: bankForm.name.trim(),
          accountNumber: bankForm.accountNumber.trim(),
          accountName: bankForm.accountName.trim(),
          sortOrder: 0,
          isActive: true,
        };
      } else {
        // Validasi E-Wallet
        if (!ewalletForm.name.trim()) {
          toast.error("Nama e-wallet harus diisi");
          return;
        }
        if (!ewalletForm.phoneNumber.trim()) {
          toast.error("Nomor telepon harus diisi");
          return;
        }
        if (!ewalletForm.walletName.trim()) {
          toast.error("Nama pemilik e-wallet harus diisi");
          return;
        }

        requestData = {
          type: "e_wallet",
          name: ewalletForm.name.trim(),
          phoneNumber: ewalletForm.phoneNumber.trim(),
          walletName: ewalletForm.walletName.trim(),
          sortOrder: 0,
          isActive: true,
        };
      }

      const response = await paymentService.addPaymentMethod(requestData);

      if (response.success) {
        toast.success(
          response.message || "Metode pembayaran berhasil ditambahkan"
        );
        resetForm();
        onOpenChange(false);
        onSuccess();
      } else {
        toast.error(response.message || "Gagal menambahkan metode pembayaran");
      }
    } catch (error) {
      console.error("Error adding payment method:", error);
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Tambah Metode Pembayaran</DialogTitle>
            <DialogDescription>
              Tambahkan metode pembayaran baru untuk sistem
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Pilih Tipe Pembayaran */}
            <div className="grid gap-2">
              <Label htmlFor="paymentType">Tipe Pembayaran</Label>
              <Select
                value={paymentType}
                onValueChange={(value) => setPaymentType(value as PaymentType)}
                disabled={loading}
              >
                <SelectTrigger id="paymentType">
                  <SelectValue placeholder="Pilih tipe pembayaran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="e_wallet">E-Wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Form untuk Bank Transfer */}
            {paymentType === "bank_transfer" && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="bankName">
                    Nama Bank <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="bankName"
                    placeholder="Contoh: BCA, Mandiri, BNI"
                    value={bankForm.name}
                    onChange={(e) =>
                      setBankForm({ ...bankForm, name: e.target.value })
                    }
                    disabled={loading}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="accountNumber">
                    Nomor Rekening <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="accountNumber"
                    placeholder="Masukkan nomor rekening"
                    value={bankForm.accountNumber}
                    onChange={(e) =>
                      setBankForm({
                        ...bankForm,
                        accountNumber: e.target.value,
                      })
                    }
                    disabled={loading}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="accountName">
                    Nama Pemegang Rekening{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="accountName"
                    placeholder="Nama sesuai rekening"
                    value={bankForm.accountName}
                    onChange={(e) =>
                      setBankForm({ ...bankForm, accountName: e.target.value })
                    }
                    disabled={loading}
                    required
                  />
                </div>
              </>
            )}

            {/* Form untuk E-Wallet */}
            {paymentType === "e_wallet" && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="ewalletName">
                    Nama E-Wallet <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="ewalletName"
                    placeholder="Contoh: GoPay, OVO, Dana, ShopeePay"
                    value={ewalletForm.name}
                    onChange={(e) =>
                      setEwalletForm({ ...ewalletForm, name: e.target.value })
                    }
                    disabled={loading}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phoneNumber">
                    Nomor Telepon <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phoneNumber"
                    placeholder="08xxxxxxxxxx"
                    value={ewalletForm.phoneNumber}
                    onChange={(e) =>
                      setEwalletForm({
                        ...ewalletForm,
                        phoneNumber: e.target.value,
                      })
                    }
                    disabled={loading}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="walletName">
                    Nama Pemilik E-Wallet{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="walletName"
                    placeholder="Nama sesuai e-wallet"
                    value={ewalletForm.walletName}
                    onChange={(e) =>
                      setEwalletForm({
                        ...ewalletForm,
                        walletName: e.target.value,
                      })
                    }
                    disabled={loading}
                    required
                  />
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm();
                onOpenChange(false);
              }}
              disabled={loading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
