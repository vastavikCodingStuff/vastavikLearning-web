import type { Metadata } from "next";
import { makeMetadata } from "@/lib/metadata";

export const metadata: Metadata = makeMetadata({
  title: "Leaderboard — Top Learners This Week",
  description:
    "See the top Vastavik Learning students ranked by XP. Compete with 25,000+ learners, climb the ranks and earn bragging rights.",
  path: "/leaderboard",
  keywords: ["leaderboard", "top learners", "XP ranking", "coding competition India"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}