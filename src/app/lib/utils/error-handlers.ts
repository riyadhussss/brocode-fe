export const handleApiError = (error: unknown): string => {
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as {
      response?: {
        status?: number;
        data?: { message?: string; error?: string };
      };
      request?: unknown;
    };

    if (axiosError.response) {
      const message =
        axiosError.response.data?.message || axiosError.response.data?.error;
      return message || `Error ${axiosError.response.status}`;
    } else if (axiosError.request) {
      return "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.";
    }
  }

  return "Terjadi kesalahan yang tidak terduga";
};
