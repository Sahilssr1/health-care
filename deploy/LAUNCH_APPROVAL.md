# Approval scope — temporary Conclave launch

Inspection: NovaStay four healthy containers; HTTPS / and /ready 200; 7 GB available RAM, 93 GB free disk. Existing nginx -t passes. Domain currently resolves to 2.57.91.91, not the verified VPS 200.97.172.67.

Proposed actions requiring approval:
1. Upload only BHC source to /opt/bhc2026. Create separate environment secrets and BHC PostgreSQL/app containers, capped by Compose limits. Build with bounded concurrency and monitor resources; stop BHC work if NovaStay health or resources degrade.
2. Join only the new BHC app to existing novastay-network so the proxy can reach alias bhc2026-event-app. No BHC database exposure; no existing container recreation or network change.
3. Change only the Conclave domain A record to 200.97.172.67 after loopback checks. Inspect existing AAAA/www records before proposing changes to them.
4. Back up and hash /root/NovaStay/nginx/compose.conf. Append a uniquely marked event-only HTTP bootstrap block to the existing mounted file without replacing its inode, preserving original bytes. Run nginx -t and reload only if it passes. Never stop, restart or recreate existing containers.
5. Provision a separate event certificate via existing certbot/account, without replacing NovaStay certificates or renewal configuration. If new terms or account registration are needed, pause for the user. Serve ACME challenge through a narrowly scoped event path; prepare the actual challenge workflow before issuing.
6. Append the reviewed event TLS block after its certificate exists; nginx -t followed by graceful reload. Verify public HTTPS, registration DB save, secure admin and NovaStay baseline. No zero-risk guarantee: shared proxy reload and shared CPU/disk create a limited residual risk.

Rollback: remove only the marked event addition by restoring the exact backed-up original bytes into the mounted file, test nginx, then graceful reload; stop only BHC app if needed. Preserve BHC DB volume. Revert only Conclave DNS if needed. Never restore the whole VPS or touch NovaStay DB to roll back this event.

After December: export and securely retain organiser data before removing the event route/app. Remove only event resources after explicit deletion approval; no automatic database deletion or VPS-wide cleanup. No removal date scheduled yet.

No server changes performed. The routing example is prepared, not deployed or runtime-tested. Approval is for the scoped deployment above; any materially different integration requires another review.
