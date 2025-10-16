import api from "@/app/lib/api";
import { ApiResponse } from "@/app/lib/types/api";
import { LoginResponse } from "@/app/lib/types/user";
import { User, LoginData, RegisterData } from "@/app/lib/types/user";

export const authService = {
  register: async (data: RegisterData): Promise<ApiResponse<User>> => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  // LOGIN
  login: async (data: LoginData): Promise<LoginResponse> => {
    const response = await api.post("/api/users/login", data);

    // ✅ Simpan token ke localStorage jika login berhasil
    // if (response.data?.token) {
    //   localStorage.setItem("token", response.data.token);
    // }

    return response.data;
  },
  verifyToken: async (): Promise<ApiResponse<User>> => {
    const response = await api.get("/auth/verify");
    return response.data;
  },

  logout: async (): Promise<void> => {
    // Hapus token dari localStorage
    localStorage.removeItem("token");
    // Opsional: bisa juga hapus data user lain jika disimpan
    // localStorage.removeItem("user");

    return Promise.resolve();
  },

  refreshToken: async (): Promise<ApiResponse<{ token: string }>> => {
    const response = await api.post("/auth/refresh");
    return response.data;
  },
};
