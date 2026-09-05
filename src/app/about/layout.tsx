import type { Metadata } from "next";
import { makeMetadata } from "@/lib/metadata";

export const metadata: Metadata = makeMetadata({
  title: "About Us — Our Story & Mission",
  description:
    "Vastavik Learning was founded to make world-class computer science education free and accessible. Meet the team, our values, and the journey from hostel room to 25,000+ learners.",
  path: "/about",
  keywords: [
    "about Vastavik Learning",
    "Vastavik team",
    "education startup India",
    "mission free education",
    "computer science education",
  ],
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}