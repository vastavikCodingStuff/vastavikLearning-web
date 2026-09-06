import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/seo";
import HomeStructuredData from "./HomeStructuredData";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline} | Learn to Code, Build & Ship`,
  description:
    "Master computer science with Vastavik Learning — live classrooms, AI tutor, in-browser code editor, OCR exercise scanner, and PYQ archive for ICSE, CBSE, and undergraduate students. Start free.",
  alternates: { canonical: "/" },
  keywords: [
    "Vastavik Learning",
    "learn to code India",
    "live coding classes",
    "AI tutor",
    "ICSE computer applications",
    "CBSE computer science",
    "B.Tech CSE",
    "in-browser code editor",
    "online programming course",
    "UPI subscription learning",
  ],
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: "Live classrooms, AI tutor, in-browser code editor. Master computer science today.",
    url: "/",
    type: "website",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: "Live classrooms, AI tutor, in-browser code editor. Master computer science today.",
    images: ["/og.svg"],
  },
};

export default function HomePage() {
  return (
    <>
      <HomeStructuredData />
      {/* HERO */}
      <section className="b-hero" aria-labelledby="hero-title">
        <div className="container">
          <div className="b-hero__grid">
            <div>
              <span className="b-tag b-tag--blue mb-2" style={{ display: "inline-flex" }}>NEW • AI Tutor powered by Gemini 3</span>
              <h1 id="hero-title" className="b-hero__title mt-2">
                Learn to <span className="highlight">Code.</span> Build to{" "}
                <span className="highlight highlight--pink">Ship.</span> Grow to{" "}
                <span className="highlight highlight--lime">Win.</span>
              </h1>
              <p className="b-hero__sub">
                An interactive education platform for ICSE, CBSE and collegiate computer science — featuring live classrooms, AI-powered tutoring, instant code execution and a bold Neo-Brutalist design that makes learning feel like play.
              </p>
              <div className="b-hero__actions">
                <Link href="/signup" className="b-btn b-btn--primary b-btn--lg">Start Free →</Link>
                <Link href="/courses" className="b-btn b-btn--ghost b-btn--lg">Browse Courses</Link>
              </div>
              <div className="b-hero__stats" aria-label="Key statistics">
                <div className="b-hero__stat"><strong>25K+</strong><span>Active learners</span></div>
                <div className="b-hero__stat"><strong>120+</strong><span>Coding lessons</span></div>
                <div className="b-hero__stat"><strong>4.9★</strong><span>App rating</span></div>
              </div>
            </div>
            <div className="b-hero__visual" aria-hidden="true">
              <div className="v1 float" style={{ ["--rot" as any]: "-3deg" }}>
                <div className="b-tag b-tag--blue">LIVE</div>
                <strong style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem" }}>Live Class</strong>
                <span style={{ fontSize: "0.85rem" }}>Sorting Algorithms · 42 attending</span>
              </div>
              <div className="v2 float float--delay" style={{ ["--rot" as any]: "2deg" }}>
                <div className="b-tag">NEW</div>
                <strong style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>Streak</strong>
                <span style={{ fontSize: "1.8rem", fontWeight: 900 }}>14 days 🔥</span>
              </div>
              <div className="v3 float float--delay2" style={{ ["--rot" as any]: "-1deg" }}>
                <div className="b-tag b-tag--lime">QUIZ</div>
                <strong style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>Score: 9/10</strong>
                <span style={{ fontSize: "0.85rem" }}>Recursion Mastery</span>
              </div>
              <div className="v4 float" style={{ ["--rot" as any]: "4deg" }}>
                <strong style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem" }}>98%</strong>
                <span style={{ fontSize: "0.8rem" }}>Completion Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="b-strip" role="marquee" aria-label="Highlights">
        <div className="b-strip__inner">
          <span>🚀 Launch your career</span><span className="dot">●</span>
          <span>💻 Code in the browser</span><span className="dot">●</span>
          <span>🎓 ICSE &amp; CBSE curriculum</span><span className="dot">●</span>
          <span>🤖 AI tutor 24/7</span><span className="dot">●</span>
          <span>🎙️ Live classrooms</span><span className="dot">●</span>
          <span>📝 PYQ archive</span><span className="dot">●</span>
          <span>🚀 Launch your career</span><span className="dot">●</span>
          <span>💻 Code in the browser</span><span className="dot">●</span>
          <span>🎓 ICSE &amp; CBSE curriculum</span><span className="dot">●</span>
          <span>🤖 AI tutor 24/7</span><span className="dot">●</span>
          <span>🎙️ Live classrooms</span><span className="dot">●</span>
          <span>📝 PYQ archive</span><span className="dot">●</span>
        </div>
      </div>

      {/* FEATURES */}
      <section className="section" aria-labelledby="features-title">
        <div className="container">
          <div className="text-center mb-5">
            <span className="b-tag mb-2" style={{ display: "inline-flex" }}>EVERYTHING YOU NEED</span>
            <h2 id="features-title">One platform. <span style={{ background: "var(--yellow)", padding: "0 6px", border: "3px solid var(--black)", display: "inline-block", transform: "rotate(-1deg)" }}>Every skill.</span></h2>
            <p className="muted mt-2" style={{ maxWidth: 600, margin: "16px auto 0" }}>From your first <code>print(&quot;Hello&quot;)</code> to deploying a full-stack app — Vastavik grows with you.</p>
          </div>
          <div className="grid grid-auto">
            <article className="b-feature">
              <div className="b-feature__icon b-feature__icon--blue" aria-hidden="true">💻</div>
              <h3>In-Browser Code Editor</h3>
              <p>Syntax-highlighted editor for Java, Python, C++, JavaScript and more. Run code instantly with our Judge0 engine — no setup, no installs.</p>
            </article>
            <article className="b-feature">
              <div className="b-feature__icon b-feature__icon--pink" aria-hidden="true">🎙️</div>
              <h3>Live Classrooms</h3>
              <p>WebRTC-powered video sessions with synchronized whiteboards, raise-hand, emoji reactions, and screen share. Real teachers, real time.</p>
            </article>
            <article className="b-feature">
              <div className="b-feature__icon b-feature__icon--lime" aria-hidden="true">🤖</div>
              <h3>AI Study Assistant</h3>
              <p>Multi-model tutoring powered by Google Gemini. Ask doubts, debug code, get step-by-step explanations and never get stuck.</p>
            </article>
            <article className="b-feature">
              <div className="b-feature__icon b-feature__icon--orange" aria-hidden="true">📷</div>
              <h3>OCR Exercise Scanner</h3>
              <p>Snap a photo of any printed problem. MLKit reads it into a live editor template in seconds.</p>
            </article>
            <article className="b-feature">
              <div className="b-feature__icon b-feature__icon--purple" aria-hidden="true">📝</div>
              <h3>Quiz &amp; PYQ Archive</h3>
              <p>Timed quizzes across boards, subjects and difficulty. Previous-year question papers with instant scoring and detailed review.</p>
            </article>
            <article className="b-feature">
              <div className="b-feature__icon" aria-hidden="true">🎨</div>
              <h3>Neo-Brutalist UI</h3>
              <p>High contrast, hard shadows, bold borders. A design that makes studying feel like an adventure — not a chore.</p>
            </article>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" style={{ background: "var(--surface2)", borderTop: "3px solid var(--border)", borderBottom: "3px solid var(--border)" }} aria-labelledby="how-title">
        <div className="container">
          <div className="text-center mb-5">
            <h2 id="how-title">How it works</h2>
            <p className="muted mt-2">Three steps. Zero friction.</p>
          </div>
          <div className="grid grid-3">
            <div className="b-card text-center">
              <div className="b-avatar b-avatar--lg" style={{ background: "var(--yellow)", color: "var(--black)", margin: "0 auto" }} aria-hidden="true">1</div>
              <h3 className="mt-2">Sign up free</h3>
              <p className="muted mt-1">Create your account in under 30 seconds. Email, Google or GitHub.</p>
            </div>
            <div className="b-card text-center">
              <div className="b-avatar b-avatar--lg" style={{ background: "var(--pink)", margin: "0 auto" }} aria-hidden="true">2</div>
              <h3 className="mt-2">Pick your path</h3>
              <p className="muted mt-1">Browse courses, join a live class, or jump straight into the code editor.</p>
            </div>
            <div className="b-card text-center">
              <div className="b-avatar b-avatar--lg" style={{ background: "var(--lime)", color: "var(--black)", margin: "0 auto" }} aria-hidden="true">3</div>
              <h3 className="mt-2">Level up daily</h3>
              <p className="muted mt-1">Streaks, quizzes, certificates. Watch your skill graph climb in real-time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* COURSES PREVIEW */}
      <section className="section" aria-labelledby="featured-courses-title">
        <div className="container">
          <div className="flex justify-between items-center mb-4" style={{ flexWrap: "wrap", gap: 16 }}>
            <div>
              <span className="b-tag b-tag--purple mb-2" style={{ display: "inline-flex" }}>POPULAR</span>
              <h2 id="featured-courses-title">Featured Courses</h2>
            </div>
            <Link href="/courses" className="b-btn b-btn--ghost" aria-label="View all courses">All courses →</Link>
          </div>
          <div className="grid grid-3">
            <Link href="/courses/python" className="b-course">
              <div className="b-course__cover b-course__cover--code" aria-hidden="true">&lt;/&gt;<span className="b-tag b-course__badge">Bestseller</span></div>
              <div className="b-course__body">
                <div className="b-course__title">Python for Beginners</div>
                <div className="b-course__meta"><span>📚 24 lessons</span><span>⏱ 8h</span></div>
                <div className="b-course__progress" aria-label="Progress: 0%">
                  <div className="b-course__progress-row"><span>Progress</span><strong>0%</strong></div>
                  <div className="b-progress"><div className="b-progress__fill" style={{ width: "0%" }}></div></div>
                </div>
              </div>
            </Link>
            <Link href="/courses/fullstack" className="b-course">
              <div className="b-course__cover b-course__cover--web" aria-hidden="true">{"{ }"}</div>
              <div className="b-course__body">
                <div className="b-course__title">Full-Stack Web Dev</div>
                <div className="b-course__meta"><span>📚 38 lessons</span><span>⏱ 14h</span></div>
                <div className="b-course__progress" aria-label="Progress: 0%">
                  <div className="b-course__progress-row"><span>Progress</span><strong>0%</strong></div>
                  <div className="b-progress"><div className="b-progress__fill" style={{ width: "0%" }}></div></div>
                </div>
              </div>
            </Link>
            <Link href="/courses/ai" className="b-course">
              <div className="b-course__cover b-course__cover--ai" aria-hidden="true">🤖</div>
              <div className="b-course__body">
                <div className="b-course__title">Intro to AI &amp; ML</div>
                <div className="b-course__meta"><span>📚 30 lessons</span><span>⏱ 12h</span></div>
                <div className="b-course__progress" aria-label="Progress: 0%">
                  <div className="b-course__progress-row"><span>Progress</span><strong>0%</strong></div>
                  <div className="b-progress"><div className="b-progress__fill" style={{ width: "0%" }}></div></div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section" style={{ background: "var(--black)", color: "var(--white)", borderTop: "3px solid var(--border)", borderBottom: "3px solid var(--border)" }} aria-label="Platform statistics">
        <div className="container">
          <div className="b-stats">
            <div className="b-stat" style={{ background: "var(--yellow)", color: "var(--black)" }}><div className="b-stat__num" style={{ color: "var(--black)" }}>25K+</div><div className="b-stat__lbl" style={{ color: "var(--black)" }}>Active Learners</div></div>
            <div className="b-stat" style={{ background: "var(--pink)", color: "var(--white)" }}><div className="b-stat__num" style={{ color: "var(--white)" }}>120+</div><div className="b-stat__lbl" style={{ color: "var(--white)" }}>Coding Lessons</div></div>
            <div className="b-stat" style={{ background: "var(--lime)", color: "var(--black)" }}><div className="b-stat__num" style={{ color: "var(--black)" }}>500+</div><div className="b-stat__lbl" style={{ color: "var(--black)" }}>Quizzes Solved</div></div>
            <div className="b-stat" style={{ background: "var(--orange)", color: "var(--white)" }}><div className="b-stat__num" style={{ color: "var(--white)" }}>4.9★</div><div className="b-stat__lbl" style={{ color: "var(--white)" }}>App Rating</div></div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" aria-labelledby="testimonials-title">
        <div className="container">
          <div className="text-center mb-5">
            <h2 id="testimonials-title">Loved by students</h2>
            <p className="muted mt-2">Real reviews from real learners.</p>
          </div>
          <div className="grid grid-3">
            <blockquote className="b-card b-card--sm">
              <div className="b-tag b-tag--lime mb-2">⭐⭐⭐⭐⭐</div>
              <p>&ldquo;The Neo-Brutalist UI makes studying actually fun. I cleared my ICSE boards with 96% thanks to Vastavik.&rdquo;</p>
              <footer className="flex items-center gap-1 mt-2"><div className="b-avatar" aria-hidden="true">R</div><div><strong>Riya Sharma</strong><div className="muted" style={{ fontSize: "0.8rem" }}>Class 10 · ICSE</div></div></footer>
            </blockquote>
            <blockquote className="b-card b-card--sm">
              <div className="b-tag b-tag--lime mb-2">⭐⭐⭐⭐⭐</div>
              <p>&ldquo;The AI tutor is a game changer. It explains sorting algorithms better than my textbook.&rdquo;</p>
              <footer className="flex items-center gap-1 mt-2"><div className="b-avatar" style={{ background: "var(--pink)" }} aria-hidden="true">A</div><div><strong>Arjun Patel</strong><div className="muted" style={{ fontSize: "0.8rem" }}>B.Tech CSE · Year 2</div></div></footer>
            </blockquote>
            <blockquote className="b-card b-card--sm">
              <div className="b-tag b-tag--lime mb-2">⭐⭐⭐⭐⭐</div>
              <p>&ldquo;Live classrooms with whiteboard are unreal. Feels like being in a real classroom, but better.&rdquo;</p>
              <footer className="flex items-center gap-1 mt-2"><div className="b-avatar" style={{ background: "var(--lime)", color: "var(--black)" }} aria-hidden="true">S</div><div><strong>Sneha Verma</strong><div className="muted" style={{ fontSize: "0.8rem" }}>Class 12 · CBSE</div></div></footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: "var(--yellow)", borderTop: "3px solid var(--border)", borderBottom: "3px solid var(--border)" }} aria-labelledby="cta-title">
        <div className="container text-center">
          <h2 id="cta-title">Ready to start learning?</h2>
          <p className="mt-2 mb-3" style={{ fontSize: "1.1rem" }}>Free forever. No credit card required.</p>
          <Link href="/signup" className="b-btn b-btn--dark b-btn--xl">Create your account →</Link>
        </div>
      </section>
    </>
  );
}
