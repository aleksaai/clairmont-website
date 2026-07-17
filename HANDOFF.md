# Clairmont Advisory Website — Handoff

## Production

- Repository: `aleksaai/clairmont-website`
- Hosting: Netlify
- Domain: `https://clairmont-advisory.com`
- Backend: Clairmont Supabase `ufnxliieaejdvxcanqux`
- Email: Resend
- Document verification: OpenAI via Supabase Edge Function

## Current architecture

The React frontend is independently hosted on Netlify. All sensitive and business-critical operations run in custom Supabase Edge Functions. Customer data, authentication, documents, workflow records and audit information live in the Clairmont Supabase project.

The intake flow uses a single multipart submission to `submit-prognose-webhook`. Every browser session receives a stable UUID. The server validates mandatory confirmations and document presence, stores the original bytes, forwards an exact document manifest to the dashboard and only returns success after the dashboard count and the Resend delivery are confirmed. Retries with the same UUID are idempotent.

Files are accepted independent of extension or MIME type. Zero-byte files and files above 10 MB are rejected explicitly. AI document recognition is advisory; deterministic presence and completeness checks are authoritative.

## Operational checks

- Verify every form release with a complete E2E submission.
- Confirm the case, declaration data and every uploaded document in the dashboard.
- Confirm matching submission and email log entries.
- Treat any partial upload or bypassed declaration as a production incident.
- A successful response must contain matching `submission_id`, `email_sent: true` and equal `dashboard_file_count` / `expected_dashboard_file_count` values.

## Deployment

Frontend deployments follow pushes to `main`. Edge Functions must be deployed explicitly to `ufnxliieaejdvxcanqux` with the correct Clairmont-scoped Supabase access token.

## Reliability hardening (2026-07-17)

- Removed fail-open verification and localStorage `File` restoration bugs.
- Added all previously omitted upload groups, including disability and alimony proof.
- Made storage uploads, signed URL generation, dashboard persistence and email delivery fail closed.
- Added stable submission IDs, exact manifests and retry-safe dashboard delivery.
- Live-tested unknown file formats, exact document counts, email delivery, duplicate retry and rejected incomplete/empty submissions.
