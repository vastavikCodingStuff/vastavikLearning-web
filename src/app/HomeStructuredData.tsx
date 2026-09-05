import { organizationLd, websiteLd, softwareAppLd } from "@/lib/structured-data";

export default function HomeStructuredData() {
  const data = [organizationLd(), websiteLd(), softwareAppLd()];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
