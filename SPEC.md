# Product Specification — Clairmont Advisory Website

## Purpose

Provide Clairmont Advisory with a reliable public website and a secure digital intake flow for customer cases.

## Primary users

- Prospective and existing Clairmont customers
- Clairmont operations staff receiving submitted cases in the internal dashboard

## Core capabilities

- Public service information and conversion pages
- Guided tax forecast intake with a mandatory declaration
- Conditional evidence requirements based on customer answers
- Multi-file document uploads with server-side validation
- Persistent customer register independent of operational case deletion
- Transactional submission notifications
- Entry into the customer payment portal

## System boundaries

- Frontend: presentation, form state and user feedback
- Edge Functions: validation, uploads, persistence, provider integrations and email
- Supabase: Auth, PostgreSQL, Storage, audit data and access control
- Dashboard: internal case handling, forecasts, offers, payments and reporting

## Reliability requirements

- A submission is successful only after all required server-side writes complete.
- Missing mandatory declarations or documents must block final submission.
- Every uploaded file must have a corresponding database record.
- Partial failures must return an actionable error and remain observable in logs.
- Repeated submissions must not silently overwrite unrelated customer files.

## Acceptance

- Desktop and mobile flows complete without console errors.
- Required declarations cannot be bypassed.
- Required evidence rules are enforced server-side.
- Uploaded documents appear in the matching dashboard case.
- Submission email and database logs confirm the same case identifier.
