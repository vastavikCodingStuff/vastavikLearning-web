# Dependency & Supply-Chain Policy

## 1. Principles

1. **Minimal surface** — fewer packages, smaller attack surface.
2. **Pinned versions** — `package-lock.json` is committed and reviewed.
3. **Trusted sources** — npm registry only. No private mirrors without security review.
4. **Verified integrity** — `npm ci` (not `npm install`) in CI.
5. **Audited regularly** — `npm audit` on every PR.

## 2. Adding a new dependency

Before adding any new package:

- [ ] Is there a standard-library or already-installed alternative?
- [ ] Is the package actively maintained (last commit < 6 months)?
- [ ] Is the license compatible (MIT, Apache 2.0, BSD — never GPL for our code)?
- [ ] Has it been audited by Snyk / GitHub Advisories?
- [ ] What is its install footprint (`npm install` in a scratch dir, check `du`)?
- [ ] Is the package's own dependency tree reasonable?

Document the decision in the PR description.

## 3. Updating dependencies

- Patch updates — automatic via Renovate, weekly.
- Minor updates — manual review, weekly.
- Major updates — RFC + testing + announcement.

## 4. Removing a dependency

When a package is no longer needed, remove it in the same PR that drops the feature. The lockfile will reflect the change.

## 5. Audit cadence

| Cadence | Tool | Fail threshold |
|---|---|---|
| Every PR | `npm audit --audit-level=high` | high / critical |
| Weekly | `npm audit` (full) | medium (review) |
| Monthly | `npm outdated` | review |
| Quarterly | Manual license review | GPL in production = fail |

## 6. Compromised-package response

If a package is compromised (e.g. event-stream, ua-parser-js):

1. Pin to a known-good version or remove.
2. Rotate any secrets that the package could have accessed.
3. File an incident (`security/INCIDENTS.md`).
4. Notify users if their data was reachable.
5. Post-mortem within 5 business days.

## 7. Reproducible builds

- `package-lock.json` is committed.
- `engines` field pinned in `package.json`.
- CI uses `npm ci` (not `npm install`).

## 8. Sub-processors

| Sub-processor | Purpose | Data | DPA |
|---|---|---|---|
| Vercel | Hosting | App data | ✅ |
| AWS / GCP | DB + storage | App data | ✅ |
| Razorpay | Payments | Payment data | ✅ |
| Google | OAuth + Gemini | Email, prompts | ✅ |
| GitHub | OAuth + source | Email, code | ✅ |

Updated annually and on the public Privacy page.
