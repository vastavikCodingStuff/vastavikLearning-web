import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://vastavik.app";
  const now = new Date();
  const routes = [
    "",
    "/about",
    "/courses",
    "/practice",
    "/quiz",
    "/meetings",
    "/ai-chat",
    "/whiteboard",
    "/leaderboard",
    "/pricing",
    "/contact",
    "/terms",
    "/privacy",
    "/refund",
    "/shipping",
  ];
  return routes.map((r) => ({
    url: base + r,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: r === "" ? 1 : 0.7,
  }));
}
