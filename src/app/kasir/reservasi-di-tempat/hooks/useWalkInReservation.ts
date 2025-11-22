import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { format } from "date-fns";
import { getErrorMessage } from "@/app/lib/getErrorMessage";
import { reservationService } from "@/app/lib/services/reservation.service";
import { packageService } from "@/app/lib/services/package.service";
import { capsterService } from "@/app/lib/services/capster.service";
import { scheduleService } from "@/app/lib/services/schedule.service";
import { Package } from "@/app/lib/types/package";
import { Barber } from "@/app/lib/types/capster";
import { Schedule } from "@/app/lib/types/schedule";

export interface WalkInForm {
  customerName: string;
  customerPhone: string;
  packageId: string;
  barberId: string;
  selectedDate: Date | undefined;
  scheduleId: string;
  paymentMethod: string;
  serviceNotes: string;
}

export const useWalkInReservation = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [packages, setPackages] = useState<Package[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [availableSchedules, setAvailableSchedules] = useState<Schedule[]>([]);

  const [formData, setFormData] = useState<WalkInForm>({
    customerName: "",
    customerPhone: "",
    packageId: "",
    barberId: "",
    selectedDate: undefined,
    scheduleId: "",
    paymentMethod: "",
    serviceNotes: "",
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setIsLoadingData(true);
    try {
      const [packagesRes, barbersRes] = await Promise.all([
        packageService.getActivePackages(),
        capsterService.getActiveCapsters(),
      ]);

      if (packagesRes.success && packagesRes.data) {
        setPackages(packagesRes.data);
      }

      if (barbersRes.success && barbersRes.data) {
        setBarbers(barbersRes.data);
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error("Gagal memuat data", { description: errorMessage });
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleBarberChange = async (barberId: string) => {
    setFormData((prev) => ({
      ...prev,
      barberId,
      selectedDate: undefined,
      scheduleId: "",
    }));

    if (!barberId) {
      setAvailableSchedules([]);
      return;
    }

    try {
      const availableRes =
        await scheduleService.getAvailableSchedulesByIdBarber(barberId);

      if (availableRes.success && availableRes.data) {
        setAvailableSchedules(availableRes.data);
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error("Gagal memuat jadwal", { description: errorMessage });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === "barberId") {
      handleBarberChange(value);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setFormData((prev) => ({
      ...prev,
      selectedDate: date,
      scheduleId: "",
    }));
  };

  const getTimeSlotsForSelectedDate = () => {
    if (!formData.selectedDate) return [];

    const selectedDateStr = format(formData.selectedDate, "yyyy-MM-dd");
    return availableSchedules.filter((schedule) => {
      const scheduleDate = format(new Date(schedule.date), "yyyy-MM-dd");
      return scheduleDate === selectedDateStr;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.customerName ||
      !formData.customerPhone ||
      !formData.packageId ||
      !formData.barberId ||
      !formData.scheduleId ||
      !formData.paymentMethod
    ) {
      toast.error("Mohon lengkapi semua field yang wajib diisi");
      return;
    }

    setIsLoading(true);
    try {
      const response = await reservationService.addOnSiteReservation({
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        packageId: formData.packageId,
        barberId: formData.barberId,
        scheduleId: formData.scheduleId,
        paymentMethod: formData.paymentMethod,
        serviceNotes: formData.serviceNotes || undefined,
      });

      if (response.success) {
        toast.success("Reservasi berhasil dibuat!");
        router.push("/kasir/dashboard");
      } else {
        toast.error(response.message || "Gagal membuat reservasi");
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error("Gagal membuat reservasi", { description: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const getSelectedPackagePrice = () => {
    const selectedPackage = packages.find((p) => p._id === formData.packageId);
    return selectedPackage ? selectedPackage.price : 0;
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return {
    formData,
    isLoading,
    isLoadingData,
    packages,
    barbers,
    availableSchedules,
    handleInputChange,
    handleSelectChange,
    handleDateSelect,
    handleSubmit,
    getTimeSlotsForSelectedDate,
    getSelectedPackagePrice,
    formatCurrency,
  };
};
