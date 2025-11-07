"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function PaymentTableSkeleton() {
  return (
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
  );
}
