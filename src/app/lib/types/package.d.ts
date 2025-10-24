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

export interface AddPackageRequest {
  name: string;
  price: number;
  description: string;
}

export interface EditPackageRequest {
  name?: string;
  price?: number;
  description?: string;
}
