export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

const TOKEN_KEY = "token";
const USER_KEY = "user";

/** Fired on the window whenever auth state changes, so the Navbar
 * (and anything else) can react without a page reload. */
const AUTH_EVENT = "auth-changed";

export function saveAuth(accessToken: string, user: AuthUser) {
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function onAuthChange(callback: () => void): () => void {
  window.addEventListener(AUTH_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(AUTH_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
