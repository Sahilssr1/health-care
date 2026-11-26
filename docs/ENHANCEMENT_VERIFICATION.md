# Enhancement verification — 15 October 2026

## Implemented and released

- One public Programme page containing all 15 user-approved programme areas, category filters, meaningful descriptions, audiences, benefits, status labels, expandable details and contextual registration/WhatsApp links. No invented speakers, schedules, prizes or eligibility.
- Five participant types and 57 categories. Conditional specialisation and experience/year fields, optional organisation/course/department/state/WhatsApp fields, country, preferred programmes, separate optional communications consent and required privacy acceptance.
- Additive PostgreSQL migration; existing registration IDs, references, categories and admin password/session data preserved.
- Authenticated content manager for programmes, participant categories, approved original partner assets/website links, official social links, homepage copy, six information pages, WhatsApp, announcements and verified speakers. Optimistic revision checks and audit records; server-side schema, origin and role validation.
- Registration reports with search, category, attendance, institution, city, programme and status filters; expanded formula-safe CSV for Excel; audited registration-status changes.
- Existing original-logo design retained. Responsive mobile menu and floating registration/WhatsApp controls, reduced-motion support, scroll reveals, countdown, real registration-count option (off until enabled by admin), audience benefits and 11 informational partnership opportunities.
- Supplied Facebook/Instagram/X profiles published. Missing official profiles remain blank. Confirmation email queue and existing worker retained.
- Canonicals, social previews, Event structured data, sitemap, robots and admin/confirmation noindex preserved; official email/telephone corrected. Public time and “free” labels remain hidden.

## Local verification

- Prisma client generation, additive test-database migration and production build/type checks passed.
- 17 unit/mock tests passed: legacy and expanded categories, validation, draft rejection, CSV injection protection, authentication primitives, report filters, WhatsApp encoding and Google sync identity/retry behaviour.
- 17 existing integration groups passed against isolated `bhc_test`, including persistence, duplicate races, protected sessions, login/logout/expiry, CSRF, export, attendance and rate limits. Secure cookie assertion also passed with the production server.
- Three enhancement integration groups passed against the production build and isolated database: expanded fields/consents/programmes, duplicate handling, CMS authentication/roles/origin/schema/concurrent-edit conflicts, draft exclusion, expanded exports/filters and audited status changes. Viewer attendance/status/export restrictions and relative dashboard redirects were verified.
- Content seed re-run created zero replacements; subsequent added pages collection was inserted without overwriting existing content.
- Browser registration completed on a 390-pixel mobile preview, returned a saved reference and confirmation screen. Fixture removed afterward. Admin login, settings save and removal of unpublished test text worked through the browser; fixture account removed afterward.
- Responsive checks at 390, 768 and desktop widths showed no horizontal overflow. Mobile menu, programme filter (Technology → 2 results), details, programme preselection and conditional category choices worked.

## Production verification

- Before deployment: roughly 6.9 GB memory available; 88 GB disk free; all four NovaStay containers healthy. Their existing uptimes were weeks/months.
- BHC source/database backups saved under `/opt/bhc2026/backups/20261015-enhancement`. Custom database dump was restored into a separate temporary BHC database, checked (6 records), and the temporary database removed.
- Application source transferred through the existing authenticated console, hash-verified. No SSH keys added. No server environment, secrets, mail DNS, proxy or NovaStay files changed.
- BHC-only migration and create-only seed succeeded; 7 managed-content collections created.
- Temporary release-check container tested 18 public routes, 15 programme areas, official links, no public time/free wording, duplicate rejection, validation, CSRF and anonymous admin/export restrictions. A transaction verified new database fields and then rolled back. Production count remained 6; no synthetic registration or email remained.
- Live apex HTTPS returned 200; www HTTPS returned canonical 301. Live browser showed all 15 areas and a working Technology filter. Fresh live browser logged no JavaScript errors. Live mobile registration hierarchy and widths verified without submitting a production record.
- All four NovaStay container IDs remained identical; BHC database, mail worker and ACME IDs also unchanged. Only the BHC app was replaced. Existing proxy checksum matched.
- Existing six registration email statuses were `sent`; no new test message was sent during this release. This is application queue status, not an inbox-delivery receipt.

## Outstanding organiser/external items

Final session/speaker/schedule/eligibility and award/hackathon rules; QualiNova social URLs and Conclave LinkedIn/YouTube; policy retention/provider approval. WhatsApp is manual click-to-chat, not an API confirmation service. Google Sheet sync remains deferred until its dedicated service connection is configured.

NovaStay's certificate was already expired at the baseline HTTPS check. No change was made to repair it. Hostinger showed VPS expiry 16 October 2026 with auto-renewal on; no billing change was made.

Deployment and rollback procedure: [ENHANCEMENT_DEPLOYMENT.md](ENHANCEMENT_DEPLOYMENT.md). Proof images are in `docs/proof`.

## Final image optimisation and cleanup

Active app image: bhc2026-app-enhanced-20261015-r3:latest. Server production build/type checks passed. All five supplied logo files (including alternate Spark logo) and the reference artwork matched their pre-enhancement SHA-256 digests. Responsive Next image derivatives preserve those originals. Canary WebP measurements: logo at 750 pixels / quality 90 = 31,074 bytes versus original 1,956,555; artwork at 1920 pixels / quality 80 = 404,516 bytes versus original 10,961,738; QualiNova sample = 23,030 bytes. All returned HTTP 200. Sizes vary with device and image format.

Medical and engineering student subtotals combine legacy and expanded category names. Temporary release-check container and its private environment file were removed. Local UI/test fixtures and copied test environments were removed; no new production account or password was created.

Final live check: optimized homepage images loaded successfully; fresh live browser had no JavaScript errors. Apex HTTPS returned 200 and www returned 301. All four NovaStay containers remained healthy with original IDs/uptimes; BHC database, existing email worker and ACME helper were unchanged. Final shared proxy checksum matched. Only the BHC app changed. The temporary release-check container and private environment file were absent after cleanup. No error output appeared in the existing email worker's last-five-minute log check.
