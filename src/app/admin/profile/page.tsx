"use client";

import { useState, useEffect } from "react";
import { Save, User } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { profileService } from "@/app/lib/services/profile.service";
import { getErrorMessage } from "@/app/lib/getErrorMessage";
import Cookies from "js-cookie";
import {
  ProfilePageHeader,
  ProfileFormSkeleton,
  ProfileInfoForm,
  PasswordSection,
  ConfirmSaveDialog,
} from "./components";

// Interface untuk form data
interface FormData {
  name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

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
        const errorMessage = getErrorMessage(error);
        toast.error("Gagal memuat data profil", { description: errorMessage });
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

    // Show confirmation dialog
    setShowConfirmDialog(true);
  };

  const handleConfirmSave = async () => {
    setIsLoading(true);

    try {
      // Check if there are any changes
      const hasNameChange = formData.name !== currentAdmin.name;
      const hasEmailChange = formData.email !== currentAdmin.email;
      const hasPasswordChange = formData.newPassword !== "";

      if (!hasNameChange && !hasEmailChange && !hasPasswordChange) {
        toast.info("Tidak ada perubahan yang dilakukan");
        setIsLoading(false);
        setShowConfirmDialog(false);
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

        // Close dialog
        setShowConfirmDialog(false);
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error("Gagal memperbarui profil", { description: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full bg-gray-50 p-6 flex flex-col">
      <div className="max-w-3xl mx-auto w-full">
        <ProfilePageHeader />

        <div className="max-w-2xl mx-auto">
          {isLoadingData ? (
            <ProfileFormSkeleton />
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
                  <ProfileInfoForm
                    formData={formData}
                    onInputChange={handleInputChange}
                  />

                  <Separator className="my-6" />

                  <PasswordSection
                    formData={formData}
                    onInputChange={handleInputChange}
                  />

                  {/* Submit Button */}
                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-[#FDFB03] hover:bg-yellow-400 text-black font-medium"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Simpan Perubahan
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmSaveDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        onConfirm={handleConfirmSave}
        isLoading={isLoading}
      />
    </div>
  );
}
