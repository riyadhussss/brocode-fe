"use client";

import { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSave,
} from "react-icons/fa";
import { toast } from "sonner";
import { profileService } from "@/app/lib/services/profile.service";
import { getErrorMessage } from "@/app/lib/getErrorMessage";

// Interface untuk form data
interface FormData {
  name: string;
  email: string;
  phone: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function UpdateAkun() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Current user data
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
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
            phone: response.data.phone || "",
            role: response.data.role,
          };

          setCurrentUser(profileData);
          setFormData((prev) => ({
            ...prev,
            name: profileData.name,
            email: profileData.email,
            phone: profileData.phone,
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
    // Clear messages when user starts typing
    if (errorMessage) setErrorMessage("");
    if (successMessage) setSuccessMessage("");
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
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Check if there are any changes
      const hasNameChange = formData.name !== currentUser.name;
      const hasEmailChange = formData.email !== currentUser.email;
      const hasPhoneChange = formData.phone !== currentUser.phone;
      const hasPasswordChange = formData.newPassword !== "";

      if (
        !hasNameChange &&
        !hasEmailChange &&
        !hasPhoneChange &&
        !hasPasswordChange
      ) {
        toast.info("Tidak ada perubahan yang dilakukan");
        setIsLoading(false);
        return;
      }

      // Prepare update data
      const updateData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
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
          phone: response.data.phone || "",
          role: response.data.role,
        };

        // Update current user data
        setCurrentUser(updatedProfileData);

        // Update formData dengan data terbaru dari server
        setFormData((prev) => ({
          ...prev,
          name: response.data!.name,
          email: response.data!.email,
          phone: response.data!.phone || "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error("Gagal memperbarui profil", { description: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading skeleton
  if (isLoadingData) {
    return (
      <div className="h-full bg-gray-50 p-6 flex flex-col">
        <div className="mb-6">
          <div className="h-8 w-48 bg-gray-200 animate-pulse rounded mb-2"></div>
          <div className="h-4 w-64 bg-gray-200 animate-pulse rounded"></div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="h-7 w-56 bg-gray-200 animate-pulse rounded"></div>
          </div>

          <div className="p-6 space-y-6">
            {/* Name Field Skeleton */}
            <div>
              <div className="h-5 w-32 bg-gray-200 animate-pulse rounded mb-2"></div>
              <div className="h-11 w-full bg-gray-200 animate-pulse rounded"></div>
            </div>

            {/* Email Field Skeleton */}
            <div>
              <div className="h-5 w-20 bg-gray-200 animate-pulse rounded mb-2"></div>
              <div className="h-11 w-full bg-gray-200 animate-pulse rounded"></div>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-gray-200"></div>

            {/* Password Fields Skeleton */}
            <div>
              <div className="h-6 w-40 bg-gray-200 animate-pulse rounded mb-2"></div>
              <div className="h-4 w-72 bg-gray-200 animate-pulse rounded mb-4"></div>
            </div>

            <div>
              <div className="h-5 w-40 bg-gray-200 animate-pulse rounded mb-2"></div>
              <div className="h-11 w-full bg-gray-200 animate-pulse rounded"></div>
            </div>

            <div>
              <div className="h-5 w-32 bg-gray-200 animate-pulse rounded mb-2"></div>
              <div className="h-11 w-full bg-gray-200 animate-pulse rounded"></div>
            </div>

            <div>
              <div className="h-5 w-44 bg-gray-200 animate-pulse rounded mb-2"></div>
              <div className="h-11 w-full bg-gray-200 animate-pulse rounded"></div>
            </div>

            {/* Button Skeleton */}
            <div className="flex justify-end pt-6 border-t border-gray-100">
              <div className="h-11 w-48 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50 p-6 flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile Anda</h1>
        <p className="text-gray-600 text-sm">Kelola informasi akun Anda</p>
      </div>

      {/* Update Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900">
            Informasi Akun
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Profile Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nama Lengkap
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" size={16} />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDFB03] focus:border-transparent transition-colors"
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nomor Telepon
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="text-gray-400" size={16} />
                </div>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDFB03] focus:border-transparent transition-colors"
                  placeholder="Masukkan nomor telepon"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="md:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" size={16} />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDFB03] focus:border-transparent transition-colors"
                  placeholder="customer@brocode.com"
                  required
                />
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="border-t border-gray-100 pt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Ubah Password
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Kosongkan jika tidak ingin mengubah password
            </p>

            {/* Current Password - Full Width */}
            <div className="mb-6">
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password Saat Ini
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" size={16} />
                </div>
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDFB03] focus:border-transparent transition-colors"
                  placeholder="Masukkan password saat ini"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword ? (
                    <FaEyeSlash size={16} />
                  ) : (
                    <FaEye size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* New Password and Confirm Password Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* New Password */}
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password Baru
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" size={16} />
                  </div>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDFB03] focus:border-transparent transition-colors"
                    placeholder="Masukkan password baru"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? (
                      <FaEyeSlash size={16} />
                    ) : (
                      <FaEye size={16} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Konfirmasi Password Baru
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" size={16} />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDFB03] focus:border-transparent transition-colors"
                    placeholder="Konfirmasi password baru"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash size={16} />
                    ) : (
                      <FaEye size={16} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t border-gray-100">
            <button
              type="submit"
              disabled={isLoading}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                isLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#FDFB03] hover:bg-yellow-400 text-black"
              }`}
            >
              <FaSave size={16} />
              <span>{isLoading ? "Menyimpan..." : "Simpan Perubahan"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
