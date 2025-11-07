export interface Barber {
  _id: string;
  name: string;
  phone: string;
  photo: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  barberId: string;
  __v: number;
}

export interface GetCapstersResponse {
  success: boolean;
  message: string;
  data?: Barber[];
  count: number;
}

export interface GetCapsterByIdResponse {
  success: boolean;
  message: string;
  data?: Barber;
}

export interface AddCapsterRequest {
  name: string;
  phone: string;
  photo: string;
}

export interface AddCapsterResponse {
  success: boolean;
  message: string;
  data?: Barber;
}

export interface EditCapsterRequest {
  name?: string;
  phone?: string;
  photo?: File;
  isActive?: boolean;
}

export interface EditCapsterResponse {
  success: boolean;
  message: string;
  data?: Barber;
}

export interface DeleteCapsterResponse {
  success: boolean;
  message: string;
  data?: {
    _id: string;
    name: string;
    phone: string;
  };
}

// Response untuk mendapatkan daftar barber yang aktif saja
export interface GetActiveCapstersResponse {
  success: boolean;
  message: string;
  data: Barber[];
}
