// types/schedule.ts

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

// Response untuk mendapatkan jadwal berdasarkan ID barber
export interface GetSchedulesByIdBarberResponse {
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
  period: string;     // contoh: "30 days"
  startDate: string;  // contoh: "Wed Nov 05 2025"
  endDate: string;    // contoh: "Fri Dec 05 2025"
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