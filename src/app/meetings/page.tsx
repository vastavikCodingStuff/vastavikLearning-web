"use client";
import { useState } from "react";
import { useToast } from "@/components/Toast";

const TILES = [
  { name: "You (Host)", initial: "Y", color: "var(--purple)" },
  { name: "Prof. Mehta", initial: "M", color: "var(--blue)" },
  { name: "Riya S.", initial: "R", color: "var(--lime)" },
  { name: "Arjun P.", initial: "A", color: "var(--pink)" },
];

const PARTICIPANTS = ["You (Host)", "Prof. Mehta", "Riya S.", "Arjun P.", "Sneha V.", "Karan M.", "Diya P.", "Vikram J."];
const MESSAGES = [
  { who: "Prof. Mehta", msg: "Good morning everyone! Today we'll cover Trees.", time: "6:01 PM" },
  { who: "You", msg: "Excited for this session! 🙌", time: "6:01 PM" },
  { who: "Riya S.", msg: "Sir, can you share the slides?", time: "6:02 PM" },
  { who: "Prof. Mehta", msg: "Yes, sharing now.", time: "6:02 PM" },
];

export default function MeetingsPage() {
  const [muted, setMuted] = useState(false);
  const [video, setVideo] = useState(true);
  const [chat, setChat] = useState([...MESSAGES]);
  const [msg, setMsg] = useState("");
  const toast = useToast();

  const send = () => {
    if (!msg.trim()) return;
    setChat([...chat, { who: "You", msg, time: "now" }]);
    setMsg("");
  };

  return (
    <>
      <section className="b-page-head" style={{ background: "var(--black)", color: "var(--white)" }}>
        <div className="container">
          <div className="flex justify-between items-center" style={{ flexWrap: "wrap", gap: 16 }}>
            <div>
              <span className="b-tag b-tag--pink mb-2" style={{ display: "inline-flex" }}>🔴 LIVE</span>
              <h1>Data Structures: Trees &amp; Graphs</h1>
              <p>with Prof. Mehta · Started 12 min ago · 8 participants</p>
            </div>
            <div className="flex gap-2 items-center">
              <span className="b-quiz__timer">⏱ 00:48:22</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="b-meet">
            <div className="b-meet__stage">
              {TILES.map((t) => (
                <div key={t.name} className="b-meet__tile">
                  {video ? (
                    <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${t.color}, var(--black))`, display: "grid", placeItems: "center", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900 }}>{t.initial}</div>
                  ) : (
                    <div style={{ fontSize: "2rem" }}>📷❌</div>
                  )}
                  <div className="b-meet__tile-name">{t.name}</div>
                </div>
              ))}
            </div>

            <div className="b-meet__side">
              <div className="b-meet__panel">
                <div className="b-meet__panel-head">💬 Live Chat</div>
                <div className="b-meet__panel-body" style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 280, overflowY: "auto" }}>
                  {chat.map((m, i) => (
                    <div key={i} style={{ fontSize: "0.85rem" }}>
                      <strong style={{ color: m.who === "You" ? "var(--blue)" : "var(--text)" }}>{m.who}:</strong> <span>{m.msg}</span>
                      <div className="muted" style={{ fontSize: "0.7rem" }}>{m.time}</div>
                    </div>
                  ))}
                </div>
                <div className="b-chat__foot">
                  <input className="b-input" placeholder="Type a message..." value={msg} onChange={(e) => setMsg(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} style={{ boxShadow: "none", flex: 1 }} />
                  <button className="b-btn b-btn--primary b-btn--sm" onClick={send}>Send</button>
                </div>
              </div>

              <div className="b-meet__panel">
                <div className="b-meet__panel-head">👥 Participants ({PARTICIPANTS.length})</div>
                <div className="b-meet__panel-body">
                  {PARTICIPANTS.map((p) => (
                    <div key={p} className="flex items-center gap-1 mb-1">
                      <div className="b-avatar" style={{ width: 28, height: 28, fontSize: "0.7rem" }}>{p[0]}</div>
                      <span style={{ fontSize: "0.85rem" }}>{p}</span>
                      {p === "You (Host)" && <span className="b-tag" style={{ marginLeft: "auto", fontSize: "0.6rem" }}>HOST</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="b-meet__ctrl">
            <button className={"b-meet__btn" + (muted ? " b-meet__btn--mute" : "")} onClick={() => { setMuted(!muted); toast(muted ? "Unmuted" : "Muted", "ok"); }} title="Toggle mic">{muted ? "🔇" : "🎙"}</button>
            <button className={"b-meet__btn" + (!video ? " b-meet__btn--mute" : "")} onClick={() => { setVideo(!video); toast(video ? "Camera off" : "Camera on", "ok"); }} title="Toggle camera">{video ? "📷" : "📷❌"}</button>
            <button className="b-meet__btn" onClick={() => toast("Screen share started", "ok")} title="Share screen">🖥</button>
            <button className="b-meet__btn" onClick={() => toast("Hand raised", "ok")} title="Raise hand">✋</button>
            <button className="b-meet__btn" onClick={() => toast("Whiteboard opened", "ok")} title="Whiteboard">🎨</button>
            <button className="b-meet__btn" onClick={() => toast("Chat opened", "ok")} title="Chat">💬</button>
            <button className="b-meet__btn" onClick={() => toast("Recording started", "ok")} title="Record">⏺</button>
            <button className="b-meet__btn b-meet__btn--end" onClick={() => toast("Left the meeting", "err")} title="Leave">📞</button>
          </div>
        </div>
      </section>
    </>
  );
}
