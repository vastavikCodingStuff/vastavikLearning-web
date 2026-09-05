"use client";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/components/Toast";

const COLORS = ["#000000", "#FF2D78", "#2563EB", "#00FF66", "#FF6600", "#9933FF", "#FFE500", "#FFFFFF"];
const TOOLS = [
  { id: "pen", icon: "✏", label: "Pen" },
  { id: "rect", icon: "▭", label: "Rectangle" },
  { id: "ellipse", icon: "⬭", label: "Ellipse" },
  { id: "line", icon: "╱", label: "Line" },
  { id: "arrow", icon: "→", label: "Arrow" },
  { id: "text", icon: "T", label: "Text" },
  { id: "eraser", icon: "⌫", label: "Eraser" },
];

type Shape = { kind: string; color: string; x1: number; y1: number; x2: number; y2: number };

export default function WhiteboardPage() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState("pen");
  const [color, setColor] = useState("#000000");
  const [shapes, setShapes] = useState<Shape[]>([]);
  const drawing = useRef<{ x: number; y: number } | null>(null);
  const toast = useToast();

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = c.getBoundingClientRect();
    c.width = rect.width * dpr;
    c.height = rect.height * dpr;
    const ctx = c.getContext("2d")!;
    ctx.scale(dpr, dpr);
    redraw();
  }, [shapes, color, tool]);

  const redraw = () => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const rect = c.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, rect.width, rect.height);
    for (const s of shapes) drawShape(ctx, s);
  };

  const drawShape = (ctx: CanvasRenderingContext2D, s: Shape) => {
    ctx.strokeStyle = s.color;
    ctx.fillStyle = s.color;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    if (s.kind === "pen") {
      // For pen, we'll just render as a line from x1,y1 to x2,y2 (simplified)
      ctx.beginPath();
      ctx.moveTo(s.x1, s.y1);
      ctx.lineTo(s.x2, s.y2);
      ctx.stroke();
    } else if (s.kind === "rect") {
      ctx.strokeRect(Math.min(s.x1, s.x2), Math.min(s.y1, s.y2), Math.abs(s.x2 - s.x1), Math.abs(s.y2 - s.y1));
    } else if (s.kind === "ellipse") {
      ctx.beginPath();
      ctx.ellipse((s.x1 + s.x2) / 2, (s.y1 + s.y2) / 2, Math.abs(s.x2 - s.x1) / 2, Math.abs(s.y2 - s.y1) / 2, 0, 0, Math.PI * 2);
      ctx.stroke();
    } else if (s.kind === "line" || s.kind === "arrow") {
      ctx.beginPath();
      ctx.moveTo(s.x1, s.y1);
      ctx.lineTo(s.x2, s.y2);
      ctx.stroke();
      if (s.kind === "arrow") {
        const angle = Math.atan2(s.y2 - s.y1, s.x2 - s.x1);
        const head = 14;
        ctx.beginPath();
        ctx.moveTo(s.x2, s.y2);
        ctx.lineTo(s.x2 - head * Math.cos(angle - Math.PI / 6), s.y2 - head * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(s.x2 - head * Math.cos(angle + Math.PI / 6), s.y2 - head * Math.sin(angle + Math.PI / 6));
        ctx.closePath();
        ctx.fill();
      }
    } else if (s.kind === "text") {
      ctx.font = "20px Space Grotesk, sans-serif";
      ctx.fillText("Text", s.x1, s.y1);
    }
  };

  const pos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = ref.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const down = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const p = pos(e);
    drawing.current = p;
    if (tool === "text") {
      setShapes([...shapes, { kind: "text", color, x1: p.x, y1: p.y, x2: p.x, y2: p.y }]);
    }
  };
  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const p = pos(e);
    if (tool === "pen") {
      setShapes((s) => [...s, { kind: "pen", color, x1: drawing.current!.x, y1: drawing.current!.y, x2: p.x, y2: p.y }]);
    } else {
      // preview by replacing last
      setShapes((s) => {
        const next = [...s];
        next[next.length - 1] = { kind: tool, color, x1: drawing.current!.x, y1: drawing.current!.y, x2: p.x, y2: p.y };
        return next;
      });
    }
    drawing.current = p;
  };
  const up = () => { drawing.current = null; };

  const clear = () => { setShapes([]); toast("Whiteboard cleared", "ok"); };
  const undo = () => { setShapes((s) => s.slice(0, -1)); };
  const download = () => {
    const c = ref.current; if (!c) return;
    const a = document.createElement("a");
    a.href = c.toDataURL("image/png");
    a.download = "whiteboard.png";
    a.click();
    toast("Saved as PNG", "ok");
  };

  return (
    <>
      <section className="b-page-head b-page-head--lime">
        <div className="container">
          <span className="b-tag mb-2" style={{ display: "inline-flex" }}>🎨 WHITEBOARD</span>
          <h1>Think. Sketch. Solve.</h1>
          <p>A digital whiteboard for problem-solving, diagrams, and live teaching.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="b-board">
            <div className="b-board__bar">
              {TOOLS.map((t) => (
                <button key={t.id} className={"b-board__tool" + (tool === t.id ? " b-board__tool--active" : "")} title={t.label} onClick={() => setTool(t.id)}>{t.icon}</button>
              ))}
              <div style={{ width: 1, height: 32, background: "var(--border)", margin: "0 8px" }}></div>
              {COLORS.map((c) => (
                <button key={c} className={"b-board__color" + (color === c ? " b-board__color--active" : "")} style={{ background: c }} onClick={() => setColor(c)}></button>
              ))}
              <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                <button className="b-btn b-btn--ghost b-btn--sm" onClick={undo}>↺ Undo</button>
                <button className="b-btn b-btn--ghost b-btn--sm" onClick={clear}>🗑 Clear</button>
                <button className="b-btn b-btn--primary b-btn--sm" onClick={download}>💾 Save PNG</button>
              </div>
            </div>
            <canvas
              ref={ref}
              className="b-board__canvas"
              onPointerDown={down}
              onPointerMove={move}
              onPointerUp={up}
              onPointerLeave={up}
            />
          </div>

          <div className="grid grid-3 mt-3">
            <div className="b-card b-card--sm">
              <strong>✏ Pen tool</strong>
              <p className="muted mt-1" style={{ fontSize: "0.9rem" }}>Free-hand drawing. Adjust color from the palette above.</p>
            </div>
            <div className="b-card b-card--sm">
              <strong>▭ Shapes</strong>
              <p className="muted mt-1" style={{ fontSize: "0.9rem" }}>Drag to draw rectangles, ellipses, lines and arrows.</p>
            </div>
            <div className="b-card b-card--sm">
              <strong>💾 Export</strong>
              <p className="muted mt-1" style={{ fontSize: "0.9rem" }}>Download your board as a PNG to share or save.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
