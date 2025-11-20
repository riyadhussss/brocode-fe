import React, { useState } from "react";
import { Package } from "@/app/lib/types/package";
import { Barber } from "@/app/lib/types/capster";
import { reservationService } from "@/app/lib/services/reservation.service";
import { toast } from "sonner";
import { getErrorMessage } from "@/app/lib/getErrorMessage";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Step4Props {
  formData: {
    nama: string;
    nomorHP: string;
    email: string;
    capster: string;
    layanan: string;
    tanggal: string;
    waktu: string;
    catatan: string;
    scheduleId: string;
  };
  packages: Package[];
  capsters: Barber[];
  isBookingForSelf: boolean;
  onCatatanChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onReservationCreated: (reservationId: string) => void;
  onNextStep: () => void;
  onPreviousStep: () => void;
}

export default function Step4Confirmation({
  formData,
  packages,
  capsters,
  isBookingForSelf,
  onCatatanChange,
  onReservationCreated,
  onNextStep,
  onPreviousStep,
}: Step4Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedPackage = packages.find((pkg) => pkg._id === formData.layanan);
  const selectedCapster = capsters.find((cap) => cap._id === formData.capster);

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Find scheduleId from selected date and time
  const getScheduleId = () => {
    return formData.scheduleId;
  };

  const handleConfirmReservation = async () => {
    setIsSubmitting(true);

    try {
      // Prepare request body - including name, phone, email from Step 1
      const requestBody = {
        packageId: formData.layanan,
        barberId: formData.capster,
        scheduleId: formData.scheduleId,
        notes: formData.catatan || undefined,
        name: formData.nama,
        phone: formData.nomorHP,
        email: formData.email,
      };

      console.log("=== CREATE RESERVATION DEBUG ===");
      console.log("requestBody:", requestBody);
      console.log("================================");

      const response = await reservationService.addReservation(requestBody);

      console.log("=== RESERVATION CREATED ===");
      console.log("response:", response);
      console.log("reservation ID:", response.data?.reservation?._id);
      console.log("===========================");

      if (response.success && response.data?.reservation) {
        toast.success(response.message || "Reservasi berhasil dibuat!");

        // Pass reservation ID to parent component
        onReservationCreated(response.data.reservation._id);

        // Move to next step (Payment)
        onNextStep();
      } else {
        toast.error("Gagal membuat reservasi");
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Konfirmasi Reservasi</h2>

      {/* Summary Box */}
      <div className="bg-gray-50 p-6 rounded-lg space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Nama</p>
            <p className="font-semibold">{formData.nama || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Nomor HP</p>
            <p className="font-semibold">{formData.nomorHP || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-semibold">{formData.email || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Layanan</p>
            <p className="font-semibold">{selectedPackage?.name || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Capster</p>
            <p className="font-semibold">{selectedCapster?.name || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Tanggal</p>
            <p className="font-semibold">{formatDate(formData.tanggal)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Waktu</p>
            <p className="font-semibold">{formData.waktu || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Harga</p>
            <p className="font-semibold text-black text-xl">
              Rp{selectedPackage?.price.toLocaleString("id-ID") || "0"}
            </p>
          </div>
        </div>
      </div>

      {/* Catatan */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Catatan (Opsional)
        </label>
        <textarea
          name="catatan"
          value={formData.catatan}
          onChange={onCatatanChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDFB03]"
          placeholder="Tambahkan catatan jika ada"
          rows={4}
          disabled={isSubmitting}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          onClick={onPreviousStep}
          disabled={isSubmitting}
          variant="outline"
          size="lg"
        >
          Kembali
        </Button>

        <Button
          onClick={handleConfirmReservation}
          disabled={isSubmitting}
          className="flex-1 bg-[#FDFB03] text-black hover:bg-[#FDFB03]/80"
          size="lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Memproses...
            </>
          ) : (
            "Konfirmasi & Lanjut ke Pembayaran"
          )}
        </Button>
      </div>
    </div>
  );
}
