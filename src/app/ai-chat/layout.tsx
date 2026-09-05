import type { Metadata } from "next";
import { makeMetadata } from "@/lib/metadata";

export const metadata: Metadata = makeMetadata({
  title: "AI Tutor — Ask Anything, Learn Instantly | Powered by Gemini",
  description:
    "Get instant help from the Vastavik AI Tutor. Explain recursion, debug code, master SQL JOINs and more. Context-aware across your courses. Available 24/7.",
  path: "/ai-chat",
  keywords: [
    "AI tutor",
    "AI study assistant",
    "Gemini AI tutor",
    "ask coding questions",
    "debug code AI",
    "AI teacher India",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}