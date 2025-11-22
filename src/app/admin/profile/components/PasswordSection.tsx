import { useState } from "react";
import { Lock, Eye, EyeOff, KeyRound } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PasswordSectionProps {
  formData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PasswordSection({
  formData,
  onInputChange,
}: PasswordSectionProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <KeyRound className="h-5 w-5 text-[#FDFB03]" />
        <h3 className="text-lg font-semibold text-gray-900">Ubah Password</h3>
      </div>
      <p className="text-sm text-gray-600">
        Kosongkan jika tidak ingin mengubah password
      </p>

      {/* Current Password - Full Width */}
      <div className="space-y-2">
        <Label
          htmlFor="currentPassword"
          className="flex items-center space-x-2"
        >
          <Lock className="h-4 w-4 text-gray-500" />
          <span>Password Saat Ini</span>
        </Label>
        <div className="relative">
          <Input
            id="currentPassword"
            name="currentPassword"
            type={showCurrentPassword ? "text" : "password"}
            value={formData.currentPassword}
            onChange={onInputChange}
            placeholder="Masukkan password saat ini"
            className="pr-10 focus-visible:ring-[#FDFB03]"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            {showCurrentPassword ? (
              <EyeOff className="h-4 w-4 text-gray-500" />
            ) : (
              <Eye className="h-4 w-4 text-gray-500" />
            )}
          </Button>
        </div>
      </div>

      {/* New Password and Confirm Password Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* New Password */}
        <div className="space-y-2">
          <Label htmlFor="newPassword" className="flex items-center space-x-2">
            <Lock className="h-4 w-4 text-gray-500" />
            <span>Password Baru</span>
          </Label>
          <div className="relative">
            <Input
              id="newPassword"
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              value={formData.newPassword}
              onChange={onInputChange}
              placeholder="Masukkan password baru (min. 6 karakter)"
              className="pr-10 focus-visible:ring-[#FDFB03]"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <EyeOff className="h-4 w-4 text-gray-500" />
              ) : (
                <Eye className="h-4 w-4 text-gray-500" />
              )}
            </Button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="flex items-center space-x-2"
          >
            <Lock className="h-4 w-4 text-gray-500" />
            <span>Konfirmasi Password Baru</span>
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={onInputChange}
              placeholder="Konfirmasi password baru"
              className="pr-10 focus-visible:ring-[#FDFB03]"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-gray-500" />
              ) : (
                <Eye className="h-4 w-4 text-gray-500" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
