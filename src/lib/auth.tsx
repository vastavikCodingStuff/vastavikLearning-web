"use client";
import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { authApi, setTokens, clearTokens, getAccessToken, type UserProfile } from "./api";

/**
 * Auth context — now backed by real backend authentication.
 *
 * Uses JWT access/refresh tokens stored in localStorage.
 * The backend handles password hashing (SHA-256+salt), JWT signing (HS256),
 * and HMAC-SHA256 request verification.
 */

export type User = {
  user_id: string;
  name: string;
  email: string;
  role: string;
  is_premium?: boolean;
  board?: string;
  preferred_language?: string;
  streak_count?: number;
  lessons_completed?: number;
} | null;

type AuthCtx = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: { email: string; password: string; name: string; board: string; language: string }) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
};

const Ctx = createContext<AuthCtx>({
  user: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  refreshProfile: async () => {},
});

const USER_KEY = "vastavik_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount, then validate with backend
  useEffect(() => {
    const init = async () => {
      try {
        // First, try to load cached user
        const raw = localStorage.getItem(USER_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === "object" && typeof parsed.email === "string" && parsed.user_id) {
            setUser(parsed);
          }
        }

        // If we have tokens, try to fetch fresh profile
        if (getAccessToken()) {
          try {
            const profile = await authApi.getProfile();
            const freshUser: User = {
              user_id: profile.user_id,
              name: profile.name,
              email: profile.email,
              role: profile.role,
              is_premium: profile.is_premium,
              board: profile.board,
              preferred_language: profile.preferred_language,
              streak_count: profile.streak_count,
              lessons_completed: profile.lessons_completed,
            };
            setUser(freshUser);
            localStorage.setItem(USER_KEY, JSON.stringify(freshUser));
          } catch {
            // Token invalid — clear everything
            clearTokens();
            localStorage.removeItem(USER_KEY);
            setUser(null);
          }
        }
      } catch {
        localStorage.removeItem(USER_KEY);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await authApi.login({ email, password });
    setTokens(res.access_token, res.refresh_token);
    const u: User = {
      user_id: res.user_id,
      name: res.name,
      email: res.email,
      role: res.role,
    };
    setUser(u);
    localStorage.setItem(USER_KEY, JSON.stringify(u));
  }, []);

  const signup = useCallback(async (data: { email: string; password: string; name: string; board: string; language: string }) => {
    const res = await authApi.signup(data);
    setTokens(res.access_token, res.refresh_token);
    const u: User = {
      user_id: res.user_id,
      name: res.name,
      email: res.email,
      role: res.role,
    };
    setUser(u);
    localStorage.setItem(USER_KEY, JSON.stringify(u));
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!getAccessToken()) return;
    try {
      const profile = await authApi.getProfile();
      const u: User = {
        user_id: profile.user_id,
        name: profile.name,
        email: profile.email,
        role: profile.role,
        is_premium: profile.is_premium,
        board: profile.board,
        preferred_language: profile.preferred_language,
        streak_count: profile.streak_count,
        lessons_completed: profile.lessons_completed,
      };
      setUser(u);
      localStorage.setItem(USER_KEY, JSON.stringify(u));
    } catch {
      // Ignore — keep stale profile
    }
  }, []);

  return (
    <Ctx.Provider value={{ user, loading, login, signup, logout, refreshProfile }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
