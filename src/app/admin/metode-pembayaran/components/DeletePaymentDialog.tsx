"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2, AlertTriangle } from "lucide-react";
import { paymentService } from "@/app/lib/services/payment.service";
import { getErrorMessage } from "@/app/lib/getErrorMessage";

interface DeletePaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  paymentId: string;
  paymentName: string;
}

export function DeletePaymentDialog({
  open,
  onOpenChange,
  onSuccess,
  paymentId,
  paymentName,
}: DeletePaymentDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const response = await paymentService.deletePaymentMethod(paymentId);

      if (response.success) {
        toast.success("Metode pembayaran berhasil dihapus", {
          description: `${paymentName} telah dihapus dari sistem`,
        });
        onSuccess();
        onOpenChange(false);
      }
    } catch (error) {
      console.error("❌ Delete payment error:", error);
      const errorMessage = getErrorMessage(error);

      toast.error("Gagal menghapus metode pembayaran", {
        description: errorMessage || "Silakan coba lagi atau hubungi admin",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <DialogTitle>Hapus Metode Pembayaran</DialogTitle>
              <DialogDescription>
                Tindakan ini tidak dapat dibatalkan
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-gray-600">
            Apakah Anda yakin ingin menghapus metode pembayaran{" "}
            <span className="font-semibold text-gray-900">{paymentName}</span>?
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Metode pembayaran ini akan dihapus secara permanen dari sistem.
          </p>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Batal
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menghapus...
              </>
            ) : (
              "Hapus"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
