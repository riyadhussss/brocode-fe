import api from "../api";
import { ApiResponse } from "../types";

interface Capster {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface CapsterSchedule {
  capsterId: string;
  date: string;
  slots: Array<{
    time: string;
    isAvailable: boolean;
  }>;
}

export const capsterService = {
  getCapsters: async (): Promise<ApiResponse<Capster[]>> => {
    const response = await api.get("/capsters");
    return response.data;
  },

  getCapsterSchedule: async (
    capsterId: string,
    date: string
  ): Promise<ApiResponse<CapsterSchedule>> => {
    const response = await api.get(`/capsters/${capsterId}/schedule`, {
      params: { date },
    });
    return response.data;
  },
};
