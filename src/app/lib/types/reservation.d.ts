export interface ReservationAutoRequest {
  bookingType: "self";
}

export interface ReservationAutoResponse {
  success: boolean;
  message: string;
  data: {
    bookingType: "self";
    customerData: {
      name: string;
      phone: string;
      email: string;
      userId: string;
      isOwnProfile: boolean;
    };
  };
}

export interface ReservationOtherRequest {
  name: string;
  phone: string;
  email: string;
  bookingType: "other";
}

export interface ReservationOtherResponse {
  success: boolean;
  message: string;
  data: {
    bookingType: "other";
    customerData: {
      name: string;
      phone: string;
      email?: string;
      userId?: string;
      isOwnProfile: boolean;
    };
  };
}

export interface CustomerData {
  name: string;
  phone: string;
  email: string;
  isOwnProfile: boolean;
}

export interface AddReservationRequest {
  packageId: string;
  barberId: string;
  scheduleId: string;
  notes?: string;
  customerData: CustomerData;
}
