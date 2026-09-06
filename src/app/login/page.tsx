"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/Toast";
import { authApi, setTokens } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const toast = useToast();
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast("Please enter your email and password", "err"); return; }
    setLoading(true);
    try {
      const res = await authApi.login({ email, password });
      setTokens(res.access_token, res.refresh_token);
      localStorage.setItem("vastavik_user", JSON.stringify({
        user_id: res.user_id,
        name: res.name,
        email: res.email,
        role: res.role,
      }));
      toast("Welcome back!", "ok");
      setTimeout(() => router.push("/dashboard"), 400);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Login failed";
      toast(msg, "err");
    } finally {
      setLoading(false);
    }
  };

  const social = (p: string) => {
    toast(p + " OAuth coming soon", "ok");
  };

  return (
    <main className="b-auth">
      <div className="b-auth__card">
        <div className="b-auth__logo">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 18l-6-6 6-6" /><path d="M15 6l6 6-6 6" />
          </svg>
        </div>
        <h1 className="b-auth__title">Welcome back</h1>
        <p className="b-auth__sub">Sign in to continue your learning journey.</p>

        <form onSubmit={submit} noValidate>
          <div className="b-form-group">
            <label className="b-label" htmlFor="email">Email</label>
            <div className="b-form-row">
              <span className="b-form-icon">✉</span>
              <input id="email" type="email" className="b-input" placeholder="you@school.edu" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" disabled={loading} />
            </div>
          </div>
          <div className="b-form-group">
            <label className="b-label" htmlFor="password">Password</label>
            <div className="b-form-row">
              <span className="b-form-icon">🔒</span>
              <input id="password" type="password" className="b-input" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" disabled={loading} />
            </div>
          </div>
          <div className="flex justify-between items-center mb-2" style={{ fontSize: "0.9rem" }}>
            <label style={{ display: "inline-flex", gap: 8, alignItems: "center", cursor: "pointer" }}>
              <input type="checkbox" disabled={loading} /> Remember me
            </label>
            <Link href="/forgot-password">Forgot password?</Link>
          </div>
          <button type="submit" className="b-btn b-btn--primary b-btn--block b-btn--lg" disabled={loading}>
            {loading ? "Signing in..." : "Log In →"}
          </button>
        </form>

        <div className="b-auth__or">or continue with</div>
        <div className="b-auth__social">
          <button type="button" className="b-btn b-btn--ghost" onClick={() => social("google")}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Google
          </button>
          <button type="button" className="b-btn b-btn--ghost" onClick={() => social("github")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.22.7.83.58A12 12 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </button>
        </div>

        <p className="b-auth__foot">
          Don&apos;t have an account? <Link href="/signup"><strong>Sign up →</strong></Link>
        </p>
      </div>
    </main>
  );
}
