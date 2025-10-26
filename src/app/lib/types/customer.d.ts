export interface GetCustomersResponse {
  success: boolean;
  message: string;
  data?: [
    {
      _id: string;
      name: string;
      email: string;
      phone?: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      userId: string;
      __v: number;
    }
  ];
  count?: number;
}

export interface GetCustomerByIdResponse {
  success: boolean;
  message: string;
  data?: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    __v: number;
  };
}

export interface AddCustomerRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface AddCustomerResponse {
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

export interface EditCustomerRequest {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

export interface EditCustomerResponse {
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

export interface DeleteCustomerResponse {
  success: boolean;
  message: string;
}
