"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/Toast";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [board, setBoard] = useState("");
  const { setUser } = useAuth();
  const toast = useToast();
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || password.length < 8 || !board) {
      toast("Please fill all fields (password ≥ 8 chars)", "err");
      return;
    }
    setUser({ name, email, board, role: "student" });
    toast("Account created! Welcome 🎉", "ok");
    setTimeout(() => router.push("/dashboard"), 500);
  };
  const social = (p: string) => {
    setUser({ name: p + " User", email: p + "@vastavik.app", role: "student" });
    toast("Signed up with " + p, "ok");
    setTimeout(() => router.push("/dashboard"), 500);
  };

  return (
    <main className="b-auth">
      <div className="b-auth__card">
        <div className="b-auth__logo">🚀</div>
        <h1 className="b-auth__title">Create your account</h1>
        <p className="b-auth__sub">Free forever. No credit card required.</p>

        <form onSubmit={submit} noValidate>
          <div className="b-form-group">
            <label className="b-label" htmlFor="name">Full name</label>
            <div className="b-form-row">
              <span className="b-form-icon">👤</span>
              <input id="name" type="text" className="b-input" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
          </div>
          <div className="b-form-group">
            <label className="b-label" htmlFor="email">Email</label>
            <div className="b-form-row">
              <span className="b-form-icon">✉</span>
              <input id="email" type="email" className="b-input" placeholder="you@school.edu" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>
          <div className="b-form-group">
            <label className="b-label" htmlFor="password">Password</label>
            <div className="b-form-row">
              <span className="b-form-icon">🔒</span>
              <input id="password" type="password" className="b-input" placeholder="At least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
            </div>
          </div>
          <div className="b-form-group">
            <label className="b-label" htmlFor="board">Board / Curriculum</label>
            <select id="board" className="b-input" value={board} onChange={(e) => setBoard(e.target.value)} required>
              <option value="">Select your board</option>
              <option>ICSE</option>
              <option>CBSE</option>
              <option>State Board</option>
              <option>IB</option>
              <option>Undergraduate (B.Tech / B.Sc / BCA)</option>
              <option>Other</option>
            </select>
          </div>
          <label className="b-alert b-alert--info" style={{ cursor: "pointer", marginBottom: 16 }}>
            <input type="checkbox" required style={{ marginTop: 4 }} />
            <span>I agree to the <Link href="/terms" style={{ color: "var(--white)", textDecoration: "underline" }}>Terms</Link> and <Link href="/privacy" style={{ color: "var(--white)", textDecoration: "underline" }}>Privacy Policy</Link>.</span>
          </label>
          <button type="submit" className="b-btn b-btn--primary b-btn--block b-btn--lg">Create Account →</button>
        </form>

        <div className="b-auth__or">or sign up with</div>
        <div className="b-auth__social">
          <button type="button" className="b-btn b-btn--ghost" onClick={() => social("google")}>Google</button>
          <button type="button" className="b-btn b-btn--ghost" onClick={() => social("github")}>GitHub</button>
        </div>

        <p className="b-auth__foot">
          Already have an account? <Link href="/login"><strong>Log in →</strong></Link>
        </p>
      </div>
    </main>
  );
}
