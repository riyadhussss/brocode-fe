import api from "../api";
import {
  GetCustomerByIdResponse,
  GetCustomersResponse,
  DeleteCustomerResponse,
  AddCustomerRequest,
  AddCustomerResponse,
  EditCustomerRequest,
  EditCustomerResponse,
  GetCustomerReservationsResponse,
} from "../types/customer";

export const customerService = {
  getCustomers: async (): Promise<GetCustomersResponse> => {
    const response = await api.get("/customers");
    return response.data;
  },

  getCustomerById: async (id: string): Promise<GetCustomerByIdResponse> => {
    const response = await api.get(`/customers/${id}`);
    return response.data;
  },

  deleteCustomer: async (id: string): Promise<DeleteCustomerResponse> => {
    const response = await api.delete(`/customers/${id}`);
    return response.data;
  },

  addCustomer: async (
    data: AddCustomerRequest
  ): Promise<AddCustomerResponse> => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  editCustomer: async (
    id: string,
    data: EditCustomerRequest
  ): Promise<EditCustomerResponse> => {
    const response = await api.put(`/customers/${id}`, data);
    return response.data;
  },

  getCustomerReservations:
    async (): Promise<GetCustomerReservationsResponse> => {
      const response = await api.get(`reservations/my-reservations`);
      return response.data;
    },
};
