import api from "../api";
import {
  GetAdminsResponse,
  GetDashboardResponse,
  GetAdminByIdResponse,
  AddAdminRequest,
  AddAdminResponse,
  EditAdminRequest,
  EditAdminResponse,
  DeleteAdminsResponse,
} from "../types/admin";
// import {}

export const adminService = {
  getDashboardAdmin: async (): Promise<GetDashboardResponse> => {
    const response = await api.get("/dashboard/admin");
    return response.data;
  },

  getAdmins: async (): Promise<GetAdminsResponse> => {
    const response = await api.get("/admins");
    return response.data;
  },

  getAdminbyId: async (id: string): Promise<GetAdminByIdResponse> => {
    const response = await api.get(`/admins/${id}`);
    return response.data;
  },

  deleteAdmin: async (id: string): Promise<DeleteAdminsResponse> => {
    const response = await api.delete(`/admins/${id}`);
    return response.data;
  },

  addAdmin: async (data: AddAdminRequest): Promise<AddAdminResponse> => {
    const response = await api.post("/admins", data);
    return response.data;
  },

  editAdmin: async (
    id: string,
    data: Partial<EditAdminRequest>
  ): Promise<EditAdminResponse> => {
    const response = await api.put(`/admins/${id}`, data);
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
