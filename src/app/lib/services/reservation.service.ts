import api from "../api";
import {
  InputCustomerRequest,
  InputCustomerResponse,
  AddReservationRequest,
  AddReservationResponse,
  CheckReservationsResponse,
  CheckConfirmedReservationsResponse,
  SetReservationStatusRequest,
  SetReservationStatusResponse,
} from "../types/reservation";

export const reservationService = {
  inputCustomer: async (
    data: InputCustomerRequest
  ): Promise<InputCustomerResponse> => {
    const response = await api.post(`reservations/customer-data`, data);
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

  checkConfirmedReservations:
    async (): Promise<CheckConfirmedReservationsResponse> => {
      const response = await api.get(`reservations?status=confirmed`);
      return response.data;
    },

  setReservationStatus: async (
    reservationId: string,
    data: SetReservationStatusRequest
  ): Promise<SetReservationStatusResponse> => {
    const response = await api.patch(
      `reservations/${reservationId}/status`,
      data
    );
    return response.data;
  },
};
