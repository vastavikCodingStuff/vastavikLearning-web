import type { MetadataRoute } from "next";
import { SITE, NAV_ROUTES } from "@/lib/seo";

const COURSES = ["python", "web", "javascript", "fullstack", "sql", "ai", "android", "c", "security"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const items: MetadataRoute.Sitemap = NAV_ROUTES.map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.changefreq,
    priority: r.priority,
  }));

  // Course detail pages
  for (const slug of COURSES) {
    items.push({
      url: `${SITE.url}/courses/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  return items;
}
