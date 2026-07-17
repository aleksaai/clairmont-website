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

The intake flow uses a single multipart submission to `submit-prognose-webhook`. The server validates the request, stores documents, persists the customer register entry, forwards the case to the dashboard workflow and triggers internal email delivery.

## Operational checks

- Verify every form release with a complete E2E submission.
- Confirm the case, declaration data and every uploaded document in the dashboard.
- Confirm matching submission and email log entries.
- Treat any partial upload or bypassed declaration as a production incident.

## Deployment

Frontend deployments follow pushes to `main`. Edge Functions must be deployed explicitly to `ufnxliieaejdvxcanqux` with the correct Clairmont-scoped Supabase access token.

## Immediate reliability focus

Audit the current tax-certificate upload path and enforce the mandatory declaration at both UI and server boundaries. Add regression coverage for incomplete submissions and multi-document uploads.
