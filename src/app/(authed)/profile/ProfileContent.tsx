"use client";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/lib/auth";
import Link from "next/link";

const ACHIEVEMENTS = [
  { icon: "🏆", title: "First Quiz", desc: "Completed your first quiz", earned: true },
  { icon: "🔥", title: "7-Day Streak", desc: "Learned 7 days in a row", earned: true },
  { icon: "💯", title: "Perfect Score", desc: "Got 100% on a quiz", earned: true },
  { icon: "🚀", title: "Fast Learner", desc: "Completed a course in under a week", earned: false },
  { icon: "🎓", title: "Certified", desc: "Earned your first certificate", earned: false },
  { icon: "👑", title: "Top 10", desc: "Reached top 10 on the leaderboard", earned: false },
];

export default function ProfileContent() {
  const { user, logout } = useAuth();
  const initial = (user?.name || user?.email || "U").charAt(0).toUpperCase();

  return (
    <div className="b-dash">
      <Sidebar />
      <main className="b-dash__main">
        <div className="b-dash__head">
          <h1>My Profile</h1>
          <button className="b-btn b-btn--ghost" onClick={logout}>Logout</button>
        </div>

        <div className="grid grid-2 mb-4">
          <div className="b-card text-center">
            <div className="b-avatar b-avatar--xl" style={{ background: "var(--purple)", margin: "0 auto" }}>{initial}</div>
            <h2 className="mt-2">{user?.name || "Learner"}</h2>
            <p className="muted">{user?.email || "guest@vastaviklearning.online"}</p>
            {user?.board && <span className="b-tag b-tag--blue mt-2" style={{ display: "inline-flex" }}>{user.board}</span>}
            <div className="flex gap-1 justify-center mt-3" style={{ flexWrap: "wrap" }}>
              <Link href="/settings" className="b-btn b-btn--ghost b-btn--sm">⚙ Edit</Link>
              <Link href="/pricing" className="b-btn b-btn--purple b-btn--sm">⭐ Go Premium</Link>
            </div>
          </div>

          <div className="b-card">
            <h3>📊 Lifetime Stats</h3>
            <div className="grid grid-2 mt-2">
              <div><div className="b-stat__num" style={{ fontSize: "1.75rem" }}>36</div><div className="b-stat__lbl">Lessons</div></div>
              <div><div className="b-stat__num" style={{ fontSize: "1.75rem" }}>12</div><div className="b-stat__lbl">Quizzes</div></div>
              <div><div className="b-stat__num" style={{ fontSize: "1.75rem" }}>1,240</div><div className="b-stat__lbl">XP</div></div>
              <div><div className="b-stat__num" style={{ fontSize: "1.75rem" }}>14</div><div className="b-stat__lbl">Day Streak</div></div>
            </div>
          </div>
        </div>

        <h2 className="mb-3">🏅 Achievements</h2>
        <div className="grid grid-3">
          {ACHIEVEMENTS.map((a) => (
            <div key={a.title} className={"b-card b-card--sm" + (!a.earned ? " muted" : "")} style={{ opacity: a.earned ? 1 : 0.5 }}>
              <div className="b-avatar" style={{ background: a.earned ? "var(--lime)" : "var(--surface2)", color: "var(--black)", fontSize: "1.5rem" }}>{a.icon}</div>
              <strong className="mt-2" style={{ display: "block" }}>{a.title}</strong>
              <p className="muted mt-1" style={{ fontSize: "0.9rem" }}>{a.desc}</p>
              {a.earned ? <span className="b-tag b-tag--lime mt-2" style={{ display: "inline-flex" }}>EARNED</span> : <span className="b-tag mt-2" style={{ display: "inline-flex" }}>LOCKED</span>}
            </div>
          ))}
        </div>

        <h2 className="mt-4 mb-3">📚 My Courses</h2>
        <div className="grid grid-3">
          {[
            { title: "Python for Beginners", progress: 58, cover: "code" },
            { title: "JavaScript Basics", progress: 24, cover: "web" },
            { title: "SQL & Databases", progress: 90, cover: "db" },
          ].map((c) => (
            <div key={c.title} className="b-course">
              <div className={`b-course__cover b-course__cover--${c.cover}`}></div>
              <div className="b-course__body">
                <div className="b-course__title">{c.title}</div>
                <div className="b-course__progress">
                  <div className="b-course__progress-row"><span>Progress</span><strong>{c.progress}%</strong></div>
                  <div className="b-progress"><div className="b-progress__fill" style={{ width: `${c.progress}%` }}></div></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}