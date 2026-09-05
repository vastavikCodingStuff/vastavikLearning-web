# PROMPTS.md — Reusable Prompt Templates

## 1. Feature request → PR

```
Role: Builder (see .agents/ROLES.md)

Goal: Implement <FEATURE> in vastavikLearning-web.

Constraints:
- Follow .agents/RULES.md strictly
- Reuse existing components
- Mobile + desktop must work
- No new deps without justification
- No `any` in TypeScript
- Add toast feedback for success/error

Deliverables:
1. Code changes under src/
2. Update README.md if behaviour changes
3. Re-run graphify (tools/verify-graphify.sh) — confirm new nodes/edges
4. PR title: conventional commit
5. PR body: summary, changes, how-to-test
```

## 2. Security review

```
Role: Security Officer (see .agents/ROLES.md)

Scope: <files or route>

Checklist:
- [ ] Auth guard on every protected route
- [ ] Input validation on every form
- [ ] No secrets in source or localStorage
- [ ] CSP / headers in next.config.mjs
- [ ] No XSS sinks (dangerouslySetInnerHTML, eval, etc.)
- [ ] No open redirects
- [ ] npm audit clean
- [ ] Dependencies pinned
- [ ] Outbound links use rel="noopener noreferrer"

Output: severity-ordered findings + patches.
```

## 3. Test plan

```
Role: Tester (see .agents/ROLES.md)

Feature: <NAME>
User story: As a <role>, I want <action>, so that <benefit>.

Acceptance criteria:
1. ...
2. ...

Test cases:
| # | Given | When | Then |
|---|-------|------|------|
| 1 | ... | ... | ... |

Negative cases:
- Invalid input → inline error
- Network failure → toast + retry
- Auth expired → redirect to /login
```

## 4. Bug triage

```
Role: Reviewer

Bug: <description>
Repro: <steps>
Expected: <outcome>
Actual: <outcome>

Investigate:
- Where does the bug originate? (UI / state / API)
- Is it a regression?
- What test would have caught it?

Output: 1-line verdict + 1-3 bullets of root cause + proposed fix.
```

## 5. Graph explainer

```
Role: Cartographer (see .agents/ROLES.md)

Question: <natural-language question>

Use: graphify query "<question>" — read the focused subgraph answer.
If a node or community is named, run graphify explain "<node>" for context.
Cite the source file:line.
```
