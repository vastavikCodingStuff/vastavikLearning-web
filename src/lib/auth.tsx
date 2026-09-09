"use client";
import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { authApi, setTokens, clearTokens, getAccessToken, isUserBanned, getBanReason, clearBanStatus, handleAccountBanned, type UserProfile } from "./api";

/**
 * Auth context — now backed by real backend authentication.
 *
 * Uses JWT access/refresh tokens stored in localStorage.
 * The backend handles password hashing (SHA-256+salt), JWT signing (HS256),
 * HMAC-SHA256 request verification, and instant ban/archival revocation.
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
  isBanned: boolean;
  banReason: string;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: { email: string; password: string; name: string; board: string; language: string }) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  clearBan: () => void;
};

const Ctx = createContext<AuthCtx>({
  user: null,
  loading: true,
  isBanned: false,
  banReason: "",
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  refreshProfile: async () => {},
  clearBan: () => {},
});

const USER_KEY = "vastavik_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const [isBanned, setIsBanned] = useState(false);
  const [banReason, setBanReason] = useState("");

  const clearBan = useCallback(() => {
    clearBanStatus();
    setIsBanned(false);
    setBanReason("");
  }, []);

  // Load user from localStorage on mount, then validate with backend
  useEffect(() => {
    const init = async () => {
      try {
        if (isUserBanned()) {
          setIsBanned(true);
          setBanReason(getBanReason());
          clearTokens();
          localStorage.removeItem(USER_KEY);
          setUser(null);
          setLoading(false);
          return;
        }

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
          } catch (err: any) {
            if (err?.status === 403 && (err?.message?.includes("banned") || err?.body?.detail === "ACCOUNT_BANNED")) {
              setIsBanned(true);
              setBanReason(err.message || "Your account has been banned and deleted by the administrator.");
            }
            // Token invalid or banned — clear everything
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
    try {
      const res = await authApi.login({ email, password });
      clearBan();
      setTokens(res.access_token, res.refresh_token);
      const u: User = {
        user_id: res.user_id,
        name: res.name,
        email: res.email,
        role: res.role,
      };
      setUser(u);
      localStorage.setItem(USER_KEY, JSON.stringify(u));
    } catch (err: any) {
      if (err?.status === 403 && (err?.message?.includes("banned") || err?.body?.detail === "ACCOUNT_BANNED")) {
        setIsBanned(true);
        setBanReason(err.message || "Your account has been banned and deleted by the administrator.");
      }
      throw err;
    }
  }, [clearBan]);

  const signup = useCallback(async (data: { email: string; password: string; name: string; board: string; language: string }) => {
    clearBan();
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
  }, [clearBan]);

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
    } catch (err: any) {
      if (err?.status === 403 && (err?.message?.includes("banned") || err?.body?.detail === "ACCOUNT_BANNED")) {
        setIsBanned(true);
        setBanReason(err.message || "Your account has been banned and deleted by the administrator.");
      }
    }
  }, []);

  return (
    <Ctx.Provider value={{ user, loading, isBanned, banReason, login, signup, logout, refreshProfile, clearBan }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
