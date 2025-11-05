import { get } from "http";
import api from "../api";
import {
  GetCapstersResponse,
  GetCapsterByIdResponse,
  AddCapsterResponse,
  EditCapsterRequest,
  EditCapsterResponse,
  DeleteCapsterResponse,
  GetActiveBarbersResponse,
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
    data: EditCapsterRequest
  ): Promise<EditCapsterResponse> => {
    // Convert EditCapsterRequest to FormData
    const formData = new FormData();

    if (data.name !== undefined) {
      formData.append("name", data.name);
    }
    if (data.phone !== undefined) {
      formData.append("phone", data.phone);
    }
    if (data.isActive !== undefined) {
      formData.append("isActive", String(data.isActive));
    }
    if (data.photo) {
      formData.append("photo", data.photo);
    }

    const response = await api.put(`/barbers/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  deleteCapster: async (id: string): Promise<DeleteCapsterResponse> => {
    const response = await api.delete(`/barbers/${id}`);
    return response.data;
  },

  getActiveBarbers: async (): Promise<GetActiveBarbersResponse> => {
    const response = await api.get("/barbers/active");
    return response.data;
  }
};
