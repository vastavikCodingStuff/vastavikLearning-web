"use client";
import Link from "next/link";
import { useState } from "react";
import { notFound } from "next/navigation";

export const COURSES: Record<string, { title: string; level: string; tag: string; rating: string; lessons: string; time: string; students: string; instructor: string; instructorRole: string }> = {
  python: { title: "Python for Beginners", level: "🟢 Beginner", tag: "PYTHON", rating: "⭐⭐⭐⭐⭐ 4.9 (2,184 ratings)", lessons: "24", time: "8 hours", students: "12,432", instructor: "Prof. Anjali Roy", instructorRole: "Sr. Engineer · 10+ yrs" },
  web: { title: "HTML & CSS Crash Course", level: "🟢 Beginner", tag: "WEB", rating: "⭐⭐⭐⭐⭐ 4.8 (1,512 ratings)", lessons: "16", time: "6 hours", students: "9,210", instructor: "Mr. Karthik Iyer", instructorRole: "Frontend Lead" },
  javascript: { title: "JavaScript Mastery", level: "🟡 Intermediate", tag: "JS", rating: "⭐⭐⭐⭐⭐ 4.9 (3,201 ratings)", lessons: "28", time: "12 hours", students: "15,807", instructor: "Ms. Neha Sharma", instructorRole: "Full-Stack Engineer" },
  fullstack: { title: "Full-Stack Web Dev", level: "🔴 Advanced", tag: "FS", rating: "⭐⭐⭐⭐⭐ 4.9 (4,002 ratings)", lessons: "38", time: "14 hours", students: "20,118", instructor: "Prof. Rajeev Menon", instructorRole: "CTO, Ex-Flipkart" },
  sql: { title: "SQL & Databases", level: "🟢 Beginner", tag: "SQL", rating: "⭐⭐⭐⭐ 4.7 (1,820 ratings)", lessons: "22", time: "9 hours", students: "8,431", instructor: "Ms. Pooja Banerjee", instructorRole: "Data Engineer" },
  ai: { title: "Intro to AI & ML", level: "🟡 Intermediate", tag: "AI", rating: "⭐⭐⭐⭐⭐ 4.9 (2,711 ratings)", lessons: "30", time: "12 hours", students: "11,604", instructor: "Dr. Vikram Iyengar", instructorRole: "AI Research Scientist" },
  android: { title: "Android with Kotlin", level: "🟡 Intermediate", tag: "ANDROID", rating: "⭐⭐⭐⭐ 4.8 (1,604 ratings)", lessons: "32", time: "15 hours", students: "7,322", instructor: "Mr. Siddharth Rao", instructorRole: "Android Engineer" },
  c: { title: "C Programming Fundamentals", level: "🟢 Beginner", tag: "C", rating: "⭐⭐⭐⭐⭐ 4.8 (1,902 ratings)", lessons: "20", time: "10 hours", students: "9,815", instructor: "Prof. Lakshmi Narayanan", instructorRole: "Systems Engineer" },
  security: { title: "Cybersecurity Essentials", level: "🔴 Advanced", tag: "SEC", rating: "⭐⭐⭐⭐⭐ 4.9 (1,107 ratings)", lessons: "24", time: "11 hours", students: "5,224", instructor: "Mr. Ritesh Kapoor", instructorRole: "Security Analyst" },
};

const MODULES = [
  { name: "Module 1: Getting Started", lessons: 5, time: "1h 30m", items: [
    { n: 1, title: "Installing Python & IDE", time: "12 min · Video + Notes", done: true, locked: false },
    { n: 2, title: "Your First Python Program", time: "18 min · Interactive", done: true, locked: false },
    { n: 3, title: "Variables & Data Types", time: "22 min · Video + Quiz", done: true, locked: false },
    { n: 4, title: "Operators & Expressions", time: "20 min · Video", done: false, locked: false },
    { n: 5, title: "Module 1 Quiz", time: "15 min · 10 questions", done: false, locked: false },
  ]},
  { name: "Module 2: Control Flow", lessons: 6, time: "2h", items: [
    { n: 6, title: "If/Else Statements", time: "18 min", done: false, locked: true },
    { n: 7, title: "Loops in Python", time: "25 min", done: false, locked: true },
  ]},
  { name: "Module 3: Functions & Modules", lessons: 6, time: "2h 30m", items: [] },
];

