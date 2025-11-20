import api from "../api";
import {
  GetCashiersResponse,
  AddCashierRequest,
  AddCashierResponse,
  EditCashierRequest,
  EditCashierResponse,
  DeleteCashierResponse,
} from "../types/cashier";

export const cashierService = {
  getCashiers: async (): Promise<GetCashiersResponse> => {
    const response = await api.get("/cashiers");
    return response.data;
  },

  addCashier: async (data: AddCashierRequest): Promise<AddCashierResponse> => {
    const response = await api.post("/cashiers", data);
    return response.data;
  },
  editCashier: async (
    id: string,
    data: Partial<EditCashierRequest>
  ): Promise<EditCashierResponse> => {
    const response = await api.put(`/cashiers/${id}`, data);
    return response.data;
  },
  deleteCashier: async (id: string): Promise<DeleteCashierResponse> => {
    const response = await api.delete(`/cashiers/${id}`);
    return response.data;
  },
};
