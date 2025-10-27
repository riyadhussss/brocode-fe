export interface GetCapstersResponse {
  success: boolean;
  message: string;
  data?: [
    {
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
  ];
  count: number;
}

export interface GetCapsterByIdResponse {
  success: boolean;
  message: string;
  data?: {
    _id: string;
    name: string;
    phone: string;
    photo: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    barberId: string;
    __v: number;
  };
}

export interface AddCapsterRequest {
  name: string;
  phone: string;
  photo: string;
}

export interface AddCapsterResponse {
  success: boolean;
  message: string;
  data?: {
    _id: string;
    name: string;
    phone: string;
    photo: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    barberId: string;
    __v: number;
  };
}

export interface EditCapsterRequest {
  name?: string;
  phone?: string;
  photo?: string;
  isActive?: boolean;
}

export interface EditCapsterResponse {
  success: boolean;
  message: string;
  data?: {
    _id: string;
    name: string;
    phone: string;
    photo: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    barberId: string;
    __v: number;
  };
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

// export interface AddCapsterResponse {
//   success: boolean;
//   message: string;
//   data?: {
