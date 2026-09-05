# Authentication & Authorisation

## Current state (web)

The web build uses a **client-side mock** for auth, stored in `localStorage` under the key `vastavik_user`. This is explicitly demo-only and is documented in the README.

When a real backend lands, the mock will be replaced with a session-based flow.

## Planned (production)

### Auth flow
1. User submits email + password.
2. Server validates with bcrypt (cost ≥ 12).
3. Server issues an httpOnly, secure, sameSite=Lax session cookie.
4. Cookie sent on every request; never accessible to JavaScript.
5. Refresh tokens rotated on every login.
6. Logout invalidates the session server-side.

### OAuth
- Google, GitHub.
- State parameter (CSRF).
- PKCE for public clients.
- Email must be verified by the provider before account creation.

### 2FA
- TOTP (RFC 6238).
- Backup codes (10, one-time use).
- Recovery via verified email + ID check.

### Password rules
- Minimum 12 characters (NIST 800-63B).
- No composition rules.
- Check against HIBP `Have I Been Pwned` API (k-anonymity, no plaintext leaves the server).

### Rate limits
| Endpoint | Limit |
|---|---|
| POST /login | 5 / minute / IP, 10 / hour / account |
| POST /signup | 3 / hour / IP |
| POST /forgot-password | 3 / hour / email |
| POST /ai/chat | 60 / hour / user |

## Authorisation

- **Route groups:** `(authed)` requires a valid session.
- **Per-page checks** for role-gated content.
- **API:** every mutation verifies (auth, role, ownership) on the server.
- **No client-side trust:** the role is never stored in `localStorage` for authorisation decisions.

## Session storage (client)

- `localStorage.vastavik_user` is for display only (avatar, name in nav). Not authoritative.
- Cookies (when backend lands) hold the session.
- No PII in `localStorage`.

## Logout

- Clears the session cookie (server-side).
- Clears `localStorage.vastavik_user`.
- Redirects to `/`.
- Invalidates refresh tokens.

## What we don't do

- ❌ Store passwords (only bcrypt hashes).
- ❌ Store payment data (Razorpay only).
- ❌ Use client-side JWTs for authorisation.
- ❌ Email passwords (use signed reset links).
