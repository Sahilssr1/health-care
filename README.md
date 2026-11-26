Live URL: https://biharhealthcareconclave.com/ — [actual deployment record](deploy/LIVE_DEPLOYMENT.md). Earlier preparation instructions below are retained for reference; do not rerun launch operations blindly.

# Bihar Healthcare Conclave 2026

Next.js + TypeScript + PostgreSQL + Prisma application. Latest master prompt is authoritative: **free registration, no sponsor registration, Friday 11 December 2026**, 9 AM–9 PM IST, Urja Auditorium, Patna. No payments or invented speakers/sponsors. Public copy is in `lib/content.ts`; all original logo bytes are preserved under `public/logos`.

## Local setup

1. Install Node 22 or newer and PostgreSQL 16 or newer (or use Docker).
2. `npm ci`
3. Copy `.env.example` to `.env`; configure your separate database and `APP_ORIGIN` matching the browser origin exactly. Use a URL-encoded database password in a manually supplied `DATABASE_URL`. Do not commit `.env`.
4. `npm run db:migrate` then `npm run db:seed`. Seed creates no participants, credentials or fake statistics.
5. `npm run admin:create -- your-admin-email` with a unique password of at least 14 characters supplied on stdin from your local password manager or secret store. Never put passwords in shell arguments/history or chat. There is no default administrator.
6. `npm run dev`, visit `http://localhost:3000`. The listener is loopback-only. `APP_ORIGIN=http://localhost:3000`.
7. `npm test`; `npm run build`.

Integration tests: `npm run test:integration`, only with an isolated database named `bhc_test` and the app running at `http://localhost:3000`. Tests reject other database names and remove their own synthetic fixtures. Do not point tests at production. Tests cover actual database writes, duplicates, admin access, CSV, sessions, CSRF, attendance and rate limits. Do not seed demo leads into production.

## Implemented behaviour

- Home, about, vision, programme, participant categories, awards, nursing quest, hackathon, exhibition, partnership information, official partners, FAQ, contact, privacy/terms, confirmation and admin routes.
- Server validation, privacy consent version/timestamp, honeypot, DB-backed atomic rate limits, unique email constraint and unpredictable reference. Failed database writes produce an error, never success. A repeated email returns a helpful duplicate error without exposing its reference publicly.
- Protected admin dashboard, search, category/attendance filters, pagination, category/student/medical/engineering statistics, city/institution aggregates, IST daily trends, participant detail, streamed CSV usable in Excel, email status, manual attendance and audit actions.
- Salted scrypt passwords, hashed opaque session tokens, 8-hour expiry, HttpOnly/SameSite cookies, exact-origin mutation checks, TLS-only production session configuration, security headers and private records. Single admin permission level; no public user accounts. Logout revokes the session. No QR check-in is enabled.
- Email outbox stored alongside the registration. Schedule `docker compose -p bhc2026 run --rm tools npm run email:worker` every minute **after SMTP is configured**. Uses TLS, retries, claim locking, deterministic message IDs and no participant logging. SMTP delivery is at-least-once: a crash after delivery may cause a repeated email; it never creates a repeated registration. Before enabling email after an unconfigured launch, deliberately move eligible `not_configured` rows to `pending` via a reviewed DB operation.
- Health endpoint, sitemap, robots, metadata and 1200×630 PNG social artwork. Real-domain metadata verification remains a launch check. After a local production build, `npm start` runs the standalone server; set HOSTNAME to 127.0.0.1 for local-only access.

## Google Sheets registration mirror

The private organiser Sheet is linked in `lib/google-sheets-target.json` and [GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md). Every registration has a persisted sync revision/status. The optional worker copies all participant fields, confirmation/email status, consent and attendance; Google failures do not invalidate the database registration. The admin dashboard shows synced/pending records and a private Sheet link. **Automatic sync is not activated: Google server write credentials are still required.** The chat connector's Google login is not a server credential. Read the setup guide before enabling the optional `sheets` Compose profile. Keep service-account keys outside source and images.

## NovaStay-safe deployment plan

**No VPS action has been performed. Do not run these steps before authorised inventory, backup verification and approval for shared infrastructure changes.** Resource limits in Compose are provisional; they do not establish capacity or isolation under peak load.

1. Using the organiser's authorised SSH access, inspect CPU/RAM/disk, port listeners, Docker projects, PostgreSQL services, existing proxy ownership and NovaStay baseline health. Do not print secrets. Confirm 3106 is free and test capacity under event traffic.
2. Verify NovaStay backups and restore procedure without changing its data. Reserve an independent directory such as `/opt/bhc2026`, Compose project `bhc2026`, separate database user/name/password and environment file. Check project/volume names do not already belong to another deployment.
3. Configure `.env`: final HTTPS `APP_ORIGIN`, `COOKIE_SECURE=true`, database credentials and optional SMTP. Compose creates a database with no published port and app listener `127.0.0.1:3106`. Use an alphanumeric random database password for Compose interpolation, or supply a correctly encoded DATABASE_URL separately. Never share NovaStay credentials or volumes.
4. Build images: `docker compose build --no-cache app`. Start only the BHC database: `docker compose up -d db`. Apply migrations: `docker compose run --rm tools npm run db:migrate`. Start the BHC app: `docker compose up -d app`. Connect app to the Nginx proxy network: `docker network connect --alias bhc2026-event-app novastay-network bhc2026-app-1` and reload Nginx: `docker exec novastay-nginx-1 nginx -s reload`.
5. Finalise domain and point its A record to `200.97.172.67` **only after deployment safety is established**. Do not add an AAAA record without verified IPv6 routing. Obtain a certificate using the existing approved certificate workflow. The example new vhost must be adapted, reviewed and approved before installation. Back up shared proxy configuration, run `nginx -t`, prepare rollback, and use a validated reload only; never restart NovaStay services. Do not overwrite shared proxy config or bind new containers to ports 80/443.
6. Check domain resolution, HTTPS, correct forwarding, secure admin cookies, mobile/desktop rendering, free registration saved/retrievable and email delivery. Set external health/error alerts without sending participant data. Verify NovaStay baseline health again. Only then announce launch.

Rollback: route the new event vhost to a maintenance page or restore its backed-up vhost only. Stop only `bhc2026` app if needed. Preserve the BHC database volume. Never use `down -v`, `docker system prune`, database resets or system upgrades. Never touch NovaStay containers, code, database, environment or services.

## Backups and operations

`deploy/backup.sh` creates a restricted PostgreSQL custom-format dump and checks archive readability. This is **not restore verification**. Schedule after approval, encrypt and copy off-host, define retention, and regularly restore into a separate verification database with `pg_restore`, checking schema and record counts. Never restore into NovaStay or overwrite live BHC data. Back up environment secrets through a secret manager, separately from source. Monitor disk, database size, worker delivery failures and health. Periodically delete expired sessions/rate-limit rows in a scoped maintenance operation. Establish an organiser-approved participant retention/deletion process before launch.

## Remaining launch inputs

- Approved `index.html`, `CODEX_START_HERE.md`, `LAUNCH_COPY.md` were not present in the retrieved attachments or workspace; matching the prior prototype cannot be verified.
- Organiser approval of final public copy, privacy/terms, retention period and service-provider disclosures.
- Final domain, DNS access, authorised VPS access, verified backups, capacity assessment and shared-proxy approval.
- Production secrets and real administrator provisioning; SMTP provider credentials and sender-domain authentication (SPF/DKIM/DMARC).
- Docker image/Compose runtime validation on Linux, restore drill, load testing, external monitoring, HTTPS and real email verification.

This handoff is source and local verification, not a claim of live deployment or completed operational security review.


