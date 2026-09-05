import type { Metadata } from "next";
import { makeMetadata } from "@/lib/metadata";

export const metadata: Metadata = makeMetadata({
  title: "Terms & Conditions",
  description:
    "Terms & Conditions for Vastavik Learning: account rules, subscriptions & UPI Autopay billing, acceptable use, intellectual property, AI disclaimer, liability and governing law (India).",
  path: "/terms",
  keywords: ["terms and conditions", "Vastavik terms", "subscription terms India"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}