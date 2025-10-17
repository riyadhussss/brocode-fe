import api from "@/app/lib/api";
import { ApiResponse } from "@/app/lib/types/api";
import { LoginResponse, RegisterResponse } from "@/app/lib/types/user";
import { User, LoginData, RegisterData } from "@/app/lib/types/user";
import Cookies from "js-cookie";

export const authService = {
  register: async (data: RegisterData): Promise<RegisterResponse> => {
    const response = await api.post("/api/users/register", data);
    return response.data;
  },

  // LOGIN
  login: async (data: LoginData): Promise<LoginResponse> => {
    const response = await api.post("/api/users/login", data);
    return response.data;
  },
  verifyToken: async (): Promise<ApiResponse<User>> => {
    const response = await api.get("/auth/verify");
    return response.data;
  },

  logout: async (): Promise<void> => {
    // Hapus semua cookies terkait user
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("name");
    Cookies.remove("phone");
    Cookies.remove("email");
    Cookies.remove("userId");
    Cookies.remove("user");

    return Promise.resolve();
  },

  refreshToken: async (): Promise<ApiResponse<{ token: string }>> => {
    const response = await api.post("/auth/refresh");
    return response.data;
  },
};

export const authUtils = {
  getToken: () => Cookies.get("token"),
  getUser: () => ({
    userId: Cookies.get("userId"),
    name: Cookies.get("name"),
    email: Cookies.get("email"),
    phone: Cookies.get("phone"),
    role: Cookies.get("role"),
  }),
  getUserName: () => Cookies.get("name"),
  getUserPhone: () => Cookies.get("phone"),
  getUserRole: () => Cookies.get("role"),
  clearToken: () => Cookies.remove("token"),
};
