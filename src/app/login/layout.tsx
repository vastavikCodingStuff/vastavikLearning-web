import type { Metadata } from "next";
import { makeMetadata } from "@/lib/metadata";

export const metadata: Metadata = makeMetadata({
  title: "Log In",
  description: "Sign in to Vastavik Learning to continue your learning journey. Access courses, live classes, quizzes and the AI tutor.",
  path: "/login",
  noindex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}