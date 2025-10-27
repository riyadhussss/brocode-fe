export interface GetPackagesResponse {
  success: boolean;
  message: string;
  data?: [
    {
      _id: string;
      name: string;
      price: number;
      description: string;
      isActive: boolean;
      createdAt: string;
      updatedAt: string;
      packageId: string;
      __v: number;
    }
  ];
  count: number;
}

export interface GetPackageByIdResponse {
  success: boolean;
  message: string;
  data?: {
    _id: string;
    name: string;
    price: number;
    description: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    packageId: string;
    __v: number;
  };
}

export interface AddPackageRequest {
  name: string;
  price: number;
  description: string;
}

export interface AddPackageResponse {
  success: boolean;
  message: string;
  data: {
    name: string;
    price: number;
    description: string;
    isActive: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
    packageId: string;
    __v: number;
  };
}

export interface EditPackageRequest {
  name?: string;
  price?: number;
  description?: string;
  isActive?: boolean;
}

export interface EditPackageResponse {
  success: boolean;
  message: string;
  data?: {
    _id: string;
    name: string;
    price: number;
    description: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    packageId: string;
    __v: number;
  };
}

export interface DeletePackageResponse {
  success: boolean;
  message: string;
}
