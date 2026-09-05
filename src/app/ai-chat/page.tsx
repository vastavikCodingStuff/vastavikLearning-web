"use client";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/components/Toast";

type Msg = { role: "user" | "ai"; text: string };

const SEED: Msg[] = [
  { role: "ai", text: "Hi! I'm your AI study tutor. I can help you with Python, JavaScript, DSA, SQL, ML — anything. What would you like to learn today?" },
];

const SUGGESTIONS = [
  "Explain recursion with examples",
  "How does binary search work?",
  "What's the difference between SQL JOINs?",
  "Help me debug my Python code",
];

export default function AiChatPage() {
  const [msgs, setMsgs] = useState<Msg[]>(SEED);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  const send = (text?: string) => {
    const t = (text ?? input).trim();
    if (!t) return;
    setMsgs([...msgs, { role: "user", text: t }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply: Msg = {
        role: "ai",
        text: replyFor(t),
      };
      setMsgs((m) => [...m, reply]);
      setTyping(false);
    }, 900 + Math.random() * 700);
  };

  return (
    <>
      <section className="b-page-head b-page-head--purple">
        <div className="container">
          <span className="b-tag mb-2" style={{ display: "inline-flex", background: "var(--yellow)", color: "var(--black)" }}>🤖 AI TUTOR</span>
          <h1>Ask anything. Learn instantly.</h1>
          <p>Powered by Google Gemini 3 · Available 24/7 · Context-aware across your courses.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid" style={{ gridTemplateColumns: "1fr 280px", gap: 24 }}>
            <div className="b-chat">
              <div className="b-chat__head">
                <div className="flex items-center gap-1">
                  <div className="b-avatar" style={{ width: 32, height: 32, fontSize: "0.9rem", background: "var(--lime)", color: "var(--black)" }}>AI</div>
                  <div>
                    <strong>Vastavik AI</strong>
                    <div style={{ fontSize: "0.75rem", opacity: 0.85 }}>● Online · Average reply 1.2s</div>
                  </div>
                </div>
                <button className="b-btn b-btn--sm" style={{ background: "var(--white)", color: "var(--black)" }} onClick={() => toast("Chat cleared", "ok")}>🗑 Clear</button>
              </div>
              <div className="b-chat__body" ref={bodyRef}>
                {msgs.map((m, i) => (
                  <div key={i} className={"b-msg " + (m.role === "user" ? "b-msg--user" : "b-msg--ai")}>
                    {m.text.split("\n").map((line, j) => <div key={j}>{line}</div>)}
                  </div>
                ))}
                {typing && <div className="b-msg b-msg--ai b-msg--typing">Vastavik AI is typing…</div>}
              </div>
              <div className="b-chat__foot">
                <input className="b-input" placeholder="Ask anything…" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} />
                <button className="b-btn b-btn--primary" onClick={() => send()}>Send</button>
              </div>
            </div>

            <aside>
              <div className="b-card mb-3">
                <h3>💡 Try asking</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
                  {SUGGESTIONS.map((s) => (
                    <button key={s} className="b-btn b-btn--ghost b-btn--sm" style={{ justifyContent: "flex-start" }} onClick={() => send(s)}>{s}</button>
                  ))}
                </div>
              </div>
              <div className="b-card b-card--lime">
                <h3>🎯 Smart features</h3>
                <ul style={{ paddingLeft: 20, fontSize: "0.9rem", marginTop: 8 }}>
                  <li>Remembers your courses</li>
                  <li>Explains code line-by-line</li>
                  <li>Generates practice problems</li>
                  <li>Quiz mode on demand</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

function replyFor(q: string): string {
  const lower = q.toLowerCase();
  if (lower.includes("recursion")) return "Recursion is when a function calls itself. Classic example:\n\nfactorial(n) = n * factorial(n-1)\nfactorial(0) = 1\n\nIn Python:\n\ndef fact(n):\n    if n <= 1: return 1\n    return n * fact(n-1)\n\nThree rules: 1) base case, 2) recursive case, 3) progress toward the base case. Want me to walk through the call stack for fact(5)?";
  if (lower.includes("binary search")) return "Binary search finds a target in a sorted array in O(log n) by repeatedly halving the search space:\n\n1. Look at the middle element\n2. If equal → done\n3. If target < mid → search left half\n4. If target > mid → search right half\n\nCode (Python):\n\ndef bsearch(arr, t):\n    lo, hi = 0, len(arr) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if arr[mid] == t: return mid\n        if arr[mid] < t: lo = mid + 1\n        else: hi = mid - 1\n    return -1";
  if (lower.includes("join")) return "SQL JOINs combine rows from two tables:\n\n• INNER JOIN — only matching rows\n• LEFT JOIN — all from left + matches from right\n• RIGHT JOIN — all from right + matches from left\n• FULL OUTER JOIN — everything from both\n\nExample:\n\nSELECT u.name, o.total\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\n\nWant a diagram or more examples?";
  if (lower.includes("debug")) return "Sure! Share your code and the error message. I'll walk through it line by line and explain what's going wrong.";
  return "Great question! Let me think about that...\n\nBased on what you've asked, here's a clear breakdown. The key idea is to break complex problems into smaller, manageable parts. Want me to dive deeper into any specific aspect, or generate a practice problem for you?";
}
