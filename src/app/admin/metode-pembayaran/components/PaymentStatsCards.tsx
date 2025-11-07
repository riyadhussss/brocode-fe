"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CreditCard, Building2, Wallet } from "lucide-react";

interface PaymentStatsCardsProps {
  loading: boolean;
  totalMethods: number;
  totalBank: number;
  totalEWallet: number;
}

export function PaymentStatsCards({
  loading,
  totalMethods,
  totalBank,
  totalEWallet,
}: PaymentStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 flex-shrink-0">
      {/* Total Metode */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Metode</CardTitle>
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
              <div className="text-2xl font-bold">{totalMethods}</div>
              <p className="text-xs text-muted-foreground">Metode pembayaran</p>
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
              <p className="text-xs text-muted-foreground">Dompet digital</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
