# Incident Response

> When something goes wrong, follow this. Don't improvise.

## 1. Severity

| Sev | Definition | Example | SLA to ack | SLA to fix |
|---|---|---|---|---|
| **SEV-1** | Active breach, data exfiltration, payment bypass | Razorpay webhook signature bypass | 15 min | 4 h |
| **SEV-2** | Vulnerability with exploit, no active breach | Stored XSS in a profile field | 1 h | 24 h |
| **SEV-3** | Vulnerability, exploit requires unlikely conditions | Open redirect on a legacy page | 4 h | 7 d |
| **SEV-4** | Hardening, no exploit | Missing security header on a subpath | 1 d | 30 d |

## 2. Roles

- **Incident Commander (IC)** — runs the response, makes decisions.
- **Tech Lead** — assesses technical impact, drafts the fix.
- **Comms** — drafts user / regulator / press statements.
- **Legal** — decides disclosure obligations.

The on-call rotation lives in PagerDuty.

## 3. Response phases

### 3.1 Detect
- Automated alerts (anomalous auth, error rate, dependency CVE).
- User report (`security@vastavik.app`).
- Third-party advisory.

### 3.2 Contain
- Disable the affected feature, route, or service.
- Revoke any active sessions / tokens.
- Block offending IPs at the edge.

### 3.3 Eradicate
- Remove the vulnerable code or config.
- Patch or upgrade the dependency.
- Rotate any secrets that may have been exposed.

### 3.4 Recover
- Deploy the fix.
- Verify with the original exploit.
- Monitor for 7 days.

### 3.5 Post-mortem
- Within 5 business days.
- Timeline, root cause, contributing factors, action items.
- Add to `security/INCIDENTS.md`.

## 4. Communication

### Users
- Email within 24 h if PII was reachable.
- In-app banner.
- Public status page.

### Regulators
- India CERT-In: within 6 hours for SEV-1, per IT Act 2000 / SPDI Rules 2011.
- GDPR supervisory authority: within 72 hours if EU users affected.

### Press
- Coordinated through Comms.
- Only after legal sign-off.

## 5. Common scenarios

### Compromised dependency
1. `npm audit` shows a known CVE.
2. Pin or remove.
3. `npm ci` + redeploy.
4. Post-mortem.

### Phishing of a staff member
1. Revoke all sessions for that account.
2. Force password reset + 2FA.
3. Audit admin actions during the window.
4. Notify.

### Data leak
1. Contain the leak.
2. Identify scope (which records, which users).
3. Notify affected users within 24 h.
4. Notify regulators per SLA.
5. Offer remediation (password reset, credit monitoring, etc.).

## 6. Drills

Quarterly: tabletop exercise. Pick a random scenario, walk through phases 1-5 with the on-call team. Document in `security/INCIDENTS.md`.
