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
