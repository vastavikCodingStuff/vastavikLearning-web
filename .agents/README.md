# .agents/ — Vastavik Learning Web

Agent definitions, conventions, and runbooks for AI assistants (opencode, Claude Code, GitHub Copilot, Cursor, etc.) and human contributors working on this codebase.

## Structure

```
.agents/
├── README.md           # This file — entry point
├── AGENTS.md           # Master behaviour contract for all agents
├── ROLES.md            # Persona / role catalogue
├── COMMANDS.md         # Slash-command catalogue
├── RULES.md            # Code-style and architecture rules
├── WORKFLOW.md         # Branching, PR, release, graphify workflow
├── PROMPTS.md          # Reusable prompt templates
└── tools/
    ├── verify-build.sh     # Run build, lint, type-check
    ├── verify-graphify.sh  # Re-run graphify on the project
    └── verify-security.sh  # Run security audit checks
```

## For AI Agents — Quick Start

1. **Read `AGENTS.md` first.** It is the master contract.
2. Read `RULES.md` before writing code.
3. Read `WORKFLOW.md` before making a branch or PR.
4. For specialised tasks, read the relevant `tools/<name>.sh` or follow the relevant role in `ROLES.md`.

## For Human Contributors

1. `WORKFLOW.md` — how to branch, commit, PR, release.
2. `RULES.md` — coding conventions.
3. `tools/verify-*.sh` — local verification helpers.

## Status

| Component | Owner | Status |
|---|---|---|
| AGENTS.md | @vastavik | ✅ active |
| ROLES.md | @vastavik | ✅ active |
| COMMANDS.md | @vastavik | ✅ active |
| RULES.md | @vastavik | ✅ active |
| WORKFLOW.md | @vastavik | ✅ active |
| PROMPTS.md | @vastavik | ✅ active |
| tools/ | @vastavik | ✅ active |
