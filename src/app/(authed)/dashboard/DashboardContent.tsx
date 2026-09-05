"use client";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/lib/auth";

export default function DashboardContent() {
  const { user } = useAuth();
  return (
    <div className="b-dash">
      <Sidebar />
      <main className="b-dash__main">
        <div className="b-dash__head">
          <div>
            <h1>
              Welcome back,{" "}
              <span style={{ background: "var(--yellow)", padding: "0 6px", border: "3px solid var(--border)", display: "inline-block", transform: "rotate(-1deg)" }}>
                {user?.name || "Learner"}
              </span>{" "}
              👋
            </h1>
            <p className="muted">Here&apos;s what&apos;s happening with your learning today.</p>
          </div>
          <Link href="/practice" className="b-btn b-btn--primary">Continue Learning →</Link>
        </div>

        <div className="b-stats mb-4">
          <div className="b-stat" style={{ background: "var(--yellow)" }}><div className="b-stat__num" style={{ color: "var(--black)" }}>14</div><div className="b-stat__lbl" style={{ color: "var(--black)" }}>Day Streak</div></div>
          <div className="b-stat" style={{ background: "var(--lime)" }}><div className="b-stat__num" style={{ color: "var(--black)" }}>82%</div><div className="b-stat__lbl" style={{ color: "var(--black)" }}>Avg. Score</div></div>
          <div className="b-stat" style={{ background: "var(--pink)", color: "var(--white)" }}><div className="b-stat__num" style={{ color: "var(--white)" }}>36</div><div className="b-stat__lbl" style={{ color: "var(--white)" }}>Lessons Done</div></div>
          <div className="b-stat" style={{ background: "var(--purple)", color: "var(--white)" }}><div className="b-stat__num" style={{ color: "var(--white)" }}>12</div><div className="b-stat__lbl" style={{ color: "var(--white)" }}>Quizzes Passed</div></div>
        </div>

        <div className="grid grid-2">
          <div>
            <h2 className="mb-3">Continue where you left off</h2>
            <div className="b-card mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="b-tag b-tag--blue">PYTHON</span>
                <span className="muted" style={{ fontSize: "0.85rem" }}>Lesson 14 / 24</span>
              </div>
              <h3>Functions & Modules</h3>
              <p className="muted mt-1 mb-2" style={{ fontSize: "0.9rem" }}>Learn how to write reusable, clean code with Python functions.</p>
              <div className="b-progress mb-2"><div className="b-progress__fill" style={{ width: "58%" }}></div></div>
              <Link href="/courses/python" className="b-btn b-btn--primary b-btn--block b-btn--sm">Resume →</Link>
            </div>

            <h2 className="mb-3">🎯 Recommended for you</h2>
            <div className="grid grid-2">
              <Link href="/courses/fullstack" className="b-course">
                <div className="b-course__cover b-course__cover--web">{"{ }"}</div>
                <div className="b-course__body"><div className="b-course__title">JavaScript Basics</div><div className="b-course__meta"><span>📚 18 lessons</span></div></div>
              </Link>
              <Link href="/courses/sql" className="b-course">
                <div className="b-course__cover b-course__cover--db">🗄</div>
                <div className="b-course__body"><div className="b-course__title">SQL & Databases</div><div className="b-course__meta"><span>📚 22 lessons</span></div></div>
              </Link>
            </div>
          </div>

          <div>
            <div className="b-card b-card--purple mb-3">
              <div className="flex items-center gap-1 mb-2">
                <span style={{ fontSize: "1.5rem" }}>⭐</span>
                <strong>Go Premium</strong>
              </div>
              <p style={{ fontSize: "0.9rem", opacity: 0.95 }}>Unlock all courses, live classes, AI tutor and certifications.</p>
              <Link href="/pricing" className="b-btn b-btn--lg b-btn--block" style={{ background: "var(--yellow)", color: "var(--black)", marginTop: 12 }}>Upgrade — From ₹199/mo</Link>
            </div>

            <div className="b-card b-card--lime mb-3">
              <span className="b-tag mb-2" style={{ display: "inline-flex" }}>🔴 LIVE TODAY</span>
              <h3 className="mt-1">Data Structures: Trees & Graphs</h3>
              <p className="muted mt-1" style={{ fontSize: "0.9rem" }}>with Prof. Mehta · 6:00 PM IST</p>
              <Link href="/meetings" className="b-btn b-btn--dark b-btn--block b-btn--sm mt-2">Join Class →</Link>
            </div>

            <div className="b-card">
              <h3 className="mb-2">Quick Actions</h3>
              <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <Link href="/practice" className="b-btn b-btn--ghost b-btn--sm">💻 Code</Link>
                <Link href="/quiz" className="b-btn b-btn--ghost b-btn--sm">📝 Quiz</Link>
                <Link href="/ai-chat" className="b-btn b-btn--ghost b-btn--sm">🤖 Ask AI</Link>
                <Link href="/pyq" className="b-btn b-btn--ghost b-btn--sm">📄 PYQs</Link>
              </div>
            </div>
          </div>
        </div>

        <h2 className="mt-4 mb-3">Recent Activity</h2>
        <div className="grid grid-2">
          <div className="b-card b-card--sm">
            <div className="flex gap-2 items-center">
              <div className="b-feature__icon b-feature__icon--lime" style={{ width: 48, height: 48, fontSize: "1.2rem" }}>✅</div>
              <div><strong>Completed: Recursion Basics</strong><div className="muted" style={{ fontSize: "0.85rem" }}>2 hours ago · +50 XP</div></div>
            </div>
          </div>
          <div className="b-card b-card--sm">
            <div className="flex gap-2 items-center">
              <div className="b-feature__icon b-feature__icon--blue" style={{ width: 48, height: 48, fontSize: "1.2rem" }}>📝</div>
              <div><strong>Scored 9/10 on SQL Quiz</strong><div className="muted" style={{ fontSize: "0.85rem" }}>Yesterday · +30 XP</div></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}