import api from "../api";
import { ApiResponse, PaginationParams } from "../types";

export const reservationService = {
  createReservation: async (data: any): Promise<ApiResponse<any>> => {
    const response = await api.post("/reservations", data);
    return response.data;
  },

  getUserReservations: async (
    params?: PaginationParams
  ): Promise<ApiResponse<any[]>> => {
    const response = await api.get("/reservations/user", { params });
    return response.data;
  },

  getAllReservations: async (
    params?: PaginationParams
  ): Promise<ApiResponse<any[]>> => {
    const response = await api.get("/reservations", { params });
    return response.data;
  },

  updateReservationStatus: async (
    id: string,
    status: string
  ): Promise<ApiResponse<any>> => {
    const response = await api.put(`/reservations/${id}/status`, { status });
    return response.data;
  },
};
