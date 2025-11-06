"use client";

import { useState, useEffect } from "react";
import {
  Save,
  Clock,
  User,
  CalendarDays,
  Check,
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

  // Dialog state
  const [addScheduleDialogOpen, setAddScheduleDialogOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string>("7");
  const [saveConfirmDialogOpen, setSaveConfirmDialogOpen] = useState(false);

  // Loading states
  const [loadingBarbers, setLoadingBarbers] = useState(true);
  const [loadingSchedules, setLoadingSchedules] = useState(false);
  const [loadingAddSchedule, setLoadingAddSchedule] = useState(false);
  const [loadingSaveSchedule, setLoadingSaveSchedule] = useState(false);

  // Track original schedules and modified schedules
  const [originalSchedules, setOriginalSchedules] = useState<Schedule[]>([]);
  const [modifiedScheduleIds, setModifiedScheduleIds] = useState<Set<string>>(
    new Set()
  );

  // Fetch active barbers on mount
  useEffect(() => {
    fetchActiveBarbers();
  }, []);

  // Fetch schedules when barber or date changes
  useEffect(() => {
    if (selectedBarberId) {
      fetchSchedulesByBarber(selectedBarberId);
      // Reset modified schedules when changing barber or date
      setModifiedScheduleIds(new Set());
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
        // Transform availabilityGrid to Schedule array
        const availabilityGrid = response.data.availabilityGrid || {};
        const scheduleData: Schedule[] = [];
        const barberInfo = response.data.barber;

        // Iterate through each date in the grid
        Object.entries(availabilityGrid).forEach(
          ([dateStr, dateData]: [string, any]) => {
            const slots = dateData.slots || {};

            // Iterate through each time slot
            Object.entries(slots).forEach(
              ([timeSlot, slotData]: [string, any]) => {
                scheduleData.push({
                  _id: slotData._id,
                  barber: {
                    _id: barberInfo._id,
                    name: barberInfo.name,
                    barberId: barberInfo.barberId,
                  },
                  date: dateData.date,
                  timeSlot: timeSlot,
                  scheduled_time: `${
                    dateData.date.split("T")[0]
                  }T${timeSlot}:00.000Z`,
                  status: slotData.status,
                  reservation: null,
                  isDefaultSlot: true,
                  dayOfWeek: dateData.dayOfWeek,
                  completedAt: null,
                  __v: 0,
                  createdAt: dateData.date,
                  updatedAt: dateData.date,
                });
              }
            );
          }
        );

        setSchedules(scheduleData);
        setOriginalSchedules(scheduleData);
      } else {
        setSchedules([]);
        setOriginalSchedules([]);
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(`Gagal memuat jadwal: ${errorMessage}`);
      setSchedules([]);
      setOriginalSchedules([]);
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

    // Track modified schedule - compare with original
    setModifiedScheduleIds((prev) => {
      const newSet = new Set(prev);
      const originalSchedule = originalSchedules.find(
        (s) => s._id === scheduleId
      );
      const currentSchedule = schedules.find((s) => s._id === scheduleId);

      if (originalSchedule && currentSchedule) {
        // Toggle the status
        const newStatus =
          currentSchedule.status === "available" ? "unavailable" : "available";

        // If new status equals original, remove from modified set
        if (newStatus === originalSchedule.status) {
          newSet.delete(scheduleId);
        } else {
          newSet.add(scheduleId);
        }
      }
      return newSet;
    });
  };

  // Toggle semua slot untuk hari tertentu
  const toggleAllSlotsForDay = (available: boolean) => {
    const schedulesForDate = getSchedulesForSelectedDate();
    const targetStatus = available ? "available" : "unavailable";

    const updatedSchedules = schedules.map((schedule) => {
      const isInSelectedDate = schedulesForDate.some(
        (s) => s._id === schedule._id
      );
      if (isInSelectedDate && schedule.reservation === null) {
        return {
          ...schedule,
          status: targetStatus,
        };
      }
      return schedule;
    });
    setSchedules(updatedSchedules);

    // Track all modified schedules - compare with original
    setModifiedScheduleIds((prev) => {
      const newSet = new Set(prev);

      schedulesForDate.forEach((schedule) => {
        if (schedule.reservation === null) {
          const originalSchedule = originalSchedules.find(
            (s) => s._id === schedule._id
          );

          if (originalSchedule) {
            // If new status equals original, remove from modified set
            if (targetStatus === originalSchedule.status) {
              newSet.delete(schedule._id);
            } else {
              newSet.add(schedule._id);
            }
          }
        }
      });

      return newSet;
    });
  };

  const confirmSaveSchedule = () => {
    if (modifiedScheduleIds.size === 0) {
      toast.info("Tidak ada perubahan yang perlu disimpan");
      return;
    }
    setSaveConfirmDialogOpen(true);
  };

  const handleSaveSchedule = async () => {
    setSaveConfirmDialogOpen(false);

    try {
      setLoadingSaveSchedule(true);

      // Group schedules by their new status
      const schedulesToEnable: string[] = [];
      const schedulesToDisable: string[] = [];

      modifiedScheduleIds.forEach((scheduleId) => {
        const schedule = schedules.find((s) => s._id === scheduleId);
        if (schedule) {
          if (schedule.status === "available") {
            schedulesToEnable.push(scheduleId);
          } else {
            schedulesToDisable.push(scheduleId);
          }
        }
      });

      // Send requests for enable and disable separately
      const promises = [];

      if (schedulesToEnable.length > 0) {
        promises.push(
          scheduleService.switchScheduleStatus({
            action: "enable",
            scheduleIds: schedulesToEnable,
          })
        );
      }

      if (schedulesToDisable.length > 0) {
        promises.push(
          scheduleService.switchScheduleStatus({
            action: "disable",
            scheduleIds: schedulesToDisable,
          })
        );
      }

      const results = await Promise.all(promises);

      // Check if all requests were successful
      const allSuccess = results.every((result) => result.success);

      if (allSuccess) {
        toast.success("Jadwal berhasil disimpan!");
        // Clear modified schedules after successful save
        setModifiedScheduleIds(new Set());
        // Refresh schedules to get updated data from server
        await fetchSchedulesByBarber(selectedBarberId);
      } else {
        toast.error("Beberapa perubahan gagal disimpan");
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(`Gagal menyimpan jadwal: ${errorMessage}`);
    } finally {
      setLoadingSaveSchedule(false);
    }
  };

  const handleAddSchedule = async () => {
    if (!selectedBarberId) {
      toast.error("Silakan pilih capster terlebih dahulu");
      return;
    }

    try {
      setLoadingAddSchedule(true);
      const response = await scheduleService.addBarberSchedule(
        selectedBarberId,
        {
          days: parseInt(selectedDays),
        }
      );

      if (response.success) {
        toast.success(response.message || "Jadwal berhasil ditambahkan!");
        setAddScheduleDialogOpen(false);
        // Refresh schedules after adding
        await fetchSchedulesByBarber(selectedBarberId);
      } else {
        toast.error(response.message || "Gagal menambahkan jadwal");
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(`Gagal menambahkan jadwal: ${errorMessage}`);
    } finally {
      setLoadingAddSchedule(false);
    }
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
      <div className="h-full bg-gray-50 p-6 flex flex-col">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-64" />
          </div>
          <Skeleton className="h-4 w-96" />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-24 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-24 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-96 mb-2" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {Array.from({ length: 12 }).map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
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

            {/* Button Tambah Jadwal */}
            <div className="mt-6 pt-6 border-t">
              <Dialog
                open={addScheduleDialogOpen}
                onOpenChange={setAddScheduleDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    className="w-full bg-[#FDFB03] hover:bg-yellow-400 text-black font-semibold"
                    disabled={!selectedBarberId}
                  >
                    <CalendarDays className="h-5 w-5 mr-2" />
                    Tambah Jadwal
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tambah Jadwal Capster</DialogTitle>
                    <DialogDescription>
                      Silahkan masukkan jadwal yang akan anda tambahkan dalam
                      beberapa hari ke depan
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="days">Jumlah Hari</Label>
                      <Select
                        value={selectedDays}
                        onValueChange={setSelectedDays}
                      >
                        <SelectTrigger
                          id="days"
                          className="focus-visible:ring-[#FDFB03]"
                        >
                          <SelectValue placeholder="Pilih jumlah hari" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 Hari</SelectItem>
                          <SelectItem value="14">14 Hari</SelectItem>
                          <SelectItem value="30">30 Hari</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-gray-500">
                        Jadwal akan ditambahkan untuk{" "}
                        <span className="font-semibold text-gray-700">
                          {selectedBarberData?.name || "capster yang dipilih"}
                        </span>{" "}
                        selama {selectedDays} hari ke depan
                      </p>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setAddScheduleDialogOpen(false)}
                      disabled={loadingAddSchedule}
                    >
                      Batal
                    </Button>
                    <Button
                      onClick={handleAddSchedule}
                      disabled={loadingAddSchedule}
                      className="bg-[#FDFB03] hover:bg-yellow-400 text-black font-semibold"
                    >
                      {loadingAddSchedule ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Menambahkan...
                        </>
                      ) : (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Tambahkan
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Grid */}
        <Card>
          <CardHeader>
            <div className="space-y-4 lg:space-y-0">
              {/* Title and Buttons Container */}
              <div className="lg:flex lg:items-start lg:justify-between lg:gap-4">
                <div className="lg:flex-1">
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

                {/* Buttons - Responsive Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:flex gap-2 mt-4 lg:mt-0">
                  <Button
                    onClick={() => toggleAllSlotsForDay(true)}
                    variant="outline"
                    size="sm"
                    className="text-green-700 border-green-300 hover:bg-green-50 w-full lg:w-auto"
                    disabled={loadingSchedules}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Buka Semua
                  </Button>
                  <Button
                    onClick={() => toggleAllSlotsForDay(false)}
                    variant="outline"
                    size="sm"
                    className="text-red-700 border-red-300 hover:bg-red-50 w-full lg:w-auto"
                    disabled={loadingSchedules}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Tutup Semua
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Info helper untuk modified schedules */}
            {modifiedScheduleIds.size > 0 && !loadingSchedules && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2 text-sm">
                <div className="bg-[#FDFB03] rounded-full p-1">
                  <Save className="h-3 w-3 text-black" />
                </div>
                <p className="text-yellow-800">
                  Slot dengan ikon <span className="font-semibold">disket</span>{" "}
                  memiliki perubahan yang belum disimpan
                </p>
              </div>
            )}

            {loadingSchedules ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {Array.from({ length: 12 }).map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
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
                  const isModified = modifiedScheduleIds.has(schedule._id);

                  return (
                    <Button
                      key={schedule._id}
                      onClick={() =>
                        !isBooked && toggleAvailability(schedule._id)
                      }
                      variant="outline"
                      disabled={isBooked}
                      className={`h-auto p-4 flex flex-col items-center space-y-2 transition-all relative ${
                        isBooked
                          ? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
                          : isAvailable
                          ? "bg-green-50 border-green-300 text-green-800 hover:bg-green-100 hover:border-green-400"
                          : "bg-red-100 border-red-400 text-red-900 hover:bg-red-200 hover:border-red-500"
                      } ${
                        isModified ? "ring-2 ring-[#FDFB03] ring-offset-2" : ""
                      }`}
                    >
                      {isModified && (
                        <div className="absolute -top-2 -right-2 bg-[#FDFB03] rounded-full p-1">
                          <Save className="h-3 w-3 text-black" />
                        </div>
                      )}
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
          <div className="flex flex-col items-end gap-2">
            {modifiedScheduleIds.size > 0 && (
              <p className="text-sm text-gray-600">
                {modifiedScheduleIds.size} perubahan belum disimpan
              </p>
            )}
            <Dialog
              open={saveConfirmDialogOpen}
              onOpenChange={setSaveConfirmDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  onClick={confirmSaveSchedule}
                  size="lg"
                  className="bg-[#FDFB03] hover:bg-yellow-400 text-black font-semibold shadow-lg"
                  disabled={
                    loadingSaveSchedule || modifiedScheduleIds.size === 0
                  }
                >
                  {loadingSaveSchedule ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5 mr-2" />
                      Simpan Jadwal
                      {modifiedScheduleIds.size > 0 &&
                        ` (${modifiedScheduleIds.size})`}
                    </>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Konfirmasi Penyimpanan</DialogTitle>
                  <DialogDescription>
                    Anda akan menyimpan {modifiedScheduleIds.size} perubahan
                    jadwal. Perubahan ini akan mempengaruhi ketersediaan slot
                    untuk reservasi.
                  </DialogDescription>
                </DialogHeader>

                <div className="py-4 space-y-3">
                  <p className="text-sm font-medium text-gray-700">
                    Ringkasan Perubahan:
                  </p>
                  <div className="space-y-2">
                    {(() => {
                      const enableCount = Array.from(
                        modifiedScheduleIds
                      ).filter((id) => {
                        const schedule = schedules.find((s) => s._id === id);
                        return schedule?.status === "available";
                      }).length;
                      const disableCount =
                        modifiedScheduleIds.size - enableCount;

                      return (
                        <>
                          {enableCount > 0 && (
                            <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 p-2 rounded">
                              <CheckCircle2 className="h-4 w-4" />
                              <span>
                                {enableCount} slot akan dibuka (tersedia)
                              </span>
                            </div>
                          )}
                          {disableCount > 0 && (
                            <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 p-2 rounded">
                              <XCircle className="h-4 w-4" />
                              <span>{disableCount} slot akan ditutup</span>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    Pastikan perubahan sudah sesuai sebelum menyimpan.
                  </p>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setSaveConfirmDialogOpen(false)}
                    disabled={loadingSaveSchedule}
                  >
                    Batal
                  </Button>
                  <Button
                    onClick={handleSaveSchedule}
                    disabled={loadingSaveSchedule}
                    className="bg-[#FDFB03] hover:bg-yellow-400 text-black font-semibold"
                  >
                    {loadingSaveSchedule ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Ya, Simpan
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
}
