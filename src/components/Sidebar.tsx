"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useToast } from "./Toast";

const ITEMS = [
  { href: "/dashboard", icon: "🏠", label: "Home" },
  { href: "/courses", icon: "📚", label: "Courses" },
  { href: "/practice", icon: "💻", label: "Practice" },
  { href: "/quiz", icon: "📝", label: "Quizzes" },
  { href: "/meetings", icon: "🎙️", label: "Live Classes" },
  { href: "/ai-chat", icon: "🤖", label: "AI Tutor" },
  { href: "/pyq", icon: "📄", label: "PYQ Archive" },
  { href: "/leaderboard", icon: "🏆", label: "Leaderboard" },
  { href: "/whiteboard", icon: "🎨", label: "Whiteboard" },
  { href: "/profile", icon: "👤", label: "Profile" },
  { href: "/settings", icon: "⚙️", label: "Settings" },
];

export default function Sidebar() {
  const path = usePathname();
  const router = useRouter();
  const { clear } = useAuth();
  const toast = useToast();

  return (
    <aside className="b-dash__side" aria-label="Dashboard sidebar">
      <nav aria-label="Dashboard navigation">
        <ul className="b-dash__nav">
        {ITEMS.map((it) => (
          <li key={it.href}>
            <Link href={it.href} className={path === it.href ? "active" : ""}>
              <span>{it.icon}</span><span>{it.label}</span>
            </Link>
          </li>
        ))}
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              clear();
              toast("Logged out", "ok");
              setTimeout(() => router.push("/"), 400);
            }}
          >
            <span>🚪</span><span>Logout</span>
          </a>
        </li>
      </ul>
      </nav>
    </aside>
  );
}
