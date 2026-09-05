import type { Metadata } from "next";
import { makeMetadata } from "@/lib/metadata";

export const metadata: Metadata = makeMetadata({
  title: "PYQ Archive — Previous Year Question Papers ICSE, CBSE, GATE",
  description:
    "Practice with actual previous year question papers. ICSE Computer Applications, CBSE Computer Science, GATE CSE, CUET — filter by board, year and subject. Free access.",
  path: "/pyq",
  keywords: [
    "PYQ",
    "previous year question papers",
    "ICSE computer applications PYQ",
    "CBSE computer science PYQ",
    "GATE CSE previous papers",
    "CUET computer science",
    "class 10 ICSE PYQ",
    "class 12 CBSE PYQ",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}