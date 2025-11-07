"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CreditCard, RefreshCw, Building2, Wallet } from "lucide-react";
import { DataTable } from "./data-table";
import { createColumns, PaymentMethodRowData } from "./columns";
import { toast } from "sonner";
import { getErrorMessage } from "@/app/lib/getErrorMessage";
import { paymentService } from "@/app/lib/services/payment.service";

export default function MetodePembayaran() {
  const [paymentData, setPaymentData] = useState<PaymentMethodRowData[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data metode pembayaran dari API
  const fetchPaymentMethodsData = async () => {
    try {
      setLoading(true);

      // Fetch data dari API
      const response = await paymentService.getPaymentMethods();

      // Transform data dari API ke format tabel
      const transformedData: PaymentMethodRowData[] = [
        // Bank Accounts
        ...response.data.bankAccounts.map((bank) => ({
          _id: bank.id,
          bankName: bank.bankName,
          type: "bank" as const,
          accountNumber: bank.accountNumber,
          accountHolder: bank.accountHolderName,
        })),
        // E-Wallets
        ...response.data.eWallets.map((ewallet) => ({
          _id: ewallet.id,
          bankName: ewallet.displayName || ewallet.name,
          type: "e-wallet" as const,
          accountNumber: ewallet.walletNumber,
          accountHolder: ewallet.walletName,
        })),
      ];

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

  // Refresh data
  const handleRefresh = () => {
    fetchPaymentMethodsData();
  };

  // Calculate stats
  const totalBank = paymentData.filter((p) => p.type === "bank").length;
  const totalEWallet = paymentData.filter((p) => p.type === "e-wallet").length;

  // Create columns
  const columns = useMemo(() => createColumns(), []);

  return (
    <div className="h-full bg-gray-50 p-6 flex flex-col">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Metode Pembayaran
            </h1>
            <p className="text-gray-600 text-sm">
              Kelola metode pembayaran sistem
            </p>
          </div>
          <Button onClick={handleRefresh} variant="outline" disabled={loading}>
            <RefreshCw
              className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </div>

      {/* Main Content - Stats Cards dan DataTable dalam satu container */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 flex-shrink-0">
          {/* Total Metode */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Metode
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <>
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-3 w-32" />
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold">{paymentData.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Metode pembayaran
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          {/* Total Bank */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bank</CardTitle>
              <Building2 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <>
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-3 w-32" />
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold text-blue-600">
                    {totalBank}
                  </div>
                  <p className="text-xs text-muted-foreground">Rekening bank</p>
                </>
              )}
            </CardContent>
          </Card>

          {/* Total E-Wallet */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">E-Wallet</CardTitle>
              <Wallet className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <>
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-3 w-32" />
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold text-green-600">
                    {totalEWallet}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Dompet digital
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card className="flex-1 flex flex-col">
          <CardHeader className="flex-shrink-0">
            <CardTitle>Daftar Metode Pembayaran</CardTitle>
            <CardDescription>
              Berikut adalah daftar semua metode pembayaran yang tersedia dalam
              sistem
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0">
            {loading ? (
              <div className="space-y-4">
                {/* Search and buttons skeleton */}
                <div className="flex items-center justify-between">
                  <Skeleton className="h-10 w-96" />
                </div>
                {/* Table skeleton */}
                <div className="border rounded-md">
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                </div>
                {/* Pagination skeleton */}
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-32" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              </div>
            ) : (
              <DataTable columns={columns} data={paymentData} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
