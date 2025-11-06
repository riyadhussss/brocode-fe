import api from "../api";
import {
  GetProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "../types/profile";

export const profileService = {
  getProfile: async (): Promise<GetProfileResponse> => {
    const response = await api.get("/profile");
    return response.data;
  },
  updateProfile: async (
    data: UpdateProfileRequest
  ): Promise<UpdateProfileResponse> => {
    const response = await api.put("/profile", data);
    return response.data;
  },
};