export function CourseDetailClient({ slug }: { slug: string }) {
  const course = COURSES[slug];
  const [tab, setTab] = useState(0);
  if (!course) return notFound();
  const initial = course.instructor.charAt(course.instructor.indexOf("Prof.") >= 0 ? 5 : 4);

  return (
    <>
      <section className="b-page-head" style={{ background: "var(--blue)", color: "var(--white)" }}>
        <div className="container">
          <div className="b-cols-3-2">
            <div>
              <div className="flex gap-1 mb-2">
                <span className="b-tag" style={{ background: "var(--yellow)", color: "var(--black)" }}>{course.tag}</span>
                <span className="b-tag" style={{ background: "var(--white)", color: "var(--black)" }}>{course.level}</span>
                <span className="b-tag" style={{ background: "var(--lime)", color: "var(--black)" }}>BESTSELLER</span>
              </div>
              <h1>{course.title}</h1>
              <p style={{ fontSize: "1.1rem", opacity: 0.9, marginTop: 8 }}>Start your programming journey with {course.title.split(" ")[0]} — the world&apos;s most loved language. No prior experience needed.</p>
              <div className="flex gap-3 mt-3" style={{ flexWrap: "wrap", fontSize: "0.95rem" }}>
                <span>{course.rating}</span>
                <span>📚 {course.lessons} lessons</span>
                <span>⏱ {course.time}</span>
                <span>👥 {course.students} students</span>
              </div>
            </div>
            <div className="b-card" style={{ background: "var(--white)", color: "var(--black)" }}>
              <div className="text-center">
                <div className="b-avatar b-avatar--lg" style={{ background: "var(--blue)", margin: "0 auto" }}>{initial.toUpperCase()}</div>
                <h3 className="mt-1">{course.instructor}</h3>
                <p className="muted">{course.instructorRole}</p>
              </div>
              <hr className="b-divider" />
              <div className="flex justify-between mb-2"><strong>Price</strong><span style={{ fontSize: "1.5rem", fontWeight: 900 }}>FREE</span></div>
              <Link href="/lesson" className="b-btn b-btn--primary b-btn--block b-btn--lg mb-2">Start Course →</Link>
              <button className="b-btn b-btn--ghost b-btn--block b-btn--sm">♡ Add to wishlist</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="b-cols-sidebar">
            <div>
              <div className="b-tabs">
                {["Curriculum", "Overview", "Reviews", "Resources"].map((t, i) => (
                  <button key={t} className={"b-tab" + (tab === i ? " b-tab--active" : "")} onClick={() => setTab(i)}>{t}</button>
                ))}
              </div>

              {tab === 0 && (
                <div>
                  {MODULES.map((mod, mi) => (
                    <div key={mi}>
                      <div className="b-card b-card--sm mb-2">
                        <div className="flex justify-between items-center">
                          <strong>{mod.name}</strong>
                          <span className="muted" style={{ fontSize: "0.85rem" }}>{mod.lessons} lessons · {mod.time}</span>
                        </div>
                      </div>
                      {mod.items.map((it) => (
                        <Link key={it.n} href={it.locked ? "#" : "/lesson"} className="b-card b-card--sm mt-1" style={{ display: "block", opacity: it.locked ? 0.6 : 1 }}>
                          <div className="flex items-center gap-2">
                            <div className="b-avatar" style={{ background: it.done ? "var(--lime)" : it.locked ? "var(--surface2)" : "var(--surface)", color: "var(--black)", width: 32, height: 32, fontSize: "0.85rem" }}>
                              {it.done ? "✓" : it.locked ? "🔒" : it.n}
                            </div>
                            <div style={{ flex: 1 }}>
                              <strong>{it.n}. {it.title}</strong>
                              <div className="muted" style={{ fontSize: "0.85rem" }}>{it.time}</div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ))}
                  <div className="text-center mt-3 muted">+ 12 more lessons in 4 modules</div>
                </div>
              )}

              {tab === 1 && (
                <div>
                  <h2>About this course</h2>
                  <p className="mt-2">A complete beginner-friendly course that takes you from zero to confident. Build real projects, write clean code, and understand the fundamentals deeply.</p>
                  <h3 className="mt-3">What you&apos;ll learn</h3>
                  <ul className="mt-2">
                    <li>Write clean, idiomatic code</li>
                    <li>Understand variables, data types, and operators</li>
                    <li>Master control flow with if/else and loops</li>
                    <li>Build reusable functions and modules</li>
                    <li>Work with lists, dicts, sets, and tuples</li>
                    <li>Read and write files</li>
                    <li>Handle errors with try/except</li>
                    <li>Build a complete project by the end</li>
                  </ul>
                  <h3 className="mt-3">Requirements</h3>
                  <ul className="mt-2">
                    <li>A computer (Windows, Mac, or Linux)</li>
                    <li>No prior coding experience needed</li>
                    <li>Curiosity and patience 🧠</li>
                  </ul>
                </div>
              )}

              {tab === 2 && (
                <div>
                  <h2>Student Reviews</h2>
                  <div className="b-card b-card--sm mt-2">
                    <div className="b-tag b-tag--lime mb-1">⭐⭐⭐⭐⭐</div>
                    <p>&ldquo;Best Python course I&apos;ve taken. The interactive editor made it click for me.&rdquo;</p>
                    <div className="muted mt-1" style={{ fontSize: "0.85rem" }}>— Riya S., Class 10</div>
                  </div>
                  <div className="b-card b-card--sm mt-2">
                    <div className="b-tag b-tag--lime mb-1">⭐⭐⭐⭐⭐</div>
                    <p>&ldquo;Prof. Roy is incredible. The way she explains recursion finally made sense.&rdquo;</p>
                    <div className="muted mt-1" style={{ fontSize: "0.85rem" }}>— Arjun P., B.Tech CSE</div>
                  </div>
                </div>
              )}

              {tab === 3 && (
                <div>
                  <h2>Downloadable Resources</h2>
                  <ul className="mt-2">
                    <li>📄 Cheat Sheet (PDF)</li>
                    <li>📦 Starter code repository (GitHub)</li>
                    <li>🎥 5 bonus office-hour recordings</li>
                    <li>📝 50 practice problems</li>
                  </ul>
                </div>
              )}
            </div>

            <aside>
              <div className="b-card mb-3">
                <h3>📊 Course Stats</h3>
                <div className="mt-2">
                  <div className="flex justify-between"><span>Completion rate</span><strong>92%</strong></div>
                  <div className="b-progress mt-1 mb-2"><div className="b-progress__fill" style={{ width: "92%" }}></div></div>
                  <div className="flex justify-between"><span>Avg. rating</span><strong>4.9★</strong></div>
                  <div className="b-progress mt-1 mb-2"><div className="b-progress__fill" style={{ width: "98%", background: "var(--yellow)" }}></div></div>
                </div>
              </div>
              <div className="b-card b-card--lime">
                <h3>🎁 Certificate</h3>
                <p className="mt-1" style={{ fontSize: "0.9rem" }}>Get a shareable certificate on completion.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
