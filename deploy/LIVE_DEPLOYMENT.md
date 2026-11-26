# LIVE deployment — 12 October 2026

URL: https://biharhealthcareconclave.com/
www redirects to the canonical HTTPS domain. Hostinger A record changed only for Conclave: 200.97.172.67, TTL 60. Existing mail and www CNAME records preserved.

VPS: srv1833635.hstgr.cloud, existing KVM 2. Source /opt/bhc2026/source. Independent Compose project bhc2026, PostgreSQL 16/private database and volume, app loopback 3106, app-only connection to existing proxy network. Resource limits app 768 MB/0.75 CPU and DB 512 MB/0.50 CPU. Certificate helper 64 MB/0.10 CPU. Builds capped 2 GB/1 CPU. Server Next build set experimental.cpus=1. Google/email workers not activated.

Temporary upload-only SSH key explicitly approved, restricted to one archive file, and removed immediately after hash verification. Local key removed. No shell access was granted through that key.

Original NovaStay routing file bytes preserved as prefix; only uniquely marked BHC HTTP/TLS server blocks appended. nginx -t passed before two graceful reloads. No NovaStay container restarted, stopped, recreated, upgraded or replaced; database/environment/volumes unchanged. Original proxy backup: /opt/bhc2026/rollback/novastay-proxy.original. Before-TLS rollback: /opt/bhc2026/rollback/proxy-before-tls.

Certificate issued separately for event root/www, valid to 10 January 2027; existing NovaStay certificate unchanged. Existing certbot scheduled renewal was detected, but future post-renew proxy reload and renewal drill have not been verified. Conclave challenge helper and path retained. No new agreement accepted during issuance.

Verified: HTTPS homepage/registration/programme/partners/privacy/terms/admin entry/health/sitemap 200, correct sitemap domain, missing path404, invalid registration400, anonymous export denied, www301. Live browser homepage opened and screenshot saved. Two BHC migrations applied to bhc2026 only. DB private network and no host port confirmed. Registration count0; no fake production registrations created. Valid registration save/readback over public HTTPS still needs a real-user check; earlier local real PostgreSQL integration tests passed.

NovaStay homepage/readiness200 and all four existing containers healthy before/after; uptimes unchanged. After deployment ~7 GB RAM available and 90 GB disk free. This proves observed baseline checks, not zero risk or comprehensive booking/payment testing.

Remaining: real administrator provisioning, SMTP, Google mirror (deferred by user), approved policy/copy, off-host BHC backup/restore verification, load/monitoring and renewal reload drill. No production admin credentials seeded.

Important existing issue: NovaStay certificate inspection showed expiry 14 October 2026 08:51 UTC. No renewal attempted because user prohibits NovaStay changes. Its renewal needs separate attention.

December removal: event-specific routes/containers/certificate-helper can be removed separately after data export and explicit removal confirmation; preserve database until retention/deletion is decided. No automatic destructive cleanup scheduled. Do not restore entire VPS, remove NovaStay resources, run global prune or compose down -v.
