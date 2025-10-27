import api from "../api";
import {
  GetCapstersResponse,
  GetCapsterByIdResponse,
  AddCapsterResponse,
  EditCapsterRequest,
  EditCapsterResponse,
  DeleteCapsterResponse,
} from "../types/capster";

export const capsterService = {
  getCapsters: async (): Promise<GetCapstersResponse> => {
    const response = await api.get("/barbers");
    return response.data;
  },

  getCapsterById: async (id: string): Promise<GetCapsterByIdResponse> => {
    const response = await api.get(`/barbers/${id}`);
    return response.data;
  },

  addCapster: async (data: FormData): Promise<AddCapsterResponse> => {
    const response = await api.post("/barbers", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  editCapster: async (
    id: string,
    data: Partial<EditCapsterRequest>
  ): Promise<EditCapsterResponse> => {
    const response = await api.put(`/barbers/${id}`, data);
    return response.data;
  },

  deleteCapster: async (id: string): Promise<DeleteCapsterResponse> => {
    const response = await api.delete(`/barbers/${id}`);
    return response.data;
  },
};
