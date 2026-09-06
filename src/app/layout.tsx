import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/lib/auth";
import { ToastProvider } from "@/components/Toast";
import { SITE, GLOBAL_KEYWORDS } from "@/lib/seo";
import { SITE_LD } from "@/lib/structured-data";

const BASE = new URL(SITE.url);
const OG_IMG = new URL("/og.svg", BASE).toString();

export const metadata: Metadata = {
  metadataBase: BASE,
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: GLOBAL_KEYWORDS as unknown as string[],
  authors: [{ name: SITE.publisher, url: SITE.url }],
  creator: SITE.publisher,
  publisher: SITE.publisher,
  category: "education",
  classification: "Education, E-Learning, Computer Science",
  formatDetection: { email: false, address: false, telephone: false },
  referrer: "strict-origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
      "en": "/",
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    locale: SITE.locale,
    images: [
      { url: OG_IMG, width: 1200, height: 630, alt: `${SITE.name} — ${SITE.tagline}` },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitter,
    creator: SITE.twitter,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [OG_IMG],
  },
  appleWebApp: {
    capable: true,
    title: SITE.shortName,
    statusBarStyle: "default",
  },
  appLinks: {
    web: { url: SITE.url, should_fallback: true },
  },
  other: {
    "theme-color": "#FFE500",
    "color-scheme": "light dark",
    "google-site-verification": "", // set after Google Search Console verification
    "msvalidate.01": "",            // set after Bing Webmaster verification
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFE500" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1A1A" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

const ldJson = JSON.stringify(SITE_LD);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap"
        />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="mask-icon" href="/icon.svg" color="#2563EB" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="rating" content="General" />
        <meta name="distribution" content="Global" />
        <meta name="revisit-after" content="3 days" />
        <meta name="language" content="English" />
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bengaluru" />
        <meta name="geo.position" content="12.9716;77.5946" />
        <meta name="ICBM" content="12.9716, 77.5946" />
        {/* Global structured data — Organization, WebSite, SoftwareApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ldJson }}
        />
        <style>{`
          :root { --font-display: 'Space Grotesk', Inter, system-ui, sans-serif; --font-body: 'Inter', system-ui, sans-serif; --font-mono: 'JetBrains Mono', monospace; }
        `}</style>
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to main content</a>
        <AuthProvider>
          <ToastProvider>
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
