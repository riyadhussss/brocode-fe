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
import { AlertTriangle } from "lucide-react";

interface ConfirmSaveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export function ConfirmSaveDialog({
  open,
  onOpenChange,
  onConfirm,
  isLoading,
}: ConfirmSaveDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <AlertDialogTitle>Konfirmasi Perubahan</AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            Apakah Anda yakin ingin mengubah profil? Perubahan yang dilakukan
            akan tersimpan dan mempengaruhi informasi akun Anda.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={isLoading}
            className="bg-[#FDFB03] hover:bg-yellow-400 text-black"
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Menyimpan...
              </>
            ) : (
              "Ya, Simpan"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
