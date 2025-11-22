"use client";

import { useState, useEffect } from "react";
import {
  FaUser,
  FaCut,
  FaCalendarAlt,
  FaClipboardList,
  FaCreditCard,
} from "react-icons/fa";
import { reservationService } from "@/app/lib/services/reservation.service";
import { packageService } from "@/app/lib/services/package.service";
import { capsterService } from "@/app/lib/services/capster.service";
import { scheduleService } from "@/app/lib/services/schedule.service";
import { Package } from "@/app/lib/types/package";
import { Barber } from "@/app/lib/types/capster";
import { Schedule } from "@/app/lib/types/schedule";
import { toast } from "sonner";
import { getErrorMessage } from "@/app/lib/getErrorMessage";
import { Button } from "@/components/ui/button";
import ReservationStepper from "@/components/customer/reservasi/ReservationStepper";
import Step1PersonalInfo from "@/components/customer/reservasi/Step1PersonalInfo";
import Step2PackageSelection from "@/components/customer/reservasi/Step2PackageSelection";
import Step3CapsterSchedule from "@/components/customer/reservasi/Step3CapsterSchedule";
import Step4Confirmation from "@/components/customer/reservasi/Step4Confirmation";
import Step5Payment from "@/components/customer/reservasi/Step5Payment";
import ReservationSuccess from "@/components/customer/reservasi/ReservationSuccess";

// Interface untuk form reservasi
interface ReservationForm {
  nama: string;
  nomorHP: string;
  email: string;
  capster: string;
  layanan: string;
  tanggal: string;
  waktu: string;
  catatan: string;
  scheduleId: string; // Added to store selected schedule ID
}

// Steps configuration
const steps = [
  { id: 1, label: "Isi Data", icon: FaUser },
  { id: 2, label: "Pilih Layanan", icon: FaCut },
  { id: 3, label: "Pilih Capster & Jadwal", icon: FaCalendarAlt },
  { id: 4, label: "Konfirmasi Reservasi", icon: FaClipboardList },
  { id: 5, label: "Pembayaran", icon: FaCreditCard },
];

