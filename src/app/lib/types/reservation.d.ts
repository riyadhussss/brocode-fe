export interface InputCustomerRequest {
  name: string;
  phone: string;
  email: string;
}

export interface InputCustomerResponse {
  success: boolean;
  message: string;
  data: {
    customerData: {
      name: string;
      phone: string;
      email: string;
    };
    submittedBy: {
      userId: string;
      name: string;
    };
    nextStep: string;
  };
}

export interface AddReservationRequest {
  packageId: string;
  barberId: string;
  scheduleId: string;
  notes?: string;
  name: string;
  phone: string;
  email: string;
}

export interface AddReservationResponse {
  success: true;
  message: string;
  data: {
    reservation: {
      customer: null;
      customerName: string;
      customerPhone: string;
      customerEmail: string;
      createdBy: {
        _id: string;
        name: string;
        email: string;
        userId: string;
      };
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
        date: string; // ISO date string
        timeSlot: string;
        scheduled_time: string; // ISO date string
      };
      totalPrice: number;
      notes: string;
      status: string;
      _id: string;
      createdAt: string; // ISO date string
      updatedAt: string; // ISO date string
      reservationId: string;
      __v: number;
    };
    info: {
      createdBy: {
        _id: string;
        name: string;
        email: string;
        userId: string;
      };
      isManualBooking: boolean;
    };
  };
}

export interface SetReservationStatusRequest {
  status: string;
  notes: string;
}

export type SetReservationStatusResponse = {
  success: boolean
  message: string
  data: {
    _id: string
    customer: {
      _id: string
      name: string
      email: string
      phone: string
      userId: string
    } | null
    customerName: string
    customerPhone: string
    customerEmail: string
    createdBy: string
    package: {
      _id: string
      name: string
      price: number
    }
    barber: {
      _id: string
      name: string
    }
    schedule: {
      _id: string
      scheduled_time: string
    }
    totalPrice: number
    notes: string
    status: string
    createdAt: string
    updatedAt: string
    reservationId: string
    __v: number
    confirmedAt: string
    confirmedBy: string
  }
}


/* ================================
✅ Check Reservations Response
  ================================ */

export interface CheckReservationsResponse {
  success: boolean;
  message: string;
  data: PaymentRecord[];
  count: number;
  summary: {
    pending: number;
    verified: number;
    rejected: number;
  };
}

export interface PaymentRecord {
  paymentId: string;
  _id: string;
  amount: number;
  paymentMethod: "bank_transfer" | "e_wallet";
  status: "pending" | "verified" | "rejected";
  proofOfPayment: ProofOfPayment;
  bankAccount?: BankAccountInfo;
  eWallet?: EWalletInfo;
  reservation: ReservationSummary;
  customer: CustomerSummary;
  createdAt: string;
  updatedAt: string;
}

export interface ProofOfPayment {
  url: string;
  originalName: string;
}

export interface BankAccountInfo {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export interface EWalletInfo {
  walletType: string;
  walletNumber: string;
  walletName: string;
}

export interface ReservationSummary {
  _id: string;
  reservationId: string;
  status: "pending" | "confirmed" | "cancelled";
  totalPrice: number;
  customerName: string;
  customerPhone: string;
  createdAt: string;
  package: {
    name: string;
    price: number;
    description: string;
  };
  barber: {
    name: string;
  };
  schedule: {
    scheduled_time: string;
  };
  customer: CustomerSummary;
}

export interface CustomerSummary {
  _id: string;
  name: string;
  email: string;
  phone: string;
  userId: string;
}

// Cek Jadwal yang sudah dikonfirmasi pembayarannya
export interface CheckConfirmedReservationsResponse {
  success: boolean;
  message: string;
  data: Reservation[];
  count: number;
}

export interface Reservation {
  _id: string;
  reservationId: string;
  status: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  notes?: string;
  totalPrice: number;
  customer: Customer | null;
  createdBy?: UserReference;
  package: PackageInfo;
  barber: BarberInfo;
  schedule: ScheduleInfo;
  confirmedBy?: UserReference;
  payment?: PaymentInfo | null;
  finalStatus: string;
  statusDescription: string;
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
}

export interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  userId: string;
}

export interface UserReference {
  _id?: string;
  name: string;
  email?: string;
  userId?: string;
  role?: string;
}

export interface PackageInfo {
  _id: string;
  name: string;
  price: number;
  description?: string;
}

export interface BarberInfo {
  _id: string;
  name: string;
  phone: string;
}

export interface ScheduleInfo {
  _id: string;
  date: string;
  timeSlot: string;
  scheduled_time: string;
}

export interface PaymentInfo {
  paymentId: string;
  amount: number;
  paymentMethod: string;
  status: string;
  verificationNote?: string;
  verifiedAt?: string;
  verifiedBy?: VerifiedBy;
}

export interface VerifiedBy {
  name: string;
  role: string;
  userId: string;
}
