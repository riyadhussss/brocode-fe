import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileFormSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-40 mb-2" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Nama Field Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Email Field Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-20 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Separator Skeleton */}
        <Skeleton className="h-px w-full my-6" />

        {/* Password Section Header Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-72" />
        </div>

        {/* Current Password Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-40 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* New Password Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Confirm Password Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-48 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Button Skeleton */}
        <div className="flex justify-end pt-4">
          <Skeleton className="h-10 w-40" />
        </div>
      </CardContent>
    </Card>
  );
}
