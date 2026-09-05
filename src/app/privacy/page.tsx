export default function PrivacyPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="b-doc">
          <h1>🔒 Privacy Policy</h1>
          <p className="meta">Last updated: September 6, 2026</p>

          <div className="updated">
            Your privacy is critical to us. This policy explains what data we collect, how we use it, and your rights.
          </div>

          <h2>1. Information We Collect</h2>

          <h3>1.1 Information you provide</h3>
          <ul>
            <li><strong>Account:</strong> name, email, password (hashed), board/curriculum, profile photo (optional).</li>
            <li><strong>Payment:</strong> handled exclusively by Razorpay. We never see your card/UPI PIN. We store only the last 4 digits, payment ID, and subscription status.</li>
            <li><strong>Content:</strong> code you write in our editor, chat messages with the AI tutor, quiz answers, notes.</li>
          </ul>

          <h3>1.2 Information we collect automatically</h3>
          <ul>
            <li>Device type, OS, browser version</li>
            <li>IP address (for security and fraud prevention)</li>
            <li>Pages visited, time spent, click patterns</li>
            <li>Crash logs and performance data</li>
          </ul>

          <h3>1.3 Information from third parties</h3>
          <ul>
            <li>Google or GitHub: name, email, profile picture (only if you sign in with those services)</li>
            <li>Razorpay: payment status, subscription ID, transaction history</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>To provide, maintain, and improve the Service.</li>
            <li>To personalize your learning experience and recommendations.</li>
            <li>To process payments and prevent fraud.</li>
            <li>To send you important updates (security, billing, course changes).</li>
            <li>To respond to support requests.</li>
            <li>To send marketing emails (you can opt out anytime).</li>
            <li>To comply with legal obligations.</li>
          </ul>

          <h2>3. Cookies &amp; Local Storage</h2>
          <p>We use cookies and local storage for:</p>
          <ul>
            <li>Keeping you logged in</li>
            <li>Remembering your preferences (theme, language)</li>
            <li>Analytics (via privacy-respecting tools like Plausible)</li>
          </ul>
          <p>You can clear cookies/storage anytime, though this will sign you out.</p>

          <h2>4. Data Sharing</h2>
          <p>We do <strong>not</strong> sell your personal data. We share it only with:</p>
          <ul>
            <li><strong>Razorpay</strong> — for payment processing (PCI-DSS Level 1 certified)</li>
            <li><strong>Google Gemini / OpenAI</strong> — for AI tutor features. Your messages are sent to these providers to generate responses. We do not send your personal info beyond your message text.</li>
            <li><strong>Cloud hosting</strong> — for data storage (AWS Mumbai / Google Cloud Mumbai)</li>
            <li><strong>Email service</strong> — for transactional and marketing emails</li>
            <li><strong>Analytics</strong> — for understanding usage (anonymized where possible)</li>
            <li><strong>Law enforcement</strong> — only when legally required</li>
          </ul>

          <h2>5. Data Storage &amp; Security</h2>
          <ul>
            <li>Data is stored on servers in India (AWS Mumbai / GCP Mumbai).</li>
            <li>All traffic is encrypted via TLS 1.3.</li>
            <li>Passwords are hashed using bcrypt (cost factor 12).</li>
            <li>Payment data is tokenized — we never see full card/UPI details.</li>
            <li>Regular security audits and penetration testing.</li>
            <li>2FA available for all accounts.</li>
          </ul>

          <h2>6. Your Rights (GDPR &amp; Indian IT Act)</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access a copy of your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Delete your account and data (right to be forgotten)</li>
            <li>Export your data in JSON format (data portability)</li>
            <li>Opt out of marketing emails (unsubscribe link in every email)</li>
            <li>Withdraw consent at any time</li>
            <li>Lodge a complaint with a data protection authority</li>
          </ul>
          <p>To exercise any of these rights, email <a href="mailto:privacy@vastavik.app">privacy@vastavik.app</a> or visit Settings → Privacy.</p>

          <h2>7. Children&apos;s Privacy</h2>
          <p>Vastavik is designed for students aged 13+. We do not knowingly collect data from children under 13. Parents/guardians can request deletion of their child&apos;s data at any time.</p>

          <h2>8. International Transfers</h2>
          <p>Some of our service providers (e.g., Google Gemini) may process data outside India. We ensure adequate safeguards (Standard Contractual Clauses) are in place.</p>

          <h2>9. Data Retention</h2>
          <ul>
            <li>Account data: while your account is active + 30 days after deletion (for recovery)</li>
            <li>Payment records: 7 years (as required by Indian tax law)</li>
            <li>Chat history: 12 months (then anonymized)</li>
            <li>Analytics: 26 months</li>
          </ul>

          <h2>10. Changes to This Policy</h2>
          <p>We will notify you via email of any material changes at least 14 days before they take effect.</p>

          <h2>11. Contact</h2>
          <p>Data Protection Officer: <a href="mailto:dpo@vastavik.app">dpo@vastavik.app</a><br />Address: Vastavik Education Pvt. Ltd., Bengaluru, Karnataka 560001, India</p>
        </div>
      </div>
    </section>
  );
}
