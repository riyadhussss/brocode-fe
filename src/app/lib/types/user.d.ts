export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "cashier" | "customer";
  createdAt: string;
  updatedAt: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  emailOrPhone: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    userId: string;
    name?: string;
    email: string;
    phone?: string;
    role: "admin" | "cashier" | "customer" ;
  };
}
