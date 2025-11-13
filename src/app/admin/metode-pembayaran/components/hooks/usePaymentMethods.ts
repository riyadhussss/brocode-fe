"use client";

import { useState, useEffect, useCallback } from "react";
import { paymentService } from "@/app/lib/services/payment.service";
import { toast } from "sonner";
import { getErrorMessage } from "@/app/lib/getErrorMessage";
import type { PaymentMethodRowData } from "../PaymentTableColumns";

export function usePaymentMethods() {
  const [paymentData, setPaymentData] = useState<PaymentMethodRowData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPaymentMethods = useCallback(async () => {
    try {
      setLoading(true);

      const response = await paymentService.getPaymentMethods();

      if (response.success && response.data) {
        const { bank_transfer = [], e_wallet = [] } = response.data.grouped;

        // Transform bank accounts
        const transformedBanks: PaymentMethodRowData[] = bank_transfer.map(
          (bank) => ({
            _id: bank._id,
            type: "bank" as const,
            bankName: bank.name,
            accountNumber: bank.accountNumber,
            accountHolder: bank.accountName,
            isActive: bank.isActive,
          })
        );

        // Transform e-wallets
        const transformedEWallets: PaymentMethodRowData[] = e_wallet.map(
          (ewallet) => ({
            _id: ewallet._id,
            type: "e-wallet" as const,
            bankName: ewallet.name,
            accountNumber: ewallet.phoneNumber,
            accountHolder: ewallet.walletName,
            isActive: ewallet.isActive,
          })
        );

        // Combine both arrays
        const combinedData = [...transformedBanks, ...transformedEWallets];
        setPaymentData(combinedData);
      } else {
        // Jika tidak ada data atau response gagal, set ke array kosong
        setPaymentData([]);
      }
    } catch (error) {
      console.error("Error fetching payment methods:", error);
      const errorMessage = getErrorMessage(error);
      toast.error(`Gagal memuat data: ${errorMessage}`);
      // Set ke array kosong saat error
      setPaymentData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPaymentMethods();
  }, [fetchPaymentMethods]);

  // Calculate totals
  const totalBank = paymentData.filter((p) => p.type === "bank").length;
  const totalEWallet = paymentData.filter((p) => p.type === "e-wallet").length;

  return {
    paymentData,
    loading,
    totalBank,
    totalEWallet,
    refetch: fetchPaymentMethods,
  };
}
