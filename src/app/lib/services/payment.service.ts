import { add } from "date-fns";
import api from "../api";
import {
  GetPaymentMethodsResponse,
  GetPaymentMethodByIdResponse,
  AddPaymentMethodRequest,
  AddPaymentMethodResponse,
  EditPaymentMethodRequest,
  EditPaymentMethodResponse,
  DeletePaymentMethodResponse,
} from "../types/payment";
import { get } from "http";

export const paymentService = {
  getPaymentMethods: async (): Promise<GetPaymentMethodsResponse> => {
    const response = await api.get("/payments/options");
    return response.data;
  },

  getPaymentMethodById: async (
    id: string
  ): Promise<GetPaymentMethodByIdResponse> => {
    const response = await api.get(`/payments/options/${id}`);
    return response.data;
  },

  addPaymentMethod: async (
    data: AddPaymentMethodRequest
  ): Promise<AddPaymentMethodResponse> => {
    const response = await api.post("/payments/options", data);
    return response.data;
  },

  editPaymentMethod: async (
    id: string,
    data: EditPaymentMethodRequest
  ): Promise<EditPaymentMethodResponse> => {
    const response = await api.put(`/payments/options/${id}`, data);
    return response.data;
  },

  deletePaymentMethod: async (
    id: string
  ): Promise<DeletePaymentMethodResponse> => {
    const response = await api.delete(`/payments/options/${id}`);
    return response.data;
  },
};
