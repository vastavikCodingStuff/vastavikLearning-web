import type { Metadata } from "next";
import { makeMetadata } from "@/lib/metadata";

export const metadata: Metadata = makeMetadata({
  title: "Cancellation & Refund Policy",
  description:
    "7-day money-back guarantee for new subscribers. Cancel anytime — no fees. Full refund eligibility matrix, UPI Autopay cancellation steps and refund timelines.",
  path: "/refund",
  keywords: ["refund policy", "cancellation policy", "UPI Autopay cancel", "money back guarantee"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}