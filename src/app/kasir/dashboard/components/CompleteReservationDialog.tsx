"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Reservation } from "@/app/lib/types/reservation";

interface CompleteReservationDialogProps {
  reservation: Reservation | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (reservationId: string) => void;
}

export default function CompleteReservationDialog({
  reservation,
  open,
  onOpenChange,
  onConfirm,
}: CompleteReservationDialogProps) {
  if (!reservation) return null;

  const handleConfirm = () => {
    // Gunakan _id untuk API endpoint, bukan reservationId
    onConfirm(reservation._id);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Konfirmasi Penyelesaian Reservasi</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin ingin menandai reservasi ini sebagai{" "}
            <span className="font-semibold text-foreground">selesai</span>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Customer:</span>
              <span className="font-medium text-foreground">
                {reservation.customerName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Layanan:</span>
              <span className="font-medium text-foreground">
                {reservation.package?.name || "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Capster:</span>
              <span className="font-medium text-foreground">
                {reservation.barber?.name || "N/A"}
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Tindakan ini akan mengubah status reservasi menjadi{" "}
            <span className="font-semibold text-foreground">completed</span> dan
            tidak dapat dibatalkan.
          </p>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            Ya, Tandai Selesai
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
