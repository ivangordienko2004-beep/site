// src/auth/AuthContext.tsx
import React, { createContext, useContext, useMemo, useState } from "react";

type Role = "admin" | "member" | "guest" | "anon";

type AuthState = {
  role: Role;
  username?: string;
  canDownloadResume: boolean;
  canSeePhone: boolean;
};

type AuthCtx = AuthState & {
  login: (username: string, password: string) => Promise<void>;
  loginAsGuest: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthCtx | null>(null);
const STORAGE_KEY = "app.auth";

const ROLE_CAPS: Record<Role, Pick<AuthState, "canDownloadResume" | "canSeePhone">> = {
  admin: { canDownloadResume: true, canSeePhone: true },
  member: { canDownloadResume: true, canSeePhone: true },  // guest_guest
  guest: { canDownloadResume: false, canSeePhone: false }, // "войти как гость"
  anon: { canDownloadResume: false, canSeePhone: false },
};

function loadInitial(): AuthState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw) as AuthState;
      const role = (saved.role as Role) || "anon";
      return { ...saved, ...ROLE_CAPS[role] };
    }
  } catch {}
  return { role: "anon", ...ROLE_CAPS.anon };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(() => loadInitial());

  const persist = (s: AuthState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    setState(s);
  };

  const login: AuthCtx["login"] = async (username, password) => {
    const u = username.trim();
    if (u === "admin_admin" && password === "zaykapatriot") {
      return persist({ role: "admin", username: u, ...ROLE_CAPS.admin });
    }
    if (u === "guest_guest" && password === "PatriotRussia") {
      return persist({ role: "member", username: u, ...ROLE_CAPS.member });
    }
    throw new Error("Неверный логин или пароль");
  };

  const loginAsGuest = () =>
    persist({ role: "guest", username: "guest", ...ROLE_CAPS.guest });

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState({ role: "anon", ...ROLE_CAPS.anon });
  };

  const value = useMemo<AuthCtx>(() => ({ ...state, login, loginAsGuest, logout }), [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
