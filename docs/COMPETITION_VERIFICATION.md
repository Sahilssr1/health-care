# Verified checks (local isolated test database)

- 25 unit/mock tests: general registration, validation/consent, CMS schemas, CSV escaping, passwords/origins, original PDF MIME and Hindi/long names, Google sync idempotency, competition rules, code encryption/challenge binding, PDF/PPTX bounds, macro and unsafe ZIP path rejection.
- 17 existing integration groups: PostgreSQL health, public routes, general registration persistence/duplicates, anonymous PII protection, admin sessions, CSV, origin enforcement, attendance/audits, expiry/logout and database rate limits.
- 3 existing enhancement integration groups: expanded registration, CMS role/origin/schema/concurrency/draft handling, advanced filters/export/status.
- 5 new competition integration groups: actual registered-email code flow, generic unknown-account response, CSRF, brute-force bounds/replay, secure sessions; quiz individual/team restriction and optional Hackathon teams; private upload/download and owner/admin roles; concurrent single attempt, timer/expiry, answer-key secrecy, server score and publication/locked bank; admin reporting/export/viewer and session revocation.
- Production build succeeds on patched Next version. Browser UI and final live verification recorded after deployment.

## Live deployment — 29 October 2026

- Additive competition migration applied; app and email worker replaced with competition images. Live health and competition page returned HTTP 200.
- Anonymous session, upload and admin access rejected (401). 20 KB upload/admin requests reached authentication; unchanged general-registration limit rejected 20 KB with 413.
- Approved proxy locations only: upload 9 MB; admin competition settings 640 KB. Syntax validation and graceful reload succeeded. Proxy bytes outside the Conclave TLS block match the backup.
- All four NovaStay container IDs remain unchanged and healthy; BHC database and ACME containers unchanged. Disposable canary and its environment file removed.
- Official SMTP authentication verified. No live competition registrations or quiz attempts created during checks (both counts 0). Mailbox delivery of a real competition OTP was not tested; the owner's email was not a confirmed registration. The complete email-code flow passed in the isolated integration database.
- Public desktop/mobile views inspected; mobile document width did not exceed viewport. Screenshots in docs/proof/competitions-live-*.png.
- Quiz attempts remain disabled: no approved question bank/final window supplied. Proposed dates: 4 and 5 December. No invented question bank or award rules published.
