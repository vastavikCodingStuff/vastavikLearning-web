"use client";
import { useState } from "react";
import { useToast } from "@/components/Toast";

const PLANS = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    desc: "Get started with the basics.",
    featured: false,
    cta: "Current plan",
    feats: [
      "Access to 5 free courses",
      "Limited AI tutor (20 msgs/day)",
      "Basic quizzes",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "₹199",
    period: "/month",
    desc: "Unlock everything. Best for serious learners.",
    featured: true,
    cta: "Subscribe with Razorpay",
    feats: [
      "All 120+ courses & lessons",
      "Unlimited AI tutor",
      "Live classrooms + recordings",
      "Premium quizzes & PYQs",
      "Certificate on completion",
      "Priority support",
    ],
    badge: "MOST POPULAR",
  },
  {
    name: "Team",
    price: "₹999",
    period: "/month (5 seats)",
    desc: "For schools, tuitions and study groups.",
    featured: false,
    cta: "Contact sales",
    feats: [
      "Everything in Pro",
      "5 student seats included",
      "Admin dashboard",
      "Bulk progress reports",
      "Custom learning paths",
      "Dedicated success manager",
    ],
  },
];

export default function PricingContent() {
  const toast = useToast();

  const subscribe = (plan: string) => {
    if (plan === "Free") { toast("You're on the Free plan", "ok"); return; }
    if (plan === "Team") { window.location.href = "/contact"; return; }
    const options = {
      key: "rzp_test_YOUR_KEY_ID",
      subscription_id: "sub_" + Date.now(),
      name: "Vastavik Learning",
      description: plan + " Plan — Monthly UPI Autopay",
      image: "https://placehold.co/100x100/2563EB/FFF?text=V",
      handler: function (response: any) {
        toast("🎉 Subscribed! Payment ID: " + response.razorpay_payment_id, "ok");
      },
      prefill: { name: "", email: "", contact: "" },
      notes: { plan: plan, autopay: "UPI" },
      theme: { color: "#2563EB" },
      method: { upi: true, card: true, netbanking: true, wallet: true },
      recurring: 1,
    };
    toast("Opening Razorpay checkout…", "ok");
    console.log("Razorpay options:", options);
    setTimeout(() => toast("Demo: Razorpay UPI Autopay would open here", "ok"), 600);
  };

  return (
    <>
      <section className="b-page-head b-page-head--yellow">
        <div className="container">
          <span className="b-tag mb-2" style={{ display: "inline-flex" }}>💰 PRICING</span>
          <h1>Simple, honest pricing.</h1>
          <p>No hidden fees. Cancel anytime. UPI Autopay powered by Razorpay.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {PLANS.map((p) => (
              <div key={p.name} className={"b-price" + (p.featured ? " b-price--featured" : "")}>
                {p.badge && <span className="b-price__badge">{p.badge}</span>}
                <h3>{p.name}</h3>
                <div className="b-price__amt">{p.price}<small>{p.period}</small></div>
                <p className="muted">{p.desc}</p>
                <ul className="b-price__feats">
                  {p.feats.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <button className={"b-btn b-btn--block b-btn--lg " + (p.featured ? "b-btn--dark" : "b-btn--ghost")} onClick={() => subscribe(p.name)}>
                  {p.cta} →
                </button>
                {p.featured && <p className="muted text-center" style={{ fontSize: "0.85rem", marginTop: 8 }}>🔁 Auto-renews monthly · Cancel anytime</p>}
              </div>
            ))}
          </div>

          <div className="b-card b-card--lime mt-4">
            <div className="b-cols-3-2">
              <div>
                <span className="b-tag mb-2" style={{ display: "inline-flex", background: "var(--blue)", color: "var(--white)" }}>RAZORPAY</span>
                <h2 className="mt-1">UPI Autopay enabled</h2>
                <p className="mt-2" style={{ fontSize: "1.05rem" }}>Subscribe in 30 seconds with any UPI app — Google Pay, PhonePe, Paytm, BHIM. Your subscription auto-renews monthly. Cancel from your dashboard anytime.</p>
                <ul style={{ marginTop: 16, paddingLeft: 20 }}>
                  <li>🔐 Bank-grade encryption (PCI-DSS Level 1)</li>
                  <li>⚡ Instant activation</li>
                  <li>🇮🇳 Made for India, supports all major UPI apps</li>
                  <li>📧 Email receipts & invoices</li>
                </ul>
              </div>
              <div className="b-card text-center" style={{ background: "var(--white)" }}>
                <h3>Try it now</h3>
                <p className="muted mt-1">Subscribe to Pro for ₹199/month</p>
                <button className="b-btn b-btn--primary b-btn--block b-btn--lg mt-2" onClick={() => subscribe("Pro")}>Subscribe with UPI</button>
                <p className="muted mt-2" style={{ fontSize: "0.8rem" }}>No credit card required</p>
              </div>
            </div>
          </div>

          <h2 className="mt-5 mb-3 text-center">Frequently asked questions</h2>
          <div className="grid grid-2">
            <div className="b-card b-card--sm">
              <strong>Can I cancel anytime?</strong>
              <p className="muted mt-1">Yes. Cancel from your dashboard with one click. You&apos;ll keep access until the end of your billing period.</p>
            </div>
            <div className="b-card b-card--sm">
              <strong>What payment methods do you support?</strong>
              <p className="muted mt-1">UPI (GPay, PhonePe, Paytm, BHIM), debit/credit cards, netbanking, and wallets. All via Razorpay.</p>
            </div>
            <div className="b-card b-card--sm">
              <strong>Is there a refund policy?</strong>
              <p className="muted mt-1">Yes — 7-day no-questions-asked refund for first-time subscribers. See our <a href="/refund">Cancellation & Refund</a> page.</p>
            </div>
            <div className="b-card b-card--sm">
              <strong>Do you offer student discounts?</strong>
              <p className="muted mt-1">Yes! 50% off with a valid .edu email. Contact us at <a href="/contact">support</a>.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}