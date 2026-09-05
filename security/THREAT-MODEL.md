# Threat Model

> STRIDE-based threat model. Update this whenever the architecture or surface area changes.

## 1. System overview

```
┌──────────┐    HTTPS    ┌──────────────┐
│  User    │ ──────────▶ │  Cloudflare  │
└──────────┘             │   (WAF/CDN)  │
                         └──────┬───────┘
                                │
                         ┌──────▼───────┐
                         │  Vercel /    │   CSP, HSTS, rate limit
                         │  Next.js     │
                         └──────┬───────┘
                                │
                ┌───────────────┼───────────────┐
                │               │               │
         ┌──────▼─────┐  ┌──────▼─────┐  ┌──────▼─────┐
         │  Auth API  │  │  Postgres  │  │  Razorpay  │
         │  (future)  │  │  (future)  │  │  (today)   │
         └──────┬─────┘  └────────────┘  └────────────┘
                │
         ┌──────▼─────┐
         │  Google    │  OAuth + Gemini
         │  OAuth     │
         └────────────┘
```

## 2. STRIDE analysis

### Spoofing
- **Threat:** Attacker forges a session cookie.
- **Mitigation:** Session cookies are httpOnly, secure, sameSite=Lax, signed with a server-side secret. Tokens rotated on login. (When backend lands.)
- **Today (mock):** Client-side only — explicitly labelled as demo.

### Tampering
- **Threat:** Attacker modifies a form submission (e.g. premium upgrade, refund request).
- **Mitigation:** Server-side re-validation of every input. CSRF tokens for cookie-based sessions. HMAC-signed Razorpay webhooks for payment events.

### Repudiation
- **Threat:** User denies taking an action (e.g. "I never cancelled").
- **Mitigation:** Audit log of every state-changing action with user, IP, timestamp, payload hash.

### Information disclosure
- **Threat:** PII or payment data leaks.
- **Mitigation:** Field-level encryption at rest, TLS in transit, no PII in URLs, no PII in error logs, CSP `default-src 'self'`, no third-party trackers.

### Denial of service
- **Threat:** Layer-7 attack on the auth or AI endpoints.
- **Mitigation:** Edge rate limiting, per-IP and per-user, captcha on signup/login, AI endpoint has a per-user token budget.

### Elevation of privilege
- **Threat:** User escalates to admin via API.
- **Mitigation:** Server-side role checks on every protected action. No client-side role storage beyond display hints.

## 3. OWASP Top 10 (2021) coverage

| Risk | Where mitigated |
|---|---|
| A01 Broken Access Control | `src/app/(authed)/layout.tsx` + per-page checks + AUTH.md |
| A02 Cryptographic Failures | HTTPS, bcrypt, field encryption; no crypto on the client |
| A03 Injection | Server-side validation; no `eval`, no `dangerouslySetInnerHTML` |
| A04 Insecure Design | Threat model + checklist reviewed on every PR |
| A05 Security Misconfiguration | Headers in `next.config.mjs`, no debug in prod |
| A06 Vulnerable Components | `npm audit` in CI; pinned versions |
| A07 Identification & Auth Failures | bcrypt, rate limit, 2FA (planned) |
| A08 Software & Data Integrity | Signed deploys, package-lock.json, webhook signing |
| A09 Logging & Monitoring | Centralised log shipping, alerting on auth anomalies |
| A10 SSRF | All outbound fetches are to a hard-coded allowlist |

## 4. Residual risks

- **No backend yet** — the current web build is a static SPA with mock auth. This is documented in the README. A backend will be needed before going live with payments.
- **localStorage XSS surface** — we don't store PII there, but a third-party script injection could read it. Mitigated by CSP `script-src 'self'`.
- **AI tutor hallucinations** — the AI can produce wrong answers. We display a disclaimer and a "report" button.

## 5. Re-review triggers

Re-run this threat model when:
- A new external integration is added.
- Auth is wired up to a real backend.
- A new public route is added.
- A new data category (PII / payment / health) is collected.
