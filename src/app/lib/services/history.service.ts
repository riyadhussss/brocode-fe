import api from "../api";
import {
  HistoryAdminResponse,
  HistoryCashierResponse,
  HistoryCustomerResponse,
} from "../types/history";

export const historyService = {
  // Fetch history for admin
  getAdminHistory: async (): Promise<HistoryAdminResponse> => {
    const response = await api.get("/history/admin");
    return response.data;
  },

  // Fetch history for cashier
  getCashierHistory: async (): Promise<HistoryCashierResponse> => {
    const response = await api.get("/history/cashier");
    return response.data;
  },

  // Fetch history for customer
  getCustomerHistory: async (): Promise<HistoryCustomerResponse> => {
    const response = await api.get("/history/customer");
    return response.data;
  },
};
