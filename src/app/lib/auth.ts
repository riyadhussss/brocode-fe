export function isLogin(): boolean {
  return typeof window !== "undefined" && !!localStorage.getItem("token");
}

export function getUserRole(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("role");
}

export function isAdmin(): boolean {
  return getUserRole() === "admin";
}

export function isKasir(): boolean {
  return getUserRole() === "kasir";
}

export function isUser(): boolean {
  return getUserRole() === "user";
}
