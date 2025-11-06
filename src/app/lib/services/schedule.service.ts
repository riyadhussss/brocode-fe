import api from "../api";
import {
  GetSchedulesByIdBarberResponse,
  AddBarberScheduleRequest,
  AddBarberScheduleResponse,
  SwitchScheduleStatusRequest,
  SwitchScheduleResponse,
  GetAvailableSchedulesByIdBarberResponse,
} from "../types/schedule";

export const scheduleService = {
  // Untuk mendapatkan semua schedule (available & unavailable) untuk management
  getSchedulesByIdBarber: async (
    id: string
  ): Promise<GetSchedulesByIdBarberResponse> => {
    const response = await api.get(`/schedules/barber/${id}/overview`);
    return response.data;
  },

  // Untuk mendapatkan schedule available saja (untuk reservasi) akan digunakan untuk customer
  getAvailableSchedulesByIdBarber: async (
    id: string
  ): Promise<GetAvailableSchedulesByIdBarberResponse> => {
    const response = await api.get(`/reservations/schedules/${id}`);
    return response.data;
  },

  addBarberSchedule: async (
    id: string,
    data: AddBarberScheduleRequest
  ): Promise<AddBarberScheduleResponse> => {
    const response = await api.post(`/schedules/generate/${id}`, data);
    return response.data;
  },

  switchScheduleStatus: async (
    data: SwitchScheduleStatusRequest
  ): Promise<SwitchScheduleResponse> => {
    const response = await api.put(`/schedules/bulk-toggle`, data);
    return response.data;
  },
};
