import api from "../api";
import {
  ReservationAutoRequest,
  ReservationAutoResponse,
  ReservationOtherRequest,
  ReservationOtherResponse,
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
};
