import { COURSES, CourseDetailClient } from "./CourseDetailClient";

export function generateStaticParams() {
  return Object.keys(COURSES).map((slug) => ({ slug }));
}

export default function Page({ params }: { params: { slug: string } }) {
  return <CourseDetailClient slug={params.slug} />;
}

