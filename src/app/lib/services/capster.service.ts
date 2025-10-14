import api from "../api";
import { ApiResponse } from "../types";

export const capsterService = {
  getCapsters: async (): Promise<ApiResponse<any[]>> => {
    const response = await api.get("/capsters");
    return response.data;
  },

  getCapsterSchedule: async (
    capsterId: string,
    date: string
  ): Promise<ApiResponse<any>> => {
    const response = await api.get(`/capsters/${capsterId}/schedule`, {
      params: { date },
    });
    return response.data;
  },
};
