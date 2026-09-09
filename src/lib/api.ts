/**
 * API client for Vastavik Learning Backend.
 *
 * Handles HMAC-SHA256 request signing, JWT management, and all REST calls.
 * Backend URL: https://vastaviklearning-backend-app.onrender.com
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://vastaviklearning-backend-app.onrender.com";
const API_KEY_ID = process.env.NEXT_PUBLIC_API_KEY_ID || "vastavik_prod_v1";
const API_KEY_SECRET =
  process.env.NEXT_PUBLIC_API_KEY_SECRET || "super_secret_hmac_production_key_change_me_32char";

// ─── Token Management ──────────────────────────────────────────────────────────

const ACCESS_TOKEN_KEY = "vastavik_access_token";
const REFRESH_TOKEN_KEY = "vastavik_refresh_token";
export const BANNED_KEY = "vastavik_banned";
export const BAN_REASON_KEY = "vastavik_ban_reason";

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setTokens(access: string, refresh: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCESS_TOKEN_KEY, access);
  localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
}

export function clearTokens() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function isUserBanned(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(BANNED_KEY) === "true";
}

export function getBanReason(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(BAN_REASON_KEY) || "Your account has been banned and deleted by the administrator.";
}

export function handleAccountBanned(reason?: string) {
  if (typeof window === "undefined") return;
  clearTokens();
  localStorage.removeItem("vastavik_user");
  localStorage.setItem(BANNED_KEY, "true");
  if (reason) localStorage.setItem(BAN_REASON_KEY, reason);
  const path = window.location.pathname;
  if (path !== "/banned" && path !== "/login" && path !== "/signup") {
    window.location.href = "/banned";
  }
}

export function clearBanStatus() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(BANNED_KEY);
  localStorage.removeItem(BAN_REASON_KEY);
}

// ─── Proactive Backend Warm-up (Render Cold-Start Protection) ─────────────────

let warmupPromise: Promise<boolean> | null = null;

export function warmUpBackend(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (warmupPromise) return warmupPromise;

  warmupPromise = (async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s cold-start tolerance
      const res = await fetch(`${BACKEND_URL}/health`, {
        method: "GET",
        headers: { "User-Agent": "VastavikLearning-Web-Prewarm" },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return res.ok;
    } catch {
      return false;
    }
  })();

  return warmupPromise;
}

// ─── HMAC Signing ───────────────────────────────────────────────────────────────

async function hmacSign(message: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const msgData = encoder.encode(message);
  const cryptoKey = await crypto.subtle.importKey("raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, msgData);
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// ─── Generic Fetch Wrapper ──────────────────────────────────────────────────────

type FetchOptions = {
  method?: string;
  body?: unknown;
  requireAuth?: boolean;
  params?: Record<string, string>;
  timeout?: number;
};

export class ApiError extends Error {
  status: number;
  body: unknown;
  constructor(status: number, message: string, body?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export async function apiFetch<T = unknown>(path: string, opts: FetchOptions = {}): Promise<T> {
  const { method = "GET", body, requireAuth = false, params, timeout = 25000 } = opts;

  if (requireAuth && isUserBanned()) {
    throw new ApiError(403, getBanReason() || "Your account has been banned and deleted by the administrator.");
  }

  // Build URL with query params
  const url = new URL(path, BACKEND_URL);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(k, v);
    }
  }

  // Timestamp for HMAC
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const methodUpper = method.toUpperCase();
  const fullPath = url.pathname + url.search;

  // HMAC signature
  const message = `${timestamp}${methodUpper}${fullPath}`;
  const hmac = await hmacSign(message, API_KEY_SECRET);

  // Headers
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-api-key-id": API_KEY_ID,
    "x-api-key-secret": API_KEY_SECRET,
    "x-timestamp": timestamp,
    "x-hmac": hmac,
  };

  // JWT auth
  if (requireAuth) {
    const token = getAccessToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const maxRetries = 3;
  let attempt = 0;
  let lastError: unknown = null;

  while (attempt <= maxRetries) {
    if (attempt > 0) {
      const delayMs = 1500 * attempt;
      console.warn(`[ColdStartRetry] Render edge proxy transient status/timeout on ${path}. Retrying #${attempt} in ${delayMs}ms...`);
      await new Promise((r) => setTimeout(r, delayMs));
    }

    // Abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const res = await fetch(url.toString(), {
        method: methodUpper,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // If Render edge proxy returned 502/503/504 while booting container, retry
      if ([502, 503, 504].includes(res.status) && attempt < maxRetries) {
        attempt++;
        continue;
      }

      // Handle 403 Account Banned
      if (res.status === 403) {
        const errBody: any = await res.json().catch(() => null);
        const detailStr = typeof errBody === "object" && errBody ? (errBody.detail || errBody.message || "") : "";
        if (detailStr === "ACCOUNT_BANNED" || String(detailStr).toLowerCase().includes("banned")) {
          const reason = errBody?.message || "Your account has been banned and deleted by the administrator.";
          handleAccountBanned(reason);
          throw new ApiError(403, reason, errBody);
        }
        throw new ApiError(403, detailStr || "Access forbidden", errBody);
      }

      // Handle 401 — try token refresh
      if (res.status === 401 && requireAuth) {
        const refreshed = await tryRefreshToken();
        if (refreshed) {
          // Retry with new token
          const newToken = getAccessToken();
          if (newToken) headers["Authorization"] = `Bearer ${newToken}`;
          const retryRes = await fetch(url.toString(), {
            method: methodUpper,
            headers,
            body: body ? JSON.stringify(body) : undefined,
            signal: controller.signal,
          });
          if (!retryRes.ok) {
            const errBody = await retryRes.json().catch(() => null);
            throw new ApiError(retryRes.status, `API error: ${retryRes.status}`, errBody);
          }
          return retryRes.json();
        } else {
          clearTokens();
          throw new ApiError(401, "Session expired. Please log in again.");
        }
      }

      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        throw new ApiError(res.status, `API error: ${res.status}`, errBody);
      }

      return res.json();
    } catch (err) {
      clearTimeout(timeoutId);
      if (err instanceof ApiError) throw err;

      if (attempt < maxRetries) {
        lastError = err;
        attempt++;
        continue;
      }

      if ((err as Error).name === "AbortError") {
        throw new ApiError(408, "Request timeout — Render backend is cold-starting, please retry in a few moments.");
      }
      throw new ApiError(0, `Network error: ${(err as Error).message}`);
    }
  }

  throw lastError instanceof ApiError ? lastError : new ApiError(502, "Render backend cold start timeout. Please refresh.");
}

// ─── Token Refresh ──────────────────────────────────────────────────────────────

async function tryRefreshToken(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const message = `${timestamp}POST/api/v1/auth/refresh`;
    const hmac = await hmacSign(message, API_KEY_SECRET);

    const res = await fetch(`${BACKEND_URL}/api/v1/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key-id": API_KEY_ID,
        "x-api-key-secret": API_KEY_SECRET,
        "x-timestamp": timestamp,
        "x-hmac": hmac,
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!res.ok) return false;

    const data = await res.json();
    if (data.access_token && data.refresh_token) {
      setTokens(data.access_token, data.refresh_token);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

// ─── Auth API ───────────────────────────────────────────────────────────────────

export type AuthResponse = {
  success: boolean;
  access_token: string;
  refresh_token: string;
  user_id: string;
  name: string;
  email: string;
  role: string;
};

export type UserProfile = {
  user_id: string;
  name: string;
  email: string;
  role: string;
  is_premium: boolean;
  board: string;
  preferred_language: string;
  streak_count: number;
  lessons_completed: number;
  subscription_expires_at: string | null;
};

function getDeviceId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("vastavik_device_id");
  if (!id) {
    const genId: string = (typeof crypto !== "undefined" && typeof (crypto as any).randomUUID === "function")
      ? (crypto as any).randomUUID()
      : Math.random().toString(36).slice(2) + Date.now().toString(36);
    id = genId;
    localStorage.setItem("vastavik_device_id", genId);
  }
  return id;
}

export const authApi = {
  signup: (data: { email: string; password: string; name: string; board: string; language: string }) => {
    clearBanStatus();
    const referral_code = typeof window !== "undefined" ? localStorage.getItem("pending_referral_code") : null;
    const share_token = typeof window !== "undefined" ? localStorage.getItem("pending_share_token") : null;
    const device_fingerprint = getDeviceId();
    return apiFetch<AuthResponse>("/api/v1/auth/signup", {
      method: "POST",
      body: { ...data, referral_code: referral_code || undefined, share_token: share_token || undefined, device_fingerprint, device_name: navigator.userAgent.slice(0, 80), platform: "web" },
    }).then((res) => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("pending_referral_code");
        localStorage.removeItem("pending_share_token");
      }
      return res;
    });
  },

  login: (data: { email: string; password: string }) => {
    const device_fingerprint = getDeviceId();
    return apiFetch<AuthResponse>("/api/v1/auth/login", {
      method: "POST",
      body: { ...data, device_fingerprint, device_name: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 80) : undefined, platform: "web" },
    });
  },

  checkAccountStatus: () =>
    apiFetch<{ status: string; is_banned: boolean; message?: string }>("/api/v1/auth/account-status", { requireAuth: true }),

  refresh: (refresh_token: string) =>
    apiFetch<AuthResponse>("/api/v1/auth/refresh", { method: "POST", body: { refresh_token } }),

  oauthGoogle: (id_token: string) =>
    apiFetch<AuthResponse>("/api/v1/auth/oauth/google", { method: "POST", body: { id_token } }),

  oauthGithub: (code: string) =>
    apiFetch<AuthResponse>("/api/v1/auth/oauth/github", { method: "POST", body: { code } }),

  getProfile: () =>
    apiFetch<UserProfile>("/api/v1/user/profile", { requireAuth: true }),
};

// ─── Catalog API ────────────────────────────────────────────────────────────────

export type CourseItem = {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  color: number;
  order: number;
  is_published: boolean;
};

export type BannerItem = {
  id: string;
  title: string;
  image_url: string;
  target_route: string;
};

export type TopicItem = {
  id: string;
  name: string;
  tag: string;
};

export type HomeCatalog = {
  courses: CourseItem[];
  banners: BannerItem[];
  popular_topics: TopicItem[];
};

export type CurriculumPart = {
  part_id: string;
  title: string;
  order: number;
  subparts: { subpart_id: string; title: string; lesson_id: string }[];
};

export type Curriculum = {
  course_id: string;
  parts: CurriculumPart[];
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  youtube_url: string;
  youtube_video_id: string;
  duration_sec: number;
  whiteboard_image_url: string;
  code_sample: string;
  notes: string;
  is_premium: boolean;
  order: number;
};

export const catalogApi = {
  getHome: () => apiFetch<HomeCatalog>("/api/v1/catalog/home"),

  getCurriculum: (courseId: string) =>
    apiFetch<Curriculum>(`/api/v1/courses/${courseId}/curriculum`),

  getLesson: (lessonId: string) =>
    apiFetch<Lesson>(`/api/v1/lessons/${lessonId}`),

  markVisited: (courseId: string, partId: string) =>
    apiFetch("/api/v1/progress/visited", {
      method: "POST",
      requireAuth: true,
      body: { course_id: courseId, part_id: partId },
    }),
};

// ─── AI API ─────────────────────────────────────────────────────────────────────

export type ChatResponse = {
  reply: string;
  model_used: string;
  is_fallback: boolean;
};

export const aiApi = {
  chat: (prompt: string, history?: { role: string; content: string }[]) =>
    apiFetch<ChatResponse>("/api/v1/ai/chat", {
      method: "POST",
      requireAuth: true,
      body: { prompt, history },
    }),

  chatStream: (prompt: string) => {
    const url = new URL("/api/v1/ai/chat/stream", BACKEND_URL);
    url.searchParams.set("prompt", prompt);
    return url.toString();
  },
};

// ─── Code Execution API ─────────────────────────────────────────────────────────

export type CodeExecutionResult = {
  success: boolean;
  stdout: string | null;
  stderr: string | null;
  execution_time: string | null;
  memory_kb: number | null;
  status_description: string;
};

export const codeApi = {
  execute: (language: string, source_code: string, stdin?: string) =>
    apiFetch<CodeExecutionResult>("/api/v1/code/execute", {
      method: "POST",
      requireAuth: true,
      body: { language, source_code, stdin: stdin || "" },
    }),

  cleanOcr: (raw_ocr_text: string, language?: string) =>
    apiFetch<{ cleaned_code: string; corrections_applied: string[] }>("/api/v1/code/clean-ocr", {
      method: "POST",
      body: { raw_ocr_text, language },
    }),
};

// ─── PYQ API ────────────────────────────────────────────────────────────────────

export type PYQ = {
  id: string;
  board: string;
  year: string;
  subject: string;
  question: string;
  solution: string;
  marks: number;
};

export const pyqApi = {
  getAll: (params?: { board?: string; year?: string; subject?: string }) =>
    apiFetch<PYQ[]>("/api/v1/pyqs", { params: params as Record<string, string> }),
};

// ─── Notes API ──────────────────────────────────────────────────────────────────

export type Note = {
  id: string;
  uid: string;
  title: string;
  content: string;
  tag: string;
  created_at: string;
};

export const notesApi = {
  getAll: () => apiFetch<Note[]>("/api/v1/notes", { requireAuth: true }),

  create: (data: { title: string; content: string; tag?: string }) =>
    apiFetch<Note>("/api/v1/notes", { method: "POST", requireAuth: true, body: data }),

  delete: (noteId: string) =>
    apiFetch(`/api/v1/notes/${noteId}`, { method: "DELETE", requireAuth: true }),
};

// ─── Search API ─────────────────────────────────────────────────────────────────

export type SearchResult = {
  query: string;
  courses: CourseItem[];
  topics: TopicItem[];
  lessons: Lesson[];
};

export const searchApi = {
  search: (q: string) =>
    apiFetch<SearchResult>("/api/v1/search", { params: { q } }),
};

// ─── Payments API ───────────────────────────────────────────────────────────────

export const paymentsApi = {
  createOrder: (coupon_code?: string) =>
    apiFetch<{ order_id: string; amount_paise: number; currency: string; razorpay_order_id: string | null; skip_payment: boolean; quote: { total_amount: number; total_amount_paise: number; base_amount: number; discount_amount: number; gst_amount: number } }>(
      "/api/v1/payments/create-order",
      { method: "POST", requireAuth: true, body: { plan_id: "monthly_pro", coupon_code: coupon_code || undefined } }
    ),

  verifyPayment: (razorpay_order_id: string, razorpay_payment_id: string, razorpay_signature: string) =>
    apiFetch<{ success: boolean; message: string }>("/api/v1/payments/verify", {
      method: "POST",
      requireAuth: true,
      body: { razorpay_order_id, razorpay_payment_id, razorpay_signature },
    }),

  getHistory: () =>
    apiFetch("/api/v1/payments/history", { requireAuth: true }),

  getQuote: () =>
    apiFetch<{ base_amount: number; discount_amount: number; taxable_amount: number; gst_amount: number; total_amount: number; total_amount_paise: number; credit_balance_inr: number }>(
      "/api/v1/pricing/quote",
      { requireAuth: true }
    ),
};

// ─── Growth API ─────────────────────────────────────────────────────────────────

export const growthApi = {
  getReferralStatus: () =>
    apiFetch<{ code: string | null; eligible: boolean; rewarded_count: number; cap: number; remaining_count: number; credit_balance_inr: number; history: any[] }>(
      "/api/v1/referral/status",
      { requireAuth: true }
    ),

  generateReferralCode: () =>
    apiFetch<{ code: string; eligible: boolean }>("/api/v1/referral/generate", { method: "POST", requireAuth: true }),

  getShareStatus: () =>
    apiFetch<{ eligible: boolean; cap: number; rewarded_count: number; remaining_count: number; shares: any[] }>(
      "/api/v1/share/status",
      { requireAuth: true }
    ),

  generateShareToken: () =>
    apiFetch<{ token: string; share_url: string; eligible: boolean; cap_reached?: boolean; message?: string }>(
      "/api/v1/share/generate",
      { method: "POST", requireAuth: true }
    ),

  trackShareClick: (token: string) =>
    apiFetch<{ clicks: number }>(`/api/v1/share/track/${token}`, { method: "POST", body: { user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "" } }),

  redeemCoupon: (code: string) =>
    apiFetch<{ success: boolean; already_active: boolean; message: string }>("/api/v1/coupon/redeem", {
      method: "POST",
      requireAuth: true,
      body: { code },
    }),

  getCreditsBalance: () =>
    apiFetch<{ credit_balance_inr: number; ledger: any[] }>("/api/v1/credits/balance", { requireAuth: true }),
};

// ─── System API ─────────────────────────────────────────────────────────────────

export const systemApi = {
  health: () => apiFetch("/health"),

  getAppUpdate: () => apiFetch("/api/v1/system/app-update"),

  getNotifications: () =>
    apiFetch("/api/v1/notifications", { requireAuth: true }),
};
