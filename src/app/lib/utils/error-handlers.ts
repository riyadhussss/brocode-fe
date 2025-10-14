export const handleApiError = (error: any): string => {
  if (error.response) {
    const message = error.response.data?.message || error.response.data?.error;
    return message || `Error ${error.response.status}`;
  } else if (error.request) {
    return "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.";
  } else {
    return "Terjadi kesalahan yang tidak terduga";
  }
};
