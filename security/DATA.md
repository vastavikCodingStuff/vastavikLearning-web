# Data Classification, Retention, Storage

## 1. Classification

| Class | Examples | Encryption at rest | In logs? |
|---|---|---|---|
| **Critical** | Payment tokens, session secrets | Yes (KMS) | Never |
| **High (PII)** | Name, email, board, IP | Yes | Hashed only |
| **Medium** | Course progress, quiz answers | Yes | Pseudonymised |
| **Low** | UI preferences, theme | No | OK |
| **Public** | Course catalogue, pricing | No | OK |

## 2. Retention

| Data | Retention | Reason |
|---|---|---|
| Account & PII | Account lifetime + 30 days | Recovery window |
| Payment records | 7 years | Indian tax law |
| AI chat history | 12 months, then anonymised | Service improvement |
| Server access logs | 90 days | Security investigation |
| Analytics (anonymised) | 26 months | Product analytics |
| Backups | 30 days, encrypted | DR |

## 3. Storage

- **Database:** Postgres (when backend lands) on AWS Mumbai / GCP Mumbai.
- **Object storage:** S3 / GCS, encryption at rest, versioning on.
- **Backups:** Daily, encrypted with separate KMS key, retained 30 days.

## 4. In transit

- TLS 1.2+ everywhere. TLS 1.3 preferred.
- HSTS preload.
- Certificate transparency monitoring.

## 5. In the client (this web app)

- `localStorage` is for display preferences only.
- No PII is persisted to `localStorage` (the demo user object is non-sensitive and clearly labelled).
- No tokens in `localStorage`. (When backend lands, sessions are httpOnly cookies.)

## 6. AI data flow

- Prompts and replies are sent to the LLM provider (Google Gemini / OpenAI).
- PII is stripped from prompts where possible.
- Conversations are stored for 12 months for service improvement, then anonymised.
- Users can request deletion via the privacy page.

## 7. User rights (GDPR / DPDP)

- Access — request a JSON export of your data.
- Rectification — edit profile data.
- Erasure — close account, data deleted within 30 days.
- Portability — JSON export.
- Object — opt out of processing.
- Withdraw consent — at any time.

To exercise: Settings → Privacy, or email privacy@vastavik.app.

## 8. Cross-border transfers

- Some sub-processors (Google, OpenAI) are outside India.
- Adequate safeguards in place: Standard Contractual Clauses, encryption in transit, data minimisation.
- See the Privacy Policy for the full list.
