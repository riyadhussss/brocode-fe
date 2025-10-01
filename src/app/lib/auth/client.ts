import api from "../api/api";

// Interface untuk response data
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Interface untuk pagination
interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

// Interface untuk user data
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "kasir" | "user";
  createdAt: string;
  updatedAt: string;
}

// Interface untuk register data
interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Interface untuk login data
interface LoginData {
  email: string;
  password: string;
}

// Auth Services
export const authService = {
  // Register new user
  register: async (data: RegisterData): Promise<ApiResponse<User>> => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  // Login user
  login: async (data: LoginData): Promise<ApiResponse<{ user: User; token: string }>> => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  // Verify token
  verifyToken: async (): Promise<ApiResponse<User>> => {
    const response = await api.get("/auth/verify");
    return response.data;
  },

  // Logout user
  logout: async (): Promise<ApiResponse<null>> => {
    const response = await api.post("/auth/logout");
    return response.data;
  },

  // Refresh token
  refreshToken: async (): Promise<ApiResponse<{ token: string }>> => {
    const response = await api.post("/auth/refresh");
    return response.data;
  },
};

// User Services
export const userService = {
  // Get current user profile
  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await api.get("/user/profile");
    return response.data;
  },

  // Update user profile
  updateProfile: async (data: Partial<User>): Promise<ApiResponse<User>> => {
    const response = await api.put("/user/profile", data);
    return response.data;
  },

  // Change password
  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<ApiResponse<null>> => {
    const response = await api.put("/user/change-password", data);
    return response.data;
  },
};

// Admin Services
export const adminService = {
  // Get all users
  getUsers: async (params?: PaginationParams): Promise<ApiResponse<User[]>> => {
    const response = await api.get("/admin/users", { params });
    return response.data;
  },

  // Create new user
  createUser: async (data: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<ApiResponse<User>> => {
    const response = await api.post("/admin/users", data);
    return response.data;
  },

  // Update user
  updateUser: async (id: string, data: Partial<User>): Promise<ApiResponse<User>> => {
    const response = await api.put(`/admin/users/${id}`, data);
    return response.data;
  },

  // Delete user
  deleteUser: async (id: string): Promise<ApiResponse<null>> => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  },
};

// Reservation Services
export const reservationService = {
  // Create reservation
  createReservation: async (data: any): Promise<ApiResponse<any>> => {
    const response = await api.post("/reservations", data);
    return response.data;
  },

  // Get user reservations
  getUserReservations: async (params?: PaginationParams): Promise<ApiResponse<any[]>> => {
    const response = await api.get("/reservations/user", { params });
    return response.data;
  },

  // Get all reservations (admin/kasir)
  getAllReservations: async (params?: PaginationParams): Promise<ApiResponse<any[]>> => {
    const response = await api.get("/reservations", { params });
    return response.data;
  },

  // Update reservation status
  updateReservationStatus: async (id: string, status: string): Promise<ApiResponse<any>> => {
    const response = await api.put(`/reservations/${id}/status`, { status });
    return response.data;
  },
};

// Capster Services
export const capsterService = {
  // Get all capsters
  getCapsters: async (): Promise<ApiResponse<any[]>> => {
    const response = await api.get("/capsters");
    return response.data;
  },

  // Get capster schedule
  getCapsterSchedule: async (capsterId: string, date: string): Promise<ApiResponse<any>> => {
    const response = await api.get(`/capsters/${capsterId}/schedule`, {
      params: { date }
    });
    return response.data;
  },
};

// Service Services
export const serviceService = {
  // Get all services
  getServices: async (): Promise<ApiResponse<any[]>> => {
    const response = await api.get("/services");
    return response.data;
  },
};

// Error handler utility
export const handleApiError = (error: any): string => {
  if (error.response) {
    // Server responded with error status
    const message = error.response.data?.message || error.response.data?.error;
    return message || `Error ${error.response.status}`;
  } else if (error.request) {
    // Network error
    return "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.";
  } else {
    // Other error
    return "Terjadi kesalahan yang tidak terduga";
  }
};