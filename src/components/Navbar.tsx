"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
  { href: "/practice", label: "Practice" },
  { href: "/quiz", label: "Quiz" },
  { href: "/meetings", label: "Live" },
  { href: "/ai-chat", label: "AI Tutor" },
  { href: "/pricing", label: "Pricing" },
];

const MOBILE_NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
  { href: "/practice", label: "Practice" },
  { href: "/quiz", label: "Quiz" },
  { href: "/meetings", label: "Live Classes" },
  { href: "/ai-chat", label: "AI Tutor" },
  { href: "/whiteboard", label: "Whiteboard" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/pyq", label: "PYQ Archive" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const initial = (user?.name || user?.email || "U").charAt(0).toUpperCase();

  // Lock body scroll when menu open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Esc
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open]);

  const here = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <>
      <header className="b-nav">
        <div className="container b-nav__inner">
          <Link href="/" className="b-nav__brand">
            <div className="b-nav__logo">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l-6-6 6-6" /><path d="M15 6l6 6-6 6" />
              </svg>
            </div>
            <span>Vastavik Learning</span>
          </Link>

          <nav>
            <ul className="b-nav__links">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={"b-nav__link" + (here(l.href) ? " b-nav__link--active" : "")}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="b-nav__cta b-nav__cta--desktop">
            {user ? (
              <Link href="/profile" className="b-avatar" title={user.name || user.email}>{initial}</Link>
            ) : (
              <>
                <Link href="/login" className="b-btn b-btn--ghost b-btn--sm">Log in</Link>
                <Link href="/signup" className="b-btn b-btn--primary b-btn--sm">Get Started</Link>
              </>
            )}
          </div>

          <button
            className="b-nav__toggle"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </header>

      {/* Full-screen mobile overlay */}
      <div
        className={"b-nav__overlay" + (open ? " b-nav__overlay--open" : "")}
        role="dialog"
        aria-label="Main menu"
        aria-modal="true"
      >
        <button className="b-nav__overlay-close" aria-label="Close menu" onClick={() => setOpen(false)}>✕</button>
        <ul className="b-nav__overlay-list">
          {MOBILE_NAV.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={"b-nav__overlay-link" + (here(l.href) ? " b-nav__overlay-link--active" : "")}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="b-nav__overlay-cta">
          {user ? (
            <Link href="/profile" className="b-btn b-btn--primary b-btn--lg" onClick={() => setOpen(false)}>
              My Profile →
            </Link>
          ) : (
            <>
              <Link href="/login" className="b-btn b-btn--ghost b-btn--lg" onClick={() => setOpen(false)}>Log in</Link>
              <Link href="/signup" className="b-btn b-btn--primary b-btn--lg" onClick={() => setOpen(false)}>Get Started →</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
