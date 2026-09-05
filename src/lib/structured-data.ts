import { SITE, KEYWORDS } from "./seo";

type Thing = Record<string, unknown>;

export function organizationLd(): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE.url}#organization`,
    name: SITE.name,
    legalName: SITE.publisher,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}/icon.svg`,
      width: 512,
      height: 512,
    },
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.address.street,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postal,
      addressCountry: SITE.address.country,
    },
    sameAs: SITE.sameAs,
  };
}

export function websiteLd(): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    inLanguage: SITE.locale,
    publisher: { "@id": `${SITE.url}#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/courses?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function courseLd(args: {
  slug: string;
  title: string;
  description: string;
  instructor: string;
  instructorRole?: string;
  rating?: number;
  ratingCount?: number;
  students?: number;
  lessons?: number;
  hours?: number;
  level?: string;
  category?: string;
  free?: boolean;
  price?: string;
}): Thing {
  const slug = args.slug;
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${SITE.url}/courses/${slug}#course`,
    name: args.title,
    description: args.description,
    url: `${SITE.url}/courses/${slug}`,
    provider: { "@id": `${SITE.url}#organization` },
    inLanguage: SITE.locale,
    educationalLevel: args.level || "Beginner",
    coursePrerequisites: "None",
    timeRequired: args.hours ? `PT${args.hours}H` : undefined,
    numberOfLessons: args.lessons,
    aggregateRating: args.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: args.rating,
          reviewCount: args.ratingCount || 0,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
    offers: {
      "@type": "Offer",
      category: "Subscription",
      price: args.free ? "0" : args.price || "199",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/pricing`,
      seller: { "@id": `${SITE.url}#organization` },
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: args.hours ? `PT${args.hours}H` : undefined,
      instructor: {
        "@type": "Person",
        name: args.instructor,
        jobTitle: args.instructorRole,
      },
    },
  };
}

export function breadcrumbLd(items: { name: string; url: string }[]): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function productLd(args: { name: string; description: string; price: string; period: string }): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: args.name,
    description: args.description,
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      price: args.price,
      priceCurrency: "INR",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/pricing`,
      seller: { "@id": `${SITE.url}#organization` },
    },
    category: "Software as a Service",
  };
}

export function faqLd(qa: { q: string; a: string }[]): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function softwareAppLd(): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE.name,
    applicationCategory: "EducationalApplication",
    applicationSubCategory: "E-Learning Platform",
    operatingSystem: "Web, Android, iOS",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "2184",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

export const SITE_LD = [organizationLd(), websiteLd(), softwareAppLd()];

export const GLOBAL_KEYWORDS = KEYWORDS.global;
