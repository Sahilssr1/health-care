# Verification, 15 October 2026 — programme poster and digital passes

Local: production build and TypeScript passed. 20 unit/mock tests and 20 integration groups passed against the isolated test database. PDF MIME attachment, one-page output, long bilingual names, exact 15 programme IDs/order, protected admin reporting and registration persistence verified. Sample and long-name PDFs rendered and visually inspected with Poppler; original logos preserved.

Production deployment and SMTP/backfill results are recorded below after verification. WhatsApp automatic sending remains blocked by the absence of a provider account; the proposed utility template and setup requirements are in DIGITAL_PASS_ROLLOUT.md.

Production verified at release:
- App: bhc2026-app-pass-20261015:latest. Email worker/tools: bhc2026-tools-pass-20261015:latest.
- Additive migration 202610150002_digital_pass applied successfully. Official 15 programmes published, historical programme IDs preserved as drafts.
- Official SMTP accepted the authorised preview email to the organiser's Gmail account with a real PDF attachment; no fake registration created.
- All 6 existing registrations now have passSentAt populated and emailStatus sent. This records SMTP acceptance, not confirmed inbox delivery. New registrations use the same durable email/PDF queue.
- Admin participant details show PDF SMTP acceptance time and template version.
- Live HTTPS health returns status ok. Desktop and 390px mobile show 15 programme cards without horizontal overflow.
- All four NovaStay containers, BHC PostgreSQL and ACME retain their pre-release IDs. Shared proxy SHA-256 unchanged. All services healthy; mail worker has no OOM/restarts.
- Private rollback backups: /opt/bhc2026/backups/20261015-pass (source, database dump, original service IDs, proxy hash, previous release/email/tools overlays). Roll back only BHC app/worker overlays; the additive migration is backward compatible. Do not restore the database over newer registrations.
- WhatsApp NOT enabled: no provider account. No paid plan activated. Template/setup requirements prepared.
