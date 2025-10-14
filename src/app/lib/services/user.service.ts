import api from "@/app/lib/api";
import { ApiResponse } from "@/app/lib/types/api";
import { User } from "@/app/lib/types/user";

export const userService = {
  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await api.get("/user/profile");
    return response.data;
  },

  updateProfile: async (data: Partial<User>): Promise<ApiResponse<User>> => {
    const response = await api.put("/user/profile", data);
    return response.data;
  },

  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<ApiResponse<null>> => {
    const response = await api.put("/user/change-password", data);
    return response.data;
  },
};