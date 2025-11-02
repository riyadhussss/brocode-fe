import api from "@/app/lib/api";
import {
  LoginResponse,
  RegisterResponse,
  VerifyToken,
  VerifyTokenResponse,
} from "@/app/lib/types/user";
import { LoginData, RegisterData } from "@/app/lib/types/user";
import Cookies from "js-cookie";

export const authService = {
  // Register
  register: async (data: RegisterData): Promise<RegisterResponse> => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  // Login
  login: async (data: LoginData): Promise<LoginResponse> => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  // Verify Token
  verifyToken: async (data?: VerifyToken): Promise<VerifyTokenResponse> => {
    const response = await api.get("/auth/verify-token", { params: data });
    return response.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    // Hapus semua cookies terkait user
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("name");
    Cookies.remove("phone");
    Cookies.remove("email");
    Cookies.remove("userId");
    Cookies.remove("_id");
    Cookies.remove("user");

    return Promise.resolve();
  },
};
