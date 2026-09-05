"use client";
import Link from "next/link";

const SCORES = [
  { rank: 1, name: "Diya P.", xp: 4520, avatar: "D", color: "var(--yellow)" },
  { rank: 2, name: "Arjun P.", xp: 4180, avatar: "A", color: "var(--pink)" },
  { rank: 3, name: "Sneha V.", xp: 3940, avatar: "S", color: "var(--lime)" },
  { rank: 4, name: "Karan M.", xp: 3210, avatar: "K", color: "var(--blue)" },
  { rank: 5, name: "Riya S.", xp: 2980, avatar: "R", color: "var(--orange)" },
  { rank: 6, name: "Vikram J.", xp: 2640, avatar: "V", color: "var(--purple)" },
  { rank: 7, name: "Ananya K.", xp: 2380, avatar: "A", color: "var(--blue)" },
  { rank: 8, name: "Rohan S.", xp: 2150, avatar: "R", color: "var(--pink)" },
  { rank: 9, name: "Meera N.", xp: 1920, avatar: "M", color: "var(--lime)" },
  { rank: 10, name: "Ishaan G.", xp: 1700, avatar: "I", color: "var(--orange)" },
];

export default function LeaderboardPage() {
  const top3 = SCORES.slice(0, 3);
  return (
    <>
      <section className="b-page-head b-page-head--orange">
        <div className="container">
          <span className="b-tag mb-2" style={{ display: "inline-flex", background: "var(--yellow)", color: "var(--black)" }}>🏆 LEADERBOARD</span>
          <h1>Top learners this week</h1>
          <p>Compete with 25,000+ students. Climb the ranks. Earn bragging rights.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Podium */}
          <div className="grid grid-3 mb-4">
            {[top3[1], top3[0], top3[2]].map((u, i) => {
              const order = i === 1 ? 1 : i === 0 ? 0 : 2;
              const heights = [160, 200, 130];
              return (
                <div key={u.rank} className="text-center" style={{ order }}>
                  <div className="b-avatar b-avatar--xl" style={{ background: u.color, color: order === 1 ? "var(--black)" : "var(--white)", margin: "0 auto" }}>{u.avatar}</div>
                  <h3 className="mt-2">{u.name}</h3>
                  <p className="muted">{u.xp} XP</p>
                  <div className="b-card" style={{ marginTop: 12, padding: 12, background: order === 1 ? "var(--yellow)" : "var(--surface2)" }}>
                    <strong style={{ fontSize: "2rem" }}>#{u.rank}</strong>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rest */}
          <div className="b-card">
            <h3 className="mb-3">All Rankings</h3>
            {SCORES.slice(3).map((u) => (
              <div key={u.rank} className="flex items-center gap-2 b-card b-card--sm mb-2" style={{ padding: 12 }}>
                <strong style={{ width: 32, fontSize: "1.1rem" }}>#{u.rank}</strong>
                <div className="b-avatar" style={{ background: u.color, color: u.color === "var(--lime)" || u.color === "var(--yellow)" ? "var(--black)" : "var(--white)" }}>{u.avatar}</div>
                <strong style={{ flex: 1 }}>{u.name}</strong>
                <span className="muted">{u.xp} XP</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <Link href="/quiz" className="b-btn b-btn--primary b-btn--lg">Take a quiz to climb →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
