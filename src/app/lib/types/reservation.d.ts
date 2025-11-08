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
  notes?: string; // optional
  name: string;
  phone: string;
  email: string;
  isOwnProfile: boolean;
}

export interface AddReservationResponse {
  success: boolean;
  message: string;
  data: {
    reservation: {
      _id: string;
      reservationId: string;
      customer: {
        _id: string;
        name: string;
        email: string;
        phone: string;
        userId: string;
      };
      customerName: string;
      customerPhone: string;
      customerEmail: string;
      package: {
        _id: string;
        name: string;
        price: number;
      };
      barber: {
        _id: string;
        name: string;
        barberId: string;
      };
      schedule: {
        _id: string;
        date: string;
        timeSlot: string;
        scheduled_time: string;
      };
      totalPrice: number;
      notes?: string;
      status: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    customerInfo: {
      isNewCustomer: boolean;
      customer: {
        _id: string;
        name: string;
        email: string;
        phone: string;
        password: string;
        role: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
        __v: number;
      };
    };
  };
}
