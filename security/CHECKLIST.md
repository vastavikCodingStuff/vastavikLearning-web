# Pre-release Security Checklist

> Run this before any release. Every box must be ✅ or have a documented exception.

## Code

- [ ] `npm audit --audit-level=high` clean.
- [ ] No new `any` in TypeScript.
- [ ] No `dangerouslySetInnerHTML` without a sanitiser and security review.
- [ ] No `eval`, `new Function`, or similar dynamic code paths.
- [ ] No secrets in source (grep for `sk-`, `AIza`, `AKIA`, `ghp_`).
- [ ] No new external hosts added to CSP without documentation in `security/HEADERS.md`.
- [ ] No PII written to `localStorage` / `sessionStorage` / IndexedDB.
- [ ] All forms validate on the server, not just the client.
- [ ] All redirects are server-validated (no open redirects).

## Auth

- [ ] All `(authed)` routes have an auth guard.
- [ ] No role-gated content rendered before the role is verified.
- [ ] Session cookies are httpOnly, secure, sameSite.
- [ ] Logout invalidates the server-side session.

## Headers

- [ ] `next.config.mjs` has HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- [ ] No debug headers or verbose error pages in production.

## Dependencies

- [ ] `package-lock.json` is committed and unchanged (or changes are explained).
- [ ] No new dependencies without PR justification.
- [ ] Renovate / Dependabot is up to date.

## Data

- [ ] No new PII fields without updating `security/DATA.md` and the Privacy Policy.
- [ ] Retention periods still match the policy.
- [ ] Backups tested within the last 30 days.

## Infrastructure

- [ ] TLS grade A on SSL Labs.
- [ ] Edge rate limits in place.
- [ ] WAF rules reviewed.
- [ ] Logs shipping to central store with auth-anomaly alerts.

## Process

- [ ] PR reviewed by at least one human + one security-trained agent.
- [ ] Threat model reviewed if architecture changed.
- [ ] Graphify refreshed (`.agents/tools/verify-graphify.sh`).
- [ ] `security/AUDIT-<date>.md` updated.

## Sign-off

| Role | Name | Date |
|---|---|---|
| Engineer | | |
| Security | | |
| Tech lead | | |
| Product | | |
