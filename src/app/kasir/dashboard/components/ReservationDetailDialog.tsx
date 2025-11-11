"use client";

import { useState } from "react";
import { PaymentRecord } from "@/app/lib/types/reservation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  User,
  Phone,
  Mail,
  Calendar,
  Clock,
  Scissors,
  CreditCard,
  FileText,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { paymentService } from "@/app/lib/services/payment.service";
import { toast } from "sonner";
import { getErrorMessage } from "@/app/lib/getErrorMessage";

interface ReservationDetailDialogProps {
  reservation: PaymentRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerificationSuccess?: () => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function ReservationDetailDialog({
  reservation,
  open,
  onOpenChange,
  onVerificationSuccess,
}: ReservationDetailDialogProps) {
  const [verificationNote, setVerificationNote] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  if (!reservation) return null;

  const handleVerifyPayment = async (status: "verified" | "rejected") => {
    if (!verificationNote.trim()) {
      toast.error("Catatan verifikasi harus diisi");
      return;
    }

    setIsVerifying(true);
    try {
      const response = await paymentService.verifyPayment(reservation._id, {
        status,
        verificationNote: verificationNote.trim(),
      });

      if (response.success) {
        toast.success(
          status === "verified"
            ? "Pembayaran berhasil diverifikasi!"
            : "Pembayaran ditolak"
        );
        setVerificationNote("");
        onOpenChange(false);
        if (onVerificationSuccess) {
          onVerificationSuccess();
        }
      } else {
        toast.error("Gagal memverifikasi pembayaran");
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsVerifying(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="default">Pending</Badge>;
      case "verified":
        return <Badge variant="success">Terverifikasi</Badge>;
      case "rejected":
        return <Badge variant="destructive">Ditolak</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getReservationStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="default">Pending</Badge>;
      case "confirmed":
        return <Badge variant="success">Terkonfirmasi</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Dibatalkan</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Detail Reservasi</DialogTitle>
          <DialogDescription>
            Informasi lengkap tentang reservasi dan pembayaran
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Reservation Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Informasi Reservasi
            </h3>
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Tanggal Dibuat</p>
                <p className="font-medium">
                  {format(
                    new Date(reservation.reservation.createdAt),
                    "dd MMMM yyyy, HH:mm",
                    { locale: id }
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Status Reservasi
                </p>
                {getReservationStatusBadge(reservation.reservation.status)}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Status Pembayaran
                </p>
                {getStatusBadge(reservation.status)}
              </div>
            </div>
          </div>

          <Separator />

          {/* Customer Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <User className="h-5 w-5" />
              Informasi Customer
            </h3>
            <div className="grid grid-cols-1 gap-3 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Nama</p>
                  <p className="font-medium">{reservation.customer.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">No. Telepon</p>
                  <p className="font-medium">{reservation.customer.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{reservation.customer.email}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Service Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Scissors className="h-5 w-5" />
              Layanan
            </h3>
            <div className="grid grid-cols-1 gap-3 p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Paket Layanan</p>
                <p className="font-semibold text-lg">
                  {reservation.reservation.package.name}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {reservation.reservation.package.description}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Harga</p>
                <p className="font-semibold text-lg text-primary">
                  {formatCurrency(reservation.reservation.package.price)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Capster</p>
                <p className="font-medium">
                  {reservation.reservation.barber.name}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Schedule Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Jadwal
            </h3>
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Tanggal</p>
                  <p className="font-medium">
                    {format(
                      new Date(reservation.reservation.schedule.scheduled_time),
                      "EEEE, dd MMMM yyyy",
                      { locale: id }
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Waktu</p>
                  <p className="font-medium">
                    {format(
                      new Date(reservation.reservation.schedule.scheduled_time),
                      "HH:mm",
                      { locale: id }
                    )}{" "}
                    WIB
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Payment Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Informasi Pembayaran
            </h3>
            <div className="grid grid-cols-1 gap-3 p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">
                  Metode Pembayaran
                </p>
                <p className="font-medium">
                  {reservation.paymentMethod === "bank_transfer"
                    ? "Transfer Bank"
                    : "E-Wallet"}
                </p>
              </div>

              {/* Bank Transfer Details */}
              {reservation.paymentMethod === "bank_transfer" &&
                reservation.bankAccount && (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">Bank</p>
                      <p className="font-medium">
                        {reservation.bankAccount.bankName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Nomor Rekening
                      </p>
                      <p className="font-medium">
                        {reservation.bankAccount.accountNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Nama Pemilik Rekening
                      </p>
                      <p className="font-medium">
                        {reservation.bankAccount.accountName}
                      </p>
                    </div>
                  </>
                )}

              {/* E-Wallet Details */}
              {reservation.paymentMethod === "e_wallet" &&
                reservation.eWallet && (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Tipe E-Wallet
                      </p>
                      <p className="font-medium">
                        {reservation.eWallet.walletType}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Nomor</p>
                      <p className="font-medium">
                        {reservation.eWallet.walletNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Nama</p>
                      <p className="font-medium">
                        {reservation.eWallet.walletName}
                      </p>
                    </div>
                  </>
                )}

              <div className="pt-2 border-t">
                <p className="text-sm text-muted-foreground">
                  Total Pembayaran
                </p>
                <p className="font-bold text-2xl text-primary">
                  {formatCurrency(reservation.amount)}
                </p>
              </div>
            </div>
          </div>

          {/* Proof of Payment */}
          {reservation.proofOfPayment && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Bukti Pembayaran</h3>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <img
                    src={reservation.proofOfPayment.url}
                    alt={reservation.proofOfPayment.originalName}
                    className="w-full rounded-lg border"
                  />

                </div>
              </div>
            </>
          )}

          {/* Verification Section - Only show if status is pending */}
          {reservation.status === "pending" && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Verifikasi Pembayaran</h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="verificationNote">
                      Catatan Verifikasi <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="verificationNote"
                      placeholder="Masukkan catatan verifikasi pembayaran..."
                      value={verificationNote}
                      onChange={(e) => setVerificationNote(e.target.value)}
                      className="mt-2"
                      rows={4}
                      disabled={isVerifying}
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button
                      onClick={() => handleVerifyPayment("verified")}
                      disabled={isVerifying || !verificationNote.trim()}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      {isVerifying ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <CheckCircle className="h-4 w-4 mr-2" />
                      )}
                      Terima Pembayaran
                    </Button>
                    <Button
                      onClick={() => handleVerifyPayment("rejected")}
                      disabled={isVerifying || !verificationNote.trim()}
                      variant="destructive"
                      className="flex-1"
                    >
                      {isVerifying ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <XCircle className="h-4 w-4 mr-2" />
                      )}
                      Tolak Pembayaran
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
