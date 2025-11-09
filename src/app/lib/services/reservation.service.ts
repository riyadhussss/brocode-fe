import { add } from "date-fns";
import api from "../api";
import {
  ReservationAutoRequest,
  ReservationAutoResponse,
  ReservationOtherRequest,
  ReservationOtherResponse,
  AddReservationRequest,
  AddReservationResponse,
  CheckReservationsResponse,
} from "../types/reservation";

export const reservationService = {
  reservationAuto: async (
    data: ReservationAutoRequest
  ): Promise<ReservationAutoResponse> => {
    const response = await api.post(`/reservations/set-booking-type`, data);
    return response.data;
  },

  reservationOther: async (
    data: ReservationOtherRequest
  ): Promise<ReservationOtherResponse> => {
    const response = await api.post(`/reservations/set-booking-type`, data);
    return response.data;
  },

  addReservation: async (
    data: AddReservationRequest
  ): Promise<AddReservationResponse> => {
    const response = await api.post(`/reservations`, data);
    return response.data;
  },

  checkReservations: async (): Promise<CheckReservationsResponse> => {
    const response = await api.get(`payments/pending`);
    return response.data;
  },
};
