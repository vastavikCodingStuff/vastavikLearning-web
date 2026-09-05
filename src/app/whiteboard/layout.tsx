import type { Metadata } from "next";
import { makeMetadata } from "@/lib/metadata";

export const metadata: Metadata = makeMetadata({
  title: "Whiteboard — Think, Sketch, Solve",
  description:
    "Free online digital whiteboard for problem-solving, diagrams and teaching. Pen, shapes, arrows, text, colors, undo and PNG export. No signup needed.",
  path: "/whiteboard",
  keywords: [
    "online whiteboard",
    "digital whiteboard free",
    "drawing tool students",
    "diagram tool",
    "whiteboard for teaching",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}