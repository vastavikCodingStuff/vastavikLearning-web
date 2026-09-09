"use client";

import { useAuth } from "@/lib/auth";
import { useEffect, useState } from "react";

/**
 * Forensic Anti-Leak Watermark Overlay for Web.
 *
 * Mirrors PrivacyWatermarkOverlay.kt from the Android app.
 * Renders a subtle, non-intrusive repeating diagonal watermark containing
 * the logged-in student's email/UID.
 * 
 * Pointer-events are disabled so it never interferes with clicks, selection,
 * or scrolling, but ensures forensic traceability for screenshots, recordings,
 * or external camera captures.
 */
export default function PrivacyWatermark() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !user) return null;

  const identifier = user.email || user.name || "Student";
  const uidPart = user.user_id ? user.user_id.slice(0, 8).toUpperCase() : "V-SECURE";
  const text = `${identifier} • ${uidPart} • Vastavik Learning`;

  // Encode text for SVG data URI
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="200" viewBox="0 0 360 200">
    <text x="50%" y="50%" text-anchor="middle" transform="rotate(-25, 180, 100)" fill="currentColor" font-size="12" font-family="monospace" letter-spacing="1" opacity="0.045">
      ${text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}
    </text>
  </svg>`;

  const bgUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 99999,
        backgroundImage: `url("${bgUrl}")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}
