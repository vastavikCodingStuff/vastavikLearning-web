# COMMANDS.md — Slash Commands

Catalogue of slash commands the repo recognises. Most are exposed through `tools/` shell scripts for human use; agents should call the underlying `npm` / `graphify` / `git` commands.

## Build & Test

| Command | Description |
|---|---|
| `/verify` | Run lint, type-check, and build. See `tools/verify-build.sh`. |
| `/lint` | `npm run lint` |
| `/build` | `npm run build` |
| `/dev` | `npm run dev` |
| `/security` | Audit dependencies + headers. See `tools/verify-security.sh`. |

## Graphify

| Command | Description |
|---|---|
| `/graphify` | Full pipeline (detect → extract → build → label → report). |
| `/graphify update` | Incremental — only changed files. |
| `/graphify query "<q>"` | BFS-style scoped answer to a question. |
| `/graphify path A B` | Shortest path between two nodes. |
| `/graphify explain "Node"` | Plain-language explanation of a node. |

## Git / PR

| Command | Description |
|---|---|
| `/branch feat/<name>` | Create a feature branch. |
| `/commit` | Stage + commit with conventional message. |
| `/pr` | Push branch, open PR with body. |
| `/merge-squash` | Squash-merge the PR and delete the branch. |
| `/hotfix` | Same as above but to `main` directly. |

## Conventions for PR titles

`<type>(scope): <description>`

- `feat(courses): add CSS filter course`
- `fix(auth): redirect unauthed users on /dashboard`
- `chore(deps): bump next to 14.2.16`
- `docs(legal): update refund policy for FY26`
- `security(headers): add CSP frame-ancestors`
- `graphify: refresh community labels`

Types: `feat | fix | chore | docs | refactor | test | security | graphify | release`.
