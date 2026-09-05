import type { Metadata } from "next";
import { makeMetadata } from "@/lib/metadata";
import { faqLd } from "@/lib/structured-data";
import ContactContent from "./ContactContent";

export const metadata: Metadata = makeMetadata({
  title: "Contact Us — Support, Sales & Partnerships",
  description:
    "Get in touch with Vastavik Learning. Email support@vastaviklearning.online or call +91 98765 43210 (Mon–Fri, 10am–6pm IST). We reply within 24 hours.",
  path: "/contact",
  keywords: ["contact Vastavik", "customer support", "education support India", "partnerships", "sales inquiry"],
});

export default function ContactPage() {
  const faq = faqLd([
    { q: "How long does support take to reply?", a: "We typically reply within 24 hours on business days." },
    { q: "Where is your office?", a: "Bengaluru, Karnataka 560001, India." },
  ]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <ContactContent />
    </>
  );
}