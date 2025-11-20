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

/* ================================
   ✅ User Reservations Response
   ================================ */

export interface UserReservation {
  _id: string;
  customer: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  package: {
    _id: string;
    name: string;
    price: number;
    description: string;
  };
  barber: {
    _id: string;
    name: string;
    phone: string;
  };
  schedule: {
    _id: string;
    date: string;
    timeSlot: string;
    scheduled_time: string;
  };
  totalPrice: number;
  notes?: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  paymentStatus?: "pending" | "verified" | "rejected";
  createdAt: string;
  updatedAt: string;
  reservationId: string;
  __v: number;
  confirmedAt?: string;
  confirmedBy?: string;
  paymentMethod?: string;
  isWalkIn?: boolean;
  isOwnProfile?: boolean;
}

export interface GetCustomerReservationsResponse {
  success: boolean;
  message: string;
  data: UserReservation[];
  count: number;
  summary?: {
    total: number;
    reservationStatus: {
      pending: number;
      confirmed: number;
    };
    paymentStatus: {
      verified: number;
      pending: number;
      rejected: number;
      notUploaded: number;
    };
    statusFilter: [pending, confirmed];
  };
}
