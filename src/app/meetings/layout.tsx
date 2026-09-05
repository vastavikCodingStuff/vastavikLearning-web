import type { Metadata } from "next";
import { makeMetadata } from "@/lib/metadata";

export const metadata: Metadata = makeMetadata({
  title: "Live Classrooms — Real-Time Classes with Whiteboard",
  description:
    "Join live WebRTC classrooms with synchronized whiteboards, raise-hand, emoji reactions and screen share. Real teachers, real time, real learning.",
  path: "/meetings",
  keywords: [
    "live online classes",
    "live coding classroom",
    "WebRTC classroom",
    "online tuition India",
    "interactive live learning",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}