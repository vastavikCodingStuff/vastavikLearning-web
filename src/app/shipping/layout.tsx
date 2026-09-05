import type { Metadata } from "next";
import { makeMetadata } from "@/lib/metadata";

export const metadata: Metadata = makeMetadata({
  title: "Shipping & Exchange Policy",
  description:
    "Shipping and exchange policy for Vastavik merchandise. India-wide delivery in 3–10 business days, free size exchanges within 14 days, and digital delivery details.",
  path: "/shipping",
  keywords: ["shipping policy", "exchange policy", "merchandise delivery India"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}