import type { Metadata } from "next";
import { makeMetadata } from "@/lib/metadata";

export const metadata: Metadata = makeMetadata({
  title: "Pricing — Free, Pro ₹199/mo, Team Plans | UPI Autopay",
  description:
    "Simple, honest pricing for Vastavik Learning. Free forever plan, Pro at ₹199/month with unlimited AI tutor & live classes, and Team plans for schools. Cancel anytime. Razorpay UPI Autopay.",
  path: "/pricing",
  keywords: [
    "Vastavik pricing",
    "online learning subscription India",
    "UPI Autopay education",
    "₹199 learning plan",
    "student discount learning platform",
    "Razorpay subscription",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}