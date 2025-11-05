"use client";

import { useState, useEffect } from "react";
import {
  Save,
  Clock,
  User,
  CalendarDays,
  Check,
  X,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { capsterService } from "@/app/lib/services/capster.service";
import { scheduleService } from "@/app/lib/services/schedule.service";
import { Barber } from "@/app/lib/types/capster";
import { Schedule } from "@/app/lib/types/schedule";
import { getErrorMessage } from "@/app/lib/getErrorMessage";

export default function AturJadwal() {
  // State untuk data dari API
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [selectedBarberId, setSelectedBarberId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Loading states
  const [loadingBarbers, setLoadingBarbers] = useState(true);
  const [loadingSchedules, setLoadingSchedules] = useState(false);

  // Fetch active barbers on mount
  useEffect(() => {
    fetchActiveBarbers();
  }, []);

  // Fetch schedules when barber or date changes
  useEffect(() => {
    if (selectedBarberId) {
      fetchSchedulesByBarber(selectedBarberId);
    }
  }, [selectedBarberId, selectedDate]);

  const fetchActiveBarbers = async () => {
    try {
      setLoadingBarbers(true);
      const response = await capsterService.getActiveBarbers();

      if (response.success && response.data && response.data.length > 0) {
        // Urutkan barbers berdasarkan nama (A-Z, 0-9)
        const sortedBarbers = [...response.data].sort((a, b) =>
          a.name.localeCompare(b.name, "id", {
            numeric: true,
            sensitivity: "base",
          })
        );
        setBarbers(sortedBarbers);
        // Set barber pertama sebagai default
        setSelectedBarberId(sortedBarbers[0]._id);
      } else {
        toast.error("Tidak ada barber aktif tersedia");
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(`Gagal memuat data barber: ${errorMessage}`);
    } finally {
      setLoadingBarbers(false);
    }
  };

  const fetchSchedulesByBarber = async (barberId: string) => {
    try {
      setLoadingSchedules(true);
      const response = await scheduleService.getSchedulesByIdBarber(barberId);

      if (response.success && response.data) {
        setSchedules(response.data);
      } else {
        setSchedules([]);
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(`Gagal memuat jadwal: ${errorMessage}`);
      setSchedules([]);
    } finally {
      setLoadingSchedules(false);
    }
  };

  // Filter schedules untuk tanggal yang dipilih
  const getSchedulesForSelectedDate = () => {
    const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
    const filtered = schedules.filter((schedule) => {
      const scheduleDate = format(new Date(schedule.date), "yyyy-MM-dd");
      return scheduleDate === selectedDateStr;
    });

    // Urutkan berdasarkan waktu (timeSlot)
    return filtered.sort((a, b) => {
      // Convert timeSlot (format "08:00" atau "08:00 - 09:00") ke number untuk sorting
      const timeA =
        a.timeSlot.split(":")[0] + a.timeSlot.split(":")[1].substring(0, 2);
      const timeB =
        b.timeSlot.split(":")[0] + b.timeSlot.split(":")[1].substring(0, 2);
      return parseInt(timeA) - parseInt(timeB);
    });
  };

  // Group schedules by time slot
  const getSchedulesByTimeSlot = () => {
    const schedulesForDate = getSchedulesForSelectedDate();
    const grouped: { [key: string]: Schedule } = {};

    schedulesForDate.forEach((schedule) => {
      grouped[schedule.timeSlot] = schedule;
    });

    return grouped;
  };

  // Toggle availability untuk slot tertentu
  const toggleAvailability = (scheduleId: string) => {
    setSchedules((prevSchedules) =>
      prevSchedules.map((schedule) =>
        schedule._id === scheduleId
          ? {
              ...schedule,
              status:
                schedule.status === "available" ? "unavailable" : "available",
            }
          : schedule
      )
    );
  };

  // Toggle semua slot untuk hari tertentu
  const toggleAllSlotsForDay = (available: boolean) => {
    const schedulesForDate = getSchedulesForSelectedDate();
    const updatedSchedules = schedules.map((schedule) => {
      const isInSelectedDate = schedulesForDate.some(
        (s) => s._id === schedule._id
      );
      if (isInSelectedDate) {
        return {
          ...schedule,
          status: available ? "available" : "unavailable",
        };
      }
      return schedule;
    });
    setSchedules(updatedSchedules);
  };

  const handleSaveSchedule = () => {
    console.log("Menyimpan jadwal:", schedules);
    // TODO: Implement save schedule functionality dengan API
    toast.success("Jadwal berhasil disimpan!");
  };

  const selectedBarberData = barbers.find((b) => b._id === selectedBarberId);
  const scheduledSlots = getSchedulesByTimeSlot();
  const schedulesForDate = getSchedulesForSelectedDate();

  // Calculate statistics
  const availableSlots = schedulesForDate.filter(
    (s) => s.status === "available"
  ).length;
  const totalSlots = schedulesForDate.length;

  // Show loading state
  if (loadingBarbers) {
    return (
      <div className="h-full bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-[#FDFB03] mx-auto" />
          <p className="text-gray-600">Memuat data barber...</p>
        </div>
      </div>
    );
  }

  // Show empty state
  if (barbers.length === 0) {
    return (
      <div className="h-full bg-gray-50 p-6 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Tidak Ada Barber Aktif</CardTitle>
            <CardDescription>
              Silakan tambahkan barber aktif terlebih dahulu
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50 p-6 flex flex-col">
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <CalendarDays className="h-8 w-8 text-[#FDFB03]" />
          <h1 className="text-2xl font-bold text-gray-900">
            Atur Jadwal Capster
          </h1>
        </div>
        <p className="text-gray-600 text-sm">
          Kelola jadwal ketersediaan setiap capster untuk menerima reservasi
        </p>
      </div>

      <div className="space-y-6">
        {/* Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Jadwal</CardTitle>
            <CardDescription>
              Pilih capster dan tanggal untuk mengelola jadwal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pilih Capster */}
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Pilih Capster</span>
                </Label>
                <Select
                  value={selectedBarberId}
                  onValueChange={setSelectedBarberId}
                  disabled={loadingBarbers}
                >
                  <SelectTrigger className="focus-visible:ring-[#FDFB03]">
                    <SelectValue placeholder="Pilih capster" />
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

              {/* Pilih Tanggal dengan Date Picker */}
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>Pilih Tanggal</span>
                </Label>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal focus-visible:ring-[#FDFB03]",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {selectedDate ? (
                        format(selectedDate, "EEEE, dd MMMM yyyy", {
                          locale: localeId,
                        })
                      ) : (
                        <span>Pilih tanggal</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        if (date) {
                          setSelectedDate(date);
                          setCalendarOpen(false);
                        }
                      }}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      initialFocus
                      locale={localeId}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Grid */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <CardTitle>
                  Jadwal {selectedBarberData?.name} -{" "}
                  {format(selectedDate, "EEEE, dd MMMM yyyy", {
                    locale: localeId,
                  })}
                </CardTitle>
                <CardDescription>
                  Klik slot untuk mengubah status ketersediaan
                </CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => toggleAllSlotsForDay(true)}
                  variant="outline"
                  size="sm"
                  className="text-green-700 border-green-300 hover:bg-green-50"
                  disabled={loadingSchedules}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Buka Semua
                </Button>
                <Button
                  onClick={() => toggleAllSlotsForDay(false)}
                  variant="outline"
                  size="sm"
                  className="text-red-700 border-red-300 hover:bg-red-50"
                  disabled={loadingSchedules}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Tutup Semua
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loadingSchedules ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center space-y-3">
                  <Loader2 className="h-8 w-8 animate-spin text-[#FDFB03] mx-auto" />
                  <p className="text-gray-600 text-sm">Memuat jadwal...</p>
                </div>
              </div>
            ) : schedulesForDate.length === 0 ? (
              <div className="text-center py-12">
                <CalendarDays className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">
                  Tidak ada jadwal tersedia untuk tanggal ini
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {schedulesForDate.map((schedule) => {
                  const isAvailable = schedule.status === "available";
                  const isBooked = schedule.reservation !== null;

                  return (
                    <Button
                      key={schedule._id}
                      onClick={() =>
                        !isBooked && toggleAvailability(schedule._id)
                      }
                      variant="outline"
                      disabled={isBooked}
                      className={`h-auto p-4 flex flex-col items-center space-y-2 transition-all ${
                        isBooked
                          ? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
                          : isAvailable
                          ? "bg-green-50 border-green-300 text-green-800 hover:bg-green-100 hover:border-green-400"
                          : "bg-red-50 border-red-300 text-red-800 hover:bg-red-100 hover:border-red-400"
                      }`}
                    >
                      <Clock className="h-5 w-5" />
                      <span className="font-semibold text-base">
                        {schedule.timeSlot}
                      </span>
                      <Badge
                        variant={
                          isBooked
                            ? "secondary"
                            : isAvailable
                            ? "default"
                            : "destructive"
                        }
                        className={
                          isBooked
                            ? "bg-gray-500"
                            : isAvailable
                            ? "bg-green-600"
                            : ""
                        }
                      >
                        {isBooked
                          ? "Terpesan"
                          : isAvailable
                          ? "Tersedia"
                          : "Tutup"}
                      </Badge>
                    </Button>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Save Button */}
        {!loadingSchedules && schedulesForDate.length > 0 && (
          <div className="flex justify-end">
            <Button
              onClick={handleSaveSchedule}
              size="lg"
              className="bg-[#FDFB03] hover:bg-yellow-400 text-black font-semibold shadow-lg"
              disabled={loadingSchedules}
            >
              <Save className="h-5 w-5 mr-2" />
              Simpan Jadwal
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
