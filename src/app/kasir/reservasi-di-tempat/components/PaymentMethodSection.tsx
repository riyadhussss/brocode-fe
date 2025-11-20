import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaymentMethodSectionProps {
  paymentMethod: string;
  onSelectChange: (name: string, value: string) => void;
}

export default function PaymentMethodSection({
  paymentMethod,
  onSelectChange,
}: PaymentMethodSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Metode Pembayaran</h3>
      <div className="space-y-2">
        <Label htmlFor="paymentMethod">
          Metode Pembayaran <span className="text-red-500">*</span>
        </Label>
        <Select
          value={paymentMethod}
          onValueChange={(value) => onSelectChange("paymentMethod", value)}
        >
          <SelectTrigger id="paymentMethod">
            <SelectValue placeholder="Pilih metode pembayaran" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cash">Cash</SelectItem>
            <SelectItem value="bank_transfer">Transfer Bank</SelectItem>
            <SelectItem value="qris">QRIS</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
