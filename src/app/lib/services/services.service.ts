import api from "../api";
import { ApiResponse } from "../types";

export const serviceService = {
  getServices: async (): Promise<ApiResponse<any[]>> => {
    const response = await api.get("/services");
    return response.data;
  },
};
