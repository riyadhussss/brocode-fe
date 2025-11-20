import React from "react";

export function CustomerTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-10 w-96 bg-gray-200 rounded animate-pulse" />
        <div className="flex gap-2">
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
      <div className="border rounded-md">
        <div className="p-4 space-y-3">
          <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="flex gap-2">
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
