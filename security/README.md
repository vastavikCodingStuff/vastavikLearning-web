# security/ — Vastavik Learning Web

Industry-standard security documentation, audit, and policy for `vastavikLearning-web`.

## Layout

```
security/
├── README.md            # This file
├── POLICY.md            # Security policy (what we protect, why, how)
├── THREAT-MODEL.md      # STRIDE-style threat model
├── HEADERS.md           # HTTP security headers reference
├── AUTH.md              # Authentication & authorisation model
├── DATA.md              # Data classification, retention, storage
├── DEPENDENCIES.md      # Supply chain & dependency policy
├── INCIDENT-RESPONSE.md # What to do when something breaks
├── CHECKLIST.md         # Pre-release security checklist
└── AUDIT-2026-09-06.md  # Latest audit report
```

## How to use this directory

| If you are... | Read this first |
|---|---|
| Adding a new route | CHECKLIST.md + AUTH.md |
| Adding a new form | POLICY.md §3 + DATA.md |
| Reviewing a PR | CHECKLIST.md |
| Investigating an incident | INCIDENT-RESPONSE.md |
| Onboarding a new dev | POLICY.md, then everything else |

## Compliance

This codebase targets:

- **OWASP Top 10 (2021)** — see THREAT-MODEL.md
- **India IT Act, 2000 + SPDI Rules, 2011**
- **GDPR** (for any EU users) — see DATA.md
- **PCI-DSS** (delegated to Razorpay for payments) — see `src/app/pricing/page.tsx`

## Contact

Report vulnerabilities to: **security@vastavik.app** (PGP key in `POLICY.md §7`).
