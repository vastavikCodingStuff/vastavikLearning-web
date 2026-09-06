/**
 * API client for Vastavik Learning Backend.
 *
 * Handles HMAC-SHA256 request signing, JWT management, and all REST calls.
 * Backend URL: https://vastaviklearning-backend-app.onrender.com
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://vastaviklearning-backend-app.onrender.com";
const API_KEY_ID = process.env.NEXT_PUBLIC_API_KEY_ID || "vastavik_prod_v1";
const API_KEY_SECRET = process.env.NEXT_PUBLIC_API_KEY_SECRET || "";

// ─── Token Management ──────────────────────────────────────────────────────────

const ACCESS_TOKEN_KEY = "vastavik_access_token";
const REFRESH_TOKEN_KEY = "vastavik_refresh_token";

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
  const { method = "GET", body, requireAuth = false, params, timeout = 15000 } = opts;

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
    if ((err as Error).name === "AbortError") {
      throw new ApiError(408, "Request timeout");
    }
    throw new ApiError(0, `Network error: ${(err as Error).message}`);
  }
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

export const authApi = {
  signup: (data: { email: string; password: string; name: string; board: string; language: string }) =>
    apiFetch<AuthResponse>("/api/v1/auth/signup", { method: "POST", body: data }),

  login: (data: { email: string; password: string }) =>
    apiFetch<AuthResponse>("/api/v1/auth/login", { method: "POST", body: data }),

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
  createOrder: (plan_id: string, amount: number) =>
    apiFetch<{ order_id: string; amount: number; currency: string; checksum: string; payment_url: string }>(
      "/api/v1/payments/create-order",
      { method: "POST", requireAuth: true, body: { plan_id, amount } }
    ),

  getHistory: () =>
    apiFetch("/api/v1/payments/history", { requireAuth: true }),
};

// ─── System API ─────────────────────────────────────────────────────────────────

export const systemApi = {
  health: () => apiFetch("/health"),

  getAppUpdate: () => apiFetch("/api/v1/system/app-update"),

  getNotifications: () =>
    apiFetch("/api/v1/notifications", { requireAuth: true }),
};
