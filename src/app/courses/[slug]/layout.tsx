import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COURSES } from "./CourseDetailClient";
import { makeMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/seo";

type Props = { params: { slug: string } };

export function generateMetadata({ params }: Props): Metadata {
  const c = COURSES[params.slug];
  if (!c) return {};
  const desc = `Learn ${c.title} — ${c.lessons} lessons, ${c.time}, taught by ${c.instructor} (${c.instructorRole}). ${c.rating}. Start free on Vastavik Learning.`;
  return makeMetadata({
    title: `${c.title} — Free Online Course`,
    description: desc,
    path: `/courses/${params.slug}`,
    keywords: [
      c.title,
      `${c.title} course`,
      `learn ${c.title.split(" ")[0]}`,
      `${c.title.split(" ")[0]} tutorial India`,
      "online course free",
      c.level.replace(/[^\w ]/g, "").trim(),
    ],
    type: "article",
  });
}

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  return children;
}