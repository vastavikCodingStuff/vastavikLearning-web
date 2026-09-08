"use client";
import { useState, useEffect } from "react";
import { useToast } from "@/components/Toast";
import { paymentsApi } from "@/lib/api";

const PLANS = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    desc: "Get started with the basics.",
    featured: false,
    cta: "Current plan",
    feats: ["Access to 5 free courses", "Limited AI tutor (20 msgs/day)", "Basic quizzes", "Community support"],
  },
  {
    name: "Pro",
    price: "₹149",
    period: "/month",
    desc: "Vastavik Pro — one plan, everything included. Credits pre-GST.",
    featured: true,
    cta: "Subscribe with Razorpay",
    feats: ["All 120+ courses & lessons", "Unlimited AI tutor", "Live classrooms + recordings", "Premium quizzes & PYQs", "Certificate on completion", "Priority support"],
    badge: "MOST POPULAR",
  },
];

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PricingContent() {
  const toast = useToast();
  const [coupon, setCoupon] = useState("");
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    paymentsApi.getQuote().then(setQuote).catch(() => {});
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    document.body.appendChild(s);
    return () => { s.remove(); };
  }, []);

  const subscribe = async (plan: string) => {
    if (plan === "Free") { toast("You're on the Free plan", "ok"); return; }
    setLoading(true);
    try {
      const order = await paymentsApi.createOrder(coupon || undefined);
      if (order.skip_payment) {
        toast("Free access activated — no payment needed", "ok");
        setQuote(order.quote);
        return;
      }
      const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY || "";
      if (!key) { toast("Razorpay key not configured", "err"); return; }
      const options = {
        key,
        order_id: order.order_id,
        amount: order.amount_paise,
        currency: "INR",
        name: "Vastavik Learning",
        description: "Vastavik Pro Monthly",
        handler: async function (response: any) {
          try {
            await paymentsApi.verifyPayment(order.order_id, response.razorpay_payment_id, response.razorpay_signature);
            toast("Payment verified — Pro activated", "ok");
            const q = await paymentsApi.getQuote().catch(() => null);
            if (q) setQuote(q);
          } catch (e: any) {
            toast("Verification failed: " + (e.message || "error"), "err");
          }
        },
        prefill: { name: "", email: "", contact: "" },
        theme: { color: "#2563EB" },
      };
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (resp: any) { toast("Payment failed: " + (resp.error?.description || "unknown"), "err"); });
      rzp.open();
    } catch (e: any) {
      toast(e.message || "Order creation failed", "err");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="b-page-head b-page-head--yellow">
        <div className="container">
          <span className="b-tag mb-2" style={{ display: "inline-flex" }}>💰 PRICING</span>
          <h1>Simple, honest pricing.</h1>
          <p>₹149 + 18% GST. Credits from referrals/shares apply before GST. Cancel anytime. UPI Autopay via Razorpay.</p>
          {quote && <p className="mt-2 text-sm">Your quote: Base ₹{quote.base_amount} — discount ₹{quote.discount_amount} + GST ₹{quote.gst_amount} = <strong>₹{quote.total_amount}</strong> {quote.credit_balance_inr > 0 && <span>(credits ₹{quote.credit_balance_inr})</span>}</p>}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="mb-4 flex gap-2 items-center">
            <input value={coupon} onChange={(e) => setCoupon(e.target.value.toUpperCase())} placeholder="Offline coupon code" className="b-input" style={{ maxWidth: 260 }} />
            <span className="muted" style={{ fontSize: "0.85rem" }}>Enter at checkout — free access if valid.</span>
          </div>

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
                <button className={"b-btn b-btn--block b-btn--lg " + (p.featured ? "b-btn--dark" : "b-btn--ghost")} onClick={() => subscribe(p.name)} disabled={loading}>
                  {loading ? "..." : p.cta} →
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
                <p className="mt-2" style={{ fontSize: "1.05rem" }}>Subscribe in 30 seconds with any UPI app — Google Pay, PhonePe, Paytm, BHIM. Auto-renews monthly. Cancel from dashboard anytime.</p>
              </div>
              <div className="b-card text-center" style={{ background: "var(--white)" }}>
                <h3>Try it now</h3>
                <p className="muted mt-1">Pro for ₹149 + GST{quote && quote.discount_amount > 0 ? ` — you pay ₹${quote.total_amount}` : ""}</p>
                <button className="b-btn b-btn--primary b-btn--block b-btn--lg mt-2" onClick={() => subscribe("Pro")} disabled={loading}>Subscribe with UPI</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
