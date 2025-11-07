import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LucideIcon } from "lucide-react";

interface DashboardStatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  loading?: boolean;
  formatNumber?: boolean;
}

export function DashboardStatsCard({
  title,
  value,
  icon: Icon,
  loading = false,
  formatNumber = false,
}: DashboardStatsCardProps) {
  const displayValue =
    typeof value === "number" && formatNumber ? value.toLocaleString() : value;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-16" />
        ) : (
          <div className="text-2xl font-bold">{displayValue}</div>
        )}
      </CardContent>
    </Card>
  );
}
