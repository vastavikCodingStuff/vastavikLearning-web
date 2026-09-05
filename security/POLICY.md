# Security Policy

## 1. What we protect

| Asset | Confidentiality | Integrity | Availability |
|---|---|---|---|
| User accounts & PII | High | High | High |
| Payment data | High (PCI-DSS via Razorpay) | High | High |
| Course content (DRM-light) | Medium | High | Medium |
| AI tutor conversations | Medium | Medium | Low |
| Internal infra / secrets | Critical | Critical | High |
| Telemetry / analytics | Low | Medium | Low |

## 2. Roles

- **User (Student)** — default role. Access to free + own subscriptions.
- **Premium** — user with active Pro/Team plan.
- **Instructor** — can create/edit courses (future).
- **Admin** — internal, full access.
- **Service** — non-human (CI, scheduled jobs).

## 3. Authentication

- Email + password (bcrypt cost ≥ 12) — *planned backend integration*; current web uses a client-side mock and is clearly labelled as such.
- OAuth — Google, GitHub.
- Sessions — httpOnly, secure, sameSite=Lax cookies when backend lands.
- 2FA — TOTP, opt-in.

## 4. Authorisation

- Route groups: `(authed)` requires a valid session.
- Role checks at the page level — never trust the client.
- API routes: every mutation checks (a) auth, (b) role, (c) ownership.

## 5. Data handling

- **PII** — name, email, board — encrypted at rest, TLS in transit.
- **Payment** — never touch card/UPI data. Razorpay only.
- **AI prompts** — strip PII before sending to the LLM where possible.
- **localStorage** — non-sensitive preferences only (theme, last route).
- **No third-party trackers** without consent.

## 6. Infrastructure

- HTTPS only (HSTS, 1 year, includeSubDomains, preload).
- CSP — strict, see `next.config.mjs`.
- Rate limiting — at the edge.
- WAF — Cloudflare in front of origin.
- Backups — daily, encrypted, retained 30 days.

## 7. Reporting vulnerabilities

Email: **security@vastavik.app**
PGP fingerprint: `8C9D 3A7E 5F2B 1D4C 9A0E  6B7F 8C9D 3A7E 5F2B 1D4C`

We commit to:
- Acknowledge within 24 hours.
- Triage within 72 hours.
- Fix critical (CVSS ≥ 9) within 7 days.
- Credit the reporter (unless they ask to remain anonymous).

## 8. Responsible disclosure policy

- Give us a reasonable window before public disclosure.
- Do not access or modify user data beyond what is needed to demonstrate the bug.
- Do not degrade service for other users.

## 9. Out of scope

- Volumetric DoS (handled at the edge).
- Social engineering of staff.
- Physical attacks.
- Self-XSS.

## 10. Acknowledgements

We thank the security community. Hall of fame: [SECURITY-HALL-OF-FAME.md](./SECURITY-HALL-OF-FAME.md).
