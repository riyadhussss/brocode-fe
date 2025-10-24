import { AxiosError } from "axios";

/**
 * Utility untuk mengambil pesan error dari berbagai sumber error
 * (Error biasa, Axios, atau object lain yang dilempar).
 *
 * @param error - Unknown error object dari try/catch
 * @returns Pesan error yang sudah aman untuk ditampilkan di UI/toast
 */
export function getErrorMessage(error: unknown): string {
  // Default message jika error tidak dikenali
  let message = "Terjadi kesalahan tak terduga. Silakan coba lagi.";

  // 🔹 1. Jika error dari Axios
  if (error instanceof AxiosError) {
    const serverMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message;

    if (serverMessage) return serverMessage;
  }

  // 🔹 2. Jika error adalah instance dari Error biasa
  if (error instanceof Error) {
    return error.message || message;
  }

  // 🔹 3. Jika error adalah object (misal custom error)
  if (typeof error === "object" && error !== null) {
    // mencoba mencari properti message di object
    const maybeMessage = (error as { message?: string }).message;
    if (maybeMessage) return maybeMessage;
  }

  // 🔹 4. Jika error adalah string
  if (typeof error === "string") {
    return error;
  }

  // 🔹 5. Fallback
  return message;
}
