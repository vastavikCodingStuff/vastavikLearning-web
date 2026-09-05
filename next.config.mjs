/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const securityHeaders = [
  // HSTS — force HTTPS for one year
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // Block MIME sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Block clickjacking
  { key: "X-Frame-Options", value: "DENY" },
  // Limit referer leak
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Limit powerful APIs
  {
    key: "Permissions-Policy",
    value: "camera=(self), microphone=(self), geolocation=(), interest-cohort=()",
  },
  // Strict CSP — see security/HEADERS.md for rationale
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // 'unsafe-inline' required for Next.js hydration. Long-term: move to nonces. See security/HEADERS.md.
      "script-src 'self' 'unsafe-inline' https://checkout.razorpay.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://api.razorpay.com https://lumberjack.razorpay.com",
      "frame-src https://checkout.razorpay.com https://api.razorpay.com",
      "media-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
  // Isolate browsing context
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // Require explicit opt-in for embeds
  { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
  // Block cross-site embedding of our resources
  { key: "Cross-Origin-Resource-Policy", value: "same-site" },
  // Block Flash/PDF cross-domain
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  // Don't leak referrer from images
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Don't expose source maps in production
  productionBrowserSourceMaps: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  // Disable powered-by header in API too
  ...(isProd && {
    async redirects() {
      return [
        { source: "/admin/:path*", destination: "/", permanent: false },
      ];
    },
  }),
};

export default nextConfig;
