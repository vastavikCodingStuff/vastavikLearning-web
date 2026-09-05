import type { Metadata } from "next";
import { makeMetadata } from "@/lib/metadata";

export const metadata: Metadata = makeMetadata({
  title: "Courses — Learn Python, Web Dev, AI/ML, SQL & More",
  description:
    "Browse 120+ interactive computer science courses: Python, JavaScript, Full-Stack Web Dev, AI & ML, SQL & Databases, Android with Kotlin, C Programming, Cybersecurity. Free to start.",
  path: "/courses",
  keywords: [
    "online coding courses",
    "Python course India",
    "web development course",
    "AI ML course",
    "SQL course",
    "Android Kotlin course",
    "free programming courses",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}