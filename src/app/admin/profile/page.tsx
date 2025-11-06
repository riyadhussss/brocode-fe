"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  User,
  KeyRound,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { profileService } from "@/app/lib/services/profile.service";
import Cookies from "js-cookie";

// Interface untuk form data
interface FormData {
  name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function Profile() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Current admin data
  const [currentAdmin, setCurrentAdmin] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoadingData(true);

        const response = await profileService.getProfile();

        if (response.success && response.data) {
          const profileData = {
            name: response.data.name,
            email: response.data.email,
            role: response.data.role,
          };

          setCurrentAdmin(profileData);
          setFormData((prev) => ({
            ...prev,
            name: profileData.name,
            email: profileData.email,
          }));
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast.error("Gagal memuat data profil");
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Nama tidak boleh kosong");
      return false;
    }

    if (!formData.email) {
      toast.error("Email tidak boleh kosong");
      return false;
    }

    if (!formData.email.includes("@")) {
      toast.error("Format email tidak valid");
      return false;
    }

    if (formData.newPassword) {
      if (!formData.currentPassword) {
        toast.error("Password saat ini diperlukan untuk mengubah password");
        return false;
      }

      if (formData.newPassword.length < 6) {
        toast.error("Password baru minimal 6 karakter");
        return false;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        toast.error("Konfirmasi password tidak cocok");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Check if there are any changes
      const hasNameChange = formData.name !== currentAdmin.name;
      const hasEmailChange = formData.email !== currentAdmin.email;
      const hasPasswordChange = formData.newPassword !== "";

      if (!hasNameChange && !hasEmailChange && !hasPasswordChange) {
        toast.info("Tidak ada perubahan yang dilakukan");
        setIsLoading(false);
        return;
      }

      // Prepare update data (profileService requires all fields)
      const updateData = {
        name: formData.name,
        email: formData.email,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      };

      // Call API to update profile
      const response = await profileService.updateProfile(updateData);

      if (response.success && response.data) {
        toast.success("Profil berhasil diperbarui!");

        const updatedProfileData = {
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
        };

        // Update current admin data
        setCurrentAdmin(updatedProfileData);

        // Update cookies dengan data terbaru
        Cookies.set("name", response.data.name, { expires: 7 });
        Cookies.set("email", response.data.email, { expires: 7 });

        // Update formData dengan data terbaru dari server
        setFormData((prev) => ({
          ...prev,
          name: response.data!.name,
          email: response.data!.email,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      }
    } catch (error: any) {
      console.error("Update error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Terjadi kesalahan saat memperbarui profil";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full bg-gray-50 p-6 flex flex-col">
      <div className="max-w-3xl mx-auto w-full">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <ShieldCheck className="h-8 w-8 text-[#FDFB03]" />
            <h1 className="text-2xl font-bold text-gray-900">Profil</h1>
          </div>
          <p className="text-gray-600 text-sm">
            Kelola informasi profil dan keamanan Anda
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {isLoadingData ? (
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-64" />
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Nama Field Skeleton */}
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>

                {/* Email Field Skeleton */}
                <div className="space-y-2">
                  <Skeleton className="h-5 w-20 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>

                {/* Separator Skeleton */}
                <Skeleton className="h-px w-full my-6" />

                {/* Password Section Header Skeleton */}
                <div className="space-y-4">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-72" />
                </div>

                {/* Current Password Skeleton */}
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>

                {/* New Password Skeleton */}
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>

                {/* Confirm Password Skeleton */}
                <div className="space-y-2">
                  <Skeleton className="h-5 w-48 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>

                {/* Button Skeleton */}
                <div className="flex justify-end pt-4">
                  <Skeleton className="h-10 w-40" />
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-[#FDFB03]" />
                  <span>Informasi Profil</span>
                </CardTitle>
                <CardDescription>
                  Update informasi pribadi dan password profil Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nama Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="flex items-center space-x-2"
                    >
                      <User className="h-4 w-4 text-gray-500" />
                      <span>Nama Lengkap</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Masukkan nama lengkap"
                      required
                      className="focus-visible:ring-[#FDFB03]"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="flex items-center space-x-2"
                    >
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>Email</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="admin@brocode.com"
                      required
                      className="focus-visible:ring-[#FDFB03]"
                    />
                  </div>

                  <Separator className="my-6" />

                  {/* Password Section */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <KeyRound className="h-5 w-5 text-[#FDFB03]" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Ubah Password
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Kosongkan jika tidak ingin mengubah password
                    </p>

                    {/* Current Password */}
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
                          onChange={handleInputChange}
                          placeholder="Masukkan password saat ini"
                          className="pr-10 focus-visible:ring-[#FDFB03]"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* New Password */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="newPassword"
                        className="flex items-center space-x-2"
                      >
                        <Lock className="h-4 w-4 text-gray-500" />
                        <span>Password Baru</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={formData.newPassword}
                          onChange={handleInputChange}
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
                          onChange={handleInputChange}
                          placeholder="Konfirmasi password baru"
                          className="pr-10 focus-visible:ring-[#FDFB03]"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
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

                  {/* Submit Button */}
                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-[#FDFB03] hover:bg-yellow-400 text-black font-medium"
                    >
                      {isLoading ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          Menyimpan...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Simpan Perubahan
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
