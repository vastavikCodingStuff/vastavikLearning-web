import type { Metadata } from "next";
import { makeMetadata } from "@/lib/metadata";

export const metadata: Metadata = makeMetadata({
  title: "Lesson: Variables & Data Types — Python for Beginners",
  description:
    "Learn Python variables and data types with an interactive video lesson, code examples and a live sandbox editor. Part of Python for Beginners — Module 1.",
  path: "/lesson",
  keywords: [
    "Python variables tutorial",
    "Python data types",
    "learn Python beginners",
    "Python lesson online",
    "Python sandbox",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}