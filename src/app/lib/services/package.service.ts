import api from "../api";
import { GetPackagesResponse, EditPackageRequest } from "../types/package";

export const packageService = {
  getPackages: async (): Promise<GetPackagesResponse> => {
    const response = await api.get("/packages");
    return response.data;
  },
  getPackageById: async (id: string): Promise<GetPackagesResponse> => {
    const response = await api.get(`/packages/${id}`);
    return response.data;
  },
  editPackage: async (
    id: string,
    data: Partial<EditPackageRequest>
  ): Promise<GetPackagesResponse> => {
    const response = await api.put(`/packages/${id}`, data);
    return response.data;
  },
  deletePackage: async (id: string): Promise<GetPackagesResponse> => {
    const response = await api.delete(`/packages/${id}`);
    return response.data;
  },
};
