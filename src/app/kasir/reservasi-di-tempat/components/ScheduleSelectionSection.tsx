import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Schedule } from "@/app/lib/types/schedule";

interface ScheduleSelectionSectionProps {
  selectedDate: Date | undefined;
  scheduleId: string;
  barberId: string;
  availableSchedules: Schedule[];
  onDateSelect: (date: Date | undefined) => void;
  onSelectChange: (name: string, value: string) => void;
  getTimeSlotsForSelectedDate: () => Schedule[];
}

export default function ScheduleSelectionSection({
  selectedDate,
  scheduleId,
  barberId,
  availableSchedules,
  onDateSelect,
  onSelectChange,
  getTimeSlotsForSelectedDate,
}: ScheduleSelectionSectionProps) {
  if (!barberId) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Pilih Jadwal</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Date Selection */}
        <div className="space-y-2">
          <Label>
            Pilih Tanggal <span className="text-red-500">*</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, "EEEE, dd MMMM yyyy", {
                    locale: id,
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
                onSelect={onDateSelect}
                disabled={(date) => {
                  const dateStr = format(date, "yyyy-MM-dd");
                  const isAvailable = availableSchedules.some(
                    (schedule) =>
                      format(new Date(schedule.date), "yyyy-MM-dd") === dateStr
                  );
                  return (
                    !isAvailable ||
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  );
                }}
                initialFocus
                locale={id}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Slot Selection */}
        <div className="space-y-2">
          <Label htmlFor="scheduleId">
            Pilih Jam <span className="text-red-500">*</span>
          </Label>
          <Select
            value={scheduleId}
            onValueChange={(value) => onSelectChange("scheduleId", value)}
            disabled={!selectedDate}
          >
            <SelectTrigger id="scheduleId">
              <SelectValue placeholder="Pilih jam" />
            </SelectTrigger>
            <SelectContent>
              {getTimeSlotsForSelectedDate().length > 0 ? (
                getTimeSlotsForSelectedDate().map((schedule) => (
                  <SelectItem key={schedule._id} value={schedule._id}>
                    {schedule.timeSlot}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="no-schedule" disabled>
                  {selectedDate
                    ? "Tidak ada jam tersedia"
                    : "Pilih tanggal terlebih dahulu"}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
