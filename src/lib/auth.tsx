"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

/**
 * Auth context.
 *
 * ⚠️  DEMO ONLY — client-side mock.
 *
 * The current web build has no backend. The "user" object is stored in
 * localStorage for display purposes only (avatar, name in nav). It is
 * NOT authoritative — there is no server-side session, no token, and no
 * real password check.
 *
 * When a backend lands, this module will be replaced with a cookie-based
 * session flow (httpOnly, secure, sameSite=Lax). The shape of `User`
 * stays the same so callers do not need to change.
 *
 * See: security/AUTH.md, security/AUDIT-2026-09-06.md
 */

export type User = { name: string; email: string; role?: string; board?: string } | null;

type AuthCtx = {
  user: User;
  setUser: (u: User) => void;
  clear: () => void;
};

const Ctx = createContext<AuthCtx>({ user: null, setUser: () => {}, clear: () => {} });
const KEY = "vastavik_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Sanity: never trust localStorage shape. If anything is off, drop it.
        if (parsed && typeof parsed === "object" && typeof parsed.email === "string") {
          setUserState(parsed);
        } else {
          localStorage.removeItem(KEY);
        }
      }
    } catch {
      localStorage.removeItem(KEY);
    }
  }, []);

  const setUser = (u: User) => {
    setUserState(u);
    if (u) localStorage.setItem(KEY, JSON.stringify(u));
    else localStorage.removeItem(KEY);
  };
  const clear = () => {
    setUserState(null);
    localStorage.removeItem(KEY);
  };

  return <Ctx.Provider value={{ user, setUser, clear }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