export default function ReservasiPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ReservationForm>({
    nama: "",
    nomorHP: "",
    email: "",
    capster: "",
    layanan: "",
    tanggal: "",
    waktu: "",
    catatan: "",
    scheduleId: "", // Initialize scheduleId
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [isBookingForSelf, setIsBookingForSelf] = useState(false);
  const [isLoadingAuto, setIsLoadingAuto] = useState(false);
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoadingPackages, setIsLoadingPackages] = useState(false);
  const [isSavingManualData, setIsSavingManualData] = useState(false);
  const [capsters, setCapsters] = useState<Barber[]>([]);
  const [isLoadingCapsters, setIsLoadingCapsters] = useState(false);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoadingSchedules, setIsLoadingSchedules] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [reservationId, setReservationId] = useState<string>(""); // Store created reservation ID
  const [customerDataSubmitted, setCustomerDataSubmitted] = useState(false); // Track if customer data is submitted via inputCustomer

  // Load saved state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("reservationState");
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        setCurrentStep(state.currentStep || 1);
        setFormData(
          state.formData || {
            nama: "",
            nomorHP: "",
            email: "",
            capster: "",
            layanan: "",
            tanggal: "",
            waktu: "",
            catatan: "",
            scheduleId: "",
          }
        );
        setIsBookingForSelf(state.isBookingForSelf || false);
        setCustomerDataSubmitted(state.customerDataSubmitted || false);
        setSelectedDate(state.selectedDate || "");
        setReservationId(state.reservationId || "");

        // Fetch schedules if capster is selected, but keep the saved date/time
        if (state.formData?.capster) {
          fetchAvailableSchedules(state.formData.capster, true);
        }
      } catch (error) {
        console.error("Error loading saved reservation state:", error);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (
      currentStep > 1 ||
      formData.nama ||
      formData.email ||
      formData.nomorHP
    ) {
      const state = {
        currentStep,
        formData,
        isBookingForSelf,
        customerDataSubmitted,
        selectedDate,
        reservationId,
      };
      localStorage.setItem("reservationState", JSON.stringify(state));
    }
  }, [
    currentStep,
    formData,
    isBookingForSelf,
    customerDataSubmitted,
    selectedDate,
    reservationId,
  ]);

  // Fetch active packages and capsters on component mount
  useEffect(() => {
    fetchActivePackages();
    fetchActiveCapsters();
  }, []);

  const fetchActivePackages = async () => {
    setIsLoadingPackages(true);
    try {
      const response = await packageService.getActivePackages();
      if (response.success && response.data) {
        setPackages(response.data);
      } else {
        toast.error("Gagal memuat paket layanan");
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsLoadingPackages(false);
    }
  };

  const fetchActiveCapsters = async () => {
    setIsLoadingCapsters(true);
    try {
      const response = await capsterService.getActiveCapsters();
      if (response.success && response.data) {
        setCapsters(response.data);
      } else {
        toast.error("Gagal memuat daftar capster");
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsLoadingCapsters(false);
    }
  };

  const fetchAvailableSchedules = async (
    capsterId: string,
    keepDateTime = false
  ) => {
    setIsLoadingSchedules(true);
    setSchedules([]);

    // Only reset date/time if not restoring from saved state
    if (!keepDateTime) {
      setSelectedDate("");
      setFormData((prev) => ({ ...prev, tanggal: "", waktu: "" }));
    }

    try {
      const response = await scheduleService.getAvailableSchedulesByIdBarber(
        capsterId
      );
      if (response.success && response.data) {
        setSchedules(response.data);
      } else {
        toast.error("Gagal memuat jadwal");
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsLoadingSchedules(false);
    }
  };

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle checkbox for booking for self
  const handleBookingForSelfChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = e.target.checked;
    setIsBookingForSelf(checked);

    if (checked) {
      // User checked the box - Load data from cookies
      setIsLoadingAuto(true);
      try {
        // Get individual cookie values
        const getCookie = (name: string) => {
          const value = document.cookie
            .split("; ")
            .find((row) => row.startsWith(name + "="));
          return value ? decodeURIComponent(value.split("=")[1]) : null;
        };

        const name = getCookie("name");
        const phone = getCookie("phone");
        const email = getCookie("email");

        if (name && phone && email) {
          setFormData((prev) => ({
            ...prev,
            nama: name,
            nomorHP: phone,
            email: email,
          }));
          setCustomerDataSubmitted(true); // Mark as submitted since it's self
        } else {
          toast.error("Data profil tidak lengkap di cookies");
          setIsBookingForSelf(false);
        }
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
        setIsBookingForSelf(false);
      } finally {
        setIsLoadingAuto(false);
      }
    } else {
      // User unchecked the box - clear form for manual input
      setFormData((prev) => ({
        ...prev,
        nama: "",
        nomorHP: "",
        email: "",
      }));
      setCustomerDataSubmitted(false); // Reset submission flag
    }
  };

  // Handle manual input blur - NO LONGER NEEDED, removed API call
  const handleManualInputBlur = async () => {
    // This function is now empty - API call moved to handleNextStep
    // Keeping the function to avoid breaking the component interface
  };

  // Handle capster selection
  const handleCapsterSelect = (capsterId: string) => {
    setFormData((prev) => ({ ...prev, capster: capsterId }));
    fetchAvailableSchedules(capsterId);
  };

  // Handle date selection
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setFormData((prev) => ({ ...prev, tanggal: date, waktu: "" }));
  };

  // Handle time selection
  const handleTimeSelect = (time: string, scheduleId: string) => {
    setFormData((prev) => ({
      ...prev,
      waktu: time,
      scheduleId: scheduleId,
    }));
  };

  // Handle package selection
  const handlePackageSelect = (packageId: string) => {
    setFormData((prev) => ({ ...prev, layanan: packageId }));
  };

  // Validation for each step
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.nama || !formData.nomorHP || !formData.email) {
          toast.error("Mohon lengkapi semua field");
          return false;
        }
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          toast.error("Format email tidak valid");
          return false;
        }
        return true;
      case 2:
        if (!formData.layanan) {
          toast.error("Mohon pilih layanan");
          return false;
        }
        return true;
      case 3:
        if (!formData.capster) {
          toast.error("Mohon pilih capster");
          return false;
        }
        if (!formData.tanggal) {
          toast.error("Mohon pilih tanggal");
          return false;
        }
        if (!formData.waktu) {
          toast.error("Mohon pilih waktu");
          return false;
        }
        return true;
      case 4:
        return true;
      default:
        return true;
    }
  };

  // Handle next step
  const handleNextStep = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    // If on Step 1 and manual input (not booking for self), submit customer data first
    if (currentStep === 1 && !isBookingForSelf && !customerDataSubmitted) {
      setIsSavingManualData(true);
      try {
        const response = await reservationService.inputCustomer({
          name: formData.nama,
          phone: formData.nomorHP,
          email: formData.email,
        });

        if (response.success && response.data) {
          setCustomerDataSubmitted(true);
          setCurrentStep((prev) => prev + 1); // Move to next step
        }
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
      } finally {
        setIsSavingManualData(false);
      }
    } else {
      // For other steps or if already submitted, just move to next step
      setCurrentStep((prev) => prev + 1);
    }
  };

  // Handle previous step
  const handlePreviousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Handle form submission
  const handleReservationCreated = (id: string) => {
    setReservationId(id);
  };

  const handleSubmit = () => {
    toast.success("Pembayaran berhasil!");
    // Clear localStorage after successful payment
    localStorage.removeItem("reservationState");
    setShowSuccess(true);
  };

  // Function to reset/clear reservation
  const handleResetReservation = () => {
    localStorage.removeItem("reservationState");
    setCurrentStep(1);
    setFormData({
      nama: "",
      nomorHP: "",
      email: "",
      capster: "",
      layanan: "",
      tanggal: "",
      waktu: "",
      catatan: "",
      scheduleId: "",
    });
    setIsBookingForSelf(false);
    setCustomerDataSubmitted(false);
    setSelectedDate("");
    setReservationId("");
  };

  if (showSuccess) {
    return <ReservationSuccess />;
  }

  const selectedPackage = packages.find((pkg) => pkg._id === formData.layanan);

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 md:py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-center">
          Reservasi Layanan
        </h1>

        {/* Stepper */}
        <ReservationStepper steps={steps} currentStep={currentStep} />

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
          {currentStep === 1 && (
            <Step1PersonalInfo
              formData={formData}
              isBookingForSelf={isBookingForSelf}
              isLoadingAuto={isLoadingAuto}
              isSavingManualData={isSavingManualData}
              onInputChange={handleInputChange}
              onBookingForSelfChange={handleBookingForSelfChange}
              onManualInputBlur={handleManualInputBlur}
            />
          )}

          {currentStep === 2 && (
            <Step2PackageSelection
              packages={packages}
              selectedPackage={formData.layanan}
              isLoadingPackages={isLoadingPackages}
              onPackageSelect={handlePackageSelect}
            />
          )}

          {currentStep === 3 && (
            <Step3CapsterSchedule
              capsters={capsters}
              selectedCapster={formData.capster}
              schedules={schedules}
              selectedDate={selectedDate}
              selectedTime={formData.waktu}
              isLoadingCapsters={isLoadingCapsters}
              isLoadingSchedules={isLoadingSchedules}
              onCapsterSelect={handleCapsterSelect}
              onDateSelect={handleDateSelect}
              onTimeSelect={handleTimeSelect}
            />
          )}

          {currentStep === 4 && (
            <Step4Confirmation
              formData={formData}
              packages={packages}
              capsters={capsters}
              isBookingForSelf={isBookingForSelf}
              onCatatanChange={handleInputChange}
              onReservationCreated={handleReservationCreated}
              onNextStep={handleNextStep}
              onPreviousStep={handlePreviousStep}
            />
          )}

          {currentStep === 5 && (
            <Step5Payment
              selectedPackage={selectedPackage}
              reservationId={reservationId}
              isBookingForSelf={isBookingForSelf}
              onSubmit={handleSubmit}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between">
          {currentStep > 1 && currentStep !== 4 && currentStep !== 5 && (
            <Button
              onClick={handlePreviousStep}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              Kembali
            </Button>
          )}

          {currentStep === 5 && (
            <Button
              onClick={handlePreviousStep}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              Kembali
            </Button>
          )}

          {currentStep < 4 && (
            <Button
              onClick={handleNextStep}
              className="ml-auto bg-[#FDFB03] text-black hover:bg-[#FDFB03]/80 w-full sm:w-auto"
              size="lg"
            >
              Selanjutnya
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
