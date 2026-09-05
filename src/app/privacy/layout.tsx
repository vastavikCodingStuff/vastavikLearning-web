import type { Metadata } from "next";
import { makeMetadata } from "@/lib/metadata";

export const metadata: Metadata = makeMetadata({
  title: "Privacy Policy",
  description:
    "How Vastavik Learning collects, uses, stores and protects your data. Your GDPR & DPDP rights, data retention, cookies, AI data flow, and sub-processors.",
  path: "/privacy",
  keywords: ["privacy policy", "data protection India", "GDPR education", "DPDP act"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}