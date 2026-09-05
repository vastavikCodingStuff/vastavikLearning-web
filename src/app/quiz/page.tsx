"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useToast } from "@/components/Toast";

type Q = { q: string; options: string[]; correct: number; explain: string };
const QUIZ: Q[] = [
  { q: "Which of the following is a Python data type?", options: ["int", "float", "str", "All of the above"], correct: 3, explain: "Python has int, float, str, bool, list, dict, set, tuple, and more." },
  { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"], correct: 0, explain: "HTML = Hyper Text Markup Language, the standard markup language for web pages." },
  { q: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correct: 1, explain: "Binary search halves the search space each step → O(log n)." },
  { q: "Which SQL clause is used to filter rows?", options: ["ORDER BY", "GROUP BY", "WHERE", "JOIN"], correct: 2, explain: "WHERE filters rows before grouping. HAVING filters after grouping." },
  { q: "What does CSS stand for?", options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"], correct: 1, explain: "CSS = Cascading Style Sheets. The cascade is its core principle." },
  { q: "In Big-O, what does O(1) mean?", options: ["Linear time", "Constant time", "Quadratic time", "Logarithmic time"], correct: 1, explain: "O(1) means the operation takes constant time regardless of input size." },
  { q: "Which language is primarily used for Android development?", options: ["Swift", "Kotlin", "Ruby", "PHP"], correct: 1, explain: "Kotlin is Google's preferred language for modern Android development." },
  { q: "What does API stand for?", options: ["Application Programming Interface", "Applied Program Interface", "Application Process Integration", "Advanced Programming Interface"], correct: 0, explain: "API = Application Programming Interface. It defines how software components interact." },
  { q: "Which sorting algorithm is stable?", options: ["Quicksort", "Heapsort", "Merge sort", "Selection sort"], correct: 2, explain: "Merge sort preserves the relative order of equal elements, making it stable." },
  { q: "What is the default port for HTTPS?", options: ["80", "443", "8080", "3000"], correct: 1, explain: "HTTPS uses port 443. HTTP uses 80." },
];

export default function QuizPage() {
  const [i, setI] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [show, setShow] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [time, setTime] = useState(60 * 10);
  const toast = useToast();

  useEffect(() => {
    if (done) return;
    const t = setInterval(() => {
      setTime((x) => {
        if (x <= 1) { clearInterval(t); setDone(true); return 0; }
        return x - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [done]);

  const choose = (idx: number) => {
    if (show) return;
    setSelected(idx);
    setShow(true);
    if (idx === QUIZ[i].correct) { setScore(score + 1); toast("Correct! 🎉", "ok"); } else { toast("Wrong answer", "err"); }
  };

  const next = () => {
    if (i + 1 >= QUIZ.length) { setDone(true); return; }
    setI(i + 1); setSelected(null); setShow(false);
  };

  const reset = () => { setI(0); setSelected(null); setShow(false); setScore(0); setDone(false); setTime(600); };
  const mm = String(Math.floor(time / 60)).padStart(2, "0");
  const ss = String(time % 60).padStart(2, "0");

  if (done) {
    const pct = Math.round((score / QUIZ.length) * 100);
    return (
      <>
        <section className="b-page-head b-page-head--lime">
          <div className="container"><h1>Quiz Complete!</h1><p>You scored {score} out of {QUIZ.length}.</p></div>
        </section>
        <section className="section">
          <div className="container">
            <div className="b-quiz">
              <div className="b-card b-card--lg text-center">
                <div className="b-avatar b-avatar--xl" style={{ background: pct >= 80 ? "var(--lime)" : pct >= 50 ? "var(--yellow)" : "var(--pink)", color: pct >= 80 ? "var(--black)" : pct >= 50 ? "var(--black)" : "var(--white)", margin: "0 auto" }}>{pct}%</div>
                <h2 className="mt-3">{pct >= 80 ? "🏆 Excellent!" : pct >= 50 ? "👍 Good job!" : "📚 Keep practicing"}</h2>
                <p className="muted mt-2">You answered {score} out of {QUIZ.length} questions correctly.</p>
                <div className="flex gap-1 justify-center mt-3" style={{ flexWrap: "wrap" }}>
                  <button className="b-btn b-btn--primary b-btn--lg" onClick={reset}>Try again →</button>
                  <Link href="/leaderboard" className="b-btn b-btn--ghost b-btn--lg">View leaderboard</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  const q = QUIZ[i];
  return (
    <>
      <section className="b-page-head b-page-head--purple">
        <div className="container">
          <span className="b-tag mb-2" style={{ display: "inline-flex", background: "var(--yellow)", color: "var(--black)" }}>📝 QUIZ MODE</span>
          <h1>CS Fundamentals</h1>
          <p>Test your knowledge of programming, databases, and computer science basics.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="b-quiz">
            <div className="b-quiz__progress">
              <span>Question {i + 1} of {QUIZ.length}</span>
              <span className="b-quiz__timer">⏱ {mm}:{ss}</span>
            </div>
            <div className="b-progress mb-3"><div className="b-progress__fill" style={{ width: `${((i + 1) / QUIZ.length) * 100}%` }}></div></div>

            <div className="b-quiz__q">
              <div className="b-quiz__q-num">Question {i + 1}</div>
              <div className="b-quiz__q-text">{q.q}</div>
              {q.options.map((opt, idx) => {
                const cls = !show
                  ? ""
                  : idx === q.correct
                  ? " b-quiz__opt--correct"
                  : selected === idx
                  ? " b-quiz__opt--wrong"
                  : "";
                return (
                  <button key={idx} className={"b-quiz__opt" + cls} onClick={() => choose(idx)}>
                    <span className="b-quiz__opt-letter">{String.fromCharCode(65 + idx)}</span>
                    <span>{opt}</span>
                  </button>
                );
              })}
              {show && (
                <div className="b-alert b-alert--info mt-3">
                  <span>💡</span>
                  <span><strong>Explanation:</strong> {q.explain}</span>
                </div>
              )}
              {show && (
                <button className="b-btn b-btn--primary b-btn--block b-btn--lg mt-3" onClick={next}>
                  {i + 1 >= QUIZ.length ? "Finish quiz →" : "Next question →"}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
