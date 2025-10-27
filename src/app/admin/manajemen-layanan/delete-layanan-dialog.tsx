"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { packageService } from "@/app/lib/services/package.service";
import { getErrorMessage } from "@/app/lib/getErrorMessage";
import type { LayananRowData } from "./columns";

interface DeleteLayananDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  layanan: LayananRowData | null;
  onSuccess?: () => void;
}

export function DeleteLayananDialog({
  open,
  onOpenChange,
  layanan,
  onSuccess,
}: DeleteLayananDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!layanan) return;

    setLoading(true);

    try {
      await packageService.deletePackage(layanan._id);

      toast.success("Layanan berhasil dihapus!");
      onOpenChange(false);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!layanan) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <AlertDialogTitle>Hapus Layanan</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-left pt-3">
            Apakah Anda yakin ingin menghapus layanan{" "}
            <span className="font-semibold text-gray-900">{layanan.name}</span>?
            <br />
            <br />
            Tindakan ini tidak dapat dibatalkan dan semua data terkait layanan
            ini akan dihapus secara permanen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            Batal
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Menghapus..." : "Ya, Hapus"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
