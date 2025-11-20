"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useWalkInReservation } from "./hooks/useWalkInReservation";
import CustomerInfoSection from "./components/CustomerInfoSection";
import ServiceSelectionSection from "./components/ServiceSelectionSection";
import ScheduleSelectionSection from "./components/ScheduleSelectionSection";
import PaymentMethodSection from "./components/PaymentMethodSection";
import NotesSection from "./components/NotesSection";
import TotalPriceSection from "./components/TotalPriceSection";
import FormActionButtons from "./components/FormActionButtons";

export default function ReservasiDiTempat() {
  const {
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
  } = useWalkInReservation();

  return (
    <div className="h-full bg-gray-50 p-6 flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Reservasi di Tempat
        </h1>
        <p className="text-gray-600 text-sm">
          Buat reservasi langsung untuk customer yang datang ke barbershop
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Form Reservasi di Tempat</CardTitle>
            <CardDescription>
              Isi data customer dan pilih layanan yang diinginkan
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingData ? (
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <CustomerInfoSection
                  customerName={formData.customerName}
                  customerPhone={formData.customerPhone}
                  onInputChange={handleInputChange}
                />

                <ServiceSelectionSection
                  packageId={formData.packageId}
                  barberId={formData.barberId}
                  packages={packages}
                  barbers={barbers}
                  onSelectChange={handleSelectChange}
                  formatCurrency={formatCurrency}
                />

                <ScheduleSelectionSection
                  selectedDate={formData.selectedDate}
                  scheduleId={formData.scheduleId}
                  barberId={formData.barberId}
                  availableSchedules={availableSchedules}
                  onDateSelect={handleDateSelect}
                  onSelectChange={handleSelectChange}
                  getTimeSlotsForSelectedDate={getTimeSlotsForSelectedDate}
                />

                <PaymentMethodSection
                  paymentMethod={formData.paymentMethod}
                  onSelectChange={handleSelectChange}
                />

                <NotesSection
                  serviceNotes={formData.serviceNotes}
                  onInputChange={handleInputChange}
                />

                <TotalPriceSection
                  totalPrice={getSelectedPackagePrice()}
                  formatCurrency={formatCurrency}
                />

                <FormActionButtons isLoading={isLoading} />
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
