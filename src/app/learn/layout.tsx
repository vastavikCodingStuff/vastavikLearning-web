import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn & Watch Lectures | Vastavik Learning",
  description:
    "Interactive video lectures with unlisted YouTube streams, code sandbox, whiteboard diagrams, AI doubt solver, and practice exercises.",
};

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
