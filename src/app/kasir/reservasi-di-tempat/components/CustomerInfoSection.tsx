import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface CustomerInfoSectionProps {
  customerName: string;
  customerPhone: string;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function CustomerInfoSection({
  customerName,
  customerPhone,
  onInputChange,
}: CustomerInfoSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        Informasi Customer
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="customerName">
            Nama Customer <span className="text-red-500">*</span>
          </Label>
          <Input
            id="customerName"
            name="customerName"
            placeholder="Masukkan nama customer"
            value={customerName}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="customerPhone">
            Nomor HP <span className="text-red-500">*</span>
          </Label>
          <Input
            id="customerPhone"
            name="customerPhone"
            placeholder="08xxxxxxxxxx"
            value={customerPhone}
            onChange={onInputChange}
            required
          />
        </div>
      </div>
    </div>
  );
}
