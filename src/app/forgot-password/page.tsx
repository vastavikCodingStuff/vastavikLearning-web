"use client";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/Toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const toast = useToast();
  return (
    <main className="b-auth">
      <div className="b-auth__card">
        <div className="b-auth__logo">🔑</div>
        <h1 className="b-auth__title">Forgot your password?</h1>
        <p className="b-auth__sub">No worries. Enter your email and we&apos;ll send you a reset link.</p>
        <form onSubmit={(e) => { e.preventDefault(); if (!email) toast("Please enter your email", "err"); else toast("Reset link sent to " + email, "ok"); }}>
          <div className="b-form-group">
            <label className="b-label" htmlFor="email">Email</label>
            <div className="b-form-row">
              <span className="b-form-icon">✉</span>
              <input id="email" type="email" className="b-input" placeholder="you@school.edu" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>
          <button type="submit" className="b-btn b-btn--primary b-btn--block b-btn--lg">Send reset link →</button>
        </form>
        <p className="b-auth__foot">
          Remembered it? <Link href="/login"><strong>Back to log in</strong></Link>
        </p>
      </div>
    </main>
  );
}
