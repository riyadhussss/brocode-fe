"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { paymentService } from "@/app/lib/services/payment.service";
import { getErrorMessage } from "@/app/lib/getErrorMessage";
import type { PaymentMethodRowData } from "../../columns";

export function usePaymentMethods() {
  const [paymentData, setPaymentData] = useState<PaymentMethodRowData[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data metode pembayaran dari API
  const fetchPaymentMethodsData = async () => {
    try {
      setLoading(true);

      // Fetch data dari API
      const response = await paymentService.getPaymentMethods();

      // Transform data dari API ke format tabel menggunakan response.data.all
      const transformedData: PaymentMethodRowData[] = response.data.all.map(
        (option) => ({
          _id: option._id,
          bankName: option.name, // Nama bank/e-wallet
          type:
            option.type === "bank_transfer"
              ? ("bank" as const)
              : ("e-wallet" as const),
          accountNumber:
            option.type === "bank_transfer"
              ? option.accountNumber
              : option.phoneNumber,
          accountHolder:
            option.type === "bank_transfer"
              ? option.accountName
              : option.walletName,
          isActive: option.isActive ?? true, // Default true jika undefined
        })
      );

      setPaymentData(transformedData);
      toast.success(
        `Data metode pembayaran berhasil dimuat (${transformedData.length} metode)`
      );
    } catch (error) {
      console.error("❌ Payment methods fetch error:", error);
      const errorMessage = getErrorMessage(error);

      setPaymentData([]);
      toast.error("Gagal memuat data metode pembayaran", {
        description:
          errorMessage || "Silakan coba lagi atau hubungi administrator",
      });
    } finally {
      setLoading(false);
    }
  };

  // Load data saat komponen mount
  useEffect(() => {
    fetchPaymentMethodsData();
  }, []);

  // Calculate stats
  const totalBank = paymentData.filter((p) => p.type === "bank").length;
  const totalEWallet = paymentData.filter((p) => p.type === "e-wallet").length;

  return {
    paymentData,
    loading,
    totalBank,
    totalEWallet,
    refetch: fetchPaymentMethodsData,
  };
}
