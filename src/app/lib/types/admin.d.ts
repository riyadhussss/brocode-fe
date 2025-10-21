export interface DashboardResponse {
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
