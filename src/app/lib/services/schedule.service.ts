import api from "../api";
import { GetSchedulesByIdBarberResponse } from "../types/schedule";

export const scheduleService = {
  getSchedulesByIdBarber: async (
    id: string
  ): Promise<GetSchedulesByIdBarberResponse> => {
    const response = await api.get(`/reservations/schedules/${id}`);
    return response.data;
  },
};
