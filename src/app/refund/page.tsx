export const metadata = { title: "Cancellation & Refund — Vastavik Learning" };

export default function RefundPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="b-doc">
          <h1>↩ Cancellation &amp; Refund Policy</h1>
          <p className="meta">Last updated: September 6, 2026</p>

          <div className="updated">
            <strong>Quick summary:</strong> 7-day money-back guarantee for new Pro subscribers. Cancel anytime — your access continues until the end of the billing period. UPI Autopay mandates can be revoked from your UPI app.
          </div>

          <h2>1. 7-Day Money-Back Guarantee</h2>
          <p>All first-time Pro subscribers are eligible for a full refund within <strong>7 days</strong> of their initial purchase — no questions asked. After 7 days, refunds are handled on a case-by-case basis.</p>

          <h2>2. How to Request a Refund</h2>
          <ol>
            <li>Email <a href="mailto:billing@vastavik.app">billing@vastavik.app</a> with your registered email and payment ID.</li>
            <li>Or use the in-app refund request form (Settings → Billing → Request Refund).</li>
            <li>We&apos;ll confirm within 1 business day.</li>
            <li>Refunds are processed within 5–7 business days to the original payment method.</li>
          </ol>

          <h2>3. Cancellations</h2>
          <p>You can cancel your subscription at any time. There are no cancellation fees.</p>
          <h3>3.1 Via your account</h3>
          <p>Go to <strong>Settings → Billing → Manage Subscription → Cancel</strong>. Your access continues until the end of your current billing period.</p>

          <h3>3.2 Via UPI Autopay</h3>
          <p>Open your UPI app (Google Pay, PhonePe, Paytm, BHIM, etc.):</p>
          <ul>
            <li>Go to <strong>Mandates / Autopay</strong> section</li>
            <li>Find the Vastavik Learning mandate</li>
            <li>Tap <strong>Pause</strong> or <strong>Revoke</strong></li>
          </ul>
          <p>This will stop future auto-debits. Your access remains active until the end of the paid period.</p>

          <h3>3.3 Via Razorpay customer portal</h3>
          <p>Visit <a href="https://razorpay.com/support">razorpay.com/support</a> or email <a href="mailto:support@razorpay.com">support@razorpay.com</a> with your subscription ID.</p>

          <h2>4. Refund Eligibility Matrix</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", margin: "16px 0" }}>
            <thead>
              <tr style={{ borderBottom: "3px solid var(--border)" }}>
                <th style={{ textAlign: "left", padding: 12 }}>Scenario</th>
                <th style={{ textAlign: "left", padding: 12 }}>Refund</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "2px solid var(--surface2)" }}><td style={{ padding: 12 }}>First-time Pro, within 7 days</td><td style={{ padding: 12 }}>✅ 100% refund</td></tr>
              <tr style={{ borderBottom: "2px solid var(--surface2)" }}><td style={{ padding: 12 }}>First-time Pro, after 7 days</td><td style={{ padding: 12 }}>⚠ Pro-rated, case-by-case</td></tr>
              <tr style={{ borderBottom: "2px solid var(--surface2)" }}><td style={{ padding: 12 }}>Renewal charge (after 7-day window)</td><td style={{ padding: 12 }}>❌ Non-refundable*</td></tr>
              <tr style={{ borderBottom: "2px solid var(--surface2)" }}><td style={{ padding: 12 }}>Free plan</td><td style={{ padding: 12 }}>N/A (no charge)</td></tr>
              <tr style={{ borderBottom: "2px solid var(--surface2)" }}><td style={{ padding: 12 }}>Team plan</td><td style={{ padding: 12 }}>⚠ Pro-rated after 7 days</td></tr>
              <tr style={{ borderBottom: "2px solid var(--surface2)" }}><td style={{ padding: 12 }}>Failed duplicate charge</td><td style={{ padding: 12 }}>✅ 100% refund</td></tr>
              <tr><td style={{ padding: 12 }}>Service outage &gt;72 hours continuous</td><td style={{ padding: 12 }}>✅ Pro-rated credit</td></tr>
            </tbody>
          </table>
          <p className="muted" style={{ fontSize: "0.85rem" }}>*Exceptional circumstances (medical, financial hardship) reviewed individually.</p>

          <h2>5. Non-Refundable Items</h2>
          <ul>
            <li>One-time course bundles (after access granted)</li>
            <li>Physical merchandise (see <a href="/shipping">Shipping</a>)</li>
            <li>Gift subscriptions (after redemption)</li>
            <li>Exams / certifications already attempted</li>
          </ul>

          <h2>6. How Refunds Are Processed</h2>
          <ul>
            <li><strong>UPI:</strong> refund to source UPI ID within 5–7 business days</li>
            <li><strong>Credit/Debit Card:</strong> refund to original card within 7–10 business days</li>
            <li><strong>Net Banking:</strong> refund to source account within 5–7 business days</li>
            <li><strong>Wallets:</strong> refund to wallet within 3–5 business days</li>
          </ul>

          <h2>7. Disputes &amp; Chargebacks</h2>
          <p>If you have an issue, please contact us first — we resolve most issues within 24 hours. Unwarranted chargebacks may result in account suspension.</p>

          <h2>8. Contact Billing Support</h2>
          <p>
            📧 <a href="mailto:billing@vastavik.app">billing@vastavik.app</a><br />
            📞 +91 98765 43210 (Mon–Fri, 10am–6pm IST)<br />
            💬 Live chat (bottom right of this page)
          </p>
        </div>
      </div>
    </section>
  );
}
