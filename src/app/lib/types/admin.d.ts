export interface GetDashboardResponse {
  success: boolean;
  message: string;
  data: {
    totalCapster: number;
    totalLayanan: number;
    totalCustomer: number;
    totalAdmin: number;
    totalReservasi: number;
  };
}

export interface GetAdminsResponse {
  success: boolean;
  message: string;
  data: [
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

export interface GetAdminByIdResponse {
  success: boolean;
  message: string;
  data: {
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

export interface AddAdminRequest {
  name: string;
  email: string;
  password: string;
}

export interface AddAdminResponse {
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

export interface EditAdminRequest {
  name?: string;
  email?: string;
  password?: string;
}

export interface EditAdminResponse {
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

export interface DeleteAdminsResponse {
  success: boolean;
  message: string;
}
