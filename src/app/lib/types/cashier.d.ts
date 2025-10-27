export interface DashboardResponse {
  success: boolean;
  message: string;
  data: {
    totalCapster: number;
    totalLayanan: number;
    totalCustomer: number;
    totalCashier: number;
    totalReservasi: number;
  };
}

export interface GetCashiersResponse {
  success: boolean;
  message: string;
  data?: [
    {
      _id: string;
      name: string;
      email: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      userId: string;
      __v: number;
    }
  ];
  count: number;
}

export interface getCashierResponse {
  success: boolean;
  message: string;
  data?: {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    __v: number;
  };
}

export interface AddCashierRequest {
  name: string;
  email: string;
  password: string;
}
export interface AddCashierResponse {
  success: boolean;
  message: string;
  data?: {
    _id: string;
    userId: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface EditCashierRequest {
  name?: string;
  email?: string;
  password?: string;
}

export interface EditCashierResponse {
  success: boolean;
  message: string;
  data?: {
    _id: string;
    userId: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface DeleteCashierResponse {
  success: boolean;
  message: string;
}
