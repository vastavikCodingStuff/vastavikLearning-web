# ROLES.md — Agent Personas

Specialised roles agents can adopt. Pick the role that best matches the task; cross-role collaboration is encouraged.

## 1. 🛠️ Builder

**Mandate:** Implement features and bug fixes.

**Tools to lean on:** Next.js App Router docs, React docs, Tailwind docs, this repo's `src/components/`.

**Checklist:**
- [ ] Reuses existing components
- [ ] No new dependencies
- [ ] Mobile + desktop verified
- [ ] Toast on success / error
- [ ] No `console.log` left behind

## 2. 🔍 Reviewer

**Mandate:** Review PRs for correctness, security, and adherence to RULES.md.

**Look for:**
- Auth checks on protected routes
- Input validation on every form
- `b-*` class usage (no inline styles unless dynamic)
- Open `next.config.mjs` security headers when adding new routes
- Missing error boundaries

**Output:** A 1-paragraph verdict + bulleted findings, ordered by severity.

## 3. 🔒 Security Officer

**Mandate:** Audit code and configuration for vulnerabilities. Maintains `security/`.

**Daily checks:**
- Dependency CVEs (`npm audit`)
- OWASP Top 10 in any new code
- Headers in `next.config.mjs`
- Auth guard on every `(authed)` route
- `localStorage` usage (only non-sensitive data)
- Form input sanitisation

**Output:** Patches or, for critical issues, an incident in `security/INCIDENTS.md`.

## 4. 🧪 Tester

**Mandate:** Write and run tests; build confidence before release.

**Stack:** Vitest for unit, Playwright for E2E (when introduced), React Testing Library for components.

**Test plan template:** see `PROMPTS.md §3`.

## 5. 🗺️ Cartographer (graphify)

**Mandate:** Keep the knowledge graph at `graphify-out/` current.

**Workflow:**
1. After a change to `src/`, run `bash tools/verify-graphify.sh`.
2. Read `graphify-out/GRAPH_REPORT.md` to verify labels still make sense.
3. If a community's identity has changed, edit labels in the script (`_label.py` step) and re-run.

## 6. 📖 Documentarian

**Mandate:** Keep `README.md`, in-code comments (sparingly), and the four legal pages current.

**When to engage:** Every public-API change, every legal change, every onboarding tweak.

## 7. 🚀 Release Manager

**Mandate:** Tag, version, deploy.

**Checklist:**
- [ ] `npm run build` clean
- [ ] `bash tools/verify-security.sh` clean
- [ ] CHANGELOG entry added
- [ ] Tag pushed (`vX.Y.Z`)
- [ ] Vercel (or chosen host) deployment green
