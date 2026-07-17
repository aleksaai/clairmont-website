# Clairmont Advisory Website — Engineering Context

## Status

Production application hosted on Netlify. The backend is the Clairmont-owned Supabase project `ufnxliieaejdvxcanqux`.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn/Radix primitives + Motion
- Supabase PostgreSQL, Storage and Edge Functions
- OpenAI for server-side document verification
- Resend for transactional email

## Critical flows

1. `/prognose` gathers the complete customer declaration and supporting documents.
2. The browser sends one multipart request to `submit-prognose-webhook`.
3. The Edge Function validates the payload, uploads documents, writes the permanent register and forwards the case into the dashboard workflow.
4. Email delivery is handled server-side and logged.

## Operating rules

- Never expose service-role or provider secrets in the frontend.
- Keep uploads and submission persistence server-side.
- A successful UI state requires a confirmed server response; do not fail silently.
- Every change to the intake flow needs an end-to-end test with required and optional documents.
- Deploy Edge Functions only to project `ufnxliieaejdvxcanqux`.

## Commands

```bash
npm install
npm run dev
npm run build
```
