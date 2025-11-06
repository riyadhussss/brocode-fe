export interface UserProfile {
  _id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  role: "admin" | "cashier" | "customer";
  createdAt?: string;
  updatedAt?: string;
  profileType?: string; 
}

export interface GetProfileResponse {
  success: boolean;
  message: string;
  data?: UserProfile;
}

export interface UpdateProfileRequest {
  name: string;
  email: string;
  phone?: string;
  currentPassword: string;
  newPassword: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data?: UserProfile;
}
