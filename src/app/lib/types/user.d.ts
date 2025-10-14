export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "kasir" | "user";
  createdAt: string;
  updatedAt: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}
