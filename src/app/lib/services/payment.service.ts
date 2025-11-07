import api from "../api";
import { GetPaymentResponse } from "../types/payment";

export const paymentService = {
  getPaymentMethods: async (): Promise<GetPaymentResponse> => {
    const response = await api.get("/payments/methods");
    return response.data;
  },
};