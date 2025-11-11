// 🧩 Base reusable types
type UserRef = {
  name: string;
  email?: string;
  role?: string;
  userId: string;
};

type PackageRef = {
  _id: string;
  name: string;
  price: number;
  description: string;
};

type BarberRef = {
  _id: string;
  name: string;
  barberId?: string;
  phone?: string;
};

type ScheduleRef = {
  _id: string;
  date: string;
  timeSlot: string;
  scheduled_time: string;
};

type PaymentRef = {
  paymentId: string;
  amount: number;
  paymentMethod: string;
  status: string;
  verifiedAt: string;
  verificationNote: string | null;
  verifiedBy?: UserRef;
};

// 🧱 Generic base for all history data
type BaseHistoryData = {
  _id: string;
  reservationId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  package: PackageRef;
  barber: BarberRef;
  schedule: ScheduleRef;
  totalPrice: number;
  status: string;
  finalStatus: string;
  notes: string;
  payment: PaymentRef;
  createdBy: UserRef;
  createdAt: string;
  confirmedBy?: UserRef | null;
  confirmedAt?: string;
  cancelledAt?: string;
  updatedAt?: string;
  statusDescription?: string;
};

// 🧾 Response generic
type HistorySummary = {
  total: number;
  completed: number;
  cancelled: number;
  statusFilter: string[];
};

type BaseHistoryResponse<T> = {
  success: boolean;
  message: string;
  data: T[];
  summary: HistorySummary;
};

// 👥 Specific role responses
export type HistoryAdminResponse = BaseHistoryResponse<BaseHistoryData>;
export type HistoryCashierResponse = BaseHistoryResponse<BaseHistoryData>;
export type HistoryCustomerResponse = BaseHistoryResponse<BaseHistoryData>;
