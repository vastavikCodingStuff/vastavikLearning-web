"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NO_FOOTER_ROUTES = [
  "/dashboard",
  "/notifications",
  "/profile",
  "/settings",
  "/whiteboard",
  "/meetings",
  "/ai-chat",
  "/lesson",
];

export default function Footer() {
  const pathname = usePathname();
  const shouldHide = NO_FOOTER_ROUTES.some(
    (r) => pathname === r || pathname?.startsWith(r + "/")
  );
  if (shouldHide) return null;

  return (
    <footer className="b-footer">
      <div className="container">
        <div className="b-footer__grid">
          <div>
            <div className="flex items-center gap-1 mb-2">
              <div className="b-nav__logo">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l-6-6 6-6" /><path d="M15 6l6 6-6 6" />
                </svg>
              </div>
              <strong style={{ fontSize: "1.25rem" }}>Vastavik Learning</strong>
            </div>
            <p style={{ opacity: 0.7, fontSize: "0.95rem", maxWidth: 360 }}>
              A high-performance interactive education platform. Built bold. Built fast. Built for the next generation of builders.
            </p>
          </div>
          <div>
            <h4>Product</h4>
            <Link href="/courses">Courses</Link>
            <Link href="/practice">Practice</Link>
            <Link href="/quiz">Quizzes</Link>
            <Link href="/meetings">Live Classes</Link>
            <Link href="/ai-chat">AI Tutor</Link>
          </div>
          <div>
            <h4>Company</h4>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/leaderboard">Leaderboard</Link>
          </div>
          <div>
            <h4>Legal</h4>
            <Link href="/terms">Terms &amp; Conditions</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/refund">Cancellation &amp; Refund</Link>
            <Link href="/shipping">Shipping &amp; Exchange</Link>
          </div>
        </div>
        <div className="b-footer__bottom">
          <span>© {new Date().getFullYear()} Vastavik Learning. All rights reserved.</span>
          <span>Made with ⚡ in India</span>
        </div>
      </div>
    </footer>
  );
}
