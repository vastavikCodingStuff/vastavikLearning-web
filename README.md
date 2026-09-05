# Vastavik Learning — Web

A high-performance, fully responsive **NeoBrutalist** web version of the Vastavik Learning platform. Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS** and a custom CSS design system.

> Generated from the Kotlin Android app at [`../vastavikLearning-app`](../vastavikLearning-app) — every screen, dialog, and feature has a web counterpart.

---

## Features

- **Auth** — Email/password, Google, GitHub (client-side mock)
- **Dashboard** — Streaks, XP, stats, continue-learning, recommendations
- **Courses** — Listing, search, filter, 9 detail pages (Python, JS, Web, AI/ML, SQL, Android, C, Security, Full-Stack)
- **Lesson** — Video player, markdown notes, in-browser code editor with sandbox
- **Practice** — In-browser code editor (Python/JS/Java/C++/C/SQL) with Judge0-style execution
- **Quiz** — 10-question timed CS quiz with explanations
- **Meetings** — 2×2 video grid, live chat, participants, mute/cam/screen-share controls
- **AI Chat** — Streaming-style AI tutor with context-aware replies
- **Whiteboard** — Pen, rectangle, ellipse, line, arrow, text, eraser, color palette, undo, PNG export
- **Profile / Settings / Notifications / Leaderboard / PYQ Archive**
- **Pricing** — Free, Pro, Team plans with **Razorpay UPI Autopay** integration scaffold
- **Legal** — Terms, Privacy, Cancellation & Refund, Shipping & Exchange (all required for Razorpay onboarding)

---

## Design System

- **Neo-Brutalist** — Hard offset shadows, thick black borders, bold typography
- 6-color accent palette: Yellow `#FFE500`, Pink `#FF2D78`, Blue `#2563EB`, Lime `#00FF66`, Orange `#FF6600`, Purple `#9933FF`
- Auto **dark mode** (prefers-color-scheme)
- Fully **responsive** — works on phone, tablet, desktop
  - Hamburger menu → full-screen overlay with vertical centered list of all routes
  - 4-tier breakpoints (700px, 900px, 1200px)

---

## Tech Stack

- **Next.js 14** (App Router, route groups, SSG)
- **TypeScript** (strict)
- **Tailwind CSS 3** + custom CSS design system
- **react/no external UI lib** — everything is custom

---

## Project Structure

```
src/
├── app/
│   ├── (authed)/           # Auth-guarded pages with noindex + ClientLayout
│   │   ├── layout.tsx
│   │   ├── ClientLayout.tsx
│   │   ├── dashboard/
│   │   ├── profile/
│   │   ├── settings/
│   │   └── notifications/
│   ├── courses/            # Listing + [slug] dynamic route with JSON-LD
│   ├── about/              # layout.tsx + page.tsx (BreadcrumbList)
│   ├── contact/            # layout.tsx + page.tsx (FAQ JSON-LD)
│   ├── pricing/            # layout.tsx + page.tsx (FAQ + Product JSON-LD)
│   ├── lesson/, practice/, quiz/, meetings/, ai-chat/, whiteboard/
│   ├── leaderboard/, pyq/
│   ├── login/, signup/, forgot-password/  # noindex
│   ├── terms/, privacy/, refund/, shipping/
│   ├── globals.css         # Full NeoBrutalist design system
│   ├── layout.tsx          # Root layout (global metadata + JSON-LD)
│   ├── page.tsx            # Landing page (Org + WebSite + SoftwareApp)
│   ├── robots.ts           # Dynamic robots per user-agent
│   └── sitemap.ts          # Dynamic sitemap with all routes + courses
├── components/
│   ├── Navbar.tsx          # Responsive nav + mobile full-screen overlay
│   ├── Footer.tsx
│   ├── Sidebar.tsx
│   ├── Toast.tsx
│   └── JsonLd.tsx          # Client JSON-LD component
├── lib/
│   ├── auth.tsx            # Auth context (localStorage)
│   ├── seo.ts              # SITE, NAV_ROUTES, KEYWORDS config
│   ├── metadata.ts         # makeMetadata() helper
│   └── structured-data.ts  # JSON-LD schema generators
└── .agents/                # Agents documentation
```

---

## Getting Started

```bash
# Install
npm install

# Dev server
npm run dev        # http://localhost:3000

# Production build
npm run build
npm start

# Type-check / lint
npm run lint
```

---

## Routes (27)

| Route | Description |
|---|---|
| `/` | Landing page |
| `/login`, `/signup`, `/forgot-password` | Auth |
| `/dashboard` | Authed dashboard |
| `/courses`, `/courses/[slug]` | Course catalog + detail |
| `/lesson` | Lesson player + sandbox |
| `/practice` | In-browser code editor |
| `/quiz` | Timed CS quiz |
| `/meetings` | Live classroom UI |
| `/ai-chat` | AI tutor chat |
| `/whiteboard` | Drawing canvas |
| `/profile`, `/settings`, `/notifications` | User |
| `/leaderboard` | Rankings |
| `/pyq` | Previous-year questions |
| `/pricing` | Plans + Razorpay UPI Autopay |
| `/about`, `/contact` | Info |
| `/terms`, `/privacy`, `/refund`, `/shipping` | Legal (Razorpay required) |

---

## Razorpay UPI Autopay

The pricing page scaffolds Razorpay's subscription checkout with UPI Autopay enabled:

```ts
const options = {
  key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
  subscription_id: "sub_xxx",
  method: { upi: true, card: true, netbanking: true, wallet: true },
  recurring: 1,
  // ...
};
new (window as any).Razorpay(options).open();
```

Add `NEXT_PUBLIC_RAZORPAY_KEY` to `.env.local` and the four legal pages (Terms, Privacy, Refund, Shipping) are already in place for compliance.

---

## SEO

Full SEO implementation across all 27 routes:

- **Metadata**: per-page `<title>`, `description`, `keywords`, Open Graph, Twitter cards, canonical URLs
- **Structured Data**: `Organization`, `WebSite`, `SoftwareApp` (global), `Course` + `BreadcrumbList` (9 course pages), `FAQPage` (pricing/contact), `Product` (Pro plan)
- **Dynamic `robots.ts`**: Googlebot/Bingbot rules, authed routes `noindex`
- **Dynamic `sitemap.xml`**: all 27 routes + 9 course detail pages
- **PWA**: `manifest.json`, icons, theme-color
- **Accessibility**: skip-link, `lang="en-IN"`, semantic HTML

See `.agents/SEO.md` for full documentation.

---

## Knowledge Graph (`graphify-out/`)

Run `python _refresh_graphify.py` for an AST-level map of the entire codebase. See `graphify-out/GRAPH_REPORT.md` and `graphify-out/graph.html` (open in any browser).

- 309 nodes · 429 edges · 47 communities
- 100% EXTRACTED (no LLM cost)
- Key abstractions: `useToast()`, `useAuth()`, `Sidebar()`, `Navbar()`, `compilerOptions`

---

## License

Proprietary. © Vastavik Education Pvt. Ltd.
