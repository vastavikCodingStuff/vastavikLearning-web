# WORKFLOW.md — Branching, PR, Release

## 1. Branching

- `main` — production. Always green. Protected.
- `feat/<name>` — features.
- `fix/<name>` — bug fixes.
- `chore/<name>` — non-functional changes.
- `docs/<name>` — documentation only.
- `security/<name>` — security patches.
- `release/vX.Y.Z` — release prep.

Branch from `main`. Keep branches short-lived (< 1 week).

## 2. Commits

Conventional Commits, 50/72 rule. Examples:

```
feat(courses): add CSS filter course
fix(auth): redirect unauthed users on /dashboard
chore(deps): bump next to 14.2.16
docs(legal): update refund policy for FY26
security(headers): add CSP frame-ancestors
graphify: refresh community labels
```

## 3. Pull Requests

- Title: Conventional Commit.
- Body: 1-line summary, 1-2 bullets of changes, 1 bullet of how to test.
- At least 1 approval required.
- Squash merge only.
- Delete the source branch after merge.

## 4. Releases

- Tag format: `vX.Y.Z` (semver).
- Tag is created on `main` after squash-merge of `release/vX.Y.Z`.
- Deploy target: Vercel (or chosen host).
- Generate a GitHub release with the changelog excerpt.

## 5. Hotfix Flow

For production-incident fixes (security, outage):

1. Branch from `main`: `security/<short-desc>` or `hotfix/<short-desc>`.
2. Land the minimum change.
3. `bash tools/verify-build.sh && bash tools/verify-security.sh` — both must be green.
4. Squash-merge into `main` with `[HOTFIX]` prefix in title.
5. Delete branch.
6. Notify in `#incidents` channel.

## 6. Graphify Refresh

Any commit that touches `src/` MUST trigger a graphify refresh. CI should run `bash tools/verify-graphify.sh` and fail the build if `graphify-out/GRAPH_REPORT.md` is stale.

## 7. After every squash-merge

- Pull `main`.
- Delete the merged branch locally: `git branch -d <branch>`.
- Update CHANGELOG.md.
