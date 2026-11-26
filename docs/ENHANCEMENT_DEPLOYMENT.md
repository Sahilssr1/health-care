# 15 October 2026 enhancement release

## Scope and invariants

Keep the existing NovaStay application, database, containers, proxy configuration, certificates, DNS and environment unchanged. Existing BHC PostgreSQL data, original logos, admin account and email worker are retained. No new hosting, payments or sponsor-registration workflow.

The latest user approved publishing all 15 programme areas on one page with details pending. Facebook, Instagram and X links were supplied by the user. Unverified QualiNova social links and unconfirmed speaker/session details remain unpublished. Public time and “free” wording remain hidden per the user's earlier explicit display instructions; registration has no payment workflow.

## Database upgrade

`202610150001_enhancements` only adds Registration columns with compatible defaults, Admin.role (existing accounts retain administrator access), and ContentRecord. It does not delete, rename or reclassify existing participants. New forms use 5 participant types and 57 categories. Legacy submissions/categories remain supported. Optional communications consent is separate from required privacy acceptance; new submissions record consent version 2026-10-15.

`scripts/seed.ts` inserts missing content collections only. Existing edits and registrations are not overwritten on repeat runs. Managed collections: programmes, participants, partners, socials, settings, speakers and website pages. Content edits validate on the server, require same-origin authenticated admin/editor access, compare revisions to prevent overwrites and create audit records. Viewers can read reports; only administrators export data, change status or check in participants. Account/role provisioning is not publicly exposed.

## Backup and deployment procedure

1. Record existing container IDs/start times, resource availability and proxy checksum before changes. Check each website's HTTPS baseline separately.
2. Back up BHC source and its own database. Validate the custom dump and restore to an isolated temporary BHC database, then remove only that temporary database. Keep original backups.
3. Transfer application code only to `/opt/bhc2026/source`; verify SHA-256. Do not replace server `.env`, secret files, deployment overlays or original public assets.
4. Build runner and tools images serially, bounded to one CPU and 2 GB build memory. Keep previous working images.
5. Validate BHC Compose configuration with all existing overlays and email profile. Apply migrations using the new tools image, then run create-only content seed.
6. Run a temporary BHC release-check container on the BHC private network and loopback-only port 3107. Use the existing application's environment in a root-readable temporary file without displaying it. Check health, all public routes, programme contents, anonymous admin restrictions, validation and duplicate rejection. Do not send mail or add synthetic production registrations; use a rolled-back database transaction for new-field persistence checks.
7. Change only the BHC app image in its release overlay. Recreate **only** BHC app with `up -d --no-deps --no-build app`, using the existing compose.yml, VPS, ACME, release and email overlays plus email profile. Never use `down`, `--remove-orphans`, broad prune or NovaStay Compose commands.
8. Check HTTPS, sitemap, robots, registration form and all 15 programme areas. Compare NovaStay container IDs/start times and proxy checksum; verify BHC original data remains intact. Remove temporary release-check container/environment file after verification.

No Nginx reload, certificate change or DNS change is needed for this enhancement.

## Rollback

If validation fails, keep the existing live app. After switching, restore the previous app image (`bhc2026-app-partners:latest`) in the BHC release overlay and recreate only the app with the same no-dependency command. The old app and existing email worker remain compatible with the additive database schema. Do not drop columns, reset the database or restore an older dump over new live registrations. Restore source from the BHC-only archive separately if needed. Database recovery requires reviewing subsequent registrations first.

## Missing official content / limitations

- Final programme formats, speakers, session schedules, eligibility, nomination/submission rules and recognition details.
- QualiNova official social URLs; Conclave LinkedIn and YouTube URLs.
- Automatic WhatsApp confirmations are not enabled; links open a contextual manual chat.
- Google Sheets sync still requires its previously deferred service connection; PostgreSQL and authenticated CSV reports remain the source of registration data.
- Existing privacy policy remains an organiser-review draft pending retention/provider approval.
- Baseline inspection found NovaStay's HTTPS certificate expired before this release; its services remain healthy. No NovaStay certificate change is authorised by this enhancement.
- Hostinger showed VPS expiry 16 October 2026 with auto-renewal on. Billing/renewal was not changed.

See ENHANCEMENT_VERIFICATION.md for actual release results.

## Active release

Application: bhc2026-app-enhanced-20261015-r3:latest. Migration tools: bhc2026-tools-enhanced-20261015:latest. Existing email worker remains bhc2026-tools-mail:latest. The previous working application image and all original backups are retained for rollback. Original public images remain unchanged; responsive derivatives are served from Next image optimisation using the app's existing writable cache mount.
