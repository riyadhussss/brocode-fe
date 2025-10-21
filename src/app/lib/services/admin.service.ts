import api from "../api";
import { DashboardResponse } from "../types/admin";
// import {}
// import { ApiResponse, PaginationParams } from "../types";
// import { User } from "../types";

export const adminService = {
  getDashboardAdmin: async (): Promise<DashboardResponse> => {
    const response = await api.get("/dashboard/admin");
    // Nanti ubah api terbaru
    return response.data;
  },
  //   getUsers: async (params?: PaginationParams): Promise<ApiResponse<User[]>> => {
  //     const response = await api.get("/admin/users", { params });
  //     return response.data;
  //   },

  //   createUser: async (
  //     data: Omit<User, "id" | "createdAt" | "updatedAt">
  //   ): Promise<ApiResponse<User>> => {
  //     const response = await api.post("/admin/users", data);
  //     return response.data;
  //   },

  //   updateUser: async (
  //     id: string,
  //     data: Partial<User>
  //   ): Promise<ApiResponse<User>> => {
  //     const response = await api.put(`/admin/users/${id}`, data);
  //     return response.data;
  //   },

  //   deleteUser: async (id: string): Promise<ApiResponse<null>> => {
  //     const response = await api.delete(`/admin/users/${id}`);
  //     return response.data;
  //   },
};
