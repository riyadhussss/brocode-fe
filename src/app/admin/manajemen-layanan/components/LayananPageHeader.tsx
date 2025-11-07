import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface LayananPageHeaderProps {
  loading?: boolean;
  onRefresh: () => void;
}

export function LayananPageHeader({
  loading = false,
  onRefresh,
}: LayananPageHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Manajemen Layanan
          </h1>
          <p className="text-gray-600 text-sm">
            Kelola layanan dan paket barbershop
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
