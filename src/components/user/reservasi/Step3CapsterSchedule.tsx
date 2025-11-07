import React from "react";
import { Barber } from "@/app/lib/types/capster";
import { Schedule } from "@/app/lib/types/schedule";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface Step3Props {
  capsters: Barber[];
  selectedCapster: string;
  schedules: Schedule[];
  selectedDate: string;
  selectedTime: string;
  isLoadingCapsters: boolean;
  isLoadingSchedules: boolean;
  onCapsterSelect: (capsterId: string) => void;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
}

export default function Step3CapsterSchedule({
  capsters,
  selectedCapster,
  schedules,
  selectedDate,
  selectedTime,
  isLoadingCapsters,
  isLoadingSchedules,
  onCapsterSelect,
  onDateSelect,
  onTimeSelect,
}: Step3Props) {
  // Normalize date to YYYY-MM-DD format
  const normalizeDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Get unique dates from schedules and normalize them
  const availableDates = Array.from(
    new Set(schedules.map((schedule) => normalizeDate(schedule.date)))
  );

  // Convert to Date objects for calendar
  const availableDateObjects = availableDates.map(
    (dateStr) => new Date(dateStr)
  );

  // Get schedules for selected date
  const availableTimeSlots = schedules.filter(
    (schedule) => normalizeDate(schedule.date) === selectedDate
  );

  // Format date to Indonesian locale
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Pilih Capster & Jadwal</h2>

      {/* Pilih Capster */}
      <div>
        <h3 className="font-semibold mb-4">Pilih Capster</h3>

        {isLoadingCapsters ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border rounded-lg overflow-hidden">
                <Skeleton className="aspect-square w-full" />
                <div className="p-3">
                  <Skeleton className="h-5 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {capsters.map((capster) => (
              <div
                key={capster._id}
                onClick={() => onCapsterSelect(capster._id)}
                className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                  selectedCapster === capster._id
                    ? "border-[#FDFB03] bg-[#FDFB03]/10"
                    : "border-gray-200 hover:border-[#FDFB03]/50"
                }`}
              >
                {/* Photo */}
                <div className="aspect-square overflow-hidden bg-gray-100">
                  {capster.photo ? (
                    <img
                      src={capster.photo}
                      alt={capster.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Photo
                    </div>
                  )}
                </div>

                {/* Name */}
                <div className="p-3 text-center">
                  <p className="font-semibold">{capster.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoadingCapsters && capsters.length === 0 && (
          <p className="text-center text-gray-500">
            Tidak ada capster tersedia
          </p>
        )}
      </div>

      {/* Pilih Tanggal */}
      {selectedCapster && (
        <div>
          <h3 className="font-semibold mb-4">Pilih Tanggal</h3>

          {isLoadingSchedules ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${
                      !selectedDate && "text-muted-foreground"
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate
                      ? format(new Date(selectedDate), "PPP", { locale: id })
                      : "Pilih tanggal"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate ? new Date(selectedDate) : undefined}
                    onSelect={(date) => {
                      if (date) {
                        const dateString = normalizeDate(date.toISOString());
                        console.log("Selected date:", dateString);
                        console.log("Available dates:", availableDates);
                        onDateSelect(dateString);
                      }
                    }}
                    disabled={(date) => {
                      const dateString = normalizeDate(date.toISOString());
                      const isDisabled = !availableDates.includes(dateString);
                      return isDisabled;
                    }}
                    initialFocus
                    locale={id}
                  />
                </PopoverContent>
              </Popover>

              {availableDates.length === 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  Tidak ada jadwal tersedia untuk capster ini
                </p>
              )}
            </>
          )}
        </div>
      )}

      {/* Pilih Waktu */}
      {selectedDate && (
        <div>
          <h3 className="font-semibold mb-4">Pilih Waktu</h3>

          {isLoadingSchedules ? (
            <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : (
            <>
              {availableTimeSlots.length > 0 ? (
                <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                  {availableTimeSlots.map((schedule) => (
                    <button
                      key={schedule._id}
                      onClick={() => onTimeSelect(schedule.timeSlot)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        selectedTime === schedule.timeSlot
                          ? "border-[#FDFB03] bg-[#FDFB03] text-black font-semibold"
                          : "border-gray-300 hover:border-[#FDFB03]/50"
                      }`}
                    >
                      {schedule.timeSlot}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Tidak ada waktu tersedia
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
