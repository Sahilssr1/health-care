# Latest release — 15 October 2026

Enhancement deployed to https://biharhealthcareconclave.com. Public programmes: /programme. Content manager: /admin/content (existing admin login). Active app image: bhc2026-app-enhanced-20261015-r3:latest. Existing records and NovaStay containers/proxy retained. See docs/ENHANCEMENT_VERIFICATION.md and docs/ENHANCEMENT_DEPLOYMENT.md for actual checks, missing official content, external issues and rollback.

---

# Live status — 12 October 2026

Deployed at https://biharhealthcareconclave.com/ on the approved existing KVM 2. See [verified deployment and remaining work](deploy/LIVE_DEPLOYMENT.md). The report below is the historical local handoff before deployment; its deployment blockers are superseded only where the live report explicitly records completion.

---

# Implementation and verification — 12 October 2026

## Completed locally

- All requested public page topics, original organiser/partner branding, responsive CSS layouts, accessible form labels/focus/error states, free-registration and confirmation experience.
- PostgreSQL schema and applied migration; server validation, consent logging, unique email/reference, duplicate protection, anti-spam/rate limiting and failure handling.
- Protected admin login/logout, expiring sessions, registration statistics and breakdowns, participant search/filters/details, streamed CSV for Excel, manual attendance and audit log.
- Email outbox and retry worker, environment template, empty seed, Docker/Compose, independent event proxy example, backup script and NovaStay-safe deployment/rollback instructions.
- Metadata, sitemap, robots, security headers, health endpoint and PNG social artwork.

## Actual checks

- Eight core tests passed.
- Seventeen integration groups passed against real isolated local PostgreSQL, on both the development and optimized production server. Covers 20 route responses, successful engineering registration, DB retrieval, concurrent duplicates, access denial, wrong password, protected cookies, real dashboard records, detail view, filtered CSV, CSRF rejection, duplicate attendance prevention/audit, expired session, logout and rate limits.
- Production cookie check verified Secure, HttpOnly and SameSite=strict. This was loopback HTTP testing with explicit cookie replay, not an HTTPS/browser test.
- Database outage: registration returned HTTP 503 without a confirmation reference.
- All four originals compared by SHA-256 and unchanged.
- Production compilation/type checking passed. Dependency audit reported zero known vulnerabilities after targeted updates.
- Final packaged standalone server passed homepage, registration, admin entry, PostgreSQL health and PNG social image response checks, including PNG metadata on the homepage.
- Docker Compose configuration parsed successfully; Docker engine was stopped, so images/containers were not built or executed.
- Synthetic participant/admin fixtures removed after each integration run. No real administrator or fake leads seeded.

## Pending and blockers

- Prior approved index.html, CODEX_START_HERE.md and LAUNCH_COPY.md not available. Visual fidelity to the earlier prototype is unverified.
- The first browser review was blocked by timeouts. During the poster-matched theme revision, desktop at 1440 pixels, mobile at 390 pixels and mobile registration layout were visually inspected, with no horizontal document overflow. Screenshots are included separately. A comprehensive accessibility review and complete browser form-submission review remain open.
- No SMTP credentials supplied; live email delivery untested. QR check-in is intentionally not implemented; manual attendance is available. CSV is Excel-compatible; native XLSX export is not implemented.
- Privacy/terms are drafts requiring organiser approval, retention period and service-provider disclosures. Awards/competition rules, speakers and schedules remain awaiting approved copy.
- No domain selected, DNS access, production secrets/admin provisioning, authorised VPS session, capacity inspection, verified NovaStay backups, shared-proxy approval, container runtime tests, restore drill, load test, external monitoring or HTTPS verification.

## Google Sheet addition

Created and read back a native private Sheet with Summary and Registrations tabs, 17 participant/status/consent columns, filters and frozen headers. Explicitly shared Editor access with the organiser-selected ceoakshay7277@gmail.com and verified it opens in that signed-in browser account. There were zero actual registrations at initial copy; no synthetic leads were uploaded.

Implemented persisted Google sync revisions, retry status, a paced optional worker with scoped service-account authentication, duplicate-safe atomic first writes and metadata-based row updates, resync on attendance/email changes, admin sync status and a private Sheet link. Eleven core/sync tests passed, including mock Google ambiguous writes and row moves. The initial registration recheck passed all seventeen integration groups; seventeen public pages and nineteen actual internal link targets also passed.

**Automatic Google sync is not active or live-auth tested:** no Google service-account credential file is configured. Source, local mock tests and connected-tool Google Sheet access are verified independently. Server Google write access and the worker must be configured and an actual saved registration mirrored before declaring that integration active.

## Deployment status and NovaStay

**Not deployed and not live.** No SSH connection, VPS change, DNS change, shared proxy change or NovaStay restart was performed. No direct risk was introduced to NovaStay by this local work. Safe shared deployment cannot be asserted until capacity, backups, port/resource allocation and proxy ownership are checked. The deployment files are a prepared plan; CPU/RAM limits are provisional, not a tested capacity guarantee.

When deployment is approved and safe, configure the final event A record, production APP_ORIGIN and certificate; rebuild using the actual domain, migrate the separate BHC database, provision a real admin securely, verify a real registration and retrieval over HTTPS, verify email, and recheck NovaStay health. README contains the detailed scoped deployment and rollback procedure.



15 October 2026 pass/poster release: official poster programmes are live; personalised PDF passes attach to every new registration email. All 6 existing registrations' PDF emails accepted by SMTP. Admin details show pass acceptance time/version. App image bhc2026-app-pass-20261015; mail/tools image bhc2026-tools-pass-20261015. 20 unit/mock tests and 20 integration groups passed; rendered one-page Hindi/long-name pass checked. NovaStay services and proxy unchanged. Automatic WhatsApp is blocked by missing provider account; no paid account activated. See docs/DIGITAL_PASS_VERIFICATION.md and docs/DIGITAL_PASS_ROLLOUT.md.

Programme visual update, 15 October 2026: all 15 programme cards now show matching artwork from the supplied official poster. Mobile overflow, category filtering and programme registration links checked. App-only image bhc2026-app-programme-images-20261015:latest; pass design and email worker remain unchanged. See docs/PROGRAMME_IMAGES_VERIFICATION.md.

## Competition release — 29 October 2026
Live: https://biharhealthcareconclave.com/competitions ; admin: /admin/competitions.
Registered-email verification, individual Quiz entry, individual/optional-team Hackathon entry, private PDF/PPTX upload and admin reporting deployed. See docs/COMPETITION_VERIFICATION.md for checks and remaining organiser inputs. Quiz attempt is disabled pending approved questions and final timing. NovaStay container IDs and health unchanged after the approved scoped proxy reload.
