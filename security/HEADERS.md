# HTTP Security Headers

Configured in `next.config.mjs`. Never disable or relax without security review.

## Reference

| Header | Value | Why |
|---|---|---|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` | Force HTTPS for one year. |
| `X-Content-Type-Options` | `nosniff` | Block MIME sniffing. |
| `X-Frame-Options` | `DENY` | Block clickjacking. |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limit Referer leak. |
| `Permissions-Policy` | `camera=(self), microphone=(self), geolocation=()` | Limit powerful APIs. |
| `Content-Security-Policy` | see below | Strict CSP. |
| `Cross-Origin-Opener-Policy` | `same-origin` | Isolate browsing context. |
| `Cross-Origin-Embedder-Policy` | `require-corp` | Require explicit opt-in for embeds. |
| `Cross-Origin-Resource-Policy` | `same-site` | Block cross-site embedding of our resources. |
| `X-Permitted-Cross-Domain-Policies` | `none` | Block Flash/PDF cross-domain. |

## Content-Security-Policy

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://checkout.razorpay.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com data:;
img-src 'self' data: blob: https:;
connect-src 'self' https://api.razorpay.com https://lumberjack.razorpay.com;
frame-src https://checkout.razorpay.com https://api.razorpay.com;
media-src 'self' blob:;
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'none';
upgrade-insecure-requests;
```

Notes:
- `'unsafe-inline'` for scripts is required by Next.js's hydration. Long-term, move to nonces.
- `https://` for `img-src` allows user-uploaded avatars and OG images.

## Adding a new third-party

1. Add the host to the relevant directive in `next.config.mjs`.
2. Document the change in this file (PR description must include the security rationale).
3. Verify in browser devtools that the new host loads and nothing else is blocked.
