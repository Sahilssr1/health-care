# Bihar Healthcare Conclave — shared VPS deployment preparation

Approved destination: existing Hostinger KVM 2 hosting NovaStay Hotels.
Event domain: biharhealthcareconclave.com
Production origin: https://biharhealthcareconclave.com

## Current status
Only local preparation completed. No authorised VPS terminal is currently accessible; live capacity, backups, routing and port availability remain unverified. No server, DNS, database or NovaStay change has been made.

## Read-only inspection first
- Confirm VPS identity from the signed-in Hostinger dashboard; do not rely on an old documented IP.
- Inspect CPU/load, available memory/swap, disk space/inodes and Docker usage without scanning secrets.
- List container names/images/health/ports, Compose projects and port listeners. Do not print container environments or full docker inspect output.
- Identify the existing reverse proxy and certificate renewal workflow, without printing credentials. Check whether routing can accept an independent event vhost.
- Establish NovaStay HTTPS, health and readiness baseline. Verify existing backup timestamps, archive checks and restore evidence; do not run restores against existing databases.
- Verify /opt/bhc2026, bhc2026 project/network/volume names and loopback port 3106 are unoccupied.

## Proposed isolated deployment
Separate /opt/bhc2026 release directory, Compose project bhc2026, private PostgreSQL 16 container and bhc_database volume, independent database credentials. App binds only 127.0.0.1:3106. Database publishes no host port. No NovaStay volumes, users, credentials, containers or networks reused.

Compose resource limits are provisional: app 768 MB / 0.75 CPU, database 512 MB / 0.50 CPU. Actual free headroom must be checked. Image builds can consume extra shared resources; prepare images off-server or a reviewed bounded build workflow if capacity warrants it.

Google worker stays disabled per user's decision to defer that work. Email stays disabled until SMTP is configured. Do not claim delivery or Sheet sync. Create a real admin securely before exposing administrative functionality.

## Approval point
After inspection, present the exact proposed commands and routing changes with observed capacity, backup evidence and rollback. Request approval for any activity that could affect existing services, including shared-resource image builds, firewall/DNS changes and shared proxy configuration/reload. Never restart or edit NovaStay services, database, containers or configuration. If adding a route requires a forbidden existing configuration change, stop and present the constraint.

## Launch checks and rollback
Run only BHC migrations against its new database. Check BHC container health and HTTP on loopback before routing. Obtain the event certificate using the approved existing workflow without replacing existing certificates. Verify HTTPS/domain metadata, form save/readback and secure admin cookies, then compare NovaStay baseline again. No deployment success until those checks pass.

Rollback is scoped to the newly added event route/application. Preserve the BHC data volume. Never use global prune, system upgrades, compose down on NovaStay, database resets or down -v.
