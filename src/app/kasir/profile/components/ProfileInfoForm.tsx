import { User, Mail } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ProfileInfoFormProps {
  formData: {
    name: string;
    email: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProfileInfoForm({ formData, onInputChange }: ProfileInfoFormProps) {
  return (
    <>
      {/* Nama Field */}
      <div className="space-y-2">
        <Label htmlFor="name" className="flex items-center space-x-2">
          <User className="h-4 w-4 text-gray-500" />
          <span>Nama Lengkap</span>
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={onInputChange}
          placeholder="Masukkan nama lengkap"
          required
          className="focus-visible:ring-[#FDFB03]"
        />
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center space-x-2">
          <Mail className="h-4 w-4 text-gray-500" />
          <span>Email</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onInputChange}
          placeholder="admin@brocode.com"
          required
          className="focus-visible:ring-[#FDFB03]"
        />
      </div>
    </>
  );
}
