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

export interface AdminsResponse {
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
  ],
  count: number;
}
