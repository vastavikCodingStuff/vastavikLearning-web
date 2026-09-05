"use client";
import { useState } from "react";
import { useToast } from "@/components/Toast";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const toast = useToast();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !msg) { toast("Please fill all fields", "err"); return; }
    toast("Message sent! We'll reply within 24 hours.", "ok");
    setName(""); setEmail(""); setMsg("");
  };

  return (
    <>
      <section className="b-page-head b-page-head--pink">
        <div className="container">
          <span className="b-tag mb-2" style={{ display: "inline-flex", background: "var(--yellow)", color: "var(--black)" }}>📮 CONTACT</span>
          <h1>Get in touch.</h1>
          <p>Questions, feedback, partnerships — we&apos;d love to hear from you.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="b-cols-2">
            <form onSubmit={submit}>
              <div className="b-form-group">
                <label className="b-label">Your name</label>
                <input className="b-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" required />
              </div>
              <div className="b-form-group">
                <label className="b-label">Email</label>
                <input className="b-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
              </div>
              <div className="b-form-group">
                <label className="b-label">Message</label>
                <textarea className="b-input" rows={6} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="How can we help?" required></textarea>
              </div>
              <button className="b-btn b-btn--primary b-btn--lg" type="submit">Send message →</button>
            </form>

            <div>
              <div className="b-card mb-3">
                <h3>📧 Email</h3>
                <p className="muted mt-1">support@vastavik.app</p>
                <p className="muted">partnerships@vastavik.app</p>
              </div>
              <div className="b-card mb-3">
                <h3>📞 Phone</h3>
                <p className="muted mt-1">+91 98765 43210 (Mon-Fri, 10am-6pm IST)</p>
              </div>
              <div className="b-card mb-3">
                <h3>📍 Office</h3>
                <p className="muted mt-1">Vastavik Education Pvt. Ltd.<br />Bengaluru, Karnataka 560001<br />India</p>
              </div>
              <div className="b-card b-card--lime">
                <h3>⚡ Response time</h3>
                <p className="mt-1">We typically reply within 24 hours on business days.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
