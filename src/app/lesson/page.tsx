"use client";
import { useState } from "react";
import Link from "next/link";
import { useToast } from "@/components/Toast";

const STARTER = `name = "Your name"
age = 18
print(f"Hi, I'm {name} and I'm {age} years old.")`;

export default function LessonPage() {
  const [code, setCode] = useState(STARTER);
  const [out, setOut] = useState("// Output will appear here");
  const toast = useToast();

  const run = () => {
    const lines = code.split("\n");
    const outLines: string[] = [];
    for (const l of lines) {
      const m = l.match(/print\((.*?)\)/);
      if (m) {
        let v = m[1].trim();
        if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
        if (v.startsWith('f"') || v.startsWith("f'")) {
          v = v.slice(2, -1).replace(/\{(\w+)\}/g, (_m, name) => {
            const re = new RegExp(`${name}\\s*=\\s*["']?([^"'\n]+)["']?`);
            return (code.match(re) || [])[1] || _m;
          });
        }
        outLines.push(v);
      }
    }
    setOut(outLines.length ? outLines.join("\n") : "// No print() output");
    toast("Code executed", "ok");
  };

  return (
    <>
      <section className="b-page-head b-page-head--blue">
        <div className="container">
          <div className="flex gap-1 mb-2">
            <Link href="/courses/python" style={{ color: "var(--white)", opacity: 0.8 }}>← Back to course</Link>
          </div>
          <h1>Lesson 4: Variables &amp; Data Types</h1>
          <p>Python for Beginners · Module 1: Getting Started · 22 min</p>
          <div className="b-progress mt-2" style={{ maxWidth: 400 }}><div className="b-progress__fill" style={{ width: "14%" }}></div></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="b-cols-sidebar">
            <article>
              <div className="b-card b-card--sm mb-3" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ background: "var(--black)", aspectRatio: "16/9", display: "grid", placeItems: "center", color: "var(--white)", position: "relative" }}>
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  <div style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(0,0,0,0.7)", padding: "4px 10px", borderRadius: 6, fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>12:04 / 22:18</div>
                </div>
              </div>

              <h2>What you&apos;ll learn</h2>
              <p>Variables are the building blocks of every program. In this lesson, you&apos;ll learn how Python stores data, the different data types, and how to use them in your code.</p>

              <h3 className="mt-3">1. What is a variable?</h3>
              <p>A variable is a name that refers to a value stored in memory. Think of it like a labeled box where you can put data.</p>
              <div className="b-code mt-2">
                <div className="b-code__bar"><span className="b-code__dot b-code__dot--r"></span><span className="b-code__dot b-code__dot--y"></span><span className="b-code__dot b-code__dot--g"></span><span style={{ marginLeft: 8 }}>main.py</span></div>
                <pre className="b-code__editor">{`name = "Vastavik"
age = 5
is_active = True

print(name)
print(age)
print(is_active)`}</pre>
              </div>

              <h3 className="mt-3">2. Data Types</h3>
              <p>Python has several built-in data types. Here are the most common:</p>
              <div className="b-card b-card--sm mt-2">
                <table className="mono" style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ textAlign: "left", borderBottom: "3px solid var(--border)" }}><th style={{ padding: 8 }}>Type</th><th>Example</th></tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "2px solid var(--surface2)" }}><td style={{ padding: 8 }}><code>str</code></td><td><code>&quot;hello&quot;</code></td></tr>
                    <tr style={{ borderBottom: "2px solid var(--surface2)" }}><td style={{ padding: 8 }}><code>int</code></td><td><code>42</code></td></tr>
                    <tr style={{ borderBottom: "2px solid var(--surface2)" }}><td style={{ padding: 8 }}><code>float</code></td><td><code>3.14</code></td></tr>
                    <tr><td style={{ padding: 8 }}><code>bool</code></td><td><code>True</code> / <code>False</code></td></tr>
                  </tbody>
                </table>
              </div>

              <div className="b-alert b-alert--info mt-3">
                <span>💡</span>
                <span><strong>Tip:</strong> Use <code>type(x)</code> to check the data type of any variable.</span>
              </div>

              <h3 className="mt-3">3. Try it yourself</h3>
              <p>Edit the code below and click <strong>Run</strong> to see the output.</p>
              <div className="b-code mt-2">
                <div className="b-code__bar"><span className="b-code__dot b-code__dot--r"></span><span className="b-code__dot b-code__dot--y"></span><span className="b-code__dot b-code__dot--g"></span><span style={{ marginLeft: 8 }}>sandbox.py</span></div>
                <textarea className="b-code__editor" value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false}></textarea>
                <div className="b-code__output">{out}</div>
              </div>
              <div className="flex gap-1 mt-2" style={{ flexWrap: "wrap" }}>
                <button className="b-btn b-btn--primary" onClick={run}>▶ Run</button>
                <button className="b-btn b-btn--ghost" onClick={() => { setCode(STARTER); setOut("// Output will appear here"); }}>↺ Reset</button>
                <button className="b-btn b-btn--ghost" onClick={() => toast("Saved to your notes", "ok")}>📌 Save</button>
              </div>

              <hr className="b-divider" />
              <div className="flex justify-between" style={{ flexWrap: "wrap", gap: 8 }}>
                <Link href="/lesson" className="b-btn b-btn--ghost">← Previous</Link>
                <Link href="/lesson" className="b-btn b-btn--primary">Next Lesson →</Link>
              </div>
            </article>

            <aside>
              <div className="b-card">
                <h3>📋 Course Outline</h3>
                <ol style={{ listStyle: "none", padding: 0, marginTop: 16, display: "flex", flexDirection: "column", gap: 4 }}>
                  {[
                    { n: 1, title: "Installing Python", done: true },
                    { n: 2, title: "First Program", done: true },
                    { n: 3, title: "Operators", done: true },
                    { n: 4, title: "Variables & Data Types", current: true },
                    { n: 5, title: "Module 1 Quiz" },
                  ].map((it) => (
                    <li key={it.n} className="b-card b-card--sm" style={{ padding: "8px 12px", display: "flex", alignItems: "center", gap: 8, boxShadow: it.current ? "4px 4px 0 var(--border)" : "none", borderColor: it.done ? "var(--lime)" : "var(--border)", background: it.current ? "var(--yellow)" : "var(--surface)" }}>
                      <span className={"b-tag" + (it.done ? " b-tag--lime" : "")} style={{ minWidth: 24, padding: "2px 6px", fontSize: "0.7rem" }}>{it.done ? "✓" : it.n}</span>
                      <strong style={{ fontSize: "0.9rem" }}>{it.title}</strong>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="b-card b-card--lime mt-3">
                <h3>💬 Need help?</h3>
                <p style={{ fontSize: "0.9rem" }}>Stuck? Ask the AI tutor — it&apos;s instant, free and 24/7.</p>
                <Link href="/ai-chat" className="b-btn b-btn--dark b-btn--block b-btn--sm mt-2">Ask AI Tutor →</Link>
              </div>
              <div className="b-card mt-3">
                <h3>📎 Lesson Resources</h3>
                <ul style={{ listStyle: "none", padding: 0, marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                  <li>📄 <a href="#">Lesson notes (PDF)</a></li>
                  <li>📦 <a href="#">Starter code (ZIP)</a></li>
                  <li>📝 <a href="#">Practice problems</a></li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
