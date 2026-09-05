import type { Metadata } from "next";
import { makeMetadata } from "@/lib/metadata";
import { faqLd, productLd } from "@/lib/structured-data";
import PricingContent from "./PricingContent";

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

const faqs = [
  { q: "Can I cancel anytime?", a: "Yes. Cancel from your dashboard with one click. You'll keep access until the end of your billing period." },
  { q: "What payment methods do you support?", a: "UPI (GPay, PhonePe, Paytm, BHIM), debit/credit cards, netbanking, and wallets. All via Razorpay." },
  { q: "Is there a refund policy?", a: "Yes — 7-day no-questions-asked refund for first-time subscribers. See our Cancellation & Refund page." },
  { q: "Do you offer student discounts?", a: "Yes! 50% off with a valid .edu email. Contact us at support@vastaviklearning.online." },
];

export default function PricingPage() {
  const faq = faqLd(faqs);
  const pro = productLd({ name: "Vastavik Pro", description: "Unlimited AI tutor, all courses, live classes, certificates", price: "199", period: "month" });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([faq, pro]) }} />
      <PricingContent />
    </>
  );
}