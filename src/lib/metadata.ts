import type { Metadata } from "next";
import { SITE } from "./seo";

/** Build a Next.js Metadata object with sensible SEO defaults. */
export function makeMetadata(args: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}): Metadata {
  const url = `${SITE.url}${args.path}`;
  const img = args.image || `${SITE.url}/og.svg`;
  return {
    title: args.title,
    description: args.description,
    keywords: args.keywords,
    alternates: { canonical: args.path },
    openGraph: {
      title: args.title,
      description: args.description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: args.type || "website",
      images: [{ url: img, width: 1200, height: 630, alt: args.title }],
      publishedTime: args.publishedTime,
      modifiedTime: args.modifiedTime,
    },
    twitter: {
      card: "summary_large_image",
      title: args.title,
      description: args.description,
      images: [img],
    },
    robots: args.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
  };
}
