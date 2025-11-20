import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface FormActionButtonsProps {
  isLoading: boolean;
}

export default function FormActionButtons({
  isLoading,
}: FormActionButtonsProps) {
  const router = useRouter();

  return (
    <div className="flex gap-4 justify-end pt-4 border-t">
      <Button
        type="button"
        variant="outline"
        onClick={() => router.push("/kasir/dashboard")}
        disabled={isLoading}
      >
        Batal
      </Button>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Memproses..." : "Buat Reservasi"}
      </Button>
    </div>
  );
}
