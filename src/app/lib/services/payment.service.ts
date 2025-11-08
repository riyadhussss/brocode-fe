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
  GetPaymentMethodForCustomerResponse,
  UploadPaymentProofRequest,
  UploadPaymentProofResponse,
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

  getPaymentMethodsForCustomer:
    async (): Promise<GetPaymentMethodForCustomerResponse> => {
      const response = await api.get("/payments/methods");
      return response.data;
    },

  uploadPaymentProof: async (
    data: UploadPaymentProofRequest
  ): Promise<UploadPaymentProofResponse> => {
    const formData = new FormData();
    formData.append("reservationId", data.reservationId);
    formData.append("paymentMethod", data.paymentMethod);
    formData.append("selectedAccount", JSON.stringify(data.selectedAccount));
    formData.append("paymentProof", data.paymentProof);

    const response = await api.post("/payments/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
