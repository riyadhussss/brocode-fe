import api from "../api";
import {
  GetPackagesResponse,
  GetPackageByIdResponse,
  AddPackageRequest,
  AddPackageResponse,
  EditPackageRequest,
  EditPackageResponse,
  DeletePackageResponse,
} from "../types/package";

export const packageService = {
  getPackages: async (): Promise<GetPackagesResponse> => {
    const response = await api.get("/packages");
    return response.data;
  },
  getPackageById: async (id: string): Promise<GetPackageByIdResponse> => {
    const response = await api.get(`/packages/${id}`);
    return response.data;
  },
  addPackage: async (data: AddPackageRequest): Promise<AddPackageResponse> => {
    const response = await api.post("/packages", data);
    return response.data;
  },
  editPackage: async (
    id: string,
    data: EditPackageRequest
  ): Promise<EditPackageResponse> => {
    const response = await api.put(`/packages/${id}`, data);
    return response.data;
  },
  deletePackage: async (id: string): Promise<DeletePackageResponse> => {
    const response = await api.delete(`/packages/${id}`);
    return response.data;
  },
};
