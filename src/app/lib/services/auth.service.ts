import api from "@/app/lib/api";
import { ApiResponse } from "@/app/lib/types/api";
import { User, LoginData, RegisterData } from "@/app/lib/types/user";

export const authService = {
  register: async (data: RegisterData): Promise<ApiResponse<User>> => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  login: async (
    data: LoginData
  ): Promise<ApiResponse<{ user: User; token: string }>> => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  verifyToken: async (): Promise<ApiResponse<User>> => {
    const response = await api.get("/auth/verify");
    return response.data;
  },

  logout: async (): Promise<ApiResponse<null>> => {
    const response = await api.post("/auth/logout");
    return response.data;
  },

  refreshToken: async (): Promise<ApiResponse<{ token: string }>> => {
    const response = await api.post("/auth/refresh");
    return response.data;
  },
};
