import type { Metadata } from "next";
import { makeMetadata } from "@/lib/metadata";

export const metadata: Metadata = makeMetadata({
  title: "Practice — In-Browser Code Editor with Instant Execution",
  description:
    "Write and run Python, JavaScript, Java, C++, C and SQL in your browser. Classic problems: FizzBuzz, palindrome, Fibonacci, sorting and more. No setup needed.",
  path: "/practice",
  keywords: [
    "online code editor",
    "practice coding online",
    "Python compiler online",
    "JavaScript playground",
    "run code in browser",
    "coding practice problems",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}