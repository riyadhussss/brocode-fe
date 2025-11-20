"use client";

import React, { useState, useEffect } from "react";
import { Package } from "@/app/lib/types/package";
import { BankAccountCustomer, EWalletCustomer } from "@/app/lib/types/payment";
import { paymentService } from "@/app/lib/services/payment.service";
import { toast } from "sonner";
import { getErrorMessage } from "@/app/lib/getErrorMessage";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Upload, Building2, Wallet } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Step5Props {
  selectedPackage: Package | undefined;
  reservationId: string;
  isBookingForSelf: boolean; // 🆕 Tambahkan prop ini
  onSubmit: () => void;
}

type PaymentMethodType = "bank_transfer" | "e_wallet" | "";
type PaymentMethodUnion = BankAccountCustomer | EWalletCustomer;

export default function Step5Payment({
  selectedPackage,
  reservationId,
  isBookingForSelf, // 🆕 Destructure prop ini
  onSubmit,
}: Step5Props) {
  const [paymentType, setPaymentType] = useState<PaymentMethodType>("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");
  const [bankAccounts, setBankAccounts] = useState<BankAccountCustomer[]>([]);
  const [eWallets, setEWallets] = useState<EWalletCustomer[]>([]);
  const [isLoadingPayments, setIsLoadingPayments] = useState(true);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch payment methods on component mount
  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    setIsLoadingPayments(true);
    try {
      const response = await paymentService.getPaymentMethodsForCustomer();
      if (response.success && response.data) {
        setBankAccounts(response.data.bankAccounts);
        setEWallets(response.data.eWallets);
      } else {
        toast.error("Gagal memuat metode pembayaran");
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsLoadingPayments(false);
    }
  };

  // Get filtered payment methods based on type
  const getFilteredPaymentMethods = (): PaymentMethodUnion[] => {
    if (!paymentType) return [];
    if (paymentType === "bank_transfer") return bankAccounts;
    return eWallets;
  };

  // Get selected payment method details
  const selectedMethodDetails = (() => {
    const allMethods = [...bankAccounts, ...eWallets];
    return allMethods.find((method) => method.id === selectedPaymentMethod);
  })();

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        toast.error("Format file tidak valid. Gunakan JPG, PNG, atau WEBP");
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error("Ukuran file terlalu besar. Maksimal 5MB");
        return;
      }

      setProofFile(file);
      toast.success("File berhasil dipilih");
    }
  };

  // Handle payment confirmation
  const handleConfirmPayment = async () => {
    if (!paymentType) {
      toast.error("Pilih tipe pembayaran terlebih dahulu");
      return;
    }

    if (!selectedPaymentMethod) {
      toast.error("Pilih metode pembayaran terlebih dahulu");
      return;
    }

    if (!proofFile) {
      toast.error("Upload bukti pembayaran terlebih dahulu");
      return;
    }

    if (!selectedMethodDetails) {
      toast.error("Detail metode pembayaran tidak ditemukan");
      return;
    }

    if (!reservationId) {
      toast.error("Reservation ID tidak ditemukan");
      return;
    }

    // 🆕 Construct selectedAccount based on payment type
    const selectedAccount =
      paymentType === "bank_transfer" && "bankName" in selectedMethodDetails
        ? {
            bankName: selectedMethodDetails.bankName,
            accountNumber: selectedMethodDetails.accountNumber,
            accountName: selectedMethodDetails.accountName,
          }
        : paymentType === "e_wallet" && "walletType" in selectedMethodDetails
        ? {
            walletType: selectedMethodDetails.walletType,
            walletNumber: selectedMethodDetails.walletNumber,
            walletName: selectedMethodDetails.walletName,
          }
        : {};

    // Debug log
    console.log("=== PAYMENT DEBUG ===");
    console.log("isBookingForSelf:", isBookingForSelf);
    console.log(
      "bookingType yang akan dikirim:",
      isBookingForSelf ? "self" : "other"
    );
    console.log("reservationId:", reservationId);
    console.log("selectedAccount:", selectedAccount);
    console.log("===================");

    try {
      setIsUploading(true);
      const response = await paymentService.uploadPaymentProof({
        reservationId,
        paymentMethod: paymentType,
        selectedAccount,
        paymentProof: proofFile,
      });

      if (response.success) {
        toast.success(
          response.message || "Bukti pembayaran berhasil diupload!"
        );
        onSubmit();
      } else {
        toast.error("Gagal mengupload bukti pembayaran");
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  // Reset selected method when type changes
  useEffect(() => {
    setSelectedPaymentMethod("");
  }, [paymentType]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Pembayaran</h2>

      {/* Payment Method Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Pilih Metode Pembayaran</h3>

        {/* Payment Type Selection */}
        <div className="space-y-2">
          <Label htmlFor="payment-type">Tipe Pembayaran</Label>
          {isLoadingPayments ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Select
              value={paymentType}
              onValueChange={(value: any) => setPaymentType(value)}
            >
              <SelectTrigger id="payment-type">
                <SelectValue placeholder="Pilih tipe pembayaran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank_transfer">
                  <div className="flex items-center">
                    <Building2 className="mr-2 h-4 w-4" />
                    Transfer Bank
                  </div>
                </SelectItem>
                <SelectItem value="e_wallet">
                  <div className="flex items-center">
                    <Wallet className="mr-2 h-4 w-4" />
                    E-Wallet
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Specific Payment Method Selection */}
        {paymentType && (
          <div className="space-y-2">
            <Label htmlFor="payment-method">
              {paymentType === "bank_transfer"
                ? "Pilih Bank"
                : "Pilih E-Wallet"}
            </Label>
            {isLoadingPayments ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Select
                value={selectedPaymentMethod}
                onValueChange={setSelectedPaymentMethod}
              >
                <SelectTrigger id="payment-method">
                  <SelectValue
                    placeholder={
                      paymentType === "bank_transfer"
                        ? "Pilih bank"
                        : "Pilih e-wallet"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {getFilteredPaymentMethods().map((method) => (
                    <SelectItem key={method.id} value={method.id}>
                      {method.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        )}
      </div>

      {/* Payment Details */}
      {selectedMethodDetails && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6 space-y-3">
            <h4 className="font-semibold text-lg">Detail Pembayaran</h4>

            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-600">
                  Nama {paymentType === "bank_transfer" ? "Bank" : "E-Wallet"}
                </p>
                <p className="font-semibold text-lg">
                  {selectedMethodDetails.name}
                </p>
              </div>

              {paymentType === "bank_transfer" &&
                "accountNumber" in selectedMethodDetails && (
                  <>
                    <div>
                      <p className="text-sm text-gray-600">Nomor Rekening</p>
                      <p className="font-mono font-semibold text-lg">
                        {selectedMethodDetails.accountNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Atas Nama</p>
                      <p className="font-semibold">
                        {selectedMethodDetails.accountName}
                      </p>
                    </div>
                  </>
                )}

              {paymentType === "e_wallet" &&
                "walletNumber" in selectedMethodDetails && (
                  <>
                    <div>
                      <p className="text-sm text-gray-600">
                        Nomor {selectedMethodDetails.walletName}
                      </p>
                      <p className="font-mono font-semibold text-lg">
                        {selectedMethodDetails.walletNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Atas Nama</p>
                      <p className="font-semibold">
                        {selectedMethodDetails.walletName}
                      </p>
                    </div>
                  </>
                )}

              <div className="pt-2 border-t border-blue-300">
                <p className="text-sm text-gray-600">
                  Total yang harus dibayar
                </p>
                <p className="font-bold text-2xl text-black">
                  Rp {selectedPackage?.price.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Proof */}
      {selectedMethodDetails && (
        <div className="space-y-4">
          <h4 className="font-semibold">Upload Bukti Pembayaran</h4>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#FDFB03] transition-colors">
            <input
              type="file"
              id="proof-upload"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="proof-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="h-12 w-12 text-gray-400 mb-2" />
              <p className="text-sm font-medium mb-1">
                {proofFile
                  ? proofFile.name
                  : "Klik untuk upload bukti pembayaran"}
              </p>
              <p className="text-xs text-gray-500">
                Format: JPG, PNG, WEBP (Max 5MB)
              </p>
            </label>
          </div>

          {proofFile && (
            <div className="text-sm text-green-600 flex items-center justify-center">
              ✓ File siap diupload: {proofFile.name} (
              {(proofFile.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          )}
        </div>
      )}

      {/* Confirmation Button */}
      <div className="space-y-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <strong>Catatan:</strong> Setelah melakukan pembayaran, upload bukti
            transfer/pembayaran Anda. Reservasi akan dikonfirmasi oleh admin
            setelah pembayaran diverifikasi.
          </p>
        </div>

        <Button
          onClick={handleConfirmPayment}
          disabled={!selectedMethodDetails || !proofFile || isUploading}
          className="w-full bg-[#FDFB03] text-black hover:bg-[#FDFB03]/80"
          size="lg"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Mengupload...
            </>
          ) : (
            "Konfirmasi Pembayaran"
          )}
        </Button>
      </div>
    </div>
  );
}
