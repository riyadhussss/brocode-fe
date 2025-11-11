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
export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    userId: string;
    name: string;
    email: string;
    phone: string;
    role: "customer";
  };
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
    _id: string;
    userId: string;
    name?: string;
    email: string;
    phone?: string;
    role: "admin" | "cashier" | "customer";
  };
}

export interface VerifyToken {
  token: string;
}

export interface VerifyTokenResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: "admin" | "cashier" | "customer";
    createdAt: string;
    updatedAt: string;
    userId: string;
    __v: number;
  };
}
