# Partner links and automatic confirmation email — 12 October 2026

Live partner logo/name/Visit Website links on homepage, official partners page and footer: https://qualinovahub.com/ , https://www.sparkfusion.co.in/ , https://novastayhotels.com/ . Each destination returned200; links use new tabs with noopener/noreferrer.

Official sender selected by user: info@biharhealthcareconclave.com. Existing Hostinger mailbox Active; provider SMTP hostname smtp.hostinger.com, SSL465 confirmed in dashboard. User entered existing mailbox password in hidden VPS prompt. An early status-check command was accidentally appended before hidden entry completed; extra command bytes removed without displaying the password, and SMTP authentication then verified. No mailbox password changed.

Secret kept only at /opt/bhc2026/secrets/smtp-password (0600, parent0700), read-only mounted into email worker. No plaintext secret in source, images, chat or logs. .env contains nonsecret SMTP settings and secret-file path. App has queued-mail settings; worker owns actual SMTP authentication.

Deployed app image bhc2026-app-partners and tooling bhc2026-tools-mail. Separate supervised bhc2026-email-worker-1 polls outbox every15 seconds, SMTP/server failures back off, individual deliveries retry up to5 attempts, interrupted claims recover. Limits0.25CPU/256MB. Include deploy/compose.email.yml and --profile email with current BHC Compose files for email operations.

Authenticated SMTP verified. User authorised test email recipient ceoakshay7277@gmail.com. Labelled test message sent with test reference, event date11 December2026, Urja Auditorium Patna, website and official contact; not a participant registration. SMTP accepted it; filtered Hostinger outbound delivery log showed Delivered to selected recipient. No synthetic registration added.

One existing Registration with emailStatus not_configured was queued; supervised worker advanced it to sent. Future successful registrations queue confirmation only after database save. Email contains actual saved reference, participant name, event name/date/venue/site/contact, with no event time or free wording. SMTP delivery is at-least-once; inbox placement is not guaranteed. Email failure does not lose database registration.

NovaStay readiness200 and all four existing containers healthy, with unchanged uptimes. Only BHC app replaced/worker added; no shared proxy reload or NovaStay change in this update. Google sync still deferred. Real admin provisioning remains separate pending work.
