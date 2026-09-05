export default function ShippingPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="b-doc">
          <h1>📦 Shipping &amp; Exchange Policy</h1>
          <p className="meta">Last updated: September 6, 2026</p>

          <div className="updated">
            Vastavik Learning is a digital-first platform. We offer a small range of physical merchandise (t-shirts, stickers, notebooks) shipped across India.
          </div>

          <h2>1. Digital Products</h2>
          <p>All courses, subscriptions, certificates, and AI tutor access are <strong>digital products</strong> delivered instantly online. There is no shipping involved. Access is granted immediately upon successful payment.</p>
          <ul>
            <li>Course access: instant</li>
            <li>Certificates: issued upon course completion (PDF, downloadable)</li>
            <li>Subscription activation: instant</li>
          </ul>

          <h2>2. Physical Merchandise</h2>
          <p>We ship the following items:</p>
          <ul>
            <li>👕 Vastavik-branded t-shirts</li>
            <li>📓 Branded notebooks</li>
            <li>🏷 Sticker packs</li>
            <li>🎒 Limited edition swag (during contests &amp; events)</li>
          </ul>

          <h2>3. Shipping Coverage</h2>
          <p>We currently ship to <strong>all states and union territories of India</strong>. International shipping is not yet available but coming soon.</p>

          <h2>4. Processing Time</h2>
          <ul>
            <li>Orders are processed within <strong>1–2 business days</strong> after payment confirmation.</li>
            <li>You&apos;ll receive a tracking link via email and SMS once dispatched.</li>
            <li>Orders placed on weekends/holidays are processed the next business day.</li>
          </ul>

          <h2>5. Delivery Time</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", margin: "16px 0" }}>
            <thead>
              <tr style={{ borderBottom: "3px solid var(--border)" }}>
                <th style={{ textAlign: "left", padding: 12 }}>Region</th>
                <th style={{ textAlign: "left", padding: 12 }}>Estimated Delivery</th>
                <th style={{ textAlign: "left", padding: 12 }}>Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "2px solid var(--surface2)" }}><td style={{ padding: 12 }}>Metro cities (Bengaluru, Mumbai, Delhi, etc.)</td><td style={{ padding: 12 }}>3–5 business days</td><td style={{ padding: 12 }}>₹49 (free above ₹999)</td></tr>
              <tr style={{ borderBottom: "2px solid var(--surface2)" }}><td style={{ padding: 12 }}>Tier 2 cities</td><td style={{ padding: 12 }}>5–7 business days</td><td style={{ padding: 12 }}>₹79 (free above ₹1,499)</td></tr>
              <tr style={{ borderBottom: "2px solid var(--surface2)" }}><td style={{ padding: 12 }}>Tier 3 &amp; rural areas</td><td style={{ padding: 12 }}>7–10 business days</td><td style={{ padding: 12 }}>₹99 (free above ₹1,999)</td></tr>
              <tr><td style={{ padding: 12 }}>North-East &amp; J&amp;K</td><td style={{ padding: 12 }}>10–14 business days</td><td style={{ padding: 12 }}>₹149</td></tr>
            </tbody>
          </table>

          <h2>6. Order Tracking</h2>
          <ol>
            <li>Once dispatched, you&apos;ll receive an SMS/email with the tracking number.</li>
            <li>Track your order at <a href="https://www.shiprocket.in/shipment-tracking">Shiprocket tracking</a>.</li>
            <li>You can also track from your account: <strong>Settings → Orders</strong>.</li>
          </ol>

          <h2>7. Delivery Issues</h2>
          <h3>7.1 Package not delivered</h3>
          <p>If your package hasn&apos;t arrived within the estimated window, contact us at <a href="mailto:shipping@vastavik.app">shipping@vastavik.app</a> within 14 days. We&apos;ll investigate with the courier and either resend or refund.</p>

          <h3>7.2 Damaged or wrong item</h3>
          <p>If your item arrives damaged or is the wrong size/product, email us within <strong>48 hours</strong> of delivery with photos. We&apos;ll arrange a free exchange or full refund.</p>

          <h2>8. Exchange Policy</h2>
          <p>We offer <strong>size exchanges</strong> on unworn t-shirts within 14 days of delivery. Conditions:</p>
          <ul>
            <li>Item must be unworn, unwashed, with original tags attached</li>
            <li>Original packaging must be intact</li>
            <li>Exchange shipping is free for defective/wrong items; otherwise ₹79 (deducted from refund/exchange)</li>
          </ul>
          <p>To request an exchange, email <a href="mailto:exchange@vastavik.app">exchange@vastavik.app</a> with your order number and the size you need.</p>

          <h2>9. Returns &amp; Refunds (Physical Items)</h2>
          <ul>
            <li>Returns accepted within <strong>14 days</strong> of delivery for unworn items.</li>
            <li>Refund will be processed to the original payment method within 7–10 business days after we receive the return.</li>
            <li>Return shipping is free if the item is defective or incorrect.</li>
            <li>Notebooks, stickers, and clearance items are non-returnable.</li>
          </ul>

          <h2>10. Cancellations (Physical Orders)</h2>
          <p>You may cancel a physical order any time before it is dispatched. Once dispatched, you&apos;ll need to follow the return process above.</p>

          <h2>11. Address Changes</h2>
          <p>Need to change your shipping address? Contact us within <strong>6 hours</strong> of placing the order. After dispatch, we cannot redirect the package.</p>

          <h2>12. Contact Shipping Support</h2>
          <p>
            📧 <a href="mailto:shipping@vastavik.app">shipping@vastavik.app</a><br />
            📧 <a href="mailto:exchange@vastavik.app">exchange@vastavik.app</a> (exchanges only)<br />
            📞 +91 98765 43210 (Mon–Fri, 10am–6pm IST)
          </p>
        </div>
      </div>
    </section>
  );
}
