# Clairmont Advisory Website

Public website and digital intake platform for Clairmont Advisory.

## Responsibilities

- Public marketing pages
- Multi-step tax forecast intake under `/prognose`
- Secure document uploads to Clairmont-owned Supabase Storage
- Server-side submission validation and forwarding
- Customer payment portal entry under `/pay`

## Architecture

- React, TypeScript, Vite and Tailwind CSS
- Netlify hosting and routing
- Clairmont Supabase project `ufnxliieaejdvxcanqux`
- Supabase Auth, PostgreSQL, Storage and Edge Functions
- OpenAI for server-side document verification
- Resend for transactional email

The frontend contains no private service credentials. Sensitive integrations run in server-side Edge Functions with secrets stored in Supabase.

## Local development

```bash
npm install
npm run dev
```

Create `.env` from `.env.example` and provide the public Supabase values.

## Verification

```bash
npm run build
npm run lint
```
