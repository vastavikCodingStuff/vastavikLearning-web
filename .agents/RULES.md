# RULES.md — Code Conventions

## TypeScript

- `strict: true` — never disable.
- No `any` except 1-line external type adapters (e.g. `window.Razorpay`).
- Prefer `type` for shapes, `interface` for extensible contracts.
- One component per file, named export if not a Next page.

## React / Next.js

- Server Components by default. Add `"use client"` only when the component needs state, effects, or browser APIs.
- All pages under `src/app/**/page.tsx`.
- Route groups for shared layouts: `(marketing)` for public, `(authed)` for guarded.
- Use `next/link` for internal navigation, never raw `<a>`.
- Use `next/image` when an image is involved.
- Use `next/font` or the existing Google Fonts link in `layout.tsx`.

## Styling

- Use `b-*` utility classes from `src/app/globals.css`.
- Tailwind is enabled but reserved for layout helpers (`grid`, `flex`, `gap-*`, `mt-*`).
- No new colours, shadows, border widths, or fonts without updating the design system.
- Dark mode is auto via `prefers-color-scheme`.
- Mobile breakpoint: 700px. Tablet: 900px.

## State

- Global state via Context (see `src/lib/auth.tsx`).
- Local state via `useState` / `useReducer`.
- No external state library without a written justification.

## Forms & Validation

- Validate on submit. Never trust client input.
- Sanitize before persisting to `localStorage` (no scripts, no PII).
- Show inline errors next to the field, and a toast on submit failure.

## Files

- File names: `PascalCase` for components, `camelCase` for hooks/utils, `kebab-case` for routes.
- Path alias: `@/*` → `src/*`.

## Comments

- Code should be self-explanatory.
- Comments are for **why**, not **what**.
- No TODOs without owner + deadline.

## Accessibility

- All interactive elements must be reachable by keyboard.
- Use semantic HTML (`button`, `nav`, `main`, `section`).
- ARIA only when semantics can't do the job.
- `alt` text on every `<img>`.

## Performance

- Lazy load heavy components with `next/dynamic`.
- Avoid large client-side bundles on marketing pages.
- Mark icons and images with explicit dimensions.
