import { COURSES, CourseDetailClient } from "./CourseDetailClient";
import { courseLd, breadcrumbLd } from "@/lib/structured-data";
import { SITE } from "@/lib/seo";

export function generateStaticParams() {
  return Object.keys(COURSES).map((slug) => ({ slug }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const c = COURSES[params.slug];
  if (!c) return <CourseDetailClient slug={params.slug} />;

  const hours = parseInt(c.time) || 8;
  const ratingMatch = c.rating.match(/([\d.]+)\s*\(/);
  const countMatch = c.rating.match(/\(([\d,]+)\s+ratings?\)/);
  const course = courseLd({
    slug: params.slug,
    title: c.title,
    description: `${c.lessons} lessons · ${c.time}. Taught by ${c.instructor} (${c.instructorRole}).`,
    instructor: c.instructor,
    instructorRole: c.instructorRole,
    rating: ratingMatch ? parseFloat(ratingMatch[1]) : undefined,
    ratingCount: countMatch ? parseInt(countMatch[1].replace(/,/g, "")) : undefined,
    students: parseInt(c.students.replace(/,/g, "")),
    lessons: parseInt(c.lessons),
    hours,
    level: c.level.replace(/[^\w ]/g, "").trim(),
    free: true,
  });
  const breadcrumb = breadcrumbLd([
    { name: "Home", url: `${SITE.url}/` },
    { name: "Courses", url: `${SITE.url}/courses` },
    { name: c.title, url: `${SITE.url}/courses/${params.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([course, breadcrumb]) }} />
      <CourseDetailClient slug={params.slug} />
    </>
  );
}
