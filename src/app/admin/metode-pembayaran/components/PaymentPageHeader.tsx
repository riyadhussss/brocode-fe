"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface PaymentPageHeaderProps {
  onRefresh: () => void;
  loading: boolean;
}

export function PaymentPageHeader({
  onRefresh,
  loading,
}: PaymentPageHeaderProps) {
  return (
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
        <Button onClick={onRefresh} variant="outline" disabled={loading}>
          <RefreshCw
            className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>
    </div>
  );
}
