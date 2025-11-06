export interface BarberSummary {
  _id: string;
  name: string;
}

export interface Schedule {
  _id: string;
  barber: BarberSummary; // hanya id dan nama barber
  date: string; // waktu slot, bisa diubah ke Date kalau mau parsing otomatis
  timeSlot: string; // misalnya "15:00"
  scheduled_time: string; // waktu jadwal aktual
  status: string; // status slot
  reservation: string | null; // null jika belum dipesan
  isDefaultSlot: boolean;
  dayOfWeek: number;
  completedAt: string | null;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

// 📨 Response untuk mendapatkan jadwal berdasarkan ID barber
export interface GetSchedulesByIdBarberResponse {
  success: boolean;
  message: string;
  data: {
    barber: {
      _id: string;
      name: string;
      barberId: string;
      isActive: boolean;
    };
    dateRange: {
      start: string;
      end: string;
    };
    availabilityGrid: Record<
      string, // tanggal (misal: "2025-11-07")
      {
        date: string;
        dayName: string;
        dayOfWeek: number;
        slots: Record<
          string, // jam (misal: "13:00")
          {
            _id: string;
            status: string;
            isModifiable: boolean;
          }
        >;
      }
    >;
  };
}

// Response untuk mendapatkan jadwal yang tersediaberdasarkan ID barber
export interface GetAvailableSchedulesByIdBarberResponse {
  success: boolean;
  message: string;
  data?: Schedule[];
}

// 📨 Request body untuk menambah jadwal barber
export interface AddBarberScheduleRequest {
  days: number;
}

// 📦 Data ringkasan barber di dalam response
export interface BarberInfo {
  _id: string;
  name: string;
  barberId: string;
}

// 📅 Informasi jadwal yang dihasilkan
export interface GeneratedSchedulesInfo {
  generated: number;
  period: string; // contoh: "30 days"
  startDate: string; // contoh: "Wed Nov 05 2025"
  endDate: string; // contoh: "Fri Dec 05 2025"
}

// 🧩 Data utama dalam response
export interface AddBarberScheduleData {
  barber: BarberInfo;
  schedules: GeneratedSchedulesInfo;
}

// ✅ Response dari endpoint ADD jadwal barber
export interface AddBarberScheduleResponse {
  success: boolean;
  message: string;
  data?: AddBarberScheduleData;
}

export interface SwitchScheduleStatusRequest {
  action: "enable" | "disable";
  scheduleIds: string[];
}

// Struktur untuk schedule ringkas di dalam barberSummary
export interface ScheduleSummary {
  _id: string;
  date: string;
  timeSlot: string;
  status: string;
}

// Struktur barber di dalam summary
export interface BarberSummary {
  _id: string;
  name: string;
  barberId: string;
}

// Struktur detail per-barber di barberSummary
export interface BarberSummaryDetail {
  barber: BarberSummary;
  schedules: ScheduleSummary[];
}

// Struktur updatedSchedules
export interface UpdatedSchedule {
  _id: string;
  barber: string;
  date: string;
  timeSlot: string;
  status: string;
  lastModifiedAt: string;
}

// Data utama di dalam response
export interface SwitchScheduleData {
  modified: number;
  total: number;
  action: "enable" | "disable";
  barberSummary: Record<string, BarberSummaryDetail>; // key = barberId
  updatedSchedules: UpdatedSchedule[];
}

// Response utama
export interface SwitchScheduleResponse {
  success: boolean;
  message: string;
  data: SwitchScheduleData;
}
