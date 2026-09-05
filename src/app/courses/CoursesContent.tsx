"use client";
import { useState, useMemo } from "react";
import Link from "next/link";

const COURSES = [
  { slug: "python", title: "Python for Beginners", cat: "Programming", level: "Beginner", cover: "code", meta: "24 lessons · 8h", desc: "Start with Python — variables, loops, functions, OOP.", coverEmoji: "</>" },
  { slug: "web", title: "HTML & CSS Crash Course", cat: "Web Dev", level: "Beginner", cover: "web", meta: "16 lessons · 6h", desc: "Build your first web page. Layout, typography, animations, responsive design.", coverEmoji: "{ }" },
  { slug: "javascript", title: "JavaScript Mastery", cat: "Web Dev", level: "Intermediate", cover: "web", meta: "28 lessons · 12h", desc: "ES6+, async/await, DOM, fetch, modules. The full JS toolkit.", coverEmoji: "JS" },
  { slug: "fullstack", title: "Full-Stack Web Dev", cat: "Web Dev", level: "Advanced", cover: "web", meta: "38 lessons · 14h", desc: "React, Node.js, Express, MongoDB. Ship a full production app.", coverEmoji: "⚛" },
  { slug: "sql", title: "SQL & Databases", cat: "Databases", level: "Beginner", cover: "db", meta: "22 lessons · 9h", desc: "Master SQL, joins, indexes, transactions, and database design.", coverEmoji: "🗄" },
  { slug: "ai", title: "Intro to AI & ML", cat: "AI / ML", level: "Intermediate", cover: "ai", meta: "30 lessons · 12h", desc: "Linear regression, neural nets, NLP, and the math behind them.", coverEmoji: "🤖" },
  { slug: "android", title: "Android with Kotlin", cat: "Mobile", level: "Intermediate", cover: "mobile", meta: "32 lessons · 15h", desc: "Build real Android apps with Jetpack Compose, MVVM, and Material 3.", coverEmoji: "📱" },
  { slug: "c", title: "C Programming Fundamentals", cat: "Programming", level: "Beginner", cover: "code", meta: "20 lessons · 10h", desc: "Pointers, memory, structs. The fundamentals every developer needs.", coverEmoji: "C" },
  { slug: "security", title: "Cybersecurity Essentials", cat: "Security", level: "Advanced", cover: "security", meta: "24 lessons · 11h", desc: "OWASP, encryption, network security, ethical hacking basics.", coverEmoji: "🛡" },
];

export default function CoursesPage() {
  const [q, setQ] = useState("");
  const [level, setLevel] = useState("");
  const [cat, setCat] = useState("");

  const filtered = useMemo(() => {
    return COURSES.filter((c) => {
      const matchQ = !q || c.title.toLowerCase().includes(q.toLowerCase()) || c.desc.toLowerCase().includes(q.toLowerCase());
      const matchL = !level || c.level === level;
      const matchC = !cat || c.cat === cat;
      return matchQ && matchL && matchC;
    });
  }, [q, level, cat]);

  return (
    <>
      <section className="b-page-head b-page-head--blue">
        <div className="container">
          <span className="b-tag mb-2" style={{ display: "inline-flex", background: "var(--yellow)" }}>📚 ALL COURSES</span>
          <h1>Master computer science, one lesson at a time.</h1>
          <p>From your first line of code to advanced algorithms — pick a course and start building.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="b-card mb-4">
            <div className="grid grid-3">
              <div className="b-form-row" style={{ gridColumn: "span 1" }}>
                <span className="b-form-icon">🔎</span>
                <input className="b-input" type="text" placeholder="Search courses..." value={q} onChange={(e) => setQ(e.target.value)} />
              </div>
              <select className="b-input" value={level} onChange={(e) => setLevel(e.target.value)}>
                <option value="">All levels</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
              <select className="b-input" value={cat} onChange={(e) => setCat(e.target.value)}>
                <option value="">All categories</option>
                <option>Programming</option>
                <option>Web Dev</option>
                <option>AI / ML</option>
                <option>Databases</option>
                <option>Mobile</option>
                <option>Security</option>
              </select>
            </div>
          </div>

          <div className="grid grid-3">
            {filtered.length === 0 && (
              <div className="b-card text-center" style={{ gridColumn: "1 / -1" }}>
                <p className="muted">No courses match your filters. Try clearing them.</p>
              </div>
            )}
            {filtered.map((c) => (
              <Link key={c.slug} href={`/courses/${c.slug}`} className="b-course">
                <div className={`b-course__cover b-course__cover--${c.cover}`}>{c.coverEmoji}</div>
                <div className="b-course__body">
                  <div className="b-course__title">{c.title}</div>
                  <div className="b-course__meta">
                    <span>📚 {c.meta}</span>
                    <span>{c.level === "Beginner" ? "🟢" : c.level === "Intermediate" ? "🟡" : "🔴"} {c.level}</span>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{c.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-4">
            <button className="b-btn b-btn--ghost b-btn--lg">Load more →</button>
          </div>
        </div>
      </section>
    </>
  );
}
