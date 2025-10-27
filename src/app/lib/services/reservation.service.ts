import api from "../api";
import { ApiResponse, PaginationParams } from "../types";

interface Reservation {
  _id: string;
  userId: string;
  capsterId: string;
  packageId: string;
  date: string;
  time: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateReservationData {
  capsterId: string;
  packageId: string;
  date: string;
  time: string;
}

export const reservationService = {
  createReservation: async (
    data: CreateReservationData
  ): Promise<ApiResponse<Reservation>> => {
    const response = await api.post("/reservations", data);
    return response.data;
  },

  getUserReservations: async (
    params?: PaginationParams
  ): Promise<ApiResponse<Reservation[]>> => {
    const response = await api.get("/reservations/user", { params });
    return response.data;
  },

  getAllReservations: async (
    params?: PaginationParams
  ): Promise<ApiResponse<Reservation[]>> => {
    const response = await api.get("/reservations", { params });
    return response.data;
  },

  updateReservationStatus: async (
    id: string,
    status: string
  ): Promise<ApiResponse<Reservation>> => {
    const response = await api.put(`/reservations/${id}/status`, { status });
    return response.data;
  },
};
