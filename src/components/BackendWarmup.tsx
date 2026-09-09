"use client";

import { useEffect } from "react";
import { warmUpBackend } from "@/lib/api";

/**
 * Proactive Backend Pre-warmup Component.
 *
 * Render cloud free-tier instances sleep after 15 minutes of inactivity.
 * Mounts in RootLayout and non-blockingly triggers GET /health so the container
 * starts warming up immediately on page load, ending 502 Bad Gateway timeouts.
 */
export default function BackendWarmup() {
  useEffect(() => {
    warmUpBackend().catch(() => {});
  }, []);

  return null;
}
