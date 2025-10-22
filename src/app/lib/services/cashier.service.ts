import api from "../api";
import {
  DashboardResponse,
  GetCashiersResponse,
  AddCashierRequest,
  AddCashierResponse,
  EditCashierRequest,
  EditCashierResponse,
  getCashierResponse,
} from "../types/cashier";

export const cashierService = {
  // getDashboardCashier: async (): Promise<DashboardResponse> => {
  //   const response = await api.get("/dashboard/cashier");
  //   return response.data;
  // },
  getCashiers: async (): Promise<GetCashiersResponse> => {
    const response = await api.get("/cashiers");
    return response.data;
  },
  getCashier: async (id: string): Promise<getCashierResponse> => {
    const response = await api.get(`/cashiers/${id}`);
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
  deleteCashier: async (id: string): Promise<GetCashiersResponse> => {
    const response = await api.delete(`/cashiers/${id}`);
    return response.data;
  },
};
