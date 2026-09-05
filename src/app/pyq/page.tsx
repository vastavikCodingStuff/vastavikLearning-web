"use client";
import { useState } from "react";

const PAPERS = [
  { year: 2025, board: "ICSE", subject: "Computer Applications", class: 10, solved: 1842 },
  { year: 2024, board: "ICSE", subject: "Computer Applications", class: 10, solved: 2104 },
  { year: 2023, board: "ICSE", subject: "Computer Applications", class: 10, solved: 1654 },
  { year: 2025, board: "CBSE", subject: "Computer Science", class: 12, solved: 3201 },
  { year: 2024, board: "CBSE", subject: "Computer Science", class: 12, solved: 2987 },
  { year: 2025, board: "CBSE", subject: "Informatics Practices", class: 12, solved: 2118 },
  { year: 2024, board: "GATE", subject: "CSE", class: 0, solved: 512 },
  { year: 2025, board: "NTA", subject: "CUET - Computer Science", class: 12, solved: 1854 },
];

export default function PyqPage() {
  const [board, setBoard] = useState("");
  const [year, setYear] = useState("");
  const filtered = PAPERS.filter((p) => (!board || p.board === board) && (!year || String(p.year) === year));

  return (
    <>
      <section className="b-page-head b-page-head--lime">
        <div className="container">
          <span className="b-tag mb-2" style={{ display: "inline-flex" }}>📄 PYQ ARCHIVE</span>
          <h1>Previous Year Questions</h1>
          <p>Practice with actual papers. Filter by board, year, and subject.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="b-card mb-3">
            <div className="grid grid-3">
              <select className="b-input" value={board} onChange={(e) => setBoard(e.target.value)}>
                <option value="">All boards</option>
                <option>ICSE</option><option>CBSE</option><option>GATE</option><option>NTA</option>
              </select>
              <select className="b-input" value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="">All years</option>
                {[2025, 2024, 2023].map((y) => <option key={y}>{y}</option>)}
              </select>
              <input className="b-input" placeholder="Search subject..." />
            </div>
          </div>

          <div className="grid grid-auto">
            {filtered.map((p, i) => (
              <a key={i} href="#" className="b-card b-card--hover" style={{ display: "block" }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="b-tag b-tag--blue">{p.board}</span>
                  <span className="muted" style={{ fontSize: "0.85rem" }}>{p.year}</span>
                </div>
                <h3>{p.subject}</h3>
                {p.class > 0 && <p className="muted" style={{ fontSize: "0.9rem" }}>Class {p.class}</p>}
                <p className="mt-2" style={{ fontSize: "0.85rem" }}>📊 {p.solved.toLocaleString()} students solved this</p>
                <button className="b-btn b-btn--primary b-btn--block b-btn--sm mt-2">Start Paper →</button>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
