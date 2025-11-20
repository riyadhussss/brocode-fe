import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Package } from "@/app/lib/types/package";
import { Barber } from "@/app/lib/types/capster";

interface ServiceSelectionSectionProps {
  packageId: string;
  barberId: string;
  packages: Package[];
  barbers: Barber[];
  onSelectChange: (name: string, value: string) => void;
  formatCurrency: (amount: number) => string;
}

export default function ServiceSelectionSection({
  packageId,
  barberId,
  packages,
  barbers,
  onSelectChange,
  formatCurrency,
}: ServiceSelectionSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Pilih Layanan</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="packageId">
            Paket Layanan <span className="text-red-500">*</span>
          </Label>
          <Select
            value={packageId}
            onValueChange={(value) => onSelectChange("packageId", value)}
          >
            <SelectTrigger id="packageId">
              <SelectValue placeholder="Pilih paket layanan" />
            </SelectTrigger>
            <SelectContent>
              {packages.map((pkg) => (
                <SelectItem key={pkg._id} value={pkg._id}>
                  {pkg.name} - {formatCurrency(pkg.price)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="barberId">
            Tukang Pangkas <span className="text-red-500">*</span>
          </Label>
          <Select
            value={barberId}
            onValueChange={(value) => onSelectChange("barberId", value)}
          >
            <SelectTrigger id="barberId">
              <SelectValue placeholder="Pilih tukang pangkas" />
            </SelectTrigger>
            <SelectContent>
              {barbers.map((barber) => (
                <SelectItem key={barber._id} value={barber._id}>
                  {barber.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
