import api from "../api";
import {
  GetSchedulesByIdBarberResponse,
  AddBarberScheduleRequest,
  AddBarberScheduleResponse,
} from "../types/schedule";

export const scheduleService = {
  getSchedulesByIdBarber: async (
    id: string
  ): Promise<GetSchedulesByIdBarberResponse> => {
    const response = await api.get(`/reservations/schedules/${id}`);
    return response.data;
  },

  addBarberSchedule: async (
    id: string,
    requestData: AddBarberScheduleRequest
  ): Promise<AddBarberScheduleResponse> => {
    const response = await api.post(`/schedules/generate/${id}`, requestData);
    return response.data;
  },
};
