"use client";
import Sidebar from "@/components/Sidebar";

const NOTIFS = [
  { icon: "🎙️", title: "Live class starting soon", desc: "Data Structures with Prof. Mehta starts in 30 minutes.", time: "2 min ago", unread: true },
  { icon: "🏆", title: "New achievement unlocked", desc: "You earned the \"7-Day Streak\" badge. Keep going!", time: "1 hour ago", unread: true },
  { icon: "📝", title: "Quiz graded", desc: "You scored 9/10 on the SQL JOINs quiz. Excellent work!", time: "3 hours ago", unread: false },
  { icon: "💬", title: "Reply from Prof. Roy", desc: "\"Great question! Here's a more detailed explanation...\"", time: "Yesterday", unread: false },
  { icon: "🎁", title: "Premium offer", desc: "50% off your first 3 months. Limited time.", time: "2 days ago", unread: false },
  { icon: "📚", title: "New course available", desc: "\"Advanced React Patterns\" just dropped. 12 lessons.", time: "3 days ago", unread: false },
];

export default function NotificationsContent() {
  return (
    <div className="b-dash">
      <Sidebar />
      <main className="b-dash__main">
        <div className="b-dash__head">
          <h1>🔔 Notifications</h1>
          <button className="b-btn b-btn--ghost b-btn--sm">Mark all as read</button>
        </div>

        <div className="flex flex-col gap-1">
          {NOTIFS.map((n, i) => (
            <div key={i} className="b-card b-card--sm" style={{ display: "flex", gap: 12, alignItems: "flex-start", background: n.unread ? "var(--yellow)" : "var(--surface)" }}>
              <div className="b-avatar" style={{ background: "var(--blue)", color: "var(--white)" }}>{n.icon}</div>
              <div style={{ flex: 1 }}>
                <strong>{n.title}</strong>
                <p style={{ fontSize: "0.9rem", marginTop: 4 }}>{n.desc}</p>
                <span className="muted" style={{ fontSize: "0.8rem" }}>{n.time}</span>
              </div>
              {n.unread && <span className="b-tag b-tag--pink" style={{ alignSelf: "flex-start" }}>NEW</span>}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}