export interface GetCapstersResponse {
  success: boolean;
  message: string;
  data?: [
    {
      _id: string;
      name: string;
      photo: string;
      isActive: boolean;
      createdAt: string;
      updatedAt: string;
      barberId: string;
      __v: number;
    }
  ];
  count: number;
}

export interface AddCapsterRequest {
  name: string;
  photo: string;
  phone: string;
}

// export interface AddCapsterResponse {
//   success: boolean;
//   message: string;
//   data?: {
