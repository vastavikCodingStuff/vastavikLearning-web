// SEO configuration — single source of truth for site identity.
export const SITE = {
  name: "Vastavik Learning",
  shortName: "Vastavik",
  tagline: "Code. Create. Conquer.",
  description:
    "A high-performance learning platform for ICSE, CBSE and collegiate computer science. Live classrooms, AI tutor, in-browser code editor, OCR exercise scanning, and PYQ archive — wrapped in a bold Neo-Brutalist design.",
  url: "https://vastavik.app",
  ogImage: "https://vastavik.app/og.svg",
  locale: "en_IN",
  twitter: "@vastavik",
  publisher: "Vastavik Education Pvt. Ltd.",
  email: "support@vastavik.app",
  phone: "+91 98765 43210",
  address: {
    street: "Bengaluru",
    region: "Karnataka",
    postal: "560001",
    country: "IN",
  },
  // Social profiles
  sameAs: [
    "https://github.com/vastavikCodingStuff",
    "https://twitter.com/vastavik",
    "https://www.linkedin.com/company/vastavik",
    "https://www.youtube.com/@vastavik",
  ],
} as const;

export const KEYWORDS = {
  global: [
    "Vastavik Learning",
    "online learning platform India",
    "ICSE computer applications",
    "CBSE computer science",
    "B.Tech CSE learning",
    "live coding classes",
    "AI tutor",
    "in-browser code editor",
    "Judge0",
    "Neo-Brutalist UI",
    "PYQ archive",
    "UPI Autopay subscription",
  ],
} as const;

export const GLOBAL_KEYWORDS = KEYWORDS.global;

export const NAV_ROUTES: { path: string; changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"; priority: number }[] = [
  { path: "/",          changefreq: "weekly",  priority: 1.0 },
  { path: "/about",     changefreq: "monthly", priority: 0.6 },
  { path: "/courses",   changefreq: "weekly",  priority: 0.9 },
  { path: "/practice",  changefreq: "weekly",  priority: 0.8 },
  { path: "/quiz",      changefreq: "monthly", priority: 0.7 },
  { path: "/meetings",  changefreq: "weekly",  priority: 0.7 },
  { path: "/ai-chat",   changefreq: "monthly", priority: 0.7 },
  { path: "/whiteboard", changefreq: "monthly", priority: 0.5 },
  { path: "/leaderboard", changefreq: "daily",  priority: 0.6 },
  { path: "/pyq",       changefreq: "weekly",  priority: 0.7 },
  { path: "/pricing",   changefreq: "weekly",  priority: 0.9 },
  { path: "/contact",   changefreq: "yearly",  priority: 0.5 },
  { path: "/login",     changefreq: "yearly",  priority: 0.3 },
  { path: "/signup",    changefreq: "yearly",  priority: 0.3 },
  { path: "/terms",     changefreq: "yearly",  priority: 0.3 },
  { path: "/privacy",   changefreq: "yearly",  priority: 0.3 },
  { path: "/refund",    changefreq: "yearly",  priority: 0.3 },
  { path: "/shipping",  changefreq: "yearly",  priority: 0.3 },
];
