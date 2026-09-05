import type { Metadata } from "next";
import { makeMetadata } from "@/lib/metadata";

export const metadata: Metadata = makeMetadata({
  title: "Quiz — Test Your CS Fundamentals",
  description:
    "Take timed quizzes on programming, databases, web development and computer science fundamentals. Instant scoring, detailed explanations, and XP rewards.",
  path: "/quiz",
  keywords: [
    "programming quiz",
    "CS quiz online",
    "computer science quiz India",
    "SQL quiz",
    "Python quiz",
    "coding assessment",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}