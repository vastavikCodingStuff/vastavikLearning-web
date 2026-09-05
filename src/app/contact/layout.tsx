import type { Metadata } from "next";
import { makeMetadata } from "@/lib/metadata";

export const metadata: Metadata = makeMetadata({
  title: "Contact Us — Support, Sales & Partnerships",
  description:
    "Get in touch with Vastavik Learning. Email support@vastaviklearning.online or call +91 98765 43210 (Mon–Fri, 10am–6pm IST). We reply within 24 hours.",
  path: "/contact",
  keywords: ["contact Vastavik", "customer support", "education support India", "partnerships", "sales inquiry"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}