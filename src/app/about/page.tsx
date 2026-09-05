export const metadata = { title: "About — Vastavik Learning" };

const VALUES = [
  { icon: "🎯", title: "Student-first", desc: "Every feature exists because students asked for it." },
  { icon: "⚡", title: "Fast by default", desc: "Zero lag. Sub-second interactions. Always." },
  { icon: "🌍", title: "Accessible to all", desc: "Free tier for everyone. Premium at ₹199/mo. No hidden paywalls." },
  { icon: "🔓", title: "Open & honest", desc: "Plain-language policies, transparent pricing, no dark patterns." },
];

const TIMELINE = [
  { year: "2022", event: "Vastavik founded by 3 friends in a hostel room." },
  { year: "2023", event: "Launched first Android app. 1,000 students in 30 days." },
  { year: "2024", event: "Added AI tutor. 10,000 active learners." },
  { year: "2025", event: "Live classrooms launched. Crossed 25,000 students." },
  { year: "2026", event: "Vastavik Web — everything in your browser." },
];

export default function AboutPage() {
  return (
    <>
      <section className="b-page-head" style={{ background: "var(--lime)" }}>
        <div className="container">
          <span className="b-tag mb-2" style={{ display: "inline-flex" }}>🚀 OUR STORY</span>
          <h1>We&apos;re building the education we wished we had.</h1>
          <p style={{ fontSize: "1.1rem" }}>Vastavik is a small team of engineers, teachers and designers on a mission to make world-class CS education free and accessible.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-auto">
            {VALUES.map((v) => (
              <div key={v.title} className="b-feature">
                <div className="b-feature__icon b-feature__icon--lime">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface2)", borderTop: "3px solid var(--border)", borderBottom: "3px solid var(--border)" }}>
        <div className="container">
          <h2 className="text-center mb-4">Our journey</h2>
          <div className="b-cols-2">
            {TIMELINE.map((t) => (
              <div key={t.year} className="b-card b-card--sm">
                <span className="b-tag b-tag--purple" style={{ display: "inline-flex" }}>{t.year}</span>
                <p className="mt-2">{t.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="b-card b-card--lg text-center" style={{ background: "var(--yellow)" }}>
            <h2>Want to join the team?</h2>
            <p className="mt-2 mb-3" style={{ fontSize: "1.05rem" }}>We&apos;re hiring engineers, designers and educators who care about students.</p>
            <a href="/contact" className="b-btn b-btn--dark b-btn--xl">Get in touch →</a>
          </div>
        </div>
      </section>
    </>
  );
}